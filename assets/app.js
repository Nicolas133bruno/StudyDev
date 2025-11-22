

import { languageCard } from './router.js';

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function headerSuggestionCard(item, type) {
  const safeName = escapeHtml(String(item.name || ''));
  const safeDesc = escapeHtml(String(item.desc || ''));
  const safeType = escapeHtml(String(type));
  return `
    <li class="search-suggestion" data-id="${item.id}" data-type="${safeType}">
      <div>
        <strong>${safeName}</strong>
        <span class="type">${safeType}</span>
      </div>
      <small>${safeDesc}</small>
    </li>
  `;
}

function roadmapCard(roadmap) {
  return headerSuggestionCard(roadmap, 'Trilha');
}

function resourceCard(resource) {
  return headerSuggestionCard(resource, 'Recurso');
}

// Tema, interações e busca

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Tema persistente em localStorage
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('studydev-theme');
  if (saved === 'dark') root.setAttribute('data-theme', 'dark');
  btn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('studydev-theme', next);
    btn.textContent = next === 'dark' ? '☀️' : '🌙';
  });



  // Busca global no cabeçalho: redireciona para /languages e aplica filtro
  function attachHeaderSearch() {
    const headerInput = document.getElementById('header-search-input');
    const suggestionsList = document.getElementById('header-suggestions');
    if (!headerInput || !suggestionsList) return;
    const handleSearch = () => {
      const q = (headerInput.value || '').trim().toLowerCase();



      if (q.length > 0) {
        const searchInContent = (item) => {
          const text = [
            (item.name || ''),
            (item.desc || ''),
            ...(item.paradigms || []),
            ...(item.use_cases || []),
            ...(item.content ? item.content.map(c => c.name) : []),
          ].join(' ').toLowerCase();
          return text.includes(q);
        };

        const filteredLanguages = window.StudyDevData.languages.filter(searchInContent).map(l => headerSuggestionCard(l, 'Linguagem'));
        const filteredRoadmaps = window.StudyDevData.roadmaps.filter(searchInContent).map(r => headerSuggestionCard(r, 'Trilha'));
        const allFiltered = [...filteredLanguages, ...filteredRoadmaps];
        console.log('Query:', q);
        console.log('Filtered Results:', allFiltered);
        suggestionsList.innerHTML = allFiltered.join('');
        suggestionsList.style.display = 'block';
      } else {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
      }
    };
    headerInput.addEventListener('input', handleSearch);
    headerInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSearch(); });

    suggestionsList.addEventListener('click', (e) => {
      const target = e.target.closest('.search-suggestion');
      if (target) {
        const id = target.dataset.id;
        const type = target.dataset.type;
        let path = '';
        if (type === 'Linguagem') {
          path = `/languages/${id}`;
        } else if (type === 'Trilha') {
          path = `/roadmaps/${id}`;
        }
        if (path) {
          console.log('Navigating to path:', path); // Adicionado para depuração
          window.location.hash = path;
          suggestionsList.style.display = 'none'; // Esconde as sugestões após a navegação
          headerInput.value = ''; // Limpa o input da pesquisa
        }
      }
    });
  }

  // Paginação simples na página de Linguagens
  function attachLanguagesPagination() {
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    const btnMore = document.getElementById('load-more-btn');
    if (!results || !btnMore) return;

    let pageSize = 30;
    let page = 1;
    let currentList = window.StudyDevData.languages.slice();

    function renderPage(reset = false) {
      const end = page * pageSize;
      const visible = currentList.slice(0, end);
      results.innerHTML = visible.map(languageCard).join('');
      btnMore.style.display = end >= currentList.length ? 'none' : 'inline-block';
    }

    // Filtro integrado à paginação
    input?.addEventListener('input', () => {
      const q = (input.value || '').trim().toLowerCase();
      currentList = window.StudyDevData.languages.filter(l => {
        const text = [
          (l.name || ''),
          (l.desc || ''),
          ...(l.paradigms || []),
          ...(l.use_cases || []),
        ].join(' ').toLowerCase();
        return text.includes(q);
      });
      page = 1;
      renderPage(true);
    });

    btnMore.addEventListener('click', () => {
      page += 1;
      renderPage();
    });

    renderPage(true);
  }

  // Re-anexar listeners quando a rota muda
  window.addEventListener('DOMContentLoaded', () => { attachHeaderSearch(); attachLanguagesPagination(); });


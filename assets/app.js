import { StudyDevData } from './data.js';
import { languageCard } from './router.js';

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

  // Interação de busca na Home
  function attachSearch() {
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    if (!input || !results) return;
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      const filtered = StudyDevData.languages.filter(l => {
        const text = [
          (l.name || ''),
          (l.desc || ''),
          ...(l.paradigms || []),
          ...(l.use_cases || []),
        ].join(' ').toLowerCase();
        return text.includes(q);
      });
      results.innerHTML = filtered.map(languageCard).join('');
    });
  }

  // Busca global no cabeçalho: redireciona para /languages e aplica filtro
  function attachHeaderSearch() {
    const headerInput = document.getElementById('header-search-input');
    if (!headerInput) return;
    const handleSearch = () => {
      const q = (headerInput.value || '').trim();
      // Navega para linguagens
      if (window.location.hash !== '#/languages') {
        window.location.hash = '#/languages';
      }
      // Aguarda renderização e aplica o valor no input da página de linguagens
      setTimeout(() => {
        const pageInput = document.getElementById('search-input');
        const results = document.getElementById('search-results');
        if (pageInput) {
          pageInput.value = q;
          // Dispara evento para atualizar a listagem/paginação
          const evt = new Event('input', { bubbles: true });
          pageInput.dispatchEvent(evt);
        } else if (results) {
          // Fallback simples caso página mude a estrutura
          const filtered = StudyDevData.languages.filter(l => {
            const text = [
              (l.name || ''),
              (l.desc || ''),
              ...(l.paradigms || []),
              ...(l.use_cases || []),
            ].join(' ').toLowerCase();
            return text.includes(q.toLowerCase());
          });
          results.innerHTML = filtered.map(languageCard).join('');
        }
      }, 0);
    };
    headerInput.addEventListener('input', handleSearch);
    headerInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSearch(); });
  }

  // Paginação simples na página de Linguagens
  function attachLanguagesPagination() {
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    const btnMore = document.getElementById('load-more-btn');
    if (!results || !btnMore) return;

    let pageSize = 30;
    let page = 1;
    let currentList = StudyDevData.languages.slice();

    function renderPage(reset = false) {
      const end = page * pageSize;
      const visible = currentList.slice(0, end);
      results.innerHTML = visible.map(languageCard).join('');
      btnMore.style.display = end >= currentList.length ? 'none' : 'inline-block';
    }

    // Filtro integrado à paginação
    input?.addEventListener('input', () => {
      const q = (input.value || '').trim().toLowerCase();
      currentList = StudyDevData.languages.filter(l => {
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
  window.addEventListener('hashchange', () => setTimeout(() => { attachHeaderSearch(); attachSearch(); attachLanguagesPagination(); }, 0));
  window.addEventListener('DOMContentLoaded', () => setTimeout(() => { attachHeaderSearch(); attachSearch(); attachLanguagesPagination(); }, 0));


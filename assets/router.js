


// Helpers
export function languageCard(lang) {
  const safeName = escapeHtml(String(lang.name || ''));
  const safeDesc = escapeHtml(String(lang.desc || ''));
  const docsLink = lang.docs ? `<a class="btn btn--ghost" href="${lang.docs}" target="_blank" rel="noopener noreferrer">Docs</a>` : '';
  return `
    <article class="card">
      <h3 class="card__title">${safeName}</h3>
      <p class="card__desc">${safeDesc}</p>
      <div class="card__actions">
        <a class="btn btn--primary" href="#/language/${lang.id}">Detalhes</a>
        ${docsLink}
      </div>
    </article>
  `;
}

function roadmapCard(roadmap) {
  const safeName = escapeHtml(String(roadmap.name || ''));
  const safeDesc = escapeHtml(String(roadmap.desc || ''));
  return `
    <article class="card">
      <h3 class="card__title">${safeName}</h3>
      <p class="card__desc">${safeDesc}</p>
      <div class="card__actions">
        <a class="btn btn--primary" href="#/roadmap/${roadmap.id}">Ver Trilha</a>
      </div>
    </article>
  `;
}

function renderMeta(items) {
  const content = items.map(i => `
    <div class="meta-item">
      <dl>
        <dt>${i.label}</dt>
        <dd>${escapeHtml(String(i.value))}</dd>
      </dl>
    </div>`).join('');
  return `<div class="meta-grid">${content}</div>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Roteador simples baseado em hash para páginas SPA
const routes = {
  '/': renderHome,
  '/languages': renderLanguages,
  '/language': renderLanguageDetail, // expects /language/:id
  '/roadmaps': renderRoadmaps,
  '/roadmap': renderRoadmapDetail, // expects /roadmap/:id
  '/resources': renderResources,
  '/bot': renderBot,
  '/about': renderAbout,
};

function parseHash() {
  const hash = window.location.hash.replace('#', '') || '/';
  const parts = hash.split('/').filter(Boolean);
  const path = parts[0];
  const maybeId = parts[1];
  const maybeVideoIndex = parts[2];
  if (!path) return { route: '/', params: {} };
  if (path === 'language' && maybeId) return { route: '/language', params: { id: maybeId } };
  if (path === 'roadmap' && maybeId) {
    return {
      route: '/roadmap',
      params: {
        id: maybeId,
        videoIndex: maybeVideoIndex ? parseInt(maybeVideoIndex, 10) : 0
      }
    };
  }
  return { route: `/${path}`, params: {} };
}

function renderRoute() {
  const { route, params } = parseHash();
  const target = document.getElementById('route-root');
  const renderer = routes[route] || renderNotFound;
  target.innerHTML = renderer(params);
  // Foco no conteúdo para acessibilidade
  document.getElementById('conteudo').focus();
}

window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', renderRoute);
// Chamada explícita para garantir renderização na carga inicial
renderRoute();

// Componentes de página
function renderHome() {
  return `
    <!-- Hero Section -->
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="hero-container">
        <h1 id="hero-title" class="hero-title">Aprenda programação sem complicar</h1>
        <p class="hero-subtitle">Seu guia moderno com linguagens e recursos para acelerar sua jornada.</p>

        <div class="hero-actions">
          <a href="#/roadmaps" class="btn btn--primary hero-btn">Começar agora</a>
          <a href="#/languages" class="btn btn--ghost hero-btn">Explorar linguagens</a>
          <a href="#/about" class="btn btn--ghost hero-btn">Sobre</a>
        </div>
      </div>
    </section>

    <!-- Benefícios -->
    <section class="stack-md" aria-labelledby="benefits-title" style="margin-top: 1.5rem;">
      <h2 id="benefits-title" class="section-title">Por que usar o StudyDev?</h2>
      <div class="grid grid--responsive">
        <div class="card">
          <h3 class="card__title">Linguagens claras para iniciantes</h3>
          <p class="card__desc">Caminhos passo a passo para começar e evoluir com foco em linguagens.</p>
        </div>
        <div class="card">
          <h3 class="card__title">Conteúdos organizados</h3>
          <p class="card__desc">Linguagens, metadados e recursos em um catálogo direto.</p>
        </div>
        <div class="card">
          <h3 class="card__title">Site rápido e acessível</h3>
          <p class="card__desc">Arquitetura leve, responsiva e com boas práticas de acessibilidade.</p>
        </div>
      </div>
    </section>
  `;
}

function renderLanguages() {
  const items = window.StudyDevData.languages.filter(lang => lang.hello_world).map(lang => languageCard(lang)).join('');
  return `
    <section class="stack-md">
      <h1 class="section-title">Catálogo de Linguagens</h1>
      <p class="muted">Explore as principais linguagens: descrição, ecossistema e links oficiais.</p>
      <div class="searchbar">
        <input id="search-input" class="input" placeholder="Filtrar por nome ou descrição" aria-label="Filtrar linguagens" />
      </div>
      <div id="search-results" class="grid grid--responsive">${items}</div>

    </section>
  `;
}

function renderLanguageDetail({ id }) {
  const lang = window.StudyDevData.languages.find(l => l.id === id);
  if (!lang) return renderNotFound();
  const about = (window.StudyDevData.aboutDetails && window.StudyDevData.aboutDetails[lang.id]) || lang.about;
  const chips = (lang.ecosystem || []).map(e => `<span class="btn btn--ghost">${e}</span>`).join('');
  const useChips = (lang.use_cases || []).map(e => `<span class="btn btn--ghost">${e}</span>`).join('');
  const metaPairs = [
    { label: 'Paradigmas', value: (lang.paradigms || []).join(', ') },
    { label: 'Tipagem', value: lang.typing },
    { label: 'Ano', value: lang.year },
    { label: 'Criadores', value: (lang.creators || []).join(', ') },
    { label: 'Runtime', value: lang.runtime },
  ].filter(m => m.value && String(m.value).length > 0);
  return `
    <article class="stack-md">
      <a href="#/languages" class="nav__link">← Voltar</a>
      <h1 class="section-title">${lang.name}</h1>
      <p class="muted">${lang.desc}</p>
      <div class="card">
        <h2 class="card__title">Ecossistema</h2>
        <div class="card__actions">${chips || '<span class="muted">Sem itens cadastrados</span>'}</div>
      </div>
      <div class="card">
        <h2 class="card__title">Metadados</h2>
        ${metaPairs.length ? renderMeta(metaPairs) : '<p class="muted">Sem metadados disponíveis</p>'}
      </div>
      <div class="card">
        <h2 class="card__title">Casos de Uso</h2>
        <div class="card__actions">${useChips || '<span class="muted">Sem itens cadastrados</span>'}</div>
      </div>
      <div class="card">
        <h2 class="card__title">Links</h2>
        <div class="card__actions">
          ${lang.docs ? `<a class="btn btn--primary" href="${lang.docs}" target="_blank" rel="noopener">Documentação</a>` : `<button class="btn btn--primary" disabled>Sem Documentação</button>`}
          ${lang.site ? `<a class="btn btn--ghost" href="${lang.site}" target="_blank" rel="noopener">Site Oficial</a>` : ''}
        </div>
      </div>
 
      ${about ? `
      <div class="grid grid--responsive">
        ${Array.isArray(about.strengths) && about.strengths.length ? `
        <div class="card">
          <h2 class="card__title">Onde brilha</h2>
          <ul class="stack-sm">${about.strengths.map(s => `<li>${escapeHtml(String(s))}</li>`).join('')}</ul>
        </div>` : ''}
        ${Array.isArray(about.weaknesses) && about.weaknesses.length ? `
        <div class="card">
          <h2 class="card__title">Onde sofre</h2>
          <ul class="stack-sm">${about.weaknesses.map(s => `<li>${escapeHtml(String(s))}</li>`).join('')}</ul>
        </div>` : ''}
      </div>
 
      ${Array.isArray(about.when_to_use) && about.when_to_use.length ? `
      <div class="card">
        <h2 class="card__title">Quando usar</h2>
        <ul class="stack-sm">${about.when_to_use.map(s => `<li>${escapeHtml(String(s))}</li>`).join('')}</ul>
      </div>` : ''}
 
      ${Array.isArray(about.best_practices) && about.best_practices.length ? `
      <div class="card">
        <h2 class="card__title">Boas práticas</h2>
        <ul class="stack-sm">${about.best_practices.map(s => `<li>${escapeHtml(String(s))}</li>`).join('')}</ul>
      </div>` : ''}
 
      ${Array.isArray(about.pitfalls) && about.pitfalls.length ? `
      <div class="card">
        <h2 class="card__title">Armadilhas comuns</h2>
        <ul class="stack-sm">${about.pitfalls.map(s => `<li>${escapeHtml(String(s))}</li>`).join('')}</ul>
      </div>` : ''}
 
      ${Array.isArray(about.stack) && about.stack.length ? `
      <div class="card">
        <h2 class="card__title">Stack típico</h2>
        <div class="card__actions">${about.stack.map(s => `<span class="btn btn--ghost">${escapeHtml(String(s))}</span>`).join('')}</div>
      </div>` : ''}
      ` : ''}
      ${lang.hello_world && lang.hello_world.code ? `
        <div class="card">
          <h2 class="card__title">Hello, World</h2>
          <pre class="code"><code>${escapeHtml(lang.hello_world.code)}</code></pre>
        </div>` : ''}
    </article>
  `;
}

function renderRoadmaps() {
  const items = window.StudyDevData.roadmaps.map(roadmap => roadmapCard(roadmap)).join('');
  return `
    <section class="stack-md">
      <h1 class="section-title">Trilhas de Aprendizado</h1>
      <p class="muted">Explore as trilhas de aprendizado disponíveis para diversas linguagens.</p>
      <p class="muted">Em breve, mais trilhas estarão disponíveis!</p>
      <div class="grid grid--responsive">${items}</div>
    </section>
  `;
}

function renderRoadmapDetail({ id, videoIndex = 0 }) {
  const roadmap = window.StudyDevData.roadmaps.find(r => r.id === id);
  if (!roadmap) return renderNotFound();

  const videos = roadmap.content.filter(item => item.type === 'video');
  const currentVideo = videos[videoIndex];

  const otherContent = roadmap.content.filter(item => item.type === 'text').map(item => {
    return `<p>${escapeHtml(item.value)}</p>`;
  }).join('');

  const prevVideoLink = videoIndex === 0 ? `#/roadmap/${id}/${videos.length - 1}` : `#/roadmap/${id}/${videoIndex - 1}`;
  const nextVideoLink = videoIndex === videos.length - 1 ? `#/roadmap/${id}/0` : `#/roadmap/${id}/${videoIndex + 1}`;
  const prevButtonClass = 'btn btn--primary btn--previous';
  const nextButtonClass = 'btn btn--primary btn--next';

  return `
    <article class="stack-md">
      <a href="#/roadmaps" class="nav__link">← Voltar para Trilhas</a>
      <h1 class="section-title">${roadmap.name}</h1>
      <p class="muted">${roadmap.desc}</p>
      ${currentVideo ? `
        <div class="video-player-wrapper">
          <h2 class="video-title-below-desc">${escapeHtml(currentVideo.title || '')}</h2>
          <a href="${prevVideoLink}" class="${prevButtonClass} video-side-button">← Anterior</a>
          <div class="video-container">
            
            <iframe width="560" height="315" src="${currentVideo.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <a href="${nextVideoLink}" class="${nextButtonClass} video-side-button">Próximo →</a>
        </div>
      ` : ''}
      ${otherContent}
    </article>
  `;
}

function renderResources() {
  return `
    <section class="stack-md">
      <h1 class="section-title">Recursos</h1>
      <p class="muted">Coleção de cursos, livros e repositórios para aprofundar seus estudos.</p>
      <ul class="stack-sm">
        <li><a class="nav__link" href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer">MDN Web Docs</a></li>
        <li><a class="nav__link" href="https://roadmap.sh/" target="_blank" rel="noopener noreferrer">roadmap.sh</a></li>
        <li><a class="nav__link" href="https://freecodecamp.org/" target="_blank" rel="noopener noreferrer">freeCodeCamp</a></li>
        <li><a class="nav__link" href="https://exercism.org/" target="_blank" rel="noopener noreferrer">Exercism</a></li>
      </ul>
    </section>
  `;
}

function renderBot() {
  const mainLanguages = [
    "javascript", "python", "java", "cpp", "html", "css"
  ];
  const options = (window.StudyDevData.languages || [])
    .filter(l => mainLanguages.includes(l.id))
    .map(l => `<option value="${l.id}">${l.name}</option>`)
    .join('');
  return `
    <section class="stack-md">
      <h1 class="section-title">StudyBot — Analise e corrija seus códigos</h1>
      <p class="muted">Escolha a linguagem do catálogo, cole seu código e receba sugestões e correções automáticas. Para linguagens sem suporte específico, usamos regras genéricas.</p>
      <div class="grid grid--responsive">
        <div class="card">
          <h2 class="card__title">Editor</h2>
          <div class="stack-sm">
            <label for="bot-lang" class="muted">Linguagem</label>
            <select id="bot-lang" class="input">${options}</select>
            <label for="bot-editor" class="muted">Código</label>
            <div id="bot-editor" class="editor" style="height: 320px;"></div>
            <div class="card__actions">
              <button id="bot-analyze" class="btn btn--ghost">Analisar</button>
              <button id="bot-fix" class="btn btn--primary">Aplicar correções</button>
              <button id="bot-reset" class="btn btn--ghost">Resetar exemplo</button>
              <button id="bot-clear" class="btn btn--ghost" aria-label="Apagar código do editor">Apagar</button>
            </div>
          </div>
        </div>
        <div class="card">
          <h2 class="card__title">Relatório</h2>
          <div class="panel">
            <h3>Status</h3>
            <p id="bot-status" class="muted" role="status" aria-live="polite"></p>
            <h3>Problemas encontrados</h3>
            <ul id="bot-issues" class="issues stack-sm"></ul>
            <h3>Sugestões</h3>
            <ul id="bot-suggestions" class="suggestions stack-sm"></ul>
          </div>
        </div>
        <div class="card">
          <h2 class="card__title">Código corrigido</h2>
          <pre class="code"><code id="bot-output"></code></pre>
          <div class="card__actions">
            <button id="bot-copy" class="btn btn--ghost">Copiar</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderAbout() {
  return `
    <section class="stack-md">
      <h1 class="section-title">Sobre o StudyDev</h1>
      <p class="muted">O StudyDev é uma plataforma aberta para estudar programação com foco em acessibilidade, performance, responsividade e boas práticas. Sem dependências pesadas, rápido e fácil de usar.</p>

      <div class="grid grid--responsive">
        <div class="card">
          <h2 class="card__title">Missão</h2>
          <ul class="stack-sm">
            <li>Organizar o conhecimento sobre linguagens e ecossistemas.</li>
            <li>Facilitar sua jornada com trilhas e recursos curados.</li>
            <li>Promover acessibilidade e UX excelentes para todos os níveis.</li>
          </ul>
        </div>
        <div class="card">
          <h2 class="card__title">Como usar</h2>
          <ul class="stack-sm">
            <li>Navegue em <a class="nav__link" href="#/languages">Linguagens</a> e filtre pelo que precisa.</li>
            <li>Abra os <strong>detalhes</strong> para ver metadados, casos de uso e "Hello, World".</li>
            <li>Explore <a class="nav__link" href="#/resources">Recursos</a>.</li>
          </ul>
        </div>
        <div class="card">
          <h2 class="card__title">Qualidade Técnica</h2>
          <ul class="stack-sm">
            <li>Acessibilidade: semântica, foco, aria-live e skip-link.</li>
            <li>Performance: arquitetura estática, sem frameworks pesados.</li>
            <li>Responsividade: grid adaptativo e tema claro/escuro.</li>
            <li>SEO básico: metatags e conteúdo estruturado.</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <h2 class="card__title">Sobre o Criador</h2>
        <p class="card__desc">Meu nome é Nicolas Bruno Pereira, tenho 16 anos e atualmente estudo no IFTM - Campus Uberlândia Centro, no ensino técnico de Análise e Desenvolvimento de Sistemas.</p>
        <p class="card__desc">Entre 2022 e 2023, realizei um curso na área de programação na TECHERS, em Uberlândia (MG).</p>
        <p class="card__desc">Em 2025, concluí um curso introdutório de C++ na Uberhub, realizado na UFU - Campus Santa Mônica.</p>
        <div class="card__actions">
          <a href="https://github.com/Nicolas133bruno" target="_blank" rel="noopener" class="btn btn--primary">GitHub</a>
          <a href="https://www.linkedin.com/in/nicolas-bruno-pereira-31864133a/" target="_blank" rel="noopener" class="btn btn--primary">LinkedIn</a>
        </div>
      </div>

      <div class="card">
  <h2 class="card__title">Contato e Comunidade</h2>
  <p class="card__desc muted">Quer sugerir melhorias, novas linguagens ou trilhas?</p>
  <div class="card__actions">
    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Nicolasbru124@gmail.com" 
       class="btn btn--ghost" 
       target="_blank">
      E-mail
    </a>

    <a href="#/resources" class="btn btn--ghost">Ver Recursos</a>
  </div>
</div>

  `;
}

function renderNotFound() {
  return `
    <section class="stack-md">
      <h1 class="section-title">Página não encontrada</h1>
      <p class="muted">Verifique a URL ou volte para a página inicial.</p>
      <a href="#/" class="btn btn--primary">Ir para início</a>
    </section>
  `;
}



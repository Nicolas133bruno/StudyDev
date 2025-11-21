<p align="center">
  <img src="logo.png" alt="StudyDev logo" width="96" height="96">
</p>
# StudyDev

Plataforma simples e estática para estudar programação com uma SPA leve, páginas de recursos e um StudyBot que analisa e sugere melhorias em códigos de várias linguagens.

## Visão Geral
- Arquitetura estática (HTML + CSS + JS), sem build nem backend.
- Navegação por hash (`#/rota`) com roteador em `assets/router.js`.
- Páginas principais: Home, Linguagens, Trilhas, Recursos, Bot.
- Tema claro/escuro com alternância pelo botão `#theme-toggle`.
- Logo em `logo.png`; no tema escuro o fundo branco é aplicado via CSS para melhor contraste.

## Funcionalidades
- Catálogo de linguagens e trilhas com dados em `assets/data.js`.
- StudyBot em `#/bot`:
  - Editor de código e relatórios de problemas/sugestões.
  - Correções automáticas básicas.
  - Suporta atualmente: JavaScript, Python, Java, C++, TypeScript, Go e Rust.
  - Arquitetura plugável para adicionarmos novos analisadores por linguagem.

## Estrutura do Projeto
```
assets/
  app.js        // Inicialização do app e interações gerais
  bot.js        // Lógica do StudyBot (análise/correções, registro de linguagens)
  data.js       // Dados de linguagens, trilhas e recursos
  router.js     // Roteador SPA baseado em hash
  styles.css    // Estilos globais e componentes de página
index.html      // Shell da aplicação e navegação
logo.png        // Logo do projeto
```

## Como Executar em Desenvolvimento
Requisitos: Python instalado (Windows com PowerShell).

1) Abra um terminal na pasta do projeto.
```
cd c:\Users\nicol\Downloads\aprendadev
py -m http.server 8000
```
2) Acesse no navegador:
```
http://localhost:8000/#/
```

## Rotas Disponíveis
- `#/` Home
- `#/languages` Linguagens
- `#/roadmaps` Trilhas
- `#/resources` Recursos
- `#/bot` StudyBot
- `#/about` Sobre

## StudyBot: Como Usar
- Acesse `#/bot`.
- Selecione a linguagem no seletor.
- Cole seu código no editor.
- Clique em “Analisar” para ver problemas e sugestões.
- Clique em “Aplicar correções” para ver o código ajustado (onde suportado).
- “Resetar exemplo” restaura o snippet de exemplo da linguagem selecionada.

## Adicionando Suporte a Novas Linguagens
O StudyBot foi refatorado para ser extensível. Para registrar uma nova linguagem:
1) Abra `assets/bot.js`.
2) Adicione um novo analisador ao registro de linguagens, definindo:
   - `id` e `label` (identificador e nome exibido).
   - `sample` (código de exemplo).
   - `analyze(code)` (retorna `{ issues: [], suggestions: [] }`).
   - `applyFixes(code)` (opcional; retorna código corrigido).
3) A UI do seletor é populada dinamicamente a partir das linguagens registradas.

Exemplo simplificado de estrutura de um analisador (dentro de `bot.js`):
```js
StudyDev.registerAnalyzer('csharp', {
  label: 'C#',
  sample: 'public class Hello { static void Main() { System.Console.WriteLine("Hello"); } }',
  analyze(code) {
    const issues = [];
    const suggestions = [];
    // ... analisar código e preencher arrays
    return { issues, suggestions };
  },
  applyFixes(code) {
    // ... opcional: retornar versão corrigida
    return code;
  }
});
```
Observação: os nomes exatos das funções/utilitários podem variar conforme a versão atual de `bot.js`. Use como referência a estrutura existente no arquivo.

## Personalização de Tema e Logo
- Tema: variáveis CSS em `:root` e `[data-theme="dark"]` controlam cores.
- Logo: tamanho e estilos em `.logo` dentro de `assets/styles.css`.
- Contraste no tema escuro: `[data-theme="dark"] .logo { background: #ffffff; padding: 2px; }`.

## Acessibilidade, Performance e SEO
- Acessibilidade: skip link (`.skip-link`), `aria-live` em conteúdo dinâmico, foco visível.
- Performance: site estático leve; fontes otimizadas; layouts simples.
- SEO: meta tags, Open Graph, título e descrição descritivos.

## Roadmap
- Suporte a mais linguagens (C#, Swift, Dart, HTML/CSS com validações específicas).
- Formatadores básicos por linguagem.
- Execução segura de snippets JS e integração com Pyodide para Python.
- FAQ e dicas de estudo na página do Bot.

## Contribuição
- Sinta-se à vontade para sugerir melhorias e novas linguagens.
- Mantenha consistência com estilos e padrões do projeto.

---
Qualquer dúvida ou ideia, abra um issue ou descreva o que deseja melhorar. 😊
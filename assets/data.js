// Lista inicial de linguagens com dados essenciais
const StudyDevData = {
  languages: [
    // Core e populares
    {
      id: "c",
      name: "C",
      desc: "Base de muitos sistemas; alto desempenho.",
      docs: "https://en.cppreference.com/w/c",
      site: "https://www.iso.org/standard/74528.html",
      ecosystem: ["GCC", "Clang", "Make", "CMake"],
      paradigms: ["Imperativa", "Estruturada"],
      typing: "Estática",
      year: 1972,
      creators: ["Dennis Ritchie"],
      runtime: "Nativo",
      use_cases: ["Sistemas Operacionais", "Sistemas Embarcados", "Drivers"],
      hello_world: {
        language: "c",
        code: '#include <stdio.h>\nint main() {\n  printf("Hello, World!\n");\n  return 0;\n}',
      },
    },
    {
      id: "cpp",
      name: "C++",
      desc: "Orientada a objetos e desempenho.",
      docs: "https://en.cppreference.com/w/",
      site: "https://isocpp.org/",
      ecosystem: ["Qt", "Boost", "Unreal Engine"],
      paradigms: ["Multiparadigma", "OO", "Genérica"],
      typing: "Estática",
      year: 1985,
      creators: ["Bjarne Stroustrup"],
      runtime: "Nativo",
      use_cases: ["Sistemas", "Jogos", "Alta performance"],
      hello_world: {
        language: "cpp",
        code: '#include <iostream>\nint main(){ std::cout << "Hello, World!"; }',
      },
    },
    {
      id: "csharp",
      name: "C#",
      desc: "Ecossistema .NET; backend, desktop e jogos.",
      docs: "https://learn.microsoft.com/dotnet/csharp/",
      site: "https://dotnet.microsoft.com/",
      ecosystem: ["ASP.NET Core", "Entity Framework", "Unity"],
      paradigms: ["OO", "Funcional (LINQ)"],
      typing: "Estática",
      year: 2000,
      creators: ["Microsoft"],
      runtime: ".NET CLR",
      use_cases: ["Backend", "Desktop", "Jogos"],
      hello_world: {
        language: "csharp",
        code: 'using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello, World!");\n  }\n}',
      },
    },
    {
      id: "java",
      name: "Java",
      desc: "Backend, Android e sistemas corporativos.",
      docs: "https://docs.oracle.com/javase/specs/",
      site: "https://www.java.com/",
      ecosystem: ["Spring", "Quarkus", "Micronaut"],
      paradigms: ["OO", "Imperativa"],
      typing: "Estática",
      year: 1995,
      creators: ["James Gosling"],
      runtime: "JVM",
      use_cases: ["Backend", "Android", "Sistemas corporativos"],
      hello_world: {
        language: "java",
        code: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
      },
    },
    {
      id: "scala",
      name: "Scala",
      desc: "Funcional + OO na JVM.",
      docs: "https://docs.scala-lang.org/",
      site: "https://www.scala-lang.org/",
      ecosystem: ["Akka", "Play Framework", "Apache Spark"],
      paradigms: ["Multiparadigma", "OO", "Funcional"],
      typing: "Estática",
      year: 2003,
      creators: ["Martin Odersky"],
      runtime: "JVM",
      use_cases: [
        "Processamento de Big Data",
        "Sistemas Distribuídos",
        "Backend",
      ],
      hello_world: {
        language: "scala",
        code: 'object Main extends App {\n  println("Hello, World!")\n}',
      },
    },
    {
      id: "kotlin",
      name: "Kotlin",
      desc: "Moderna e pragmática para JVM e Android.",
      docs: "https://kotlinlang.org/docs/reference/",
      site: "https://kotlinlang.org/",
      ecosystem: ["Spring Boot", "Android SDK", "Ktor"],
      paradigms: ["Multiparadigma", "OO", "Funcional"],
      typing: "Estática",
      year: 2011,
      creators: ["JetBrains"],
      runtime: "JVM",
      use_cases: ["Desenvolvimento Android", "Backend", "Microsserviços"],
      hello_world: {
        language: "kotlin",
        code: 'fun main() {\n  println("Hello, World!")\n}',
      },
    },
    {
      id: "php",
      name: "PHP",
      desc: "Linguagem de script para desenvolvimento web.",
      docs: "https://www.php.net/docs.php",
      site: "https://www.php.net/",
      ecosystem: ["Laravel", "Symfony", "WordPress"],
      paradigms: ["Imperativa", "OO"],
      typing: "Dinâmica",
      year: 1994,
      creators: ["Rasmus Lerdorf"],
      runtime: "Zend Engine",
      use_cases: [
        "Desenvolvimento Web",
        "Sistemas de Gerenciamento de Conteúdo",
      ],
      hello_world: {
        language: "php",
        code: '<?php\n  echo "Hello, World!";\n?>',
      },
    },
    {
      id: "dart",
      name: "Dart",
      desc: "Otimizada para UI, usada no Flutter.",
      docs: "https://dart.dev/guides",
      site: "https://dart.dev/",
      ecosystem: ["Flutter", "Dart Frog"],
      paradigms: ["OO", "Funcional"],
      typing: "Estática",
      year: 2011,
      creators: ["Google"],
      runtime: "Dart VM",
      use_cases: ["Desenvolvimento Mobile (Flutter)", "Web", "Backend"],
      hello_world: {
        language: "dart",
        code: 'void main() {\n  print("Hello, World!");\n}',
      },
    },

    {
      id: "python",
      name: "Python",
      desc: "Ciência de dados, web e automação.",
      docs: "https://docs.python.org/3/",
      site: "https://www.python.org/",
      ecosystem: ["Django", "Flask", "FastAPI", "Pandas", "NumPy"],
      paradigms: ["Multiparadigma", "Imperativa", "OO", "Funcional"],
      typing: "Dinâmica",
      year: 1991,
      creators: ["Guido van Rossum"],
      runtime: "CPython",
      use_cases: ["Backend", "Data Science", "Automação", "CLI", "Scripting"],
      hello_world: { language: "python", code: 'print("Hello, World!")' },
    },
    {
      id: "ruby",
      name: "Ruby",
      desc: "Web com Rails; sintaxe elegante.",
      docs: "https://www.ruby-lang.org/en/documentation/",
      site: "https://www.ruby-lang.org/pt/",
      ecosystem: ["Ruby on Rails", "Sinatra", "Jekyll"],
      paradigms: ["OO", "Funcional", "Imperativa"],
      typing: "Dinâmica",
      year: 1995,
      creators: ["Yukihiro Matsumoto"],
      runtime: "MRI (Matz's Ruby Interpreter)",
      use_cases: ["Desenvolvimento Web", "Scripting", "Automação"],
      hello_world: { language: "ruby", code: 'puts "Hello, World!"' },
    },
    {
      id: "perl",
      name: "Perl",
      desc: "Texto e scripts; histórico forte em sysadmin.",
      docs: "https://perldoc.perl.org/",
      site: "https://www.perl.org/",
      ecosystem: ["CPAN", "Mojolicious", "Catalyst"],
      paradigms: ["Multiparadigma", "Imperativa", "Funcional"],
      typing: "Dinâmica",
      year: 1987,
      creators: ["Larry Wall"],
      runtime: "Perl interpreter",
      use_cases: [
        "Processamento de Texto",
        "Administração de Sistemas",
        "Desenvolvimento Web",
      ],
      hello_world: { language: "perl", code: 'print "Hello, World!\n";' },
    },

    {
      id: "javascript",
      name: "JavaScript",
      desc: "Onipresente no frontend e backend.",
      docs: "https://developer.mozilla.org/docs/Web/JavaScript",
      site: "https://www.javascript.com/",
      ecosystem: ["React", "Vue", "Angular", "Node.js", "Express"],
      paradigms: ["Multiparadigma", "Imperativa", "OO", "Funcional"],
      typing: "Dinâmica",
      year: 1995,
      creators: ["Brendan Eich"],
      runtime: "V8/SpiderMonkey/JavaScriptCore",
      use_cases: ["Frontend", "Backend", "Mobile (RN)", "Desktop (Electron)"],
      hello_world: {
        language: "javascript",
        code: 'console.log("Hello, World!");',
      },
    },
    {
      id: "html",
      name: "HTML",
      desc: "Linguagem de marcação para páginas web.",
      docs: "https://developer.mozilla.org/docs/Web/HTML",
      site: "https://html.spec.whatwg.org/",
      ecosystem: ["Semântica", "Acessibilidade", "SEO"],
      paradigms: ["Markup"],
      typing: "N/A",
      year: 1993,
      creators: ["WHATWG"],
      runtime: "Browser",
      use_cases: ["Estrutura de páginas", "Conteúdo"],
      hello_world: {
        language: "html",
        code: '<!doctype html>\n<html>\n<head><meta charset="utf-8"><title>Hello</title></head>\n<body>Hello, World!</body>\n</html>',
      },
    },
    {
      id: "css",
      name: "CSS",
      desc: "Folhas de estilo para apresentação de páginas web.",
      docs: "https://developer.mozilla.org/docs/Web/CSS",
      site: "https://www.w3.org/Style/CSS/",
      ecosystem: ["Flexbox", "Grid", "Animations"],
      paradigms: ["Declarativa"],
      typing: "N/A",
      year: 1996,
      creators: ["W3C"],
      runtime: "Browser",
      use_cases: ["Estilização", "Layout", "Animações"],
      hello_world: {
        language: "css",
        code: 'body { color: black; }',
      },
    },
    {
      id: "typescript",
      name: "TypeScript",
      desc: "Tipos sobre JS; projetos escaláveis.",
      docs: "https://www.typescriptlang.org/docs/",
      site: "https://www.typescriptlang.org/",
      ecosystem: ["ts-node", "NestJS", "Vite", "Next.js"],
      paradigms: ["Multiparadigma", "Imperativa", "OO", "Funcional"],
      typing: "Estática (sobre JS)",
      year: 2012,
      creators: ["Microsoft"],
      runtime: "Transpila para JS (Node/Browser)",
      use_cases: ["Frontend", "Backend"],
      hello_world: {
        language: "typescript",
        code: 'const msg: string = "Hello, World!";\nconsole.log(msg);',
      },
    },
    {
      id: "go",
      name: "Go",
      desc: "Simplicidade e concorrência.",
      docs: "https://go.dev/doc/",
      site: "https://go.dev/",
      ecosystem: ["Gin", "Echo", "Fiber"],
      paradigms: ["Imperativa", "Concorrente"],
      typing: "Estática",
      year: 2009,
      creators: ["Robert Griesemer", "Rob Pike", "Ken Thompson"],
      runtime: "Go runtime",
      use_cases: ["Serviços", "CLIs", "DevOps"],
      hello_world: {
        language: "go",
        code: 'package main\nimport "fmt"\nfunc main(){ fmt.Println("Hello, World!") }',
      },
    },
    {
      id: "rust",
      name: "Rust",
      desc: "Memória segura e alto desempenho.",
      docs: "https://doc.rust-lang.org/book/",
      site: "https://www.rust-lang.org/",
      ecosystem: ["Tokio", "Axum", "Rocket"],
      paradigms: ["Multiparadigma", "Funcional", "Sistemas"],
      typing: "Estática (com ownership)",
      year: 2010,
      creators: ["Graydon Hoare"],
      runtime: "Nativo (cargo toolchain)",
      use_cases: ["Sistemas", "Serviços", "CLI"],
      hello_world: {
        language: "rust",
        code: 'fn main(){\n  println!("Hello, World!");\n}',
      },
    },
    {
      id: "swift",
      name: "Swift",
      desc: "iOS/macOS; moderna e segura.",
      docs: "https://docs.swift.org/swift-book/",
      site: "https://swift.org/",
      paradigms: ["Multiparadigma", "OO", "Funcional"],
      typing: "Estática",
      year: 2014,
      creators: ["Apple"],
      runtime: "Swift runtime",
      use_cases: ["iOS", "macOS", "Server-side (Vapor)"],
      hello_world: { language: "swift", code: 'print("Hello, World!")' },
    },

    // Funcionais e acadêmicas

    // Científicas e scripting

    {
      id: "lua",
      name: "Lua",
      desc: "Linguagem leve e poderosa, frequentemente usada como linguagem de script embarcada.",
      docs: "https://www.lua.org/docs.html",
      site: "https://www.lua.org/",
      ecosystem: ["LuaRocks", "Love2D", "OpenResty"],
      paradigms: ["Multiparadigma", "Imperativa", "Funcional"],
      typing: "Dinâmica",
      year: 1993,
      creators: [
        "Roberto Ierusalimschy",
        "Luiz Henrique de Figueiredo",
        "Waldemar Celes",
      ],
      runtime: "Lua interpreter",
      use_cases: [
        "Desenvolvimento de Jogos",
        "Sistemas Embarcados",
        "Extensão de Aplicações",
        "Web Servers (OpenResty)",
      ],
      hello_world: { language: "lua", code: 'print("Hello, World!")' },
    },
    {
      id: "powershell",
      name: "PowerShell",
      desc: "Shell de linha de comando e linguagem de script da Microsoft.",
      docs: "https://docs.microsoft.com/powershell/",
      site: "https://docs.microsoft.com/powershell/",
      ecosystem: ["PowerShell Gallery", "Azure CLI"],
      paradigms: ["Imperativa", "Orientada a Objetos", "Scripting"],
      typing: "Dinâmica",
      year: 2006,
      creators: ["Microsoft"],
      runtime: ".NET CLR",
      use_cases: [
        "Automação de Tarefas",
        "Administração de Sistemas Windows",
        "Gerenciamento de Nuvem (Azure)",
      ],
      hello_world: {
        language: "powershell",
        code: 'Write-Host "Hello, World!"',
      },
    },
    {
      id: "bash",
      name: "Bash",
      desc: "Um interpretador de comandos e linguagem de script para sistemas operacionais baseados em Unix.",
      docs: "https://www.gnu.org/software/bash/manual/",
      site: "https://www.gnu.org/software/bash/",
      ecosystem: ["GNU Core Utilities", "AWK", "sed"],
      paradigms: ["Imperativa", "Scripting"],
      typing: "Dinâmica",
      year: 1989,
      creators: ["Brian Fox"],
      runtime: "Bash interpreter",
      use_cases: [
        "Automação de Tarefas",
        "Administração de Sistemas",
        "Scripting de Shell",
        "Ferramentas de Linha de Comando",
      ],
      hello_world: {
        language: "bash",
        code: '#!/bin/bash\necho "Hello, World!"',
      },
    },

    // Históricas e de sistemas

    {
      id: "cobol",
      name: "COBOL",
      desc: "Linguagem de programação orientada a negócios, amplamente usada em sistemas financeiros e governamentais legados.",
      docs: "https://open-cobol.sourceforge.net/",
      site: "https://www.microfocus.com/en-us/solutions/mainframe-modernization/cobol",
      ecosystem: ["Micro Focus Visual COBOL", "GnuCOBOL"],
      paradigms: ["Imperativa", "Procedural", "Orientada a Dados"],
      typing: "Estática",
      year: 1960,
      creators: ["Grace Hopper", "CODASYL"],
      runtime: "Compilado",
      use_cases: [
        "Sistemas Financeiros",
        "Processamento de Dados Comerciais",
        "Sistemas Governamentais",
      ],
      hello_world: {
        language: "cobol",
        code: 'IDENTIFICATION DIVISION.\nPROGRAM-ID. HELLO-WORLD.\nPROCEDURE DIVISION.\n    DISPLAY "Hello, World!".\n    STOP RUN.',
      },
    },

    {
      id: "pascal",
      name: "Pascal",
      desc: "Linguagem de programação estruturada, projetada para ensino e desenvolvimento de software.",
      docs: "https://wiki.freepascal.org/Documentation",
      site: "https://www.pascal-lang.org/",
      ecosystem: ["Free Pascal", "Delphi"],
      paradigms: ["Imperativa", "Estruturada"],
      typing: "Estática",
      year: 1971,
      creators: ["Niklaus Wirth"],
      runtime: "Compilado",
      use_cases: [
        "Ensino de Programação",
        "Desenvolvimento de Aplicações Desktop",
        "Sistemas Embarcados",
      ],
      hello_world: {
        language: "pascal",
        code: "program HelloWorld;\nbegin\n  writeln('Hello, World!');\nend.",
      },
    },

    // Web, contrato e domínio
    {
      id: "sql",
      name: "SQL",
      desc: "Linguagem padrão para gerenciar e manipular bancos de dados relacionais.",
      docs: "https://www.postgresql.org/docs/current/sql.html",
      site: "https://sql.org/",
      ecosystem: ["PostgreSQL", "MySQL", "SQL Server", "SQLite", "Oracle Database"],
      paradigms: ["Declarativa"],
      typing: "Forte",
      year: 1974,
      creators: ["Donald D. Chamberlin", "Raymond F. Boyce"],
      runtime: "Motor de banco de dados",
      use_cases: [
        "Consultas e manipulação de dados em sistemas financeiros",
        "Gerenciamento de inventário e vendas em e-commerce",
        "Armazenamento de dados de usuários em aplicações web",
        "Análise de dados para business intelligence"
      ],
      hello_world: {
        language: "sql",
        code: 'SELECT "Hello, World!" AS message;'
      }

    },
  ],
  aboutDetails: {
    javascript: {
      strengths: [
        "Disponível em todos os navegadores",
        "Ecossistema gigante de libs e ferramentas",
        "Modelo assíncrono poderoso (Promises/async)",
      ],
      weaknesses: [
        "Coerção e escopo podem gerar bugs",
        "Ferramental complexo em projetos grandes",
        "Sem tipos por padrão (usar TS ou JSDoc)",
      ],
      when_to_use: [
        "Frontend moderno",
        "Prototipagem rápida e apps fullstack com Node",
        "Apps desktop com Electron",
      ],
      best_practices: [
        "Usar === ao invés de ==",
        "Preferir const/let em vez de var",
        "Lint com ESLint e formatação com Prettier",
        "Documentar com JSDoc ou adotar TypeScript",
      ],
      pitfalls: [
        "Hoisting e escopo de var",
        "this confuso em funções não-arrow",
        "Callback hell (use async/await)",
        "Precisão de float (ex.: 1.1 + 0.2)",
      ],
      stack: [
        "Node.js",
        "npm",
        "Vite",
        "React/Vue",
        "ESLint",
        "Prettier",
        "Jest",
      ],
    },
    sql: {
      strengths: [
        "Padrão universal para bancos de dados relacionais",
        "Alta capacidade de manipulação e consulta de dados",
        "Transações ACID para integridade dos dados",
        "Ampla adoção e maturidade no mercado"
      ],
      weaknesses: [
        "Não é ideal para dados não estruturados (NoSQL)",
        "Escalabilidade horizontal pode ser complexa",
        "Curva de aprendizado para otimização de queries complexas"
      ],
      when_to_use: [
        "Sistemas que exigem alta integridade e consistência de dados",
        "Aplicações com modelos de dados bem definidos",
        "Análise de dados estruturados e relatórios"
      ],
      best_practices: [
        "Normalização de dados para evitar redundância",
        "Uso de índices para otimizar consultas",
        "Transações explícitas para garantir atomicidade",
        "Evitar SELECT *; listar colunas específicas"
      ],
      pitfalls: [
        "Consultas mal otimizadas podem causar gargalos de performance",
        "Injeção de SQL (SQL Injection) sem validação adequada",
        "Bloqueios de tabela em transações longas",
        "Excesso de JOINs pode degradar performance"
      ],
      ecosystem: ["PostgreSQL", "MySQL", "SQL Server", "SQLite", "Oracle Database", "DBeaver", "SQL Developer"],
      paradigms: ["Declarativa"],
      typing: "Forte",
      year: 1974,
      creators: ["Donald D. Chamberlin", "Raymond F. Boyce"],
      runtime: "Motor de banco de dados",
      use_cases: [
        "Consultas e manipulação de dados em sistemas financeiros",
        "Gerenciamento de inventário e vendas em e-commerce",
        "Armazenamento de dados de usuários em aplicações web",
        "Análise de dados para business intelligence"
      ],
      hello_world: {
        language: "sql",
        code: 'SELECT "Hello, World!" AS message;'
      }
    },
    typescript: {
      strengths: [
        "Segurança de tipos sobre JS",
        "Refatorações seguras e melhor DX",
        "Integra-se ao ecossistema JS sem esforço",
      ],
      weaknesses: [
        "Generics avançados podem complicar",
        "Tipos não cobrem runtime automaticamente",
        "Configurações de build podem ser extensas",
      ],
      when_to_use: [
        "Projetos médios/grandes em JS",
        "APIs robustas com NestJS",
        "Frontend com React/Next",
      ],
      best_practices: [
        "Ativar strict mode",
        "Tipos explícitos em APIs públicas",
        "Evitar any; usar unknown quando necessário",
      ],
      pitfalls: [
        "Tipos ampliados indevidamente",
        "Divergência entre tipos e runtime",
        "Abstrações excessivas de tipos",
      ],
      stack: ["tsc", "Vite", "Next.js", "NestJS", "ESLint", "Prettier"],
    },
    python: {
      strengths: [
        "Sintaxe clara e produtividade alta",
        "Bibliotecas vastas para data science e web",
        "Comunidade enorme e material de aprendizado",
      ],
      weaknesses: [
        "Performance inferior ao nativo",
        "GIL limita paralelismo com threads",
        "Gestão de ambientes pode confundir iniciantes",
      ],
      when_to_use: [
        "Scripts e automação rápida",
        "Backends com FastAPI/Django",
        "Ciência de dados e notebooks (Jupyter)",
      ],
      best_practices: [
        "Usar venv e requirements/poetry",
        "Type hints + mypy em projetos médios/grandes",
        "Formatar com black e lint com flake9",
      ],
      pitfalls: [
        "Misturar pip/conda/poetry quebra ambientes",
        "Mutabilidade compartilhada de listas/dicts",
        "IO bloqueante sem asyncio quando apropriado",
      ],
      stack: [
        "venv",
        "pip/poetry",
        "FastAPI",
        "Django",
        "pytest",
        "black",
        "flake9",
      ],
    },
    java: {
      strengths: [
        "Alta confiabilidade e ecosistema corporativo sólido",
        "JVM com excelente performance (JIT, GC)",
        "Frameworks maduros (Spring, Quarkus, Micronaut)",
      ],
      weaknesses: [
        "Verboso comparado a linguagens modernas",
        "Configuração enterprise pode ser complexa",
        "Consumo de memória em apps grandes",
      ],
      when_to_use: [
        "Sistemas corporativos de grande porte",
        "APIs backend escaláveis e resilientes",
        "Android (com Kotlin preferível)",
      ],
      best_practices: [
        "Imutabilidade quando possível",
        "Streams e APIs modernas (Java 9+)",
        "Testes com JUnit e integração com Testcontainers",
      ],
      pitfalls: [
        "NullPointer sem uso de Optional/validação",
        "Deadlocks com paralelismo mal gerenciado",
        "Configurações Spring sem profiles claros",
      ],
      stack: [
        "Maven",
        "Gradle",
        "Spring Boot",
        "Hibernate",
        "JUnit",
        "Testcontainers",
      ],
    },
    cpp: {
      strengths: [
        "Máxima performance e controle fino",
        "Biblioteca padrão rica (STL)",
        "Suporte amplo multi-plataforma",
      ],
      weaknesses: [
        "Complexidade alta e footguns",
        "Compilação/linkagem complexas",
        "Gerência manual de memória sem smart pointers",
      ],
      when_to_use: [
        "Engines de jogos e embarcados",
        "Aplicações de alta performance",
        "Interoperabilidade com legado C/C++",
      ],
      best_practices: [
        "RAII e smart pointers",
        "Evitar raw new/delete",
        "Preferir padrões modernos (C++18/20)",
      ],
      pitfalls: [
        "Undefined behavior por ponteiros inválidos",
        "Data races sem sincronização",
        "Headers mal organizados aumentam tempos de build",
      ],
      stack: [
        "CMake",
        "Conan/vcpkg",
        "GoogleTest/Catch3",
        "Clang-Tidy",
        "ASan/TSan",
      ],
    },
    go: {
      strengths: [
        "Binários estáticos e deploy simples",
        "Concorrência com goroutines/channels",
        "Ferramentas padrão (fmt, vet, test)",
      ],
      weaknesses: [
        "Erros verbosos (if err != nil)",
        "Generics relativamente novos",
        "Bibliotecas menos variadas que JS/Python",
      ],
      when_to_use: [
        "Serviços de alto IO",
        "CLIs e ferramentas DevOps",
        "Infraestrutura e plataformas internas",
      ],
      best_practices: [
        "gofmt/goimports sempre",
        "Interfaces pequenas e claras",
        "Context para cancelamento/timeouts",
      ],
      pitfalls: [
        "Goroutine leaks sem cancelamento",
        "Shadowing com :=",
        "Deadlocks por uso incorreto de channels",
      ],
      stack: [
        "Go modules",
        "Gin",
        "Echo",
        "Chi",
        "Testes nativos",
        "golangci-lint",
      ],
    },
    rust: {
      strengths: [
        "Segurança de memória sem GC",
        "Performance próxima ao C/C++",
        "Ferramentas integradas (cargo, clippy, rustfmt)",
      ],
      weaknesses: [
        "Curva de aprendizado íngreme",
        "Tempo de compilação maior em projetos grandes",
        "Ecosistema amadurecendo em algumas áreas",
      ],
      when_to_use: [
        "Sistemas e baixa latência",
        "Ferramentas CLI robustas",
        "Substituir C/C++ com segurança extra",
      ],
      best_practices: [
        "Usar clippy e rustfmt",
        "Projetar pensando em ownership/borrowing",
        "Erros com Result e tipos somas claros",
      ],
      pitfalls: [
        "Lifetimes e empréstimos mal compreendidos",
        "Contenção com Arc/Mutex",
        "Uso desnecessário de unsafe",
      ],
      stack: ["cargo", "tokio", "axum", "serde", "clippy", "rustfmt"],
    },
    csharp: {
      strengths: [
        "Ferramentas maduras (.NET SDK, Visual Studio, Rider)",
        "Boa performance e produtividade",
        "Ecossistema rico para web, desktop e jogos",
      ],
      weaknesses: [
        "Dependência da plataforma .NET",
        "Verbose em alguns cenários",
        "Menos comum em ambientes Linux puros",
      ],
      when_to_use: [
        "Backends com ASP.NET Core",
        "Apps desktop Windows com WPF/WinUI",
        "Jogos com Unity",
      ],
      best_practices: [
        "Async/await para IO",
        "Injeção de dependência em ASP.NET",
        "Análise estática e testes com xUnit/NUnit",
      ],
      pitfalls: [
        "Bloqueios de thread em async mal utilizado",
        "Configuração complexa de EF Core",
        "Leaks de IDisposable sem using/await using",
      ],
      stack: [
        ".NET SDK",
        "ASP.NET Core",
        "Entity Framework",
        "NuGet",
        "xUnit",
        "Serilog",
      ],
    },
  },
  roadmaps: [
    {
      id: "javascript-video-1",
      name: "Curso de Javascript",
      desc: "Trilha para aprender JavaScript do zero e criar seus primeiros projetos.",
      content: [
        {
          type: "video",
          name: "CURSO DE JAVASCRIPT DO ZERO | parte 1 - variáveis, onClick, funções e interação com HTML",
          url: "https://www.youtube.com/embed/Z7mnxUI4u00"
        },
        {
          type: "video",
          name: "CURSO DE JAVASCRIPT DO ZERO | parte 2 - pegando valores de entrada do usuário e escrevendo na tela",
          url: "https://www.youtube.com/embed/kwOPAQJDGyI?si=7Zr9C3xp33OYNPIU"
        },
        {
          type: "video",
          name: "Como usar o CONSOLE no navegador? | Conteúdo extra das aulas de Javascript!",
          url: "https://www.youtube.com/embed/rvBdC3Ziwg8?si=ps6MmlUPpPE02rOB"
        },
        {
          type: "video",
          name: "CURSO DE JAVASCRIPT DO ZERO | parte 3 - estruturas condicionais (if else) e operadores relacionais",
          url: "https://www.youtube.com/embed/c-D7uV2CiFQ?si=j5YvTAZQsjWiKRnt"
        },
        {
          type: "video",
          name: "CURSO DE JAVASCRIPT DO ZERO | parte 4 - arrays (listas), estruturas de repetição (for) e escopo",
          url: "https://www.youtube.com/embed/IuCZPOk5EXo?si=weVzP358K4ajgYl6"
        },
        {
          type: "video",
          name: "CURSO DE JAVASCRIPT DO ZERO | parte 5 - métodos de array (deletando e editando itens em lista)",
          url: "https://www.youtube.com/embed/RjfhRZXB_U8?si=UDlwr8OIQO1aJMKW"
        }
      ]
    },
    {
      id: "Carreira-e-mercado-de-trabalho",
      name: "Carreira e mercado de trabalho",
      desc: "Trilha para entender o mercado e desenvolver sua carreira.",
      content: [
        {
          type: "video",
          name: "3 Provas de que você está PRONTO(A) para ser FREELANCER (e 1 coisa que fiz errado!!!)",
          url: "https://www.youtube.com/embed/wxhW8ys0pB8?si=GgueSZ50tvUf50hP"
        },
        {
          type: "video",
          name: "COMO SE TORNAR UM FREELANCER (e ganhar dinheiro sem trabalho duro!!!)ACERTOS NA MINHA CARREIRA EM TI QUE ACONSELHO MUITO!!!",
          url: "https://www.youtube.com/embed/97yZhj1Qwoo?si=s7AYGB2LKgztXjKX"
        },
        {
          type: "video",
          name: "SAIU A LISTA: 40 profissões mais impactadas pela inteligência artificial!",
          url: "https://www.youtube.com/embed/OJVfJIA1V4o?si=sBrQ7snhcC-VOmvK"
        },
        {
          type: "video",
          name: "O que realmente faz um projeto pessoal se destacar no mercado de tech?",
          url: "https://www.youtube.com/embed/KoJrulmzJ98?si=75IBYJQQtyRG4w8N&amp"
        },
        {
          type: "video",
          name: "O Método Japonês para Resolver Qualquer Problema na Sua Vida | Teoria + Prática",
          url: "https://www.youtube.com/embed/Gua9CFW_QyQ?si=pgy1jv1fvdl3mEAd&amp"
        },
        {
          type: "video",
          name: "Você tem o perfil pra trabalhar com TI? Descubra agora",
          url: "https://www.youtube.com/embed/zO4TP_MzBeA?si=OnVIvPlqNux7hO34&amp"
        },
        {
          type: "video",
          name: "tudo o que eu faria diferente na minha carreira hoje",
          url: "https://www.youtube.com/embed/bQXzClDuVDQ?si=p9LOn--T6YNmicWn&amp"
        },
        {
          type: "video",
          name: "TUDO O QUE VOCÊ PRECISA SABER ANTES DE TRABALHAR COMO FREELANCER",
          url: "https://www.youtube.com/embed/hIUqKQ2j6bQ?si=7qdDTewzfLZ7X9UY&amp"
        },
        {
          type: "video",
          name: "Como ganhar DINHEIRO com TI ALÉM do CLT | Crie uma RENDA EXTRA!",
          url: "https://www.youtube.com/embed/zXxbdBAqGGQ?si=FokgESHVGcvRQm_2&amp"
        },
      ]
    },
    {
      id: "dicas-de-estudo-e-motivacao",
      name: "dicas e motivação",
      desc: "Trilha para manter motivação, foco e disciplina. Continue avançando.",
      content: [
        {
          type: "video",
          name: "COMO ESTUDAR E TRABALHAR SEM PERDER O FOCO | MUZY CORTES",
          url: "https://www.youtube.com/embed/PWkNNqBF30w?si=36j_6UEFnlU_mvsm"
        },
        {
          type: "video",
          name: "3 PRINCIPAIS MÉTODOS que EU USO para ESTUDAR",
          url: "https://www.youtube.com/embed/DT0cBQAy_l8?si=ehq_O62RpbZ0RSou"
        },
        {
          type: "video",
          name: "ISSO VAI MUDAR SEU JEITO DE ESTUDAR (DICAS DE MESTRE COM TDAH)",
          url: "https://www.youtube.com/embed/OTzb2zFTBlk?si=qmlzEhPvM61cNKMA"
        },
        {
          type: "video",
          name: "VOLTEI A ESTUDAR!",
          url: "https://www.youtube.com/embed/1jYYhAK94MU?si=se439ManBvEjbob0"
        },
        {
          type: "video",
          name: "COMO SE MANTER HIPER FOCADO EM UM MUNDO REPLETO DE DISTRAÇÕES",
          url: "https://www.youtube.com/embed/2Fxo-79zlE4?si=3R94AM6vDypMdgXO"
        },
        {
          type: "video",
          name: "3 técnicas indicadas por cientistas para qualquer pessoa melhorar nos estudos",
          url: "https://www.youtube.com/embed/posTc56basM?si=MH-02z9gdJ5g2uy3"
        },
        {
          type: "video",
          name: "Como se lembrar DE TUDO igual os estudantes japoneses (estude menos de vdd)",
          url: "https://www.youtube.com/embed/PhdYyQrlVKc?si=NsS9179NzVmTwnX2"
        },
        {
          type: "video",
          name: "MOTIVAÇÃO PARA APROVAÇÃO EM CONCURSO",
          url: "https://www.youtube.com/embed/YCYOrvwuZDM?si=oQb6yiHnaEFwqzr7&amp"
        },
      ]
    }
  ]
};


// Expor no escopo global para uso por scripts não-modulares (ex.: StudyBot)
window.StudyDevData = StudyDevData;
// Exportar para módulos ES

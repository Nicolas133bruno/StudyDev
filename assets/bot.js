// StudyBot: arquitetura extensível com registro de analisadores por linguagem
const StudyBot = (() => {
  const registry = {};
  // Limita operação às linguagens presentes em StudyDevData.languages
  const supportedIds = new Set((window.StudyDevData?.languages || []).map(l => l.id));

  const samples = {
    javascript: `function hello(name){
  var msg = 'Olá, ' + name
  console.log(msg)
}

hello('StudyDev')
`,
    typescript: `function greet(name: string): string {
  return 'Olá, ' + name;
}

console.log(greet('StudyDev'));
`,
    python: `def hello(name):
    print("Olá, " + name)

hello("StudyDev")
`,
    java: `System.out.println("Olá StudyDev");
`,
    cpp: `#include <iostream>
using namespace std;

cout << "Olá StudyDev" << endl;
`,
    go: `fmt.Println("Olá StudyDev")
`,
    rust: `println!("Olá StudyDev");
`,
    csharp: `using System;
class Program {
  static void Main() {
    Console.WriteLine("Olá StudyDev");
  }
}
`,
    c: `#include <stdio.h>
int main(){
  printf("Olá StudyDev\n");
  return 0;
}
`,
    kotlin: `fun main(){
  println("Olá StudyDev")
}
`,
    swift: `print("Olá StudyDev")
`,
    dart: `void main(){
  print('Olá StudyDev');
}
`,
    ruby: `puts "Olá StudyDev"
`,
    php: `<?php
echo "Olá StudyDev"; 
`,
    sql: `SELECT 'Olá StudyDev';
`,
    graphql: `query Hello { greeting }
`,
    bash: `#!/usr/bin/env bash
set -euo pipefail
echo "Olá StudyDev"
`,
    powershell: `Write-Host "Olá StudyDev"`
  };

  function registerLanguage(key, analyzer) {
    registry[key] = analyzer;
  }

  function commonAnalyze(code) {
    const issues = [];
    const suggestions = [];
    const lines = code.split(/\r?\n/);
    lines.forEach((line, i) => {
      if (/\s+$/.test(line)) issues.push(`Linha ${i + 1}: espaços à direita desnecessários.`);
      if (line.length > 120) suggestions.push(`Linha ${i + 1}: quebre linhas acima de 120 colunas para legibilidade.`);
      if (/\b(TODO|FIXME)\b/.test(line)) suggestions.push(`Linha ${i + 1}: encontrou TODO/FIXME — registre tarefa e resolva.`);
    });
    if (!code.endsWith('\n')) suggestions.push('Adicionar quebra de linha no final do arquivo.');
    return { issues, suggestions };
  }

  // Sugestões orientadas ao catálogo (best practices/pitfalls e metadados)
  function metaGuidance(langId, code) {
    const meta = { issues: [], suggestions: [] };
    const langObj = (window.StudyDevData?.languages || []).find(l => l.id === langId);
    const about = (window.StudyDevData?.aboutDetails && window.StudyDevData.aboutDetails[langId]) || (langObj && langObj.about) || null;
    if (about) {
      const bp = Array.isArray(about.best_practices) ? about.best_practices.slice(0, 3) : [];
      const pitfalls = Array.isArray(about.pitfalls) ? about.pitfalls.slice(0, 2) : [];
      bp.forEach(item => meta.suggestions.push(`Boa prática: ${item}`));
      pitfalls.forEach(item => meta.suggestions.push(`Cuidado: ${item}`));
    }
    if (langObj) {
      const typing = String(langObj.typing || '').toLowerCase();
      const paradigms = (langObj.paradigms || []).map(p => String(p).toLowerCase());
      const runtime = String(langObj.runtime || '').toLowerCase();
      if (typing.includes('estática')) meta.suggestions.push('Aproveite tipos explícitos e análise estática do compilador.');
      if (typing.includes('dinâmica')) meta.suggestions.push('Valide entradas e cubra com testes para tipagem dinâmica.');
      if (paradigms.some(p => p.includes('funcional'))) meta.suggestions.push('Prefira funções puras e imutabilidade quando possível.');
      if (runtime.includes('browser') && /(alert|prompt|confirm)\s*\(/.test(code)) {
        meta.issues.push('Evite alert/prompt/confirm em produção; prefira componentes de UI acessíveis.');
      }
      if (runtime.includes('node') || runtime.includes('node.js')) {
        if (/\brequire\(\s*['"][^'"]+['"]\s*\)/.test(code) && /\bimport\s+/.test(code)) {
          meta.suggestions.push('Evite misturar require e import; unifique o sistema de módulos.');
        }
      }
    }
    return meta;
  }

  function uniq(arr) {
    return Array.from(new Set(arr));
  }

  function analyze(code, lang) {
    if (!supportedIds.has(lang)) {
      return { issues: [], suggestions: ['Linguagem fora do catálogo atual. Selecione uma linguagem disponível.'] };
    }
    function isLikelyCode(language, text) {
      const t = text.trim();
      if (!t) return false;
      const tokens = {
        javascript: /(function|const|let|=>|\{|\}|;|console\.|return|class)\b/,
        typescript: /(function|const|let|=>|:\s*\w+|interface|type|class)\b/,
        python: /(def\s+\w+\(|import\s+\w+|print\s*\(|:|class\s+\w+)/,
        java: /(class\s+\w+|public\s+static\s+void\s+main|System\.out)/,
        cpp: /(int\s+main\s*\(|#include|std::|cout|\{|\})/,
        c: /(int\s+main\s*\(|#include|printf\(|\{|\})/,
        go: /(package\s+\w+|func\s+main\s*\(|fmt\.|\{|\})/,
        rust: /(fn\s+main\s*\(|println!|let\s+|\{|\})/,
        csharp: /(class\s+\w+|static\s+void\s+Main|Console\.)/,
        kotlin: /(fun\s+main\s*\(|println\(|class\s+)/,
        swift: /(print\(|func\s+\w+\(|import\s+\w+)/,
        dart: /(void\s+main\s*\(|print\(|class\s+)/,
        ruby: /(def\s+\w+|puts\s+|class\s+)/,
        php: /(<\?php|echo\s+|function\s+\w+\()/,
        sql: /(select\s+|update\s+|insert\s+|delete\s+)/i,
        graphql: /(query|mutation|\{[^}]+\})/,
        bash: /(#!|echo\s+|\bfor\b|\bif\b|\bfi\b)/,
        powershell: /(Write-Host|Write-Output|Get-|Set-)/
      };
      const rx = tokens[language] || /\w{3,}/;
      return rx.test(t);
    }
    const base = commonAnalyze(code);
    const analyzer = registry[lang];
window.AI_CONFIG = {
  provider: 'gemini_direct',
  apiKey: 'SUA_NOVA_CHAVE_AQUI',
  model: 'gemini-1.5-flash', // Adicione esta linha
  prompt: `...`,
  dataJsPath: 'assets/data.js'
};window.AI_CONFIG = {
  provider: 'gemini_direct',
  apiKey: 'SUA_NOVA_CHAVE_AQUI',
  model: 'gemini-1.5-flash', // Adicione esta linha
  prompt: `...`,
  dataJsPath: 'assets/data.js'
};    if (!analyzer || !analyzer.analyze) return base;
    const res = analyzer.analyze(code, lang);
    const meta = metaGuidance(lang, code);
    let issues = uniq([...base.issues, ...(res.issues || []), ...(meta.issues || [])]);
    let suggestions = uniq([...base.suggestions, ...(res.suggestions || []), ...(meta.suggestions || [])]);
    if (issues.length === 0 && suggestions.length === 0 && !isLikelyCode(lang, code)) {
      issues = ['Conteúdo não parece código válido para a linguagem selecionada.'];
    }
    return { issues, suggestions };
  }

  function fix(code, lang) {
    if (!supportedIds.has(lang)) return code;
    let out = code.replace(/[ \t]+$/gm, '');
    if (!out.endsWith('\n')) out += '\n';
    const analyzer = registry[lang];
    if (analyzer && analyzer.fix) out = analyzer.fix(out);
    return out;
  }

  // JavaScript / TypeScript
  registerLanguage('javascript', {
    analyze(code, lang) {
      const issues = [];
      const suggestions = [];
      code.split(/\r?\n/).forEach((line, i) => {
        const t = line.trim();
        const isControl = /^(if|for|while|switch|function|class)\b/.test(t);
        const isBlockEnd = /[{}]$/.test(t);
        if (t.length && !isControl && !isBlockEnd && /[\w)\]]$/.test(t) && !/[;]$/.test(t)) {
          issues.push(`Linha ${i + 1}: possível falta de ponto e vírgula.`);
        }
        if (/\bvar\b/.test(t)) suggestions.push(`Linha ${i + 1}: prefira 'let' ou 'const' em vez de 'var'.`);
        if (/[^=]==[^=]/.test(t)) suggestions.push(`Linha ${i + 1}: considere usar '===' ao invés de '=='.`);
        if (/console\.log\(/.test(t)) suggestions.push(`Linha ${i + 1}: evite console.log em produção; use logger com níveis.`);
      });
      if (lang === 'javascript' || lang === 'typescript') {
        try { new Function(code); } catch (e) { issues.push(`Erro de sintaxe JavaScript: ${e.message}`); }
      }
      return { issues, suggestions };
    },
    fix(code) {
      return code
        .replace(/\bvar\b/g, 'let')
        .split(/\r?\n/).map(line => {
          const t = line.trim();
          const isControl = /^(if|for|while|switch|function|class)\b/.test(t);
          const isBlockEnd = /[{}]$/.test(t);
          if (t.length && !isControl && !isBlockEnd && /[\w)\]]$/.test(t) && !/[;]$/.test(t)) return line + ';';
          return line;
        }).join('\n');
    }
  });

  registerLanguage('typescript', {
    analyze(code) {
      const js = registry['javascript'].analyze(code);
      const suggestions = [...(js.suggestions || [])];
      if (!/:\s*\w+/.test(code) && /function\s+\w+\(/.test(code)) {
        suggestions.push('Considere tipar parâmetros e retorno (ex.: name: string): string');
      }
      if (/:\s*any\b/.test(code)) {
        suggestions.push('Evite o tipo any; prefira tipos explícitos ou genéricos.');
      }
      return { issues: js.issues, suggestions };
    },
    fix(code) {
      // Reutiliza correções JS; não força tipagens automaticamente
      return registry['javascript'].fix(code);
    }
  });

  // Python
  registerLanguage('python', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      code.split(/\r?\n/).forEach((line, i) => {
        const t = line.trim();
        if (/\t/.test(line)) issues.push(`Linha ${i + 1}: tabulações encontradas; use 4 espaços.`);
        if (/^(def|if|for|while|class)\b/.test(t) && !/:$/.test(t)) issues.push(`Linha ${i + 1}: provavelmente falta ':' no final.`);
        if (/^print\s+"/.test(t)) suggestions.push(`Linha ${i + 1}: use print("texto") em Python 3.`);
        if (/\+\s*\w+\s*\)/.test(t) && /print\s*\(/.test(t)) suggestions.push(`Linha ${i + 1}: prefira f-strings (ex.: print(f"Olá, {name}")) em vez de concatenação.`);
      });
      return { issues, suggestions };
    },
    fix(code) {
      return code
        .replace(/\t/g, '    ')
        .split(/\r?\n/).map(line => {
          const t = line.trim();
          if (/^(def|if|for|while|class)\b/.test(t) && !/:$/.test(t)) return line + ':';
          if (/^print\s+"/.test(t)) return line.replace(/^print\s+"(.*)"\s*$/, 'print("$1")');
          return line;
        }).join('\n');
    }
  });

  // Gemmi (biblioteca Python para mmCIF/PDB)
  registerLanguage('gemmi', {
    analyze(code) {
      const issues = [];
      const suggestions = [];

      const hasImport = /^\s*import\s+gemmi\b/m.test(code);
      if (!hasImport) {
        suggestions.push('Adicione "import gemmi" (ou try/except para ImportError).');
      }

      const usesCifRead = /gemmi\.cif\.read_file\(/.test(code);
      const usesReadStructure = /gemmi\.read_structure\(/.test(code);
      const mentionsCif = /\.(cif|mmcif)\b/.test(code);
      const mentionsPdb = /\.pdb\b/.test(code);

      // API incorreta por extensão
      if (usesReadStructure && mentionsCif) {
        issues.push('Use gemmi.cif.read_file para mmCIF; read_structure é para PDB.');
      }
      if (usesCifRead && mentionsPdb) {
        issues.push('Use gemmi.read_structure para PDB; cif.read_file é para mmCIF.');
      }

      // Orientação: sole_block após ler mmCIF
      if (usesCifRead && !/\.sole_block\s*\(/.test(code)) {
        suggestions.push('Após gemmi.cif.read_file, use doc.sole_block() para acessar o bloco.');
      }

      // Sugestões de robustez
      if (/open\s*\(.*\.(cif|mmcif|pdb)/.test(code) && !/gemmi\./.test(code)) {
        suggestions.push('Prefira as APIs do Gemmi (cif.read_file/read_structure) em vez de open().');
      }
      if (/gemmi\./.test(code) && !/try\s*:\s*\n\s*import\s+gemmi/.test(code) && !hasImport) {
        suggestions.push('Proteja a importação com try/except ImportError para mensagem clara.');
      }

      return { issues, suggestions };
    },
    fix(code) {
      let out = code;

      // Garantir import em modo robusto
      if (!/^\s*import\s+gemmi\b/m.test(out)) {
        out = 'try:\n    import gemmi\nexcept ImportError:\n    raise ImportError("Instale gemmi: pip install gemmi")\n' + out;
      }

      // Corrigir uso incorreto por extensão
      out = out.replace(
        /gemmi\.read_structure\(\s*(["'])[^"']*\.(?:cif|mmcif)\1\s*\)/g,
        'gemmi.cif.read_file($1)'
      );
      out = out.replace(
        /gemmi\.cif\.read_file\(\s*(["'])[^"']*\.pdb\1\s*\)/g,
        'gemmi.read_structure($1)'
      );

      // Inserir doc.sole_block() após leitura mmCIF, se não presente
      // Procura atribuições do tipo: doc = gemmi.cif.read_file("file.cif")
      out = out.replace(/^(\s*)([A-Za-z_]\w*)\s*=\s*gemmi\.cif\.read_file\([^\n]*\)\s*$/mg, (full, indent, varname) => {
        const hasSoleBlock = new RegExp(varname + "\\.sole_block\\(").test(out);
        return hasSoleBlock ? full : full + "\n" + indent + "block = " + varname + ".sole_block()";
      });

      return out;
    }
  });

  // Java
  registerLanguage('java', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (!/class\s+\w+/.test(code)) suggestions.push('Crie uma classe pública (ex.: public class Main).');
      if (!/public\s+static\s+void\s+main/.test(code)) suggestions.push('Adicione o método public static void main(String[] args).');
      code.split(/\r?\n/).forEach((line, i) => {
        const t = line.trim();
        if (t && !/[;{}]$/.test(t) && !/^\s*\//.test(t)) issues.push(`Linha ${i + 1}: possível falta de ponto e vírgula.`);
      });
      return { issues, suggestions };
    },
    fix(code) {
      let out = code;
      const hasClass = /class\s+\w+/.test(out);
      const hasMain = /public\s+static\s+void\s+main/.test(out);
      if (!hasClass || !hasMain) {
        const wrapped = out.split(/\r?\n/).map(l => '    ' + l).join('\n');
        out = `public class Main\n{\n  public static void main(String[] args)\n  {\n${wrapped}\n  }\n}\n`;
      } else {
        out = out.split(/\r?\n/).map(line => {
          const t = line.trim();
          if (t && !/[;{}]$/.test(t) && !/^\s*\//.test(t)) return line + ';';
          return line;
        }).join('\n');
      }
      return out;
    }
  });

  // C++
  registerLanguage('cpp', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (/cout\b/.test(code) && !/#include\s+<iostream>/.test(code)) issues.push('Inclua <iostream> para usar cout.');
      if (!/int\s+main\s*\(.*\)/.test(code)) suggestions.push('Adicione a função int main().');
      code.split(/\r?\n/).forEach((line, i) => {
        const t = line.trim();
        if (t && !/[;{}]$/.test(t) && !/^#/.test(t)) issues.push(`Linha ${i + 1}: possível falta de ponto e vírgula.`);
        if (/using\s+namespace\s+std\s*$/.test(t)) suggestions.push('Evite using namespace std em código de produção.');
      });
      return { issues, suggestions };
    },
    fix(code) {
      let out = code;
      if (/cout\b/.test(out) && !/#include\s+<iostream>/.test(out)) out = `#include <iostream>\n` + out;
      if (!/int\s+main\s*\(.*\)/.test(out)) {
        const wrapped = out.split(/\r?\n/).map(l => '    ' + l).join('\n');
        out = `#include <iostream>\nint main()\n{\n${wrapped}\n    return 0;\n}\n`;
      }
      out = out.split(/\r?\n/).map(line => {
        const t = line.trim();
        if (t && !/[;{}]$/.test(t) && !/^#/.test(t)) return line + ';';
        return line;
      }).join('\n');
      return out;
    }
  });

  // Go
  registerLanguage('go', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (!/package\s+\w+/.test(code)) suggestions.push('Adicione "package main" no topo.');
      if (!/func\s+main\s*\(\)/.test(code)) suggestions.push('Adicione a função func main().');
      if (/fmt\.Print/.test(code) && !/import\s*\(.*fmt.*\)|^import\s+"fmt"/m.test(code)) suggestions.push('Inclua import "fmt" para usar fmt.Println.');
      return { issues, suggestions };
    },
    fix(code) {
      let out = code;
      const needsFmt = /fmt\.Print/.test(out) && !/import\s*\(.*fmt.*\)|^import\s+"fmt"/m.test(out);
      const body = out.split(/\r?\n/).map(l => '    ' + l).join('\n');
      out = `package main\n\n${needsFmt ? 'import "fmt"\n\n' : ''}func main()\n{\n${body}\n}\n`;
      return out;
    }
  });

  // Rust
  registerLanguage('rust', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (!/fn\s+main\s*\(\)/.test(code)) suggestions.push('Adicione a função fn main().');
      if (/println!\s*\(/.test(code) && /;\s*$/.test(code.trim()) === false) suggestions.push('Finalize statements com ; quando necessário.');
      return { issues, suggestions };
    },
    fix(code) {
      let out = code;
      if (!/fn\s+main\s*\(\)/.test(out)) {
        const wrapped = out.split(/\r?\n/).map(l => '    ' + l).join('\n');
        out = `fn main()\n{\n${wrapped}\n}\n`;
      }
      return out;
    }
  });

  // C#
  registerLanguage('csharp', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (!/class\s+\w+/.test(code)) suggestions.push('Crie uma classe (ex.: class Program).');
      if (!/static\s+void\s+Main\s*\(/.test(code)) suggestions.push('Adicione static void Main().');
      if (!/using\s+System\s*;/.test(code)) suggestions.push('Inclua using System; para Console.WriteLine.');
      code.split(/\r?\n/).forEach((line, i) => {
        const t = line.trim();
        if (t && !/[;{}]$/.test(t) && !/^\s*\//.test(t)) issues.push(`Linha ${i + 1}: possível falta de ';'.`);
      });
      return { issues, suggestions };
    },
    fix(code) {
      let out = code;
      const hasClass = /class\s+\w+/.test(out);
      const hasMain = /static\s+void\s+Main\s*\(/.test(out);
      if (!/using\s+System\s*;/.test(out)) out = `using System;\n\n${out}`;
      if (!hasClass || !hasMain) {
        const wrapped = out.split(/\r?\n/).map(l => '    ' + l).join('\n');
        out = `class Program\n{\n  static void Main()\n  {\n${wrapped}\n  }\n}\n`;
      } else {
        out = out.split(/\r?\n/).map(line => {
          const t = line.trim();
          if (t && !/[;{}]$/.test(t) && !/^\s*\//.test(t)) return line + ';';
          return line;
        }).join('\n');
      }
      return out;
    }
  });

  // C
  registerLanguage('c', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (!/#include\s+<stdio.h>/.test(code)) suggestions.push('Inclua <stdio.h> para printf.');
      if (!/int\s+main\s*\(.*\)/.test(code)) suggestions.push('Adicione a função int main().');
      code.split(/\r?\n/).forEach((line, i) => {
        const t = line.trim();
        if (t && !/[;{}]$/.test(t) && !/^#/.test(t)) issues.push(`Linha ${i + 1}: possível falta de ';'.`);
      });
      return { issues, suggestions };
    },
    fix(code) {
      const body = code.split(/\r?\n/).map(l => '  ' + l).join('\n');
      let out = `#include <stdio.h>\n\nint main(){\n${body}\n  return 0;\n}\n`;
      return out;
    }
  });

  // Kotlin
  registerLanguage('kotlin', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (!/fun\s+main\s*\(\)/.test(code)) suggestions.push('Adicione fun main().');
      return { issues, suggestions };
    },
    fix(code) {
      const wrapped = code.split(/\r?\n/).map(l => '  ' + l).join('\n');
      return `fun main()\n{\n${wrapped}\n}\n`;
    }
  });

  // Swift
  registerLanguage('swift', {
    analyze() {
      return { issues: [], suggestions: [] };
    },
    fix(code) { return code; }
  });

  // Dart
  registerLanguage('dart', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (!/void\s+main\s*\(\)/.test(code)) suggestions.push('Adicione void main().');
      return { issues, suggestions };
    },
    fix(code) {
      const wrapped = code.split(/\r?\n/).map(l => '  ' + l).join('\n');
      return `void main()\n{\n${wrapped}\n}\n`;
    }
  });

  // Ruby
  registerLanguage('ruby', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (/;\s*$/.test(code.trim())) suggestions.push('Ruby não requer ; no final das linhas.');
      return { issues, suggestions };
    },
    fix(code) { return code.replace(/;\s*$/gm, ''); }
  });

  // PHP
  registerLanguage('php', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (!/<\?php/.test(code)) suggestions.push('Comece com <?php');
      if (/echo\s+.+[^;\s]$/m.test(code)) issues.push('Finalize statements com ;');
      return { issues, suggestions };
    },
    fix(code) {
      let out = code;
      if (!/<\?php/.test(out)) out = `<?php\n${out}`;
      out = out.replace(/(echo\s+.+)(?!;)(\s*)$/gm, '$1;$2');
      return out;
    }
  });

  // SQL
  registerLanguage('sql', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (!/select\s+/i.test(code)) suggestions.push('Use SELECT para consultas.');
      if (!/;\s*$/m.test(code)) suggestions.push('Finalize comandos com ; quando necessário.');
      return { issues, suggestions };
    },
    fix(code) {
      return /;\s*$/.test(code.trim()) ? code : code + ';\n';
    }
  });

  // GraphQL
  registerLanguage('graphql', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (!/\{[^}]+\}/.test(code)) suggestions.push('Inclua campos entre { } na operação.');
      return { issues, suggestions };
    },
    fix(code) { return code; }
  });

  // Bash
  registerLanguage('bash', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (!/^#!.*bash/m.test(code)) suggestions.push('Adicione shebang: #!/usr/bin/env bash');
      if (!/set\s+-euo\s+pipefail/.test(code)) suggestions.push('Considere set -euo pipefail');
      return { issues, suggestions };
    },
    fix(code) {
      let out = code;
      if (!/^#!.*bash/m.test(out)) out = `#!/usr/bin/env bash\n` + out;
      if (!/set\s+-euo\s+pipefail/.test(out)) out = out.replace(/^#!/m, m => `${m}\nset -euo pipefail\n`);
      return out;
    }
  });

  // PowerShell
  registerLanguage('powershell', {
    analyze(code) {
      const issues = [];
      const suggestions = [];
      if (!/Write-Host\s+|Write-Output\s+/.test(code)) suggestions.push('Use Write-Host ou Write-Output para saída.');
      return { issues, suggestions };
    },
    fix(code) { return code; }
  });

  function attachBotIfPresent() {
    if (!location.hash.startsWith('#/bot')) return;
    const editor = document.getElementById('bot-editor');
    const langSel = document.getElementById('bot-lang');
    const btnAnalyze = document.getElementById('bot-analyze');
    const btnFix = document.getElementById('bot-fix');
    const btnReset = document.getElementById('bot-reset');
    const btnClear = document.getElementById('bot-clear');
    const issuesEl = document.getElementById('bot-issues');
    const suggestionsEl = document.getElementById('bot-suggestions');
    const outputEl = document.getElementById('bot-output');
    const statusEl = document.getElementById('bot-status');
    const btnCopy = document.getElementById('bot-copy');
    if (!editor || !langSel || !btnAnalyze || !btnFix || !btnReset) return;

    function getSample(lang) {
      const fromData = (window.StudyDevData?.languages || []).find(l => l.id === lang);
      if (fromData && fromData.hello_world && fromData.hello_world.code) {
        return String(fromData.hello_world.code);
      }
      return samples[lang] || '';
    }

    function setSample() {
      const lang = langSel.value;
      editor.value = getSample(lang) || editor.value || '';
      issuesEl.innerHTML = '';
      suggestionsEl.innerHTML = '';
      outputEl.textContent = '';
      if (statusEl) statusEl.textContent = '';
    }

    if (!editor.value) setSample();

    langSel.onchange = setSample;

    // Config de API de chatbot (opcional)
    const AI_CONFIG = window.AI_CONFIG || { provider: 'none', endpoint: '', apiKey: '', prompt: '', dataJsPath: '' };
    // Descobre automaticamente um modelo disponível na sua chave para evitar 404
    async function pickAvailableModel(prefer) {
      const versions = ['v1', 'v1beta'];
      for (const v of versions) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/${v}/models?key=${AI_CONFIG.apiKey}`);
          if (!res.ok) continue;
          const data = await res.json();
          const names = (data.models || []).map(m => String(m.name || '')).filter(Boolean);
          const simple = names.map(n => n.replace(/^models\//, ''));
          const preferList = [prefer, `${prefer}-latest`, `${prefer}-001`, 'gemini-1.5-flash', 'gemini-1.5-flash-001', 'gemini-1.0-pro', 'gemini-pro'];
          for (const m of preferList) {
            if (simple.includes(m)) return { version: v, model: m };
          }
          if (simple.length) return { version: v, model: simple[0] };
        } catch (_) { /* ignora e tenta próxima versão */ }
      }
      return null;
    }
    async function aiAnalyze(language, code) {
      // Normaliza linguagem para IA (bibliotecas mapeadas para linguagem principal)
      const aiLang = language === 'gemmi' ? 'python' : language;
      function extractJsonFromText(text, originalCode) {
        // Tenta JSON direto
        try { return JSON.parse(text); } catch (_) {}
        // Tenta bloco ```json ... ```
        const fenceJson = text.match(/```\s*json\s*\n([\s\S]*?)```/i);
        if (fenceJson) {
          try { return JSON.parse(fenceJson[1]); } catch (_) {}
        }
        // Tenta bloco ``` ... ``` genérico
        const fenceAny = text.match(/```\s*\n([\s\S]*?)```/);
        if (fenceAny) {
          try { return JSON.parse(fenceAny[1]); } catch (_) {}
        }
        // Extração por chaves balanceadas a partir do primeiro '{'
        const i = text.indexOf('{');
        if (i >= 0) {
          let depth = 0;
          for (let j = i; j < text.length; j++) {
            const c = text[j];
            if (c === '{') depth++;
            else if (c === '}') {
              depth--;
              if (depth === 0) {
                const candidate = text.slice(i, j + 1);
                try { return JSON.parse(candidate); } catch (_) {}
              }
            }
          }
        }
        // Último recurso: construir objeto mínimo
        return { issues: [], suggestions: [], fixed_code: originalCode };
      }
      // Suporte direto à API Gemini (sem backend). Recomendado apenas para protótipos.
      if (AI_CONFIG && AI_CONFIG.provider === 'gemini_direct') {
        if (!AI_CONFIG.apiKey) throw new Error('Falta apiKey para Gemini.');
        // Descobre um modelo/versão disponível com a sua chave
        const picked = await pickAvailableModel(AI_CONFIG.model || 'gemini-1.5-flash');
        if (!picked) throw new Error('Nenhum modelo disponível para sua chave (404). Confira permissões da API.');
        const url = `https://generativelanguage.googleapis.com/${picked.version}/models/${picked.model}:generateContent?key=${AI_CONFIG.apiKey}`;
        const basePrompt = (AI_CONFIG.prompt && AI_CONFIG.prompt.trim().length)
          ? AI_CONFIG.prompt.trim()
          : [
              'Você é um analisador de código. Retorne APENAS JSON e nada além.',
              'Formato: {"issues":[],"suggestions":[],"fixed_code":"..."}.',
              'Regras:',
              '- "issues": liste apenas ERROS reais (sintaxe, API incorreta, bugs).',
              '- "suggestions": melhorias de estilo/robustez, mesmo sem erros.',
              '- "fixed_code": aplique correções somente se houver "issues"; caso contrário, devolva o código original.'
            ].join('\n');
        const prompt = `${basePrompt}\n\nLinguagem: ${aiLang}\nCódigo:\n${code}`;
        let res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] })
        });
        if (!res.ok) throw new Error(`Falha na API Gemini (${res.status})`);
        const data = await res.json();
        const parts = data?.candidates?.[0]?.content?.parts || [];
        const joined = parts.map(p => (typeof p.text === 'string' ? p.text : '')).join('\n');
        const parsed = extractJsonFromText(joined, code);
        return {
          issues: Array.isArray(parsed.issues) ? parsed.issues : [],
          suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
          fixed_code: typeof parsed.fixed_code === 'string' ? parsed.fixed_code : code,
        };
      }

      // Caminho padrão: backend custom que retorna o contrato esperado
      if (!AI_CONFIG || !AI_CONFIG.endpoint) {
        throw new Error('API de chatbot não configurada (window.AI_CONFIG.endpoint).');
      }
      const headers = { 'Content-Type': 'application/json' };
      if (AI_CONFIG.apiKey) headers['Authorization'] = `Bearer ${AI_CONFIG.apiKey}`;
      const res = await fetch(AI_CONFIG.endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({ provider: AI_CONFIG.provider, language: aiLang, code, task: 'analyze_fix', prompt: AI_CONFIG.prompt || '' })
      });
      if (!res.ok) throw new Error(`Falha na API (${res.status})`);
      const data = await res.json();
      return {
        issues: Array.isArray(data.issues) ? data.issues : [],
        suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
        fixed_code: typeof data.fixed_code === 'string' ? data.fixed_code : code,
      };
    }

    btnReset.onclick = setSample;
    btnAnalyze.onclick = async () => {
      const lang = langSel.value;
      btnAnalyze.disabled = true; btnFix.disabled = true; if (statusEl) { statusEl.textContent = '⏳ Analisando…'; statusEl.setAttribute('aria-busy', 'true'); }
      // Se configurado para analisar data.js e o editor estiver vazio com linguagem JavaScript, carrega automaticamente
      if (AI_CONFIG && AI_CONFIG.dataJsPath && lang === 'javascript' && (!editor.value || !editor.value.trim())) {
        try {
          if (statusEl) statusEl.textContent = '⏳ Carregando data.js…';
          const resp = await fetch(AI_CONFIG.dataJsPath, { headers: { 'Accept': 'text/javascript, text/plain' } });
          if (!resp.ok) throw new Error(`Falha ao carregar data.js (${resp.status})`);
          const text = await resp.text();
          editor.value = text;
          if (statusEl) statusEl.textContent = '⏳ Analisando data.js…';
        } catch (e) {
          if (statusEl) statusEl.textContent = `❌ Não foi possível carregar data.js: ${e.message}`;
        }
      }
      let issues = [], suggestions = [];
      try {
        if (AI_CONFIG && (AI_CONFIG.provider === 'gemini_direct' || (AI_CONFIG.endpoint && AI_CONFIG.provider !== 'none'))) {
          const ai = await aiAnalyze(lang, editor.value);
          issues = ai.issues || [];
          suggestions = ai.suggestions || [];
          // Fallback inteligente: se a IA retornar vazio, complementa com análise local
          if ((issues.length === 0 && suggestions.length === 0)) {
            const local = analyze(editor.value, lang);
            issues = local.issues || issues;
            suggestions = local.suggestions || suggestions;
          }
          // buffer de última análise para fix opcional
          attachBotIfPresent.__lastAI = ai;
        } else {
          const base = analyze(editor.value, lang);
          issues = base.issues || [];
          suggestions = base.suggestions || [];
          attachBotIfPresent.__lastAI = null;
        }
      } catch (err) {
        // Fallback para modo local quando houver erro de API
        try {
          const base = analyze(editor.value, lang);
          issues = base.issues || [];
          suggestions = base.suggestions || [];
          attachBotIfPresent.__lastAI = null;
          if (statusEl) statusEl.textContent = '🔍 Análise local aplicada.';
        } catch (e2) {
          if (statusEl) statusEl.textContent = `❌ Erro ao analisar: ${e2.message}.`;
        }
      }
      issuesEl.innerHTML = issues.length ? issues.map(i => `<li class="issue">${i}</li>`).join('') : '<li class="muted">Nenhum problema crítico encontrado.</li>';
      suggestionsEl.innerHTML = suggestions.length ? suggestions.map(s => `<li class="suggestion">${s}</li>`).join('') : '<li class="muted">Sem recomendações adicionais.</li>';
      if (statusEl) {
        const sugCount = suggestions.length;
        if (issues.length === 0 && sugCount === 0) {
          statusEl.textContent = '✅ Código está correto e sem recomendações adicionais.';
        } else if (issues.length === 0 && sugCount > 0) {
          statusEl.textContent = `✅ Código está correto, com ${sugCount} recomendação(ões) de melhoria.`;
        } else {
          statusEl.textContent = `⚠️ Código apresenta ${issues.length} problema(s) e ${sugCount} recomendação(ões).`;
        }
        statusEl.setAttribute('aria-busy', 'false');
      }
      btnAnalyze.disabled = false; btnFix.disabled = false;
    };
    btnFix.onclick = async () => {
      const lang = langSel.value;
      btnFix.disabled = true; btnAnalyze.disabled = true;
      if (statusEl) { statusEl.textContent = '⏳ Verificando problemas…'; statusEl.setAttribute('aria-busy', 'true'); }

      // Verifica problemas localmente para decidir se deve oferecer correção
      let issues = [];
      try {
        const base = analyze(editor.value, lang);
        issues = base.issues || [];
      } catch (e) {
        if (statusEl) statusEl.textContent = `❌ Erro ao analisar: ${e.message}.`;
        statusEl && statusEl.setAttribute('aria-busy', 'false');
        btnFix.disabled = false; btnAnalyze.disabled = false;
        return;
      }

      if (issues.length === 0) {
        if (statusEl) statusEl.textContent = '✅ Código está correto. Nenhuma correção aplicada.';
        outputEl.textContent = editor.value;
        statusEl.setAttribute('aria-busy', 'false');
        btnFix.disabled = false; btnAnalyze.disabled = false;
        return;
      }

      const proceed = window.confirm('Foram encontrados problemas. Deseja ver o código corrigido pela IA?');
      if (!proceed) {
        if (statusEl) { statusEl.textContent = 'ℹ️ Correção não aplicada. Revise os problemas listados acima.'; statusEl.setAttribute('aria-busy', 'false'); }
        btnFix.disabled = false; btnAnalyze.disabled = false;
        return;
      }

      // Requer IA ativa para gerar código corrigido
      if (!AI_CONFIG || AI_CONFIG.provider === 'none') {
        if (statusEl) { statusEl.textContent = '⚠️ Correção via IA indisponível. Ative a IA nas configurações.'; statusEl.setAttribute('aria-busy', 'false'); }
        btnFix.disabled = false; btnAnalyze.disabled = false;
        return;
      }

      try {
        if (statusEl) statusEl.textContent = '⏳ Gerando correção via IA…';
        const ai = await aiAnalyze(lang, editor.value);
        const fixed = (typeof ai.fixed_code === 'string') ? ai.fixed_code : editor.value;
        const same = fixed.trim() === editor.value.trim();
        if (same) {
          const localFixed = StudyBot.fix(editor.value, lang);
          const localSame = localFixed.trim() === editor.value.trim();
          outputEl.textContent = localSame ? editor.value : localFixed;
          if (statusEl) {
            statusEl.textContent = localSame
              ? 'ℹ️ IA não gerou mudanças. Mantido original.'
              : '🛠️ IA não gerou mudanças. Apliquei correções locais básicas.';
            statusEl.setAttribute('aria-busy', 'false');
          }
        } else {
          outputEl.textContent = fixed;
          if (statusEl) { statusEl.textContent = `🛠️ Correções propostas pela IA em ${issues.length} problema(s). Revise o resultado.`; statusEl.setAttribute('aria-busy', 'false'); }
        }
      } catch (err) {
        // Fallback: correções locais quando a IA falhar
        const localFixed = StudyBot.fix(editor.value, lang);
        const localSame = localFixed.trim() === editor.value.trim();
        outputEl.textContent = localSame ? editor.value : localFixed;
        if (statusEl) {
          statusEl.textContent = localSame
            ? `❌ Falha na IA: ${err.message}. Correção não aplicada.`
            : `⚠️ Falha na IA: ${err.message}. Apliquei correções locais básicas.`;
          statusEl.setAttribute('aria-busy', 'false');
        }
      }
      btnFix.disabled = false; btnAnalyze.disabled = false;
    };

    if (btnCopy) {
      btnCopy.onclick = async () => {
        const text = outputEl.textContent || editor.value || '';
        try {
          await navigator.clipboard.writeText(text);
          if (statusEl) statusEl.textContent = '📋 Código copiado para a área de transferência.';
        } catch (e) {
          const el = document.createElement('textarea');
          el.value = text;
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
          if (statusEl) statusEl.textContent = '📋 Código copiado (fallback).';
        }
      };
    }
    if (btnClear) {
      btnClear.onclick = () => {
        editor.value = '';
        issuesEl.innerHTML = '';
        suggestionsEl.innerHTML = '';
        outputEl.textContent = '';
        if (statusEl) statusEl.textContent = '🧹 Editor limpo.';
      };
    }
  }

  return { analyze, fix, attachBotIfPresent, registerLanguage };
})();

window.addEventListener('DOMContentLoaded', StudyBot.attachBotIfPresent);
window.addEventListener('hashchange', StudyBot.attachBotIfPresent);

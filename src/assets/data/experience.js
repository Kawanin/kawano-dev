// Cases por empresa. Sem nomes de pessoas nem valores monetários.
// "big" = número de destaque do case (só entra o que é verificável).
// RASCUNHO: textos de problema/resultado a polir com o Luciano.
export const jobs = [
  {
    id: 'toyama',
    company: 'JCE Brazil SA · Toyama do Brasil',
    role: { pt: 'Analista de Inteligência de Mercado', en: 'Market Intelligence Analyst' },
    period: { pt: 'ago/2026 — presente', en: 'Aug 2026 — present' },
    current: true,
    summary: {
      pt: 'Inteligência comercial para a força de vendas: metas, gamificação, dashboards gerenciais e automação de indicadores.',
      en: 'Commercial intelligence for the sales force: targets, gamification, management dashboards and KPI automation.'
    },
    cases: [
      {
        id: 'campanha',
        title: { pt: 'Campanha Anual de Vendas', en: 'Annual Sales Campaign' },
        tags: ['Power BI', 'DAX', 'SQL Server', 'Power Automate', 'n8n'],
        big: { value: '50/30/20', label: { pt: 'pesos da pontuação', en: 'scoring weights' } },
        problem: {
          pt: 'A campanha de incentivo dos representantes não tinha um critério único: crescimento de clientes-foco, cota de vendas e mix de produtos ficavam em visões separadas, sem um ranking que todos entendessem.',
          en: 'The reps\' incentive campaign had no single criterion: focus-client growth, sales quota and product mix lived in separate views, with no ranking everyone understood.'
        },
        solution: {
          pt: 'Pontuação mensal de 0 a 10 com três critérios ponderados (50% clientes-foco, 30% cota, 20% mix), calculada em DAX sobre o SQL Server, com ranking mensal e anual, pódio Top 3, drilldown por representante e RLS para cada um ver só o seu. A pontuação foi replicada em n8n para os envios e, no Power Automate, para o e-mail mensal.',
          en: 'A monthly 0-10 score from three weighted criteria (50% focus clients, 30% quota, 20% mix), computed in DAX over SQL Server, with monthly and annual rankings, a Top 3 podium, per-rep drilldown and RLS so each rep sees only their own. The scoring was mirrored in n8n for sends and in Power Automate for the monthly email.'
        },
        result: {
          pt: 'Uma régua única e transparente de desempenho, com ranking atualizado todo mês e comunicado automaticamente a cada representante.',
          en: 'One transparent performance yardstick, with the ranking refreshed every month and automatically communicated to each rep.'
        }
      },
      {
        id: 'metas',
        title: { pt: 'Planejamento Anual de Metas', en: 'Annual Goal Planning' },
        tags: ['Excel', 'SQL', 'HTML'],
        big: { value: '35', label: { pt: 'linhas de produto', en: 'product lines' } },
        problem: {
          pt: 'A empresa não tinha um sistema formal de metas: distribuir o orçamento por linha, representante e vendedor interno dependia de critérios soltos, difíceis de auditar.',
          en: 'The company had no formal goal-setting system: spreading the budget across lines, reps and inside sales relied on loose criteria that were hard to audit.'
        },
        solution: {
          pt: 'Cascata de metas do orçamento geral para as 35 linhas, com regras de diluição de estoque, distribuição por participação histórica (50% últimos 12 meses, 50% últimos 3) e consolidação até os supervisores. Planilha detalhada, planilha simples para a Controladoria e protótipo de dashboard em HTML.',
          en: 'A goal cascade from the overall budget to 35 product lines, with stock-dilution rules, distribution by historical share (50% last 12 months, 50% last 3) and roll-up to supervisors. A detailed workbook, a flat file for Controlling and an HTML dashboard prototype.'
        },
        result: {
          pt: 'Um processo de metas estruturado e auditável, com saídas prontas para a gestão comercial e para a Controladoria.',
          en: 'A structured, auditable goal process with outputs ready for sales management and Controlling.'
        }
      },
      {
        id: 'gerencial',
        title: { pt: 'Dashboard Gerencial', en: 'Management Dashboard' },
        tags: ['Power BI', 'DAX', 'SQL Server', 'SSMS'],
        big: { value: 'CY × LY', label: { pt: 'comparativo anual', en: 'year-over-year' } },
        problem: {
          pt: 'Diretores, gerentes, supervisores e representantes precisavam acompanhar meta, faturado, apto e carteira, e a diretoria sempre compara o mês com o mesmo mês do ano anterior.',
          en: 'Directors, managers, supervisors and reps needed to track target, billed, approved and pipeline, and leadership always compares the month with the same month last year.'
        },
        solution: {
          pt: 'Dashboard em Power BI com HTML sobre o SQL Server (consultas montadas no SSMS): meta do mês contra faturado, apto e carteira, CY × LY sempre visível, visão de equipe em cinco níveis e RLS por perfil. As regras de comissão (líquido ou semibruto) definem o realizado de cada representante.',
          en: 'A Power BI + HTML dashboard on SQL Server (queries built in SSMS): monthly target vs. billed, approved and pipeline, CY × LY always visible, a five-level team view and role-based RLS. Commission rules (net or semi-gross) define each rep\'s actuals.'
        },
        result: {
          pt: 'Uma visão única por nível de acesso, em evolução com a diretoria para deixar os números cada vez mais claros.',
          en: 'A single view per access level, evolving with leadership to make the numbers ever clearer.'
        }
      },
      {
        id: 'clientes',
        title: { pt: 'Análise de Mercado: inteligência de clientes', en: 'Market analysis: customer intelligence' },
        tags: ['Power BI', 'DAX', 'SQL Server', 'HTML'],
        big: { value: '12', label: { pt: 'blocos de análise', en: 'analysis blocks' } },
        problem: {
          pt: 'Entender o comportamento da carteira (quem compra, quem parou, quanto ainda dá para vender) exigia cruzar várias fontes na mão.',
          en: 'Understanding the customer base (who buys, who stopped, how much more could be sold) meant manually crossing several sources.'
        },
        solution: {
          pt: 'Dashboard multipágina em Power BI (.pbip) com 12 blocos: cobertura, inatividade com régua de 60/90/180/365 dias, ativação por representante, mix e whitespace, share of wallet e potencial contra realizado. Modelo por CNPJ, com crédito disponível por cliente.',
          en: 'A multi-page Power BI (.pbip) dashboard with 12 blocks: coverage, inactivity with a 60/90/180/365-day ladder, activation per rep, mix and whitespace, share of wallet and potential vs. actual. CNPJ-level model with available credit per customer.'
        },
        result: {
          pt: 'Uma ficha de comportamento por cliente e por representante, com os mesmos números em todas as páginas.',
          en: 'A behavior profile per customer and per rep, with the same numbers on every page.'
        }
      },
      {
        id: 'html-pbi',
        title: { pt: 'Dashboards HTML dentro do Power BI', en: 'HTML dashboards inside Power BI' },
        tags: ['Power BI', 'DAX', 'HTML', 'JavaScript'],
        big: { value: '32.767', label: { pt: 'caracteres: o limite a contornar', en: 'characters: the limit to work around' } },
        problem: {
          pt: 'Os visuais nativos não davam o acabamento de produto (estilo SaaS), e um único HTML para a página inteira estourava o limite de caracteres da medida e quebrava o JSON.',
          en: 'Native visuals lacked a product-grade (SaaS-style) finish, and a single HTML for the whole page blew past the measure\'s character limit and broke the JSON.'
        },
        solution: {
          pt: 'Um HTML Content por widget, cada um com medida própria; dados via tags script text/plain lidas com JSON.parse em try/catch; separadores do Unicode privado em vez de caracteres de controle; alturas fixas em pixels; e validação com Node antes de entregar.',
          en: 'One HTML Content per widget, each with its own measure; data passed via script text/plain tags read with JSON.parse in try/catch; private-use Unicode separators instead of control characters; fixed pixel heights; and Node validation before delivery.'
        },
        result: {
          pt: 'Padrões reutilizáveis de DAX e HTML que deixaram os dashboards estáveis e com cara de produto.',
          en: 'Reusable DAX and HTML patterns that made the dashboards stable and product-like.'
        }
      },
      {
        id: 'intranet',
        title: { pt: 'Dashboards Intranet (Python + HTML)', en: 'Intranet Dashboards (Python + HTML)' },
        tags: ['Python', 'HTML', 'JavaScript', 'SQL'],
        big: { value: 'Power BI → Web', label: { pt: 'migração de stack', en: 'stack migration' } },
        problem: {
          pt: 'Manter todos os dashboards de BI da companhia no Power BI limitava o acesso e o controle sobre lógica e visual.',
          en: 'Keeping all the company\'s BI dashboards in Power BI limited access and control over logic and visuals.'
        },
        solution: {
          pt: 'Mega-dashboard em Python, HTML, CSS e JS, com lógica e métricas feitas em código, publicado na intranet. Começou pelo módulo de Planejamento de Metas, o mais maduro em regra de negócio, com a identidade visual da marca.',
          en: 'A mega-dashboard in Python, HTML, CSS and JS with logic and metrics in code, published on the intranet. It started with the Goal Planning module, the most mature in business rules, using the brand identity.'
        },
        result: {
          pt: 'Primeiro módulo entregue, com o portfólio de BI da companhia sendo trazido para a nova stack aos poucos.',
          en: 'First module delivered, with the company\'s BI portfolio being brought to the new stack step by step.'
        }
      },
      {
        id: 'automacao-toyama',
        title: { pt: 'Envios automáticos aos representantes', en: 'Automated sends to reps' },
        tags: ['n8n', 'Power Automate', 'Power BI', 'SQL Server'],
        big: { value: 'Diário + mensal', label: { pt: 'comunicação automática', en: 'automatic communication' } },
        problem: {
          pt: 'Performance diária, ranking mensal e explicação dos critérios chegavam aos representantes de forma manual.',
          en: 'Daily performance, the monthly ranking and the criteria explanation reached reps manually.'
        },
        solution: {
          pt: 'Fluxos no n8n e no Power Automate que enviam e-mails com a identidade visual da marca: performance diária, pontuação e pódio do mês, e análise individual (clientes em crescimento, em declínio e prestes a ficar inativos). O mapeamento representante ↔ e-mail alimenta também o RLS.',
          en: 'n8n and Power Automate flows that send branded emails: daily performance, the month\'s score and podium, and an individual analysis (growing, declining and about-to-go-inactive customers). The rep ↔ email mapping also feeds RLS.'
        },
        result: {
          pt: 'Comunicação pontual e padronizada, sem depender de alguém lembrar de enviar.',
          en: 'Timely, standardized communication without anyone having to remember to send it.'
        }
      }
    ]
  },
  {
    id: 'senff',
    company: 'Senff',
    role: { pt: 'Analista de Dados Pleno', en: 'Mid-level Data Analyst' },
    period: { pt: '2025 — 2026', en: '2025 — 2026' },
    current: false,
    summary: {
      pt: 'BI executivo e operacional, ETL com n8n/Python/SQL e ferramentas de auditoria em Flutter no setor financeiro.',
      en: 'Executive and operational BI, ETL with n8n/Python/SQL and Flutter audit tools in the financial sector.'
    },
    cases: [
      {
        id: 'fidc',
        title: { pt: 'Conciliação do FIDC', en: 'FIDC reconciliation' },
        tags: ['SQL', 'Flutter', 'Python'],
        big: { value: 'TOTVS × Sinqia', label: { pt: 'dois sistemas conciliados', en: 'two systems reconciled' } },
        problem: {
          pt: 'Os valores diários do FIDC divergiam entre o ERP (TOTVS) e o core (Sinqia), e a checagem era manual e sujeita a falsos positivos.',
          en: 'Daily FIDC amounts diverged between the ERP (TOTVS) and the core (Sinqia), and checking was manual and prone to false positives.'
        },
        solution: {
          pt: 'Conciliação massiva entre os dois sistemas e uma ferramenta interna em Flutter, ligada direto aos bancos, para auditar filas de migração e valores diários.',
          en: 'A mass reconciliation across both systems plus an internal Flutter tool wired to the databases to audit migration queues and daily values.'
        },
        result: {
          pt: 'Menos falsos positivos e integridade transacional verificável em tempo real.',
          en: 'Fewer false positives and transactional integrity verifiable in real time.'
        }
      },
      {
        id: 'cessao',
        title: { pt: 'Termos de cessão automatizados', en: 'Automated assignment terms' },
        tags: ['n8n', 'Python', 'SQL'],
        big: { value: '10h+', label: { pt: 'poupadas por semana', en: 'saved per week' } },
        problem: {
          pt: 'Gerar e acompanhar os termos de cessão do FIDC e os relatórios contábeis consumia horas de trabalho manual toda semana.',
          en: 'Producing and tracking FIDC assignment terms and accounting reports ate hours of manual work every week.'
        },
        solution: {
          pt: 'Pipelines de ETL em n8n, Python e SQL integrados à API do WebDox, de ponta a ponta, incluindo o saneamento de base (remoção de negativações indevidas).',
          en: 'ETL pipelines in n8n, Python and SQL integrated with the WebDox API end to end, including data cleanup (removing improper negative-credit flags).'
        },
        result: {
          pt: 'Mais de 10 horas semanais poupadas e um processo repetível.',
          en: 'More than 10 hours a week saved and a repeatable process.'
        }
      },
      {
        id: 'executivo',
        title: { pt: 'Relatório semanal executivo com IA', en: 'AI-assisted weekly executive report' },
        tags: ['n8n', 'Python'],
        big: { value: 'Semanal', label: { pt: 'sem intervenção manual', en: 'no manual step' } },
        problem: {
          pt: 'A diretoria dependia de um relatório montado à mão para acompanhar a semana.',
          en: 'Leadership relied on a hand-assembled report to follow the week.'
        },
        solution: {
          pt: 'Fluxo no n8n que consolida os indicadores e usa IA para redigir o resumo executivo.',
          en: 'An n8n flow that consolidates the indicators and uses AI to draft the executive summary.'
        },
        result: {
          pt: 'Resumo executivo pontual toda semana, sem trabalho manual.',
          en: 'A timely executive summary every week with no manual work.'
        }
      },
      {
        id: 'paineis',
        title: { pt: 'Portfólio de painéis Power BI', en: 'Power BI dashboard portfolio' },
        tags: ['Power BI', 'DAX', 'SQL'],
        big: { value: '5', label: { pt: 'setores atendidos', en: 'departments served' } },
        problem: {
          pt: 'Seguros, Tesouraria, Contabilidade, KYC e a viabilidade de terminais POS tomavam decisão sem visão em tempo real.',
          en: 'Insurance, Treasury, Accounting, KYC and POS-terminal viability made decisions without a real-time view.'
        },
        solution: {
          pt: 'Painéis executivos e operacionais em Power BI, com HTML Content onde o visual padrão não bastava.',
          en: 'Executive and operational Power BI dashboards, using HTML Content where the default visuals fell short.'
        },
        result: {
          pt: 'Visibilidade em tempo real para as cinco áreas.',
          en: 'Real-time visibility for all five areas.'
        }
      },
      {
        id: 'dco',
        title: { pt: 'Caça ao erro no DCO', en: 'Hunting the DCO bug' },
        tags: ['SQL'],
        big: { value: 'NULL', label: { pt: 'numcartao → cod_clifatura', en: 'numcartao → cod_clifatura' } },
        problem: {
          pt: 'Um relatório trazia registros sem número de cartão (numcartao NULL), quebrando a leitura.',
          en: 'A report returned records with no card number (numcartao NULL), breaking the read.'
        },
        solution: {
          pt: 'Investigação nas chaves de relacionamento até identificar o vínculo correto via cod_clifatura.',
          en: 'Traced the relationship keys until the right link through cod_clifatura was found.'
        },
        result: {
          pt: 'Registros recuperados e relatório confiável novamente.',
          en: 'Records recovered and the report trustworthy again.'
        }
      }
    ]
  }
]

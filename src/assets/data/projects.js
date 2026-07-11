export const projects = [
    {
        slug: 'inadimplencia-renegociacao',
        tool: 'powerbi',
        tag: { pt: 'Power BI · Financeiro', en: 'Power BI · Finance' },
        title: {
            pt: 'Inadimplência oculta em renegociações',
            en: 'Hidden default risk in loan renegotiations'
        },
        hook: {
            pt: 'Risco de crédito mascarado por renegociações sucessivas de contrato.',
            en: 'Credit risk masked by successive contract renegotiations.'
        },
        context: {
            pt: 'Uma financeira notou um aumento de 22% na inadimplência de empréstimos consignados em 3 meses, mas não conseguia identificar o perfil de risco por trás disso.',
            en: 'A lender saw a 22% rise in payroll-loan default over 3 months but couldn\'t pinpoint the risk profile behind it.'
        },
        investigation: {
            pt: 'Analisei a base cruzando renda, idade, tempo de contrato e histórico de pagamento, segmentando por faixa etária e produto.',
            en: 'I cross-analyzed income, age, contract duration and payment history, segmenting by age bracket and product.'
        },
        discovery: {
            pt: 'A inadimplência estava concentrada em contratos renegociados mais de duas vezes — sinal de que a política de renegociação mascarava o risco real.',
            en: 'Default was concentrated in contracts renegotiated more than twice — a sign the renegotiation policy was masking real risk.'
        },
        solution: {
            pt: 'Dashboard de monitoramento de carteira com alertas visuais por faixa de risco.',
            en: 'Portfolio monitoring dashboard with visual alerts by risk tier.'
        },
        result: {
            pt: 'Identificação de contratos problemáticos antes da 3ª renegociação.',
            en: 'Problem contracts flagged before the 3rd renegotiation.'
        },
        stack: ['DAX', 'Power Query', 'SQL']
    },
    {
        slug: 'frete-ticket-medio',
        tool: 'powerbi',
        tag: { pt: 'Power BI · E-commerce', en: 'Power BI · E-commerce' },
        title: {
            pt: 'Frete consumindo o ticket médio',
            en: 'Shipping costs eating into average order value'
        },
        hook: {
            pt: 'Queda de ticket médio explicada por peso desproporcional do frete numa região.',
            en: 'Falling average order value traced to disproportionate shipping cost in one region.'
        },
        context: {
            pt: 'Uma varejista online percebeu queda de 12% no ticket médio mesmo com volume de pedidos estável.',
            en: 'An online retailer saw a 12% drop in average order value despite stable order volume.'
        },
        investigation: {
            pt: 'Cruzei categoria, região e forma de pagamento em busca de padrões.',
            en: 'I cross-referenced category, region and payment method looking for patterns.'
        },
        discovery: {
            pt: 'A queda vinha de um único estado, onde o frete consumia fatia desproporcional do valor do pedido.',
            en: 'The drop came from a single state, where shipping ate a disproportionate share of order value.'
        },
        solution: {
            pt: 'Dashboard de rentabilidade por região expondo o peso do frete no ticket.',
            en: 'Profitability-by-region dashboard exposing shipping\'s weight on order value.'
        },
        result: {
            pt: 'Simulações de política de frete grátis por faixa de valor.',
            en: 'Free-shipping threshold policy simulations enabled.'
        },
        stack: ['DAX', 'Power Query', 'Olist Dataset']
    },
    {
        slug: 'conciliacao-automatica',
        tool: 'n8n',
        tag: { pt: 'n8n · Financeiro', en: 'n8n · Finance' },
        title: {
            pt: 'Conciliação automática entre sistemas',
            en: 'Automated reconciliation between systems'
        },
        hook: {
            pt: 'De 1h de checagem manual para um alerta automático de divergências reais.',
            en: 'From 1h of manual checking to an automatic alert for genuine discrepancies.'
        },
        context: {
            pt: 'Um time financeiro fechava a conciliação de carteira manualmente todo dia, gastando cerca de 1h comparando dois sistemas.',
            en: 'A finance team manually reconciled portfolio data every day, spending about 1h comparing two systems.'
        },
        investigation: {
            pt: 'Identifiquei que a maioria das divergências vinha de defasagem de datas entre sistemas (D-1, D-2), não de erros reais.',
            en: 'I found most discrepancies came from date lag between systems (D-1, D-2), not real errors.'
        },
        discovery: {
            pt: 'Divergências genuínas eram raras — o processo manual gastava tempo em falsos positivos.',
            en: 'Genuine discrepancies were rare — the manual process wasted time on false positives.'
        },
        solution: {
            pt: 'Workflow n8n que roda diariamente, compara as bases e só alerta divergências genuínas.',
            en: 'Daily n8n workflow that compares datasets and only alerts on genuine discrepancies.'
        },
        result: {
            pt: 'Tempo de conciliação reduzido de 1h para uma checagem de 5 minutos.',
            en: 'Reconciliation time cut from 1h to a 5-minute check.'
        },
        stack: ['n8n', 'Google Sheets', 'Automação']
    },
    {
        slug: 'lembretes-pos-consulta',
        tool: 'n8n',
        tag: { pt: 'n8n · Saúde', en: 'n8n · Healthcare' },
        title: {
            pt: 'Lembretes pós-consulta automatizados',
            en: 'Automated post-appointment reminders'
        },
        hook: {
            pt: 'Funil de retenção automático na janela crítica de retorno do paciente.',
            en: 'Automatic retention funnel in the patient\'s critical return window.'
        },
        context: {
            pt: 'Uma clínica pequena perdia pacientes por falta de acompanhamento pós-consulta.',
            en: 'A small clinic was losing patients due to lack of post-appointment follow-up.'
        },
        investigation: {
            pt: 'A maior perda acontecia entre 30 e 45 dias após a consulta, quando o paciente deveria voltar.',
            en: 'Most loss happened 30–45 days after the visit, exactly when the patient should return.'
        },
        discovery: {
            pt: 'O problema não era clínico, era de processo — ninguém entrava em contato nessa janela.',
            en: 'The problem wasn\'t clinical, it was process — nobody reached out in that window.'
        },
        solution: {
            pt: 'Automação que agenda lembretes por WhatsApp/e-mail nesse intervalo, integrando calendário e CRM.',
            en: 'Automation that schedules WhatsApp/email reminders in that window, integrating calendar and CRM.'
        },
        result: {
            pt: 'Processo manual e esquecido virou funil automático de retenção.',
            en: 'A forgotten manual process became an automatic retention funnel.'
        },
        stack: ['n8n', 'Google Calendar', 'Twilio']
    },
    {
        slug: 'ocupacao-hospitalar',
        tool: 'tableau',
        tag: { pt: 'Tableau · Saúde', en: 'Tableau · Healthcare' },
        title: {
            pt: 'Prevendo picos de superlotação',
            en: 'Predicting overcrowding peaks'
        },
        hook: {
            pt: 'Padrão previsível de ocupação do PS por dia da semana e turno.',
            en: 'A predictable ER occupancy pattern by weekday and shift.'
        },
        context: {
            pt: 'Um hospital enfrentava picos de superlotação no pronto-socorro sem conseguir prevê-los.',
            en: 'A hospital faced ER overcrowding peaks without being able to predict them.'
        },
        investigation: {
            pt: 'Analisei admissões por dia da semana, horário e tipo de ocorrência.',
            en: 'I analyzed admissions by weekday, time and occurrence type.'
        },
        discovery: {
            pt: '60% dos picos se concentravam em janelas específicas — segundas à noite e pós-feriados.',
            en: '60% of peaks clustered in specific windows — Monday nights and post-holidays.'
        },
        solution: {
            pt: 'Painel que projeta ocupação esperada por turno.',
            en: 'Dashboard projecting expected occupancy by shift.'
        },
        result: {
            pt: 'Gestão reforça escala preventivamente ao invés de reagir à crise.',
            en: 'Management reinforces staffing preventively instead of reacting to a crisis.'
        },
        stack: ['Tableau', 'Dataset público']
    },
    {
        slug: 'orcamento-tempo-real',
        tool: 'looker',
        tag: { pt: 'Looker · Financeiro', en: 'Looker · Finance' },
        title: {
            pt: 'Orçamento departamental em tempo real',
            en: 'Real-time departmental budgeting'
        },
        hook: {
            pt: 'Visibilidade self-service de estouro de orçamento por centro de custo.',
            en: 'Self-service visibility into budget overruns by cost center.'
        },
        context: {
            pt: 'Uma empresa média só descobria estouro de orçamento no fechamento do mês.',
            en: 'A mid-size company only discovered budget overruns at month-end close.'
        },
        investigation: {
            pt: 'Modelei despesas por centro de custo em busca de concentração de estouros.',
            en: 'I modeled expenses by cost center looking for where overruns concentrated.'
        },
        discovery: {
            pt: '3 departamentos concentravam 70% dos estouros, sempre nas mesmas categorias.',
            en: '3 departments accounted for 70% of overruns, always in the same categories.'
        },
        solution: {
            pt: 'Modelo LookML com exploração self-service por gestor.',
            en: 'LookML model with self-service exploration per manager.'
        },
        result: {
            pt: 'Acompanhamento de orçamento em tempo real, não mais mensal.',
            en: 'Real-time budget tracking, no longer monthly.'
        },
        stack: ['LookML', 'Looker']
    },
    {
        slug: 'datawarehouse-multicanal',
        tool: 'snowflake',
        tag: { pt: 'Snowflake · Varejo', en: 'Snowflake · Retail' },
        title: {
            pt: 'Unificando vendas multicanal',
            en: 'Unifying multichannel sales'
        },
        hook: {
            pt: 'Modelo dimensional unindo e-commerce, loja física e marketplace.',
            en: 'Dimensional model unifying e-commerce, physical store and marketplace.'
        },
        context: {
            pt: 'Uma rede de varejo tinha dados espalhados entre canais, cada um em estrutura diferente.',
            en: 'A retail chain had data scattered across channels, each in a different structure.'
        },
        investigation: {
            pt: 'Desenhei um modelo de dados em camadas (staging → transformação → analítica).',
            en: 'I designed a layered data model (staging → transformation → analytics).'
        },
        discovery: {
            pt: 'Consolidação manual levava dias por falta de modelo unificado.',
            en: 'Manual consolidation took days due to the lack of a unified model.'
        },
        solution: {
            pt: 'Modelo dimensional no Snowflake permitindo consultas cross-canal em segundos.',
            en: 'Dimensional model in Snowflake enabling cross-channel queries in seconds.'
        },
        result: {
            pt: 'Análises que levavam dias passaram a rodar sob demanda.',
            en: 'Analyses that took days now run on demand.'
        },
        stack: ['SQL', 'Data Warehouse', 'Olist Dataset']
    },
    {
        slug: 'deteccao-fraude',
        tool: 'aws',
        tag: { pt: 'AWS · Financeiro', en: 'AWS · Finance' },
        title: {
            pt: 'Detecção de fraude quase em tempo real',
            en: 'Near real-time fraud detection'
        },
        hook: {
            pt: 'Arquitetura de ingestão que reduz a janela de detecção de 24h para minutos.',
            en: 'An ingestion architecture that cuts detection time from 24h to minutes.'
        },
        context: {
            pt: 'Uma fintech processava transações para detecção de fraude em lotes noturnos.',
            en: 'A fintech processed fraud-detection transactions in overnight batches.'
        },
        investigation: {
            pt: 'Uma fraude só era identificada até 24h depois de acontecer.',
            en: 'Fraud was only identified up to 24h after it happened.'
        },
        discovery: {
            pt: 'O gargalo era arquitetural, não analítico — faltava ingestão em tempo real.',
            en: 'The bottleneck was architectural, not analytical — real-time ingestion was missing.'
        },
        solution: {
            pt: 'Arquitetura com S3 para landing zone, Lambda para processamento e alertas.',
            en: 'Architecture with S3 as landing zone, Lambda for processing and alerts.'
        },
        result: {
            pt: 'Janela de detecção reduzida de 24h para minutos.',
            en: 'Detection window cut from 24h to minutes.'
        },
        stack: ['S3', 'Lambda', 'Arquitetura']
    }
]
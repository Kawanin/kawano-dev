// "used" = onde usei (aparece no hover). tool-key normalizada casa com as tags dos cases/projetos.
export const stackGroups = [
  {
    key: 'bi',
    items: [
      { name: 'Power BI', level: 5, used: { pt: 'Painéis executivos, RLS, gamificação, HTML Content', en: 'Executive dashboards, RLS, gamification, HTML Content' } },
      { name: 'DAX', level: 5, used: { pt: 'Metas, CY × LY, pontuação ponderada', en: 'Targets, CY × LY, weighted scoring' } },
      { name: 'Power Query', level: 4, used: { pt: 'Tratamento e modelagem', en: 'Cleaning and modeling' } },
      { name: 'Fabric', level: 3, used: { pt: 'Trilha DP-600 em andamento', en: 'DP-600 track in progress' } }
    ]
  },
  {
    key: 'data',
    items: [
      { name: 'SQL', level: 4, used: { pt: 'SQL Server, PostgreSQL, Oracle', en: 'SQL Server, PostgreSQL, Oracle' } },
      { name: 'SQL Server', level: 4, used: { pt: 'Metas, faturamento e dashboard gerencial', en: 'Targets, billing and management dashboard' } },
      { name: 'SSMS', level: 4, used: { pt: 'Consultas e modelagem da base comercial', en: 'Queries and modeling of the commercial base' } },
      { name: 'Python', level: 3, used: { pt: 'ETL, automação e dashboards na intranet', en: 'ETL, automation and intranet dashboards' } },
      { name: 'n8n', level: 4, used: { pt: 'Pipelines, WebDox, relatórios e envios automáticos', en: 'Pipelines, WebDox, reports and automated sends' } },
      { name: 'Power Automate', level: 3, used: { pt: 'E-mails mensais e diários aos representantes', en: 'Monthly and daily emails to reps' } }
    ]
  },
  {
    key: 'build',
    items: [
      { name: 'Flutter', level: 3, used: { pt: 'Ferramentas de auditoria do FIDC', en: 'FIDC audit tools' } },
      { name: 'JavaScript', level: 3, used: { pt: 'HTML Content no Power BI, dashboards na intranet e este site (Vue)', en: 'HTML Content in Power BI, intranet dashboards and this site (Vue)' } },
      { name: 'HTML', level: 4, used: { pt: 'Visuais HTML Content e dashboards em código', en: 'HTML Content visuals and coded dashboards' } },
      { name: 'Excel', level: 4, used: { pt: 'Planilhas de metas e relatórios para supervisores', en: 'Goal workbooks and supervisor reports' } },
      { name: 'Figma', level: 3, used: { pt: 'UX/UI aplicado a dashboards', en: 'UX/UI applied to dashboards' } },
      { name: 'Git', level: 3, used: { pt: 'Versionamento', en: 'Version control' } }
    ]
  },
  {
    key: 'learning',
    items: [
      { name: 'IBM DataStage', level: 1, used: { pt: 'Estudando ETL corporativo', en: 'Studying enterprise ETL' } },
      { name: 'AWS', level: 1, used: { pt: 'CLF-C02 previsto', en: 'CLF-C02 planned' } },
      { name: 'Snowflake', level: 1, used: { pt: 'Estudando', en: 'Studying' } },
      { name: 'Databricks', level: 1, used: { pt: 'Estudando', en: 'Studying' } },
      { name: 'Tableau', level: 2, used: { pt: 'Estudando', en: 'Studying' } }
    ]
  }
]

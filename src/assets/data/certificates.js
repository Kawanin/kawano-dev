export const certificationPaths = [
    {
        id: 'pl300-path',
        title: { pt: 'Analista de Dados do Microsoft Power BI', en: 'Microsoft Power BI Data Analyst' },
        issuer: 'Microsoft',
        issuerKey: 'microsoft',
        type: 'path',
        totalCourses: 8,
        courses: [
            {
                title: { pt: 'Preparação de dados para análise com Microsoft Excel', en: 'Preparing Data for Analysis with Microsoft Excel' },
                status: 'done', pdf: '/certificates/preparing-data-excel.pdf', verifyUrl: 'https://coursera.org/verify/0MQ41WZGHF5Z'
            },
            {
                title: { pt: 'Aproveitamento do poder dos dados com Power BI', en: 'Harnessing the Power of Data with Power BI' },
                status: 'done', pdf: '/certificates/harnessing-power-bi.pdf', verifyUrl: 'https://coursera.org/verify/E2R9I84QO78M'
            },
            {
                title: { pt: 'Extrair, transformar e carregar dados no Power BI', en: 'Extract, Transform and Load Data in Power BI' },
                status: 'done', pdf: '/certificates/etl-power-bi.pdf', verifyUrl: 'https://coursera.org/verify/RNPSEOA0XPML'
            },
            {
                title: { pt: 'Modelagem de dados no Power BI', en: 'Data Modeling in Power BI' },
                status: 'done', pdf: '/certificates/data-modeling-power-bi.pdf', verifyUrl: 'https://coursera.org/verify/7WICCS6X6ELE'
            },
            {
                title: { pt: 'Análise e visualização de dados com Power BI', en: 'Data Analysis and Visualization with Power BI' },
                status: 'in-progress', progress: 65
            },
            {
                title: { pt: 'Design criativo no Power BI', en: 'Creative Designing in Power BI' },
                status: 'not-started'
            },
            {
                title: { pt: 'Implantação e manutenção de ativos do Power BI + Capstone', en: 'Power BI Asset Deployment, Maintenance + Capstone' },
                status: 'not-started'
            },
            {
                title: { pt: 'Preparação e prática do exame Microsoft PL-300', en: 'Microsoft PL-300 Exam Preparation and Practice' },
                status: 'not-started'
            }
        ]
    }
]

export const standaloneCertificates = [
    {
        title: 'Foundations of User Experience (UX) Design',
        issuer: 'Google (via Coursera)',
        issuerKey: 'google',
        date: '2026',
        status: 'done',
        verifyUrl: 'https://coursera.org/verify/WDU9RPC4TCR2',
        pdf: '/certificates/foundations-ux.pdf'
    },
    { title: 'DP-600: Implementing Analytics Solutions Using Microsoft Fabric', issuer: 'Microsoft', issuerKey: 'microsoft', date: 'previsto 2026', status: 'in-progress' },
    { title: 'CLF-C02: AWS Certified Cloud Practitioner', issuer: 'AWS', issuerKey: 'aws', date: 'previsto 2026', status: 'in-progress' }
]
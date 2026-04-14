export const currentCampaign = {
  id: '1',
  familyName: 'Adriana e Isabelly',
  location: 'Curitiba, Paraná',
  members: 2,
  story:
    'Adriana tem 28 anos e Isabelly tem 5 anos! As duas moram sozinhas em uma casa de 20 m². Adriana não possui renda fixa e batalha dia a dia para dar o melhor para sua filha. O barraco em que vivem foi construído com ajuda dos vizinhos. Seu maior sonho é mudar essa realidade e viver em uma casa mais estruturada, confortável, segura e digna. Ela tem o sonho de ter uma mesa para convidar a família para os almoços!',
  goal: 70000,
  raised: 20000,
  donors: [
    { initials: 'M', name: 'Maria T.' },
    { initials: 'J', name: 'João P.' },
    { initials: 'C', name: 'Carla R.' },
    { initials: 'A', name: 'Ana S.' },
  ],
  extraDonors: 12,
};

export const projectStats = {
  housesDelivered: 5,
  activePartners: 0, // carregado dinamicamente do Firebase
  livesImpacted: 25,
};

export const newsItems = [
  {
    id: '1',
    category: 'obra',
    categoryLabel: 'Obra em andamento',
    title: 'Fundação da casa da Adriana já está pronta!',
    excerpt:
      'As equipes de voluntários trabalharam neste fim de semana e conseguiram concluir toda a fundação. A próxima etapa são as paredes, previstas para o próximo mutirão.',
    date: '12 de abril, 2026',
    emoji: '🏗️',
  },
  {
    id: '2',
    category: 'story',
    categoryLabel: 'História real',
    title: '"Nunca pensei que teria um lar próprio"',
    excerpt:
      'Dona Maria, 58 anos, conta com emoção como foi receber as chaves de sua casa e o que isso significou para sua família após tantos anos de luta e incerteza.',
    date: '5 de abril, 2026',
    emoji: '🥹',
  },
  {
    id: '3',
    category: 'done',
    categoryLabel: 'Casa entregue',
    title: 'Família Rodrigues recebe as chaves da nova casa',
    excerpt:
      'Com muita emoção, o casal Rodrigues e seus 3 filhos receberam as chaves de sua primeira casa própria em uma cerimônia inesquecível com parceiros e voluntários.',
    date: '28 de março, 2026',
    emoji: '🎉',
  },
];

export const events = [
  {
    id: '1',
    day: '19',
    month: 'ABR',
    color: '#1A7B72',
    title: 'Mutirão de Construção – Casa da Adriana',
    detail: '7h–17h  ·  Curitiba, PR\nLeve luva, protetor solar e disposição!',
    confirmed: true,
  },
  {
    id: '2',
    day: '26',
    month: 'ABR',
    color: '#C4724A',
    title: 'Entrega de Chaves – Família Alves',
    detail: '14h–17h  ·  Curitiba, PR\nCelebre este momento inesquecível com eles!',
    confirmed: false,
  },
  {
    id: '3',
    day: '10',
    month: 'MAI',
    color: '#5C3A9C',
    title: 'Jantar dos Parceiros 2026',
    detail: '19h30  ·  Local a confirmar\nCelebração anual com todos os parceiros.',
    confirmed: false,
  },
  {
    id: '4',
    day: '17',
    month: 'MAI',
    color: '#1A3A5C',
    title: 'Tour dos Parceiros – Visita às Obras',
    detail: '8h–12h  ·  Curitiba, PR\nVeja de perto o que sua doação constrói.',
    confirmed: false,
  },
];

export const donationHistory = [
  { id: '1', label: 'Doação mensal', date: '01 de abril, 2026', method: 'Cartão', amount: 50, emoji: '💳' },
  { id: '2', label: 'Doação mensal', date: '01 de março, 2026', method: 'Pix', amount: 50, emoji: '⚡' },
  { id: '3', label: 'Campanha especial', date: '14 de fevereiro, 2026', method: 'Pix', amount: 100, emoji: '⚡' },
];

export const transparencyData = {
  period: 'Abril 2026',
  totalRaised: 'R$ 62k',
  totalInvested: 'R$ 58k',
  housesCompleted: 5,
  monthly: [
    { label: 'Janeiro', value: 'R$ 9.200', pct: 0.77 },
    { label: 'Fevereiro', value: 'R$ 8.450', pct: 0.70 },
    { label: 'Março', value: 'R$ 11.300', pct: 0.94 },
    { label: 'Abril (parcial)', value: 'R$ 7.600', pct: 0.63 },
  ],
  allocation: [
    { label: 'Material de construção', pct: 0.65, value: '65%', color: '#C4724A' },
    { label: 'Mão de obra', pct: 0.20, value: '20%', color: '#2E7D32' },
    { label: 'Logística e transporte', pct: 0.10, value: '10%', color: '#1A7B72' },
    { label: 'Administrativo', pct: 0.05, value: '5%', color: '#9A9A9A' },
  ],
};

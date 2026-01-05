import { SpecialtyClass, Feature, Testimonial, SampleItem, PricingState, FooterState, GlobalSettings } from './types';

export const HERO_CONTENT = {
  title: "Material completo de todas especialidades necessárias para concluir a sua classe.",
  subtitle: "Apostilas, Slides, provas e gabaritos. 100% Editáveis",
  highlight: "Serve para classes Agrupadas",
  cta: "",
  badges: ["Acesso imediato", "Mais de 5.000 líderes já usam"],
  coverImage: "https://i.ibb.co/SXRL2gPM/Capa3.png",
  logo: "https://i.ibb.co/wZDcdHnD/1.png"
};

export const CLASSES_DATA: SpecialtyClass[] = [
  {
    name: "CLASSE AMIGO",
    count: 12,
    color: "text-blue-400",
    gradient: "from-blue-600 to-blue-400",
    logo: "https://i.ibb.co/DPBXB5X4/Classe-de-amigo.png",
    items: [
      "Arte de Acampar", "Aves de Estimação", "Cães", "Cultura Física",
      "Felinos", "Jardinagem e Horticultura", "Mamíferos", "Modelagem e Fabricação de Sabão",
      "Natação Principiante I", "Pioneiros Adventistas", "Segurança Básica na Água", "Sementes"
    ],
    price: "14,90",
    checkoutUrl: "https://pay.cakto.com.br/3f8d7p8_708756" 
  },
  {
    name: "CLASSE COMPANHEIRO",
    count: 11,
    color: "text-red-400",
    gradient: "from-red-600 to-red-400",
    logo: "https://i.ibb.co/DgCFN2NQ/Classe-de-companheiro.png",
    items: [
      "Anfíbios", "Natação II", "Répteis", "Acampamento II",
      "Arbustos", "Árvores", "Aves", "Aves Domésticas",
      "Excursionismo Pedestre com Mochila", "Moluscos", "Pecuária"
    ],
    price: "14,90",
    checkoutUrl: "https://pay.cakto.com.br/7m9zoq4_708863"
  },
  {
    name: "CLASSE PESQUISADOR",
    count: 11,
    color: "text-green-400",
    gradient: "from-green-600 to-green-400",
    logo: "https://i.ibb.co/tww6n5Cm/Classe-de-pesquisador.png",
    items: [
      "Asseio e Cortesia Cristã", "Acampamento III", "Astronomia", "Cactos",
      "Climatologia", "Código Morse", "Flores", "Mapa e Bússola",
      "Primeiros Socorros Básico", "Rastreio de Animais", "Vida Familiar"
    ],
    price: "14,90",
    checkoutUrl: "https://pay.cakto.com.br/qpzwec8_709069"
  },
  {
    name: "CLASSE PIONEIRO",
    count: 11,
    color: "text-slate-300",
    gradient: "from-slate-500 to-slate-300",
    logo: "https://i.ibb.co/xKpvCGHF/Classe-de-pioneiro.png",
    items: [
      "Código Morse", "Acampamento I", "Árvores Guia Completo", "Cidadania Cristã",
      "Floricultura", "Fogueiras e Cozinha ao Ar Livre", "Mapa e Bússola", "Marcação Bíblica",
      "Produção de Vídeo", "Resgate Básico", "Samambaias"
    ],
    price: "14,90",
    checkoutUrl: "https://pay.cakto.com.br/374hi3v_709073"
  },
  {
    name: "CLASSE EXCURSIONISTA",
    count: 9,
    color: "text-purple-400",
    gradient: "from-purple-600 to-purple-400",
    logo: "https://i.ibb.co/DX8nw1Y/Classe-de-excurcionista.png",
    items: [
      "Fantoche", "Nutrição", "Bactérias", "Floricultura",
      "Orçamento Familiar", "Ordem Unida", "Pioneirias", "Testemunho Juvenil", "Vida Silvestre"
    ],
    price: "14,90",
    checkoutUrl: "https://pay.cakto.com.br/om88uev_709074"
  },
  {
    name: "CLASSE GUIA",
    count: 16,
    color: "text-yellow-400",
    gradient: "from-yellow-600 to-yellow-400",
    logo: "https://i.ibb.co/237vPHx2/Classe-de-guia.png",
    items: [
      "Animais Ameaçados de Extinção", "Nutrição", "Acampamento I", "Conservação Ambiental",
      "Física", "Ecologia", "Excursionismo Pedestre", "Excursionismo Pedestre com Mochila",
      "Futsal", "Higiene Oral", "Internet", "Jardinagem e Horticultura",
      "Liderança Campestre", "Plantas Silvestres Comestíveis", "Comidas Típicas do Brasil e América do Sul", "Mordomia Cristã"
    ],
    price: "14,90",
    checkoutUrl: "https://pay.cakto.com.br/3dhdvxk_709075"
  },
];

export const SAMPLES_DATA: SampleItem[] = [
  { title: "Segurança Básica na Água", image: "https://drive.google.com/thumbnail?id=1_QsxJiLMI25UAu6RByIT__nON_uZAkJt&sz=w1000" },
  { title: "Jardinagem", image: "https://drive.google.com/thumbnail?id=10Z0cZtsmdj1hjq6WE68z-M_M8mb0XB1d&sz=w1000" },
  { title: "Cultura Física", image: "https://drive.google.com/thumbnail?id=1CkpbdfxU_U3T7kT3fkboQhttYIB9JHNi&sz=w1000" },
  { title: "Felinos", image: "https://drive.google.com/thumbnail?id=1WQKtPT9tnrTOH1F0RmFaZdNo7UIGIQjA&sz=w1000" },
  { title: "Modelagem e Sabão", image: "https://drive.google.com/thumbnail?id=1ZhmbP_1ruO2qezSd6vDbcSrDCpFR75V3&sz=w1000" },
  { title: "Arte de Acampar", image: "https://drive.google.com/thumbnail?id=1zHEysGefixOyBUPQIlziELfEjwNxE_q4&sz=w1000" },
];

export const FEATURES_DATA: Feature[] = [
  {
    title: "Slides Premium",
    description: "Você recebe apresentações completas e interativas para cada uma das especialidades das classes regulares.",
    icon: "MonitorPlay"
  },
  {
    title: "Banco de Provas Oficiais",
    description: "Um arquivo organizado com todas as provas prontas para imprimir e aplicar imediatamente no seu clube.",
    icon: "ClipboardCheck"
  },
  {
    title: "Gabaritos de Correção",
    description: "Não perca tempo pesquisando respostas. Você recebe os gabaritos completos de todas as avaliações.",
    icon: "CheckCircle"
  },
  {
    title: "Arquivos 100% Editáveis",
    description: "Tenha liberdade total! Todo o conteúdo em PowerPoint pode ser alterado para incluir o nome do seu clube ou região.",
    icon: "Edit3"
  },
  {
    title: "Pasta de Materiais Extras",
    description: "Imagens em alta resolução, modelos de certificados e recursos adicionais para enriquecer suas aulas.",
    icon: "Layers"
  },
  {
    title: "Acesso Vitalício e Imediato",
    description: "O material é seu para sempre. Compre uma vez e acesse de qualquer lugar, sempre que precisar treinar novos líderes.",
    icon: "Zap"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: "Instrutora Milena",
    role: "Instrutora Classe Amigo",
    text: "Sou instrutora da classe de amigo mas não tenho muito tempo. Esse material veio muito a me ajudar material de qualidade muito bom ❤️👏",
    avatarColor: "bg-pink-500",
    image: "https://drive.google.com/thumbnail?id=1FTTGtI-YXpS6MGM048QZjTmlyZGWJJQB&sz=w1000"
  },
  {
    name: "Instrutora Larissa",
    role: "Instrutora",
    text: "Meu primeiro ano como instrutora achei que não ia dar conta, mas com esse material ajudei minha classe a concluir muito mais rápido 🚀",
    avatarColor: "bg-purple-500",
    image: "https://drive.google.com/thumbnail?id=1EGpuWOF_QSJ7QnFNACFeclloDyV43QvN&sz=w1000"
  },
  {
    name: "Diretor Ailton",
    role: "Diretor de Clube",
    text: "Sou diretor novo aqui no meu clube e não temos muitos instrutores com experience. Passando aqui para agradecer porque esse material me ajudou bastante pra eu que não tenho líderes 100% preparados ainda 🙌",
    avatarColor: "bg-blue-500",
    image: "https://drive.google.com/thumbnail?id=1nKb_GgO8x3kjipAQz1XIoOH6-2AFQdFe&sz=w1000"
  },
  {
    name: "Conselheira Raissa",
    role: "Conselheira",
    text: "Gostei muito do material fácil de aplicar e as provas fácil de entender recoemndo muito ❤️",
    avatarColor: "bg-green-500",
    image: "https://drive.google.com/thumbnail?id=1Vdn-inxyzyowvnis69v-TP9IpJ8eppn7&sz=w1000"
  },
  {
    name: "Instrutor Raphael",
    role: "Instrutor",
    text: "Gosto muito de especialidades e é muito difícil concluir sem o material correto. Adorei bastante, completei meus 4 mestrados 🤝",
    avatarColor: "bg-orange-500",
    image: "https://drive.google.com/thumbnail?id=14ZYGdAi2lFx6i0LgPlCxXYQOsDiPyRQ1&sz=w1000"
  },
  {
    name: "Diretora Pamela",
    role: "Diretora de Clube",
    text: "Adquiri para os meus instrutores e eles adoraram bastante porque a maioria trabalha e não tem tempo para montar um material desse. Super recoemndo principalmente para quem não tem tempo. ❤️",
    avatarColor: "bg-teal-500",
    image: "https://drive.google.com/thumbnail?id=1pvDItvseyNnYv8sYvz19vMvsZe-Y0g5W&sz=w1000"
  }
];

export const OFFER_ITEMS = [
  "71 especialidades completas",
  "PowerPoint interativo para cada especialidade",
  "Provas com gabarito 100% editável",
  "Material de formação e aplicação",
  "Certificados personalizáveis",
  "Modelo de prova adicional",
  "Acesso imediato após compra",
  "30 dias de garantia total"
];

export const BONUS_ITEMS = [
  "Mestrado em Testificações",
  "Mestrado em Botânica",
  "Mestrado em vida campestre",
  "Mestrado em Zoologia"
];

export const CARD_LIST_OFFER = [
  "PowerPoints editáveis",
  "Provas oficiais",
  "Gabaritos",
  "Arquivos PDF",
  "Imagens revisadas",
  "Material pronto para imprimir",
  "Slides modernos",
  "Atualizações gratuitas",
  "Acesso vitalício",
  "Garantia total"
];

export const PRICING_CONTENT: PricingState = {
  title: "Aproveite a Oferta Especial",
  subtitle: "Pague 3 e leve 6 por apenas 44,90",
  cardTitle: "Material Completo",
  cardSubtitle: "Tudo o que você precisa para aplicar as especialidades",
  originalPrice: "147,00",
  currentPrice: "44,90",
  discountLabel: "OFERTA",
  paymentLabel: "Pagamento Único",
  offerItems: OFFER_ITEMS,
  bonusItems: BONUS_ITEMS,
  cardFeatures: CARD_LIST_OFFER
};

export const FOOTER_CONTENT: FooterState = {
  guaranteeTitle: "30 Dias de Garantia Total",
  guaranteeText: "Experimente o material por 30 dias. Se não estiver satisfeito com a qualidade ou não atender suas expectativas, devolvemos 100% do seu dinheiro sem perguntas.",
  finalCtaTitle: "",
  finalCtaText: "Garanta agora o material mais completo para especialidades dos Desbravadores e transforme a experiência de aprendizado do seu clube.",
  finalCtaButton: "Comprar Agora"
};

export const DEFAULT_SETTINGS: GlobalSettings = {
  pixelCode: "",
  enableAnimations: true,
  checkoutUrl: "https://pay.cakto.com.br/btxj763_", 
  upsellCheckoutUrl: "https://pay.cakto.com.br/3fmwdnu",
  marqueeSpeed: 120,
  testimonialSpeed: 90
};
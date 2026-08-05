/**
 * Definição completa dos 15 capítulos – Lucas e Lara
 */

export const CHAPTERS = {
  lucas: [
    {
      id: 1,
      title: 'Um Novo Começo',
      summary: 'Conheça Camaçari, a escola, espaços de esporte e lazer e faça novos amigos.',
      objectives: [
        { id: 'explore_city', text: 'Explorar a cidade de Camaçari', type: 'explore' },
        { id: 'visit_school', text: 'Visitar a Escola SESI', type: 'location', target: 'school' },
        { id: 'talk_friend', text: 'Conversar com um amigo', type: 'talk', target: 'friend' },
        { id: 'talk_teacher', text: 'Falar com a Professora Mariana', type: 'talk', target: 'teacher' }
      ],
      reward: { knowledge: 10, money: 15, happiness: 5 }
    },
    {
      id: 2,
      title: 'O Início da Puberdade',
      summary: 'Aprenda sobre hormônios e o Bem Viver com saberes afro-brasileiros e originários.',
      objectives: [
        { id: 'attend_class', text: 'Assistir à aula de Ciências', type: 'location', target: 'school' },
        { id: 'learn_hormones', text: 'Aprender sobre hormônios', type: 'talk', target: 'teacher' },
        { id: 'learn_bemviver', text: 'Ouvir sobre o Bem Viver', type: 'talk', target: 'teacher' }
      ],
      reward: { knowledge: 15, respect: 5 }
    },
    {
      id: 3,
      title: 'Espelho da Verdade',
      summary: 'Converse com família, professores e profissionais da UBS sobre as mudanças do corpo.',
      objectives: [
        { id: 'talk_family', text: 'Conversar com a família', type: 'talk', target: 'family' },
        { id: 'visit_ubs', text: 'Visitar a UBS', type: 'location', target: 'ubs' },
        { id: 'talk_nurse', text: 'Falar com a enfermeira', type: 'talk', target: 'nurse' }
      ],
      reward: { knowledge: 12, happiness: 8, health: 5 }
    },
    {
      id: 4,
      title: 'Higiene em Primeiro Lugar',
      summary: 'Escolha cuidar da higiene. Entenda a relação com a saúde coletiva.',
      objectives: [
        { id: 'do_hygiene', text: 'Cuidar da higiene (menu Rotina)', type: 'routine', target: 'hygiene' },
        { id: 'buy_hygiene', text: 'Comprar item de higiene na loja', type: 'buy', target: 'soap' },
        { id: 'talk_ubs_hygiene', text: 'Ouvir orientação na UBS sobre higiene', type: 'talk', target: 'nurse' }
      ],
      reward: { hygiene: 20, knowledge: 8, respect: 5 }
    },
    {
      id: 5,
      title: 'Dormir ou Virar a Noite?',
      summary: 'Escolha dormir cedo e sinta a diferença na energia e atenção.',
      objectives: [
        { id: 'sleep_well', text: 'Dormir bem em casa', type: 'routine', target: 'sleep' },
        { id: 'sleep_streak', text: 'Dormir bem por 2 dias (acumulativo)', type: 'flag', target: 'sleptWell' }
      ],
      reward: { energy: 20, health: 10, knowledge: 5 }
    },
    {
      id: 6,
      title: 'O Que Comer?',
      summary: 'Escolha alimentação equilibrada e conheça alimentos da cultura afro-brasileira e indígena.',
      objectives: [
        { id: 'eat_healthy', text: 'Fazer refeição equilibrada', type: 'routine', target: 'eat_healthy' },
        { id: 'buy_fruit', text: 'Comprar fruta no mercado', type: 'buy', target: 'apple' },
        { id: 'learn_food', text: 'Aprender sobre alimentos tradicionais', type: 'talk', target: 'shop' }
      ],
      reward: { health: 15, energy: 10, knowledge: 8 }
    },
    {
      id: 7,
      title: 'Corpo em Movimento',
      summary: 'Pratique exercícios nas quadras de Camaçari e conheça a capoeira.',
      objectives: [
        { id: 'exercise', text: 'Praticar atividade física', type: 'routine', target: 'exercise' },
        { id: 'visit_park', text: 'Ir à quadra esportiva', type: 'location', target: 'park' },
        { id: 'talk_coach', text: 'Conversar com o treinador sobre capoeira', type: 'talk', target: 'sports' }
      ],
      reward: { health: 15, happiness: 12, energy: -5 }
    },
    {
      id: 8,
      title: 'Emoções à Flor da Pele',
      summary: 'Aprenda a lidar com mudanças de humor conversando com pessoas de confiança.',
      objectives: [
        { id: 'talk_emotions', text: 'Conversar sobre emoções com alguém', type: 'talk', target: 'family' },
        { id: 'talk_teacher_emo', text: 'Falar com professor sobre emoções', type: 'talk', target: 'teacher' },
        { id: 'breathe', text: 'Usar técnica de respiração (Rotina)', type: 'routine', target: 'short_rest' }
      ],
      reward: { happiness: 15, knowledge: 8 }
    },
    {
      id: 9,
      title: 'Pressão dos Amigos',
      summary: 'Decida conscientemente diante da pressão do grupo.',
      objectives: [
        { id: 'talk_peer', text: 'Conversar com amigo sobre pressão', type: 'talk', target: 'friend' },
        { id: 'make_choice', text: 'Tomar decisão consciente (diálogo)', type: 'choice', target: 'peer_pressure' }
      ],
      reward: { respect: 15, happiness: 10, knowledge: 5 }
    },
    {
      id: 10,
      title: 'Mitos e Verdades',
      summary: 'Investigue informações e aprenda a buscar fontes confiáveis.',
      objectives: [
        { id: 'find_pamphlet', text: 'Encontrar folhetos educativos', type: 'collect', target: 'pamphlet' },
        { id: 'talk_myths', text: 'Tirar dúvidas com profissional', type: 'talk', target: 'nurse' },
        { id: 'quiz_myths', text: 'Responder quiz de mitos e verdades', type: 'minigame', target: 'myths' }
      ],
      reward: { knowledge: 20, respect: 5 }
    },
    {
      id: 11,
      title: 'Respeitando as Diferenças',
      summary: 'Cada adolescente tem seu ritmo. Aprenda a respeitar diferenças.',
      objectives: [
        { id: 'talk_differences', text: 'Conversar com 2 colegas diferentes', type: 'talk', target: 'friend' },
        { id: 'help_colleague', text: 'Ajudar colega que sofreu zombaria', type: 'talk', target: 'friend' }
      ],
      reward: { respect: 20, happiness: 10 }
    },
    {
      id: 12,
      title: 'Responsabilidade',
      summary: 'Organize uma rotina equilibrada de sono, higiene, alimentação e estudos.',
      objectives: [
        { id: 'routine_sleep', text: 'Dormir bem', type: 'routine', target: 'sleep' },
        { id: 'routine_hygiene', text: 'Cuidar da higiene', type: 'routine', target: 'hygiene' },
        { id: 'routine_eat', text: 'Comer de forma equilibrada', type: 'routine', target: 'eat_healthy' },
        { id: 'routine_study', text: 'Estudar', type: 'routine', target: 'study' }
      ],
      reward: { health: 10, energy: 10, knowledge: 10, hygiene: 10 }
    },
    {
      id: 13,
      title: 'Compartilhando Conhecimento',
      summary: 'Ajude colegas e participe de ação de conscientização em Camaçari.',
      objectives: [
        { id: 'help_doubt', text: 'Orientar colega com dúvidas', type: 'talk', target: 'friend' },
        { id: 'clean_plaza', text: 'Participar de limpeza da praça', type: 'action', target: 'clean' }
      ],
      reward: { knowledge: 10, respect: 15, happiness: 10 }
    },
    {
      id: 14,
      title: 'O Grande Desafio',
      summary: 'Responda perguntas e tome decisões com base em tudo o que aprendeu.',
      objectives: [
        { id: 'final_quiz', text: 'Completar o grande desafio (quiz)', type: 'minigame', target: 'final_quiz' },
        { id: 'visit_fair', text: 'Ir à Feira de Ciências', type: 'location', target: 'school' }
      ],
      reward: { knowledge: 25, money: 30 }
    },
    {
      id: 15,
      title: 'Um Novo Lucas',
      summary: 'Receba o certificado e conclua que a puberdade é natural e ninguém precisa passar sozinho.',
      objectives: [
        { id: 'receive_certificate', text: 'Receber certificado na Feira de Ciências', type: 'location', target: 'school' }
      ],
      reward: { knowledge: 20, happiness: 20, respect: 15 }
    }
  ],

  lara: [
    {
      id: 1,
      title: 'Um Novo Começo',
      summary: 'Conheça Camaçari, a escola e faça novas amizades. Perceba como o território influencia sua saúde.',
      objectives: [
        { id: 'explore_city', text: 'Explorar a cidade', type: 'explore' },
        { id: 'visit_school', text: 'Visitar a Escola SESI', type: 'location', target: 'school' },
        { id: 'talk_friend', text: 'Fazer uma amizade', type: 'talk', target: 'friend' },
        { id: 'talk_teacher', text: 'Falar com a Professora', type: 'talk', target: 'teacher' }
      ],
      reward: { knowledge: 10, money: 15, happiness: 5 }
    },
    {
      id: 2,
      title: 'As Primeiras Mudanças',
      summary: 'Assista à aula de Ciências sobre puberdade e o Bem Viver.',
      objectives: [
        { id: 'attend_class', text: 'Assistir à aula de Ciências', type: 'location', target: 'school' },
        { id: 'learn_puberty', text: 'Entender o que é a puberdade', type: 'talk', target: 'teacher' }
      ],
      reward: { knowledge: 15, respect: 5 }
    },
    {
      id: 3,
      title: 'Conhecendo Meu Corpo',
      summary: 'Converse com professora, família e profissionais da UBS. Cada pessoa tem seu ritmo.',
      objectives: [
        { id: 'talk_family', text: 'Conversar com responsável', type: 'talk', target: 'family' },
        { id: 'visit_ubs', text: 'Visitar a UBS', type: 'location', target: 'ubs' },
        { id: 'talk_nurse', text: 'Falar com a enfermeira', type: 'talk', target: 'nurse' }
      ],
      reward: { knowledge: 12, happiness: 8 }
    },
    {
      id: 4,
      title: 'Higiene é Cuidado',
      summary: 'Mantenha bons hábitos de higiene e entenda a saúde coletiva.',
      objectives: [
        { id: 'do_hygiene', text: 'Cuidar da higiene', type: 'routine', target: 'hygiene' },
        { id: 'buy_hygiene', text: 'Comprar itens de higiene', type: 'buy', target: 'soap' },
        { id: 'talk_ubs_hygiene', text: 'Ouvir sobre higiene na UBS', type: 'talk', target: 'nurse' }
      ],
      reward: { hygiene: 20, knowledge: 8 }
    },
    {
      id: 5,
      title: 'Menstruação sem Medo',
      summary: 'Aprenda sobre o ciclo menstrual, produtos adequados e fale sem preconceito.',
      objectives: [
        { id: 'learn_menstruation', text: 'Aprender sobre menstruação na UBS/Escola', type: 'talk', target: 'nurse' },
        { id: 'buy_pad', text: 'Identificar/comprar absorvente', type: 'buy', target: 'pad' },
        { id: 'calendar_game', text: 'Completar calendário do ciclo (minijogo)', type: 'minigame', target: 'calendar' }
      ],
      reward: { knowledge: 20, happiness: 10, respect: 8 }
    },
    {
      id: 6,
      title: 'Alimentação Faz Diferença',
      summary: 'Escolha alimentação equilibrada e conheça alimentos tradicionais.',
      objectives: [
        { id: 'eat_healthy', text: 'Refeição equilibrada', type: 'routine', target: 'eat_healthy' },
        { id: 'buy_fruit', text: 'Comprar fruta', type: 'buy', target: 'apple' },
        { id: 'learn_food', text: 'Aprender sobre alimentos tradicionais', type: 'talk', target: 'shop' }
      ],
      reward: { health: 15, energy: 10, knowledge: 8 }
    },
    {
      id: 7,
      title: 'Corpo em Movimento',
      summary: 'Participe de atividades físicas e valorize a capoeira e a convivência.',
      objectives: [
        { id: 'exercise', text: 'Praticar atividade física', type: 'routine', target: 'exercise' },
        { id: 'visit_park', text: 'Ir à quadra/praça', type: 'location', target: 'park' },
        { id: 'talk_coach', text: 'Conversar sobre capoeira', type: 'talk', target: 'sports' }
      ],
      reward: { health: 15, happiness: 12 }
    },
    {
      id: 8,
      title: 'Emoções e Hormônios',
      summary: 'Entenda mudanças de humor e formas saudáveis de lidar com elas.',
      objectives: [
        { id: 'talk_emotions', text: 'Conversar sobre emoções', type: 'talk', target: 'family' },
        { id: 'talk_teacher_emo', text: 'Falar com professor(a)', type: 'talk', target: 'teacher' },
        { id: 'breathe', text: 'Técnica de respiração/relaxamento', type: 'routine', target: 'short_rest' }
      ],
      reward: { happiness: 15, knowledge: 8 }
    },
    {
      id: 9,
      title: 'Pressão dos Colegas',
      summary: 'Tome decisões próprias. Dizer “não” também é escolha saudável.',
      objectives: [
        { id: 'talk_peer', text: 'Conversar com colega sobre pressão', type: 'talk', target: 'friend' },
        { id: 'make_choice', text: 'Decisão consciente no diálogo', type: 'choice', target: 'peer_pressure' }
      ],
      reward: { respect: 15, happiness: 10 }
    },
    {
      id: 10,
      title: 'Verdade ou Mito?',
      summary: 'Descubra o que é verdade e o que é boato. Busque informação científica.',
      objectives: [
        { id: 'find_pamphlet', text: 'Encontrar folhetos educativos', type: 'collect', target: 'pamphlet' },
        { id: 'talk_myths', text: 'Tirar dúvidas com profissional', type: 'talk', target: 'nurse' },
        { id: 'quiz_myths', text: 'Quiz mitos e verdades', type: 'minigame', target: 'myths' }
      ],
      reward: { knowledge: 20 }
    },
    {
      id: 11,
      title: 'Cada Pessoa Tem Seu Tempo',
      summary: 'Cada adolescente se desenvolve em ritmo diferente. Respeite diferenças.',
      objectives: [
        { id: 'talk_differences', text: 'Conversar com colegas sobre ritmos diferentes', type: 'talk', target: 'friend' },
        { id: 'help_colleague', text: 'Ajudar colega com zombaria', type: 'talk', target: 'friend' }
      ],
      reward: { respect: 20, happiness: 10 }
    },
    {
      id: 12,
      title: 'Autoestima e Respeito',
      summary: 'Desenvolva confiança, respeite o próprio corpo e o dos outros.',
      objectives: [
        { id: 'positive_phrases', text: 'Escolher frases positivas (minijogo)', type: 'minigame', target: 'selfesteem' },
        { id: 'talk_respect', text: 'Conversar sobre respeito ao corpo', type: 'talk', target: 'teacher' }
      ],
      reward: { happiness: 15, respect: 15 }
    },
    {
      id: 13,
      title: 'Hábitos Saudáveis',
      summary: 'Organize rotina de higiene, alimentação, sono, estudos e lazer.',
      objectives: [
        { id: 'routine_sleep', text: 'Dormir bem', type: 'routine', target: 'sleep' },
        { id: 'routine_hygiene', text: 'Higiene', type: 'routine', target: 'hygiene' },
        { id: 'routine_eat', text: 'Alimentação equilibrada', type: 'routine', target: 'eat_healthy' },
        { id: 'routine_exercise', text: 'Exercício', type: 'routine', target: 'exercise' }
      ],
      reward: { health: 12, energy: 10, hygiene: 10, happiness: 8 }
    },
    {
      id: 14,
      title: 'Projeto da Feira de Ciências',
      summary: 'Prepare apresentação sobre juventude, puberdade, hormônios e Bem Viver.',
      objectives: [
        { id: 'prepare_project', text: 'Preparar o projeto (estudar + conversar)', type: 'routine', target: 'study' },
        { id: 'help_fair', text: 'Ajudar na preparação do estande', type: 'talk', target: 'teacher' }
      ],
      reward: { knowledge: 20, money: 20 }
    },
    {
      id: 15,
      title: 'Uma Nova Lara',
      summary: 'Apresente na Feira, receba o certificado e celebre o crescimento com confiança.',
      objectives: [
        { id: 'present_fair', text: 'Apresentar na Feira de Ciências', type: 'location', target: 'school' },
        { id: 'receive_certificate', text: 'Receber certificado', type: 'location', target: 'school' }
      ],
      reward: { knowledge: 20, happiness: 20, respect: 15 }
    }
  ]
};

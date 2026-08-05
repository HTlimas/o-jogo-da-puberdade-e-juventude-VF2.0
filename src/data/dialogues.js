/**
 * Banco completo de diálogos – Crescendo com Confiança
 * Lucas e Lara | Capítulos 1–15 | NPCs | Escolhas | Educativo
 */

export const DIALOGUES = {
  // ═══════════════════════════════════════════
  // NPCs – Diálogos base
  // ═══════════════════════════════════════════

  teacher_intro: [
    { text: 'Olá! Eu sou a Professora Mariana, de Ciências na Escola SESI Milton Santos.', expression: 'happy' },
    { text: 'Estamos estudando a puberdade: uma fase natural do crescimento humano.', expression: 'smile' },
    { text: 'Hormônios como o estrogênio e a testosterona ajudam o corpo a mudar. Isso é normal!', expression: 'thinking' },
    { text: 'Os saberes afro-brasileiros e dos povos originários também ensinam o cuidado com o corpo, a natureza e a comunidade. Isso faz parte do Bem Viver.', expression: 'happy' },
    { text: 'Qualquer dúvida, pode me perguntar. Estou aqui para ajudar.', expression: 'smile' }
  ],

  teacher_hormones: [
    { text: 'Os hormônios são mensageiros químicos produzidos pelo corpo.', expression: 'thinking' },
    { text: 'Na puberdade, a hipófise e as gônadas aumentam a produção desses mensageiros.', expression: 'smile' },
    { text: 'Eles provocam crescimento, mudanças na voz, pelos, pele e também influenciam as emoções.', expression: 'happy' },
    { text: 'Cada pessoa tem seu próprio ritmo. Não existe um “certo” ou “atrasado”.', expression: 'smile' }
  ],

  teacher_bemviver: [
    { text: 'O Bem Viver vem de tradições indígenas e afro-brasileiras.', expression: 'thinking' },
    { text: 'Significa cuidar de si, das outras pessoas e da natureza de forma equilibrada.', expression: 'smile' },
    { text: 'Cuidar do corpo, dormir bem, se alimentar com respeito e participar da comunidade faz parte disso.', expression: 'happy' },
    { text: 'Aqui em Camaçari também podemos praticar o Bem Viver no dia a dia.', expression: 'smile' }
  ],

  teacher_emotions: [
    { text: 'As mudanças de humor na adolescência são comuns. Os hormônios influenciam, mas não são os únicos fatores.', expression: 'thinking' },
    { text: 'Conversar, praticar esportes, dormir bem e pedir ajuda são formas saudáveis de lidar com as emoções.', expression: 'smile' },
    { text: 'Nunca tenha vergonha de falar o que está sentindo com alguém de confiança.', expression: 'happy' }
  ],

  teacher_respect: [
    { text: 'Respeitar o próprio corpo e o corpo dos outros é fundamental.', expression: 'thinking' },
    { text: 'Cada adolescente se desenvolve em um ritmo diferente. Zombar ou comparar não ajuda ninguém.', expression: 'serious' },
    { text: 'Valorizar a diversidade e a identidade de cada pessoa fortalece a turma toda.', expression: 'happy' }
  ],

  teacher_fair: [
    { text: 'A Feira de Ciências está chegando! Vamos apresentar o que aprendemos sobre puberdade e hábitos saudáveis.', expression: 'happy' },
    { text: 'Prepare cartazes, pesquise com fontes confiáveis e conte também sobre o Bem Viver em Camaçari.', expression: 'smile' },
    { text: 'Estou orgulhosa do esforço de vocês. Contem comigo nos últimos ajustes!', expression: 'happy' }
  ],

  nurse_intro: [
    { text: 'Oi! Eu sou a Camila, enfermeira da UBS de Camaçari.', expression: 'happy' },
    { text: 'Cuidar da higiene, dormir bem e se alimentar direito faz muita diferença na adolescência.', expression: 'smile' },
    { text: 'As mudanças do corpo são normais. Cada pessoa tem seu próprio ritmo.', expression: 'thinking' },
    { text: 'Qualquer dúvida sobre saúde, pode vir aqui. Estamos para ajudar, sem julgamento.', expression: 'happy' }
  ],

  nurse_hygiene: [
    { text: 'A higiene diária ajuda a prevenir odores, irritações e infecções.', expression: 'smile' },
    { text: 'Banho regular, escovação dos dentes, desodorante e roupas limpas são hábitos simples e importantes.', expression: 'happy' },
    { text: 'Cuidar da higiene também é cuidar da saúde coletiva: menos transmissão de doenças na escola e em casa.', expression: 'thinking' },
    { text: 'Se aparecerem espinhas, não esprema. Posso te orientar sobre cuidados com a pele.', expression: 'smile' }
  ],

  nurse_acne: [
    { text: 'A acne é muito comum na puberdade por causa dos hormônios e do aumento da oleosidade da pele.', expression: 'thinking' },
    { text: 'Lavar o rosto com sabonete adequado, não tocar demais nas espinhas e evitar produtos oleosos ajuda.', expression: 'smile' },
    { text: 'Se estiver muito intensa, um profissional de saúde pode indicar o melhor tratamento. Não tenha vergonha de perguntar!', expression: 'happy' }
  ],

  nurse_menstruation: [
    { text: 'A menstruação faz parte do ciclo reprodutivo. É a descamação do revestimento do útero quando não há gravidez.', expression: 'smile' },
    { text: 'O ciclo dura em média 28 dias, mas varia de pessoa para pessoa. Isso é normal.', expression: 'thinking' },
    { text: 'Absorventes externos, internos ou calcinhas absorventes são opções. Troque com frequência e mantenha a higiene.', expression: 'happy' },
    { text: 'Cólicas podem acontecer. Compressa morna, repouso e, se necessário, orientação médica ajudam.', expression: 'smile' },
    { text: 'Falar sobre menstruação sem preconceito é um ato de respeito e informação. Você pode conversar comigo sempre.', expression: 'happy' }
  ],

  nurse_emotions: [
    { text: 'Mudanças de humor, ansiedade ou tristeza podem aparecer na adolescência.', expression: 'thinking' },
    { text: 'Respirar fundo, conversar, praticar atividade física e manter uma rotina de sono ajudam bastante.', expression: 'smile' },
    { text: 'Se os sentimentos forem muito intensos ou duradouros, procure um adulto de confiança ou a equipe de saúde.', expression: 'happy' }
  ],

  nurse_myths: [
    { text: 'Muita informação errada circula sobre a puberdade. Vamos separar mito de verdade?', expression: 'thinking' },
    { text: 'Mito: “Todo mundo se desenvolve na mesma idade.” Verdade: cada corpo tem seu tempo.', expression: 'smile' },
    { text: 'Mito: “Tomar banho frio atrasa a menstruação.” Verdade: temperatura da água não altera o ciclo.', expression: 'thinking' },
    { text: 'Sempre busque informações em fontes confiáveis: profissionais de saúde, livros e materiais da escola.', expression: 'happy' }
  ],

  family_talk: [
    { text: 'Oi, filho(a)! Como foi o dia na escola?', expression: 'happy' },
    { text: 'Estou aqui se quiser conversar sobre qualquer coisa que esteja sentindo.', expression: 'smile' },
    { text: 'Crescer faz parte da vida. Podemos aprender juntos. Combinado?', expression: 'happy' }
  ],

  family_puberty: [
    { text: 'Eu também passei por mudanças quando era adolescente. É uma fase, e passa.', expression: 'thinking' },
    { text: 'Se tiver vergonha ou medo, pode falar comigo. Não precisa passar por isso sozinho(a).', expression: 'smile' },
    { text: 'Cuidar do corpo, estudar e respeitar os outros já é um grande passo.', expression: 'happy' }
  ],

  family_emotions: [
    { text: 'Percebi que você tem estado mais sensível. Quer conversar?', expression: 'thinking' },
    { text: 'As emoções ficam mais intensas nessa fase. Isso não te faz fraco(a).', expression: 'smile' },
    { text: 'Estamos juntos. Pode contar com a família.', expression: 'happy' }
  ],

  friend_chat: [
    { text: 'E aí! Bora jogar bola depois da aula?', expression: 'happy' },
    { text: 'Às vezes eu também fico confuso(a) com essas mudanças. É bom ter amigos pra conversar.', expression: 'thinking' },
    { text: 'A gente respeita o tempo de cada um, né?', expression: 'smile' }
  ],

  friend_pressure: [
    { text: 'Galera tá falando pra gente fazer uma coisa... tipo, pular a aula ou experimentar algo.', expression: 'thinking' },
    { text: 'O que você acha? Todo mundo vai. Não quer ficar de fora, né?', expression: 'neutral' }
  ],

  friend_pressure_good: [
    { text: 'Verdade... melhor não. Obrigado(a) por pensar com a cabeça no lugar.', expression: 'smile' },
    { text: 'A gente pode fazer outra coisa legal juntos. Tipo ir na quadra ou estudar pro projeto.', expression: 'happy' }
  ],

  friend_pressure_bad: [
    { text: 'Beleza... mas depois a gente vê no que dá. Espero que não cause problema.', expression: 'worried' },
    { text: '(Você sente que talvez não tenha sido a melhor escolha. Ainda dá tempo de repensar.)', expression: 'thinking' }
  ],

  friend_respect: [
    { text: 'Vi que estavam zoando o(a) colega por causa do corpo dele(a). Isso não tá certo.', expression: 'serious' },
    { text: 'Cada um se desenvolve no seu tempo. Zombar só magoa.', expression: 'thinking' },
    { text: 'Vale a pena defender quem está sendo desrespeitado. Obrigado(a) por se importar.', expression: 'happy' }
  ],

  friend_advice: [
    { text: 'Tô preocupado(a) com essas mudanças no corpo. Às vezes acho que tem algo errado comigo.', expression: 'worried' },
    { text: 'Você acha que eu devia falar com alguém?', expression: 'thinking' }
  ],

  friend_advice_good: [
    { text: 'Você tem razão. Vou conversar com a enfermeira ou com a professora. Valeu pela força!', expression: 'happy' },
    { text: 'É bom ter amigos que orientam de verdade.', expression: 'smile' }
  ],

  sports_talk: [
    { text: 'Movimentar o corpo faz bem demais! Capoeira, futebol, caminhada... tudo conta.', expression: 'happy' },
    { text: 'A capoeira é cultura afro-brasileira e também exercício. Quer aprender uns movimentos?', expression: 'smile' },
    { text: 'Praticar esporte melhora o humor, a energia e ajuda no crescimento saudável.', expression: 'happy' }
  ],

  sports_capoeira: [
    { text: 'Na capoeira a gente usa o corpo inteiro: equilíbrio, ritmo e respeito ao outro.', expression: 'smile' },
    { text: 'É uma forma de cuidar da saúde e valorizar nossa história.', expression: 'happy' },
    { text: 'Quando quiser treinar, é só aparecer na quadra!', expression: 'happy' }
  ],

  community: [
    { text: 'A comunidade é importante. Cuidar dos espaços públicos é cuidar de todos.', expression: 'thinking' },
    { text: 'O Bem Viver vem do cuidado com o corpo, com a natureza e com as pessoas.', expression: 'happy' },
    { text: 'Preservar a praça, o rio e as árvores de Camaçari também é saúde.', expression: 'smile' }
  ],

  elder_wisdom: [
    { text: 'Na minha época a gente não falava muito sobre essas coisas do corpo...', expression: 'thinking' },
    { text: 'Mas eu aprendi que conversar e buscar informação boa é o melhor caminho.', expression: 'smile' },
    { text: 'Você está fazendo certo em aprender. Continue assim!', expression: 'happy' }
  ],

  shop_hello: [
    { text: 'Bem-vindo(a) ao mercado! Temos frutas frescas, produtos de higiene e mais.', expression: 'happy' },
    { text: 'Uma maçã custa poucos reais. Sabonete e desodorante também. Quer dar uma olhada?', expression: 'smile' },
    { text: 'Alimentos de verdade dão mais energia do que tanto doce e refrigerante, viu?', expression: 'thinking' }
  ],

  shop_food_culture: [
    { text: 'Aqui a gente tem banana, mandioca, feijão, frutas da região...', expression: 'smile' },
    { text: 'Muitos desses alimentos fazem parte da cultura afro-brasileira e indígena.', expression: 'happy' },
    { text: 'Comer bem é cuidar do corpo e valorizar o que a terra e a tradição nos dão.', expression: 'smile' }
  ],

  // ═══════════════════════════════════════════
  // Capítulos – Lucas
  // ═══════════════════════════════════════════

  ch1_lucas_start: [
    { text: 'Bem-vindo a Camaçari! Esta é a sua cidade, cheia de lugares para explorar.', expression: 'happy' },
    { text: 'Visite a escola, a UBS, a praça e a quadra. Converse com as pessoas.', expression: 'smile' },
    { text: 'O território onde você vive influencia sua saúde, suas oportunidades e sua qualidade de vida.', expression: 'thinking' }
  ],

  ch2_lucas_class: [
    { text: 'Hoje vamos falar sobre hormônios e por que o corpo muda na adolescência.', expression: 'happy' },
    { text: 'Também vamos lembrar que o cuidado com o corpo e com a comunidade faz parte do Bem Viver.', expression: 'smile' },
    { text: 'Anotem as dúvidas. Na próxima aula a gente aprofunda!', expression: 'happy' }
  ],

  ch3_lucas_mirror: [
    { text: 'Às vezes a gente se olha no espelho e estranha o que vê. Isso é comum.', expression: 'thinking' },
    { text: 'Conversar com a família, com professores e com a equipe da UBS ajuda a entender que é normal.', expression: 'smile' },
    { text: 'Diferentes culturas respeitam o crescimento de cada pessoa. Você não está sozinho.', expression: 'happy' }
  ],

  ch4_lucas_hygiene_good: [
    { text: 'Que bom que você está cuidando da higiene! Dá pra perceber que você se sente melhor.', expression: 'happy' },
    { text: 'Os colegas e a família notam quando a gente se cuida. Isso também é respeito a si mesmo.', expression: 'smile' }
  ],

  ch4_lucas_hygiene_bad: [
    { text: 'Hmm... parece que a higiene ficou um pouco de lado. Odores e espinhas podem aparecer.', expression: 'worried' },
    { text: 'Não tem problema. Dá pra melhorar a partir de hoje. A UBS pode orientar.', expression: 'smile' }
  ],

  ch5_lucas_sleep_good: [
    { text: 'Dormir cedo fez diferença! Mais energia e atenção na aula.', expression: 'happy' },
    { text: 'Uma boa rotina de sono melhora a qualidade de vida inteira.', expression: 'smile' }
  ],

  ch5_lucas_sleep_bad: [
    { text: 'Virar a noite jogando deixou você cansado. Concentração baixa e rendimento pior.', expression: 'worried' },
    { text: 'Amanhã tente dormir mais cedo. Seu corpo agradece.', expression: 'thinking' }
  ],

  ch6_lucas_food_good: [
    { text: 'Alimentação equilibrada = mais disposição e melhor rendimento!', expression: 'happy' },
    { text: 'Alimentos tradicionais da cultura afro-brasileira e indígena também são ótimas opções.', expression: 'smile' }
  ],

  ch6_lucas_food_bad: [
    { text: 'Excesso de doces e refrigerante pode tirar sua energia depois do pico de açúcar.', expression: 'worried' },
    { text: 'Que tal equilibrar na próxima refeição?', expression: 'smile' }
  ],

  ch7_lucas_sport: [
    { text: 'Mexer o corpo nas praças e quadras de Camaçari faz bem demais!', expression: 'happy' },
    { text: 'A capoeira une cultura, esporte e convivência. Experimente!', expression: 'smile' }
  ],

  ch8_lucas_emotions: [
    { text: 'As emoções estão à flor da pele. Isso acontece com muitos adolescentes.', expression: 'thinking' },
    { text: 'Conversar com professores, família e profissionais de saúde ajuda a encontrar caminhos.', expression: 'smile' }
  ],

  ch9_lucas_choice_intro: [
    { text: 'Seus colegas estão sugerindo coisas diferentes. Alguns querem pular compromisso, outros querem fazer algo arriscado.', expression: 'thinking' },
    { text: 'O que você vai fazer?', expression: 'neutral' }
  ],

  ch10_lucas_myths: [
    { text: 'Nem tudo que as pessoas falam sobre puberdade é verdade.', expression: 'thinking' },
    { text: 'Investigue, pergunte na UBS e na escola. Informação confiável protege você.', expression: 'smile' }
  ],

  ch11_lucas_differences: [
    { text: 'Cada adolescente se desenvolve em um ritmo diferente. Isso é normal e digno de respeito.', expression: 'happy' },
    { text: 'Cultura, identidade e aparência também merecem respeito. Ninguém é igual a ninguém.', expression: 'smile' }
  ],

  ch12_lucas_routine: [
    { text: 'Organizar sono, higiene, alimentação, estudos e lazer é um ato de responsabilidade.', expression: 'smile' },
    { text: 'Participar das atividades da comunidade também faz parte de uma vida equilibrada.', expression: 'happy' }
  ],

  ch13_lucas_share: [
    { text: 'Você pode ajudar colegas que têm dúvidas sobre a puberdade.', expression: 'happy' },
    { text: 'Participar de ações de conscientização e preservação dos espaços de Camaçari fortalece a todos.', expression: 'smile' }
  ],

  ch14_lucas_challenge: [
    { text: 'Chegou o grande desafio! Use tudo o que aprendeu sobre puberdade, saúde, Bem Viver e cidadania.', expression: 'happy' },
    { text: 'Responda com calma. Você está preparado.', expression: 'smile' }
  ],

  ch15_lucas_end: [
    { text: 'Parabéns, Lucas! A puberdade é uma fase natural do crescimento.', expression: 'happy' },
    { text: 'Cuidar de si, da comunidade e da natureza contribui para uma vida mais saudável.', expression: 'smile' },
    { text: 'Você recebe o certificado da escola. Continue crescendo com confiança!', expression: 'happy' }
  ],

  // ═══════════════════════════════════════════
  // Capítulos – Lara
  // ═══════════════════════════════════════════

  ch1_lara_start: [
    { text: 'Bem-vinda a Camaçari! Explore a cidade, a escola e os espaços de lazer.', expression: 'happy' },
    { text: 'O território onde você vive influencia sua saúde, oportunidades e desenvolvimento.', expression: 'thinking' },
    { text: 'Faça novas amizades. Ninguém precisa passar pela adolescência sozinha.', expression: 'smile' }
  ],

  ch2_lara_class: [
    { text: 'Na aula de Ciências vamos entender o que é a puberdade.', expression: 'happy' },
    { text: 'A professora também fala dos saberes afro-brasileiros e originários e do Bem Viver.', expression: 'smile' },
    { text: 'Cuidar do corpo, da natureza e da comunidade faz parte do nosso crescimento.', expression: 'happy' }
  ],

  ch3_lara_body: [
    { text: 'Conhecer o próprio corpo é uma forma de autocuidado.', expression: 'smile' },
    { text: 'Converse com a professora, com um responsável e com a equipe da UBS.', expression: 'thinking' },
    { text: 'Cada pessoa tem seu próprio tempo de desenvolvimento. Isso é normal.', expression: 'happy' }
  ],

  ch4_lara_hygiene_good: [
    { text: 'Manter a higiene te deixa mais confortável e confiante.', expression: 'happy' },
    { text: 'A UBS lembra: higiene também é saúde coletiva e bem-estar da comunidade.', expression: 'smile' }
  ],

  ch4_lara_hygiene_bad: [
    { text: 'Deixar a higiene de lado tem consequências. Mas dá para melhorar a partir de agora.', expression: 'worried' },
    { text: 'Os profissionais da UBS podem te orientar sem julgamento.', expression: 'smile' }
  ],

  ch5_lara_menstruation: [
    { text: 'A menstruação é um processo natural. Não é doença nem vergonha.', expression: 'smile' },
    { text: 'Aprender sobre o ciclo e os produtos adequados traz segurança.', expression: 'happy' },
    { text: 'Falar sobre o assunto sem preconceito promove respeito e informação.', expression: 'smile' }
  ],

  ch6_lara_food: [
    { text: 'Alimentação equilibrada influencia disposição e rendimento.', expression: 'happy' },
    { text: 'Alimentos da cultura afro-brasileira e indígena também cuidam do crescimento e do Bem Viver.', expression: 'smile' }
  ],

  ch7_lara_sport: [
    { text: 'Caminhada, esportes e capoeira nos espaços de Camaçari fazem bem ao corpo e à mente.', expression: 'happy' },
    { text: 'Valorizar a cultura afro-brasileira e a convivência fortalece a comunidade.', expression: 'smile' }
  ],

  ch8_lara_emotions: [
    { text: 'Mudanças de humor podem acontecer durante a puberdade. Isso tem relação com hormônios e com a vida.', expression: 'thinking' },
    { text: 'Conversar com família, professores e profissionais de saúde é um caminho saudável.', expression: 'smile' }
  ],

  ch9_lara_choice: [
    { text: 'Diante da influência dos amigos, você pode dizer “não”. Isso também é escolha saudável e respeitosa.', expression: 'thinking' },
    { text: 'O que você decide?', expression: 'neutral' }
  ],

  ch10_lara_myths: [
    { text: 'Verdade ou mito? Nem tudo que se fala sobre a puberdade é verdade.', expression: 'thinking' },
    { text: 'Procure informações confiáveis e baseadas na ciência. A UBS e a escola são boas fontes.', expression: 'smile' }
  ],

  ch11_lara_time: [
    { text: 'Cada adolescente se desenvolve em um ritmo diferente. Isso é normal.', expression: 'happy' },
    { text: 'Respeitar diferenças de identidade, cultura e aparência torna o mundo melhor.', expression: 'smile' }
  ],

  ch12_lara_selfesteem: [
    { text: 'Desenvolver confiança em si mesma e respeitar o próprio corpo é um processo.', expression: 'smile' },
    { text: 'Valorizar a diversidade e a identidade de cada pessoa fortalece a todos.', expression: 'happy' }
  ],

  ch13_lara_habits: [
    { text: 'Higiene, alimentação, sono, estudos, exercícios e lazer em equilíbrio = vida mais saudável.', expression: 'happy' },
    { text: 'Essas escolhas também contribuem para o Bem Viver.', expression: 'smile' }
  ],

  ch14_lara_fair: [
    { text: 'Hora de preparar a apresentação da Feira de Ciências!', expression: 'happy' },
    { text: 'Fale sobre juventude, puberdade, hormônios, hábitos saudáveis e os saberes afro-brasileiros e originários.', expression: 'smile' },
    { text: 'Mostre como ciência e tradição ajudam a cuidar da saúde e de Camaçari.', expression: 'happy' }
  ],

  ch15_lara_end: [
    { text: 'Parabéns, Lara! Você apresentou o projeto e recebeu o certificado.', expression: 'happy' },
    { text: 'A puberdade é uma fase natural. Cuidar do corpo, respeitar diferenças e participar da comunidade fazem parte do crescimento.', expression: 'smile' },
    { text: 'Continue crescendo com confiança e pelo Bem Viver!', expression: 'happy' }
  ],

  // ═══════════════════════════════════════════
  // Escolhas (objeto com lines + choices)
  // ═══════════════════════════════════════════

  choice_peer_pressure: {
    lines: [
      { text: 'Os colegas estão pressionando para você fazer algo que pode não ser legal.', expression: 'thinking' },
      { text: 'O que você faz?', expression: 'neutral' }
    ],
    choices: [
      { text: 'Digo não e sugiro outra atividade', next: 'friend_pressure_good', flags: { good_choice: true }, quest: 'make_choice' },
      { text: 'Acabo cedendo à pressão do grupo', next: 'friend_pressure_bad', flags: { good_choice: false }, quest: 'make_choice' }
    ]
  },

  choice_hygiene: {
    lines: [
      { text: 'Você olha para o banheiro. Está na hora de cuidar da higiene?', expression: 'thinking' }
    ],
    choices: [
      { text: 'Sim, vou cuidar da higiene agora', next: 'ch4_lucas_hygiene_good', routine: 'hygiene', quest: 'do_hygiene' },
      { text: 'Depois eu vejo isso...', next: 'ch4_lucas_hygiene_bad', quest: null }
    ]
  },

  choice_sleep: {
    lines: [
      { text: 'Já é tarde. Dormir ou continuar no celular/jogo?', expression: 'thinking' }
    ],
    choices: [
      { text: 'Vou dormir cedo', next: 'ch5_lucas_sleep_good', routine: 'sleep', quest: 'sleep_well' },
      { text: 'Só mais um pouco...', next: 'ch5_lucas_sleep_bad', quest: null }
    ]
  },

  choice_food: {
    lines: [
      { text: 'Na hora da refeição, o que você escolhe?', expression: 'thinking' }
    ],
    choices: [
      { text: 'Alimentação equilibrada', next: 'ch6_lucas_food_good', routine: 'eat_healthy', quest: 'eat_healthy' },
      { text: 'Doces e refrigerante', next: 'ch6_lucas_food_bad', routine: 'eat_junk', quest: null }
    ]
  },

  choice_advice: {
    lines: [
      { text: 'Um(a) colega está preocupado(a) com as mudanças do corpo e pede sua opinião.', expression: 'thinking' }
    ],
    choices: [
      { text: 'Oriento a conversar com adulto de confiança / UBS', next: 'friend_advice_good', quest: 'help_doubt' },
      { text: 'Falo que não é nada e para não se preocupar', next: 'friend_chat', quest: null }
    ]
  },

  // ═══════════════════════════════════════════
  // Quiz – Mitos e Verdades
  // ═══════════════════════════════════════════

  quiz_myths_intro: [
    { text: 'Vamos testar o que você sabe! Responda com calma.', expression: 'happy' }
  ],

  quiz_myth_1: {
    lines: [
      { text: '“Todo mundo entra na puberdade na mesma idade.” Isso é:', expression: 'thinking' }
    ],
    choices: [
      { text: 'Mito – cada pessoa tem seu ritmo', next: 'quiz_myth_1_ok', correct: true },
      { text: 'Verdade – todos começam iguais', next: 'quiz_myth_1_bad', correct: false }
    ]
  },

  quiz_myth_1_ok: [
    { text: 'Isso mesmo! Cada corpo tem seu tempo. Não existe atraso ou pressa.', expression: 'happy' }
  ],

  quiz_myth_1_bad: [
    { text: 'Na verdade é mito. O desenvolvimento varia bastante de pessoa para pessoa.', expression: 'smile' }
  ],

  quiz_myth_2: {
    lines: [
      { text: '“Conversar sobre menstruação é vergonhoso.” Isso é:', expression: 'thinking' }
    ],
    choices: [
      { text: 'Mito – é saúde e informação', next: 'quiz_myth_2_ok', correct: true },
      { text: 'Verdade – melhor não falar', next: 'quiz_myth_2_bad', correct: false }
    ]
  },

  quiz_myth_2_ok: [
    { text: 'Correto! Falar sobre o corpo com respeito é fundamental.', expression: 'happy' }
  ],

  quiz_myth_2_bad: [
    { text: 'É mito. Informação e diálogo diminuem o preconceito e aumentam o cuidado.', expression: 'smile' }
  ],

  quiz_myth_3: {
    lines: [
      { text: '“Atividade física não ajuda no humor.” Isso é:', expression: 'thinking' }
    ],
    choices: [
      { text: 'Mito – exercício melhora o humor', next: 'quiz_myth_3_ok', correct: true },
      { text: 'Verdade – não muda nada', next: 'quiz_myth_3_bad', correct: false }
    ]
  },

  quiz_myth_3_ok: [
    { text: 'Isso! Mover o corpo libera substâncias que melhoram o bem-estar.', expression: 'happy' }
  ],

  quiz_myth_3_bad: [
    { text: 'É mito. Esporte e caminhada ajudam bastante no humor e na energia.', expression: 'smile' }
  ],

  // ═══════════════════════════════════════════
  // Ações secundárias
  // ═══════════════════════════════════════════

  feed_dog: [
    { text: 'O caramelo abana o rabo feliz! Ele adora um carinho e uma ração.', expression: 'happy' },
    { text: 'Cuidar dos animais também é uma forma de carinho com a comunidade.', expression: 'smile' }
  ],

  feed_cat: [
    { text: 'O gato come tranquilamente. Mais um felino alimentado na cidade!', expression: 'happy' }
  ],

  clean_plaza: [
    { text: 'Você recolhe o lixo da praça. O espaço fica mais bonito e saudável para todos.', expression: 'happy' },
    { text: 'Cuidar do território é parte do Bem Viver.', expression: 'smile' }
  ],

  plant_tree: [
    { text: 'Você planta uma muda. Um dia essa árvore vai dar sombra e ar puro.', expression: 'happy' },
    { text: 'Pequenas ações de hoje constroem o Camaçari de amanhã.', expression: 'smile' }
  ],

  rain_shelter: [
    { text: 'A chuva veio forte. Você encontra abrigo e aproveita para conversar sobre cuidados com a saúde.', expression: 'thinking' },
    { text: 'Em dias chuvosos, manter-se seco ajuda a prevenir resfriados.', expression: 'smile' }
  ],

  night_safe: [
    { text: 'A noite caiu. Voltar para casa com atenção e pelos caminhos conhecidos é mais seguro.', expression: 'thinking' },
    { text: 'Você chega bem. Boa noite!', expression: 'happy' }
  ],

  default: [
    { text: '...', expression: 'neutral' },
    { text: 'Hmm, não tenho muito a dizer sobre isso agora.', expression: 'thinking' }
  ]
};

/** role do NPC → chave de diálogo padrão */
export const NPC_DEFAULT_DIALOGUE = {
  teacher: 'teacher_intro',
  nurse: 'nurse_intro',
  family: 'family_talk',
  friend: 'friend_chat',
  sports: 'sports_talk',
  community: 'community',
  elder: 'elder_wisdom',
  shop: 'shop_hello'
};

/** Diálogos extras por capítulo (varia conforme progresso) */
export const CHAPTER_NPC_DIALOGUES = {
  2: { teacher: 'teacher_hormones' },
  3: { family: 'family_puberty', nurse: 'nurse_intro' },
  4: { nurse: 'nurse_hygiene' },
  5: { nurse: 'nurse_menstruation' },
  6: { shop: 'shop_food_culture' },
  7: { sports: 'sports_capoeira' },
  8: { teacher: 'teacher_emotions', family: 'family_emotions', nurse: 'nurse_emotions' },
  9: { friend: 'choice_peer_pressure' },
  10: { nurse: 'nurse_myths', teacher: 'teacher_hormones' },
  11: { teacher: 'teacher_respect', friend: 'friend_respect' },
  13: { friend: 'choice_advice', community: 'community' },
  14: { teacher: 'teacher_fair' }
};

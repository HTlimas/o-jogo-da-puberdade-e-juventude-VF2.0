/**
 * Missões secundárias – Lucas e Lara
 */

export const SIDE_QUESTS = {
  lucas: [
    { id: 'sq_hygiene_kit', title: 'Kit de Higiene', desc: 'Encontrar sabonete, escova de dentes e desodorante.', type: 'collect', targets: ['soap', 'toothbrush', 'deodorant'], reward: { hygiene: 10, money: 5 } },
    { id: 'sq_bath_streak', title: 'Hora do Banho', desc: 'Manter higiene por 3 dias.', type: 'streak', target: 'hygieneDone', count: 3, reward: { hygiene: 15, happiness: 8 } },
    { id: 'sq_acne', title: 'Espinhas? E Agora?', desc: 'Conversar com a enfermeira sobre acne.', type: 'talk', target: 'nurse', reward: { knowledge: 8 } },
    { id: 'sq_sleep_streak', title: 'Dormir Faz Bem', desc: 'Dormir no horário por 3 dias.', type: 'streak', target: 'sleptWell', count: 3, reward: { energy: 15, health: 8 } },
    { id: 'sq_breakfast', title: 'Energia para o Dia', desc: 'Tomar café da manhã saudável.', type: 'routine', target: 'eat_healthy', reward: { energy: 10 } },
    { id: 'sq_smart_snack', title: 'Lanche Inteligente', desc: 'Escolher alimentos saudáveis na cantina/mercado.', type: 'buy', target: 'apple', reward: { health: 8 } },
    { id: 'sq_water', title: 'Beba Água', desc: 'Beber água (usar item água).', type: 'use', target: 'water', reward: { health: 5, energy: 5 } },
    { id: 'sq_move', title: 'Mexa-se!', desc: 'Praticar atividade física.', type: 'routine', target: 'exercise', reward: { health: 10, happiness: 8 } },
    { id: 'sq_stretch', title: 'Alongamento', desc: 'Fazer alongamento (descansar com consciência).', type: 'routine', target: 'short_rest', reward: { energy: 8 } },
    { id: 'sq_breathe', title: 'Respire Fundo', desc: 'Aprender técnica de controle de estresse.', type: 'routine', target: 'short_rest', reward: { happiness: 10 } },
    { id: 'sq_myths', title: 'Mitos ou Verdades?', desc: 'Responder perguntas sobre puberdade.', type: 'minigame', target: 'myths', reward: { knowledge: 12 } },
    { id: 'sq_own_time', title: 'Cada Um no Seu Tempo', desc: 'Conversar com 3 colegas sobre ritmos diferentes.', type: 'talk_count', target: 'friend', count: 3, reward: { respect: 12 } },
    { id: 'sq_respect', title: 'Respeito Sempre', desc: 'Ajudar colega que sofreu zombaria.', type: 'talk', target: 'friend', reward: { respect: 15, happiness: 8 } },
    { id: 'sq_advice', title: 'Amigo Confiável', desc: 'Dar bom conselho a um NPC.', type: 'talk', target: 'friend', reward: { respect: 8, happiness: 8 } },
    { id: 'sq_clean_room', title: 'Ajuda em Casa', desc: 'Organizar o quarto (rotina em casa).', type: 'location', target: 'home', reward: { happiness: 6 } },
    { id: 'sq_clean_clothes', title: 'Roupa Limpa', desc: 'Separar roupas (ação em casa).', type: 'location', target: 'home', reward: { hygiene: 5 } },
    { id: 'sq_backpack', title: 'Mochila Organizada', desc: 'Arrumar material escolar.', type: 'location', target: 'school', reward: { knowledge: 5 } },
    { id: 'sq_study', title: 'Dia de Estudos', desc: 'Completar sessão de estudos.', type: 'routine', target: 'study', reward: { knowledge: 12 } },
    { id: 'sq_science', title: 'Professor de Ciências', desc: 'Tirar dúvidas sobre hormônios.', type: 'talk', target: 'teacher', reward: { knowledge: 10 } },
    { id: 'sq_posters', title: 'Corpo em Transformação', desc: 'Encontrar cartazes educativos na escola.', type: 'collect', targets: ['pamphlet'], reward: { knowledge: 8 } },
    { id: 'sq_dog', title: 'Caramelo Feliz', desc: 'Alimentar o cachorro caramelo.', type: 'action', target: 'feed_dog', reward: { happiness: 10 } },
    { id: 'sq_monkey', title: 'Mico Curioso', desc: 'Recuperar objeto levado por um mico.', type: 'action', target: 'monkey', reward: { money: 10, happiness: 8 } },
    { id: 'sq_cats', title: 'Amigo dos Gatos', desc: 'Alimentar 5 gatos da cidade.', type: 'action', target: 'feed_cat', count: 5, reward: { happiness: 15 } },
    { id: 'sq_clean_city', title: 'Cidade Limpa', desc: 'Recolher lixo da praça.', type: 'action', target: 'clean', reward: { respect: 10, happiness: 8 } },
    { id: 'sq_plant', title: 'Natureza Viva', desc: 'Plantar uma árvore.', type: 'action', target: 'plant', reward: { respect: 12, happiness: 10 } },
    { id: 'sq_sunny_walk', title: 'Passeio Saudável', desc: 'Caminhar no parque em dia ensolarado.', type: 'location', target: 'park', weather: 'sunny', reward: { health: 8, happiness: 8 } },
    { id: 'sq_rain', title: 'Dia de Chuva', desc: 'Encontrar abrigo durante a chuva.', type: 'weather', target: 'rainy', reward: { knowledge: 5, health: 5 } },
    { id: 'sq_night', title: 'Noite Tranquila', desc: 'Explorar com segurança à noite.', type: 'period', target: 'night', reward: { energy: -5, knowledge: 5 } },
    { id: 'sq_family_talk', title: 'Boa Companhia', desc: 'Conversar com familiares sobre puberdade.', type: 'talk', target: 'family', reward: { happiness: 12, respect: 8 } },
    { id: 'sq_all_side', title: 'Crescendo Juntos', desc: 'Completar todas as missões secundárias.', type: 'meta', reward: { knowledge: 30, happiness: 20, money: 50 } }
  ],

  lara: [
    { id: 'sq_hygiene_kit_l', title: 'Kit de Higiene', desc: 'Encontrar absorventes, sabonete, escova e desodorante.', type: 'collect', targets: ['pad', 'soap', 'toothbrush', 'deodorant'], reward: { hygiene: 12, money: 5 } },
    { id: 'sq_bath_streak_l', title: 'Hora do Banho', desc: 'Manter rotina de higiene por 3 dias.', type: 'streak', target: 'hygieneDone', count: 3, reward: { hygiene: 15, happiness: 8 } },
    { id: 'sq_skin', title: 'Cuidando da Pele', desc: 'Conversar com a enfermeira sobre pele e espinhas.', type: 'talk', target: 'nurse', reward: { knowledge: 8 } },
    { id: 'sq_sleep_streak_l', title: 'Dormir Bem', desc: 'Dormir no horário por 3 noites.', type: 'streak', target: 'sleptWell', count: 3, reward: { energy: 15, health: 8 } },
    { id: 'sq_breakfast_l', title: 'Café da Manhã Saudável', desc: 'Escolher café da manhã equilibrado.', type: 'routine', target: 'eat_healthy', reward: { energy: 10 } },
    { id: 'sq_smart_snack_l', title: 'Lanche Inteligente', desc: 'Montar lanche saudável.', type: 'buy', target: 'apple', reward: { health: 8 } },
    { id: 'sq_water_l', title: 'Hidratação', desc: 'Beber água ao longo do dia.', type: 'use', target: 'water', reward: { health: 5, energy: 5 } },
    { id: 'sq_move_l', title: 'Mexa-se!', desc: 'Caminhada ou corrida no parque.', type: 'routine', target: 'exercise', reward: { health: 10, happiness: 8 } },
    { id: 'sq_stretch_l', title: 'Alongamento Diário', desc: 'Minijogo de alongamento.', type: 'routine', target: 'short_rest', reward: { energy: 8 } },
    { id: 'sq_relax', title: 'Respire e Relaxe', desc: 'Técnicas para controlar ansiedade.', type: 'routine', target: 'short_rest', reward: { happiness: 10 } },
    { id: 'sq_myths_l', title: 'Mitos ou Verdades?', desc: 'Perguntas sobre puberdade feminina.', type: 'minigame', target: 'myths', reward: { knowledge: 12 } },
    { id: 'sq_unique', title: 'Cada Corpo é Único', desc: 'Conversar com colegas sobre ritmos diferentes.', type: 'talk_count', target: 'friend', count: 3, reward: { respect: 12 } },
    { id: 'sq_respect_l', title: 'Respeito Sempre', desc: 'Ajudar colega que sofreu zombaria.', type: 'talk', target: 'friend', reward: { respect: 15, happiness: 8 } },
    { id: 'sq_good_friend', title: 'Boa Amiga', desc: 'Aconselhar colega preocupada com mudanças.', type: 'talk', target: 'friend', reward: { respect: 8, happiness: 8 } },
    { id: 'sq_room_l', title: 'Organizando o Quarto', desc: 'Arrumar o quarto.', type: 'location', target: 'home', reward: { happiness: 6 } },
    { id: 'sq_clothes_l', title: 'Roupa Limpa', desc: 'Separar roupas limpas e sujas.', type: 'location', target: 'home', reward: { hygiene: 5 } },
    { id: 'sq_backpack_l', title: 'Mochila em Ordem', desc: 'Organizar materiais escolares.', type: 'location', target: 'school', reward: { knowledge: 5 } },
    { id: 'sq_study_l', title: 'Hora de Estudar', desc: 'Completar sessão de estudos.', type: 'routine', target: 'study', reward: { knowledge: 12 } },
    { id: 'sq_ask', title: 'Pergunte sem Vergonha', desc: 'Tirar dúvidas com a professora de Ciências.', type: 'talk', target: 'teacher', reward: { knowledge: 10 } },
    { id: 'sq_posters_l', title: 'Conhecendo Meu Corpo', desc: 'Encontrar cartazes educativos na escola.', type: 'collect', targets: ['pamphlet'], reward: { knowledge: 8 } },
    { id: 'sq_dog_l', title: 'Amiga do Caramelo', desc: 'Alimentar o cachorro caramelo.', type: 'action', target: 'feed_dog', reward: { happiness: 10 } },
    { id: 'sq_monkey_l', title: 'Mico Curioso', desc: 'Recuperar objeto do mico.', type: 'action', target: 'monkey', reward: { money: 10, happiness: 8 } },
    { id: 'sq_cats_l', title: 'Amiga dos Gatos', desc: 'Alimentar 5 gatos.', type: 'action', target: 'feed_cat', count: 5, reward: { happiness: 15 } },
    { id: 'sq_clean_l', title: 'Cidade Limpa', desc: 'Recolher lixo na praça.', type: 'action', target: 'clean', reward: { respect: 10, happiness: 8 } },
    { id: 'sq_plant_l', title: 'Plante o Futuro', desc: 'Plantar uma árvore com a turma.', type: 'action', target: 'plant', reward: { respect: 12, happiness: 10 } },
    { id: 'sq_walk_l', title: 'Passeio Saudável', desc: 'Caminhar no parque em dia ensolarado.', type: 'location', target: 'park', weather: 'sunny', reward: { health: 8, happiness: 8 } },
    { id: 'sq_rain_l', title: 'Chuva de Aprendizado', desc: 'Abrigo na chuva e conversa sobre saúde.', type: 'weather', target: 'rainy', reward: { knowledge: 8, health: 5 } },
    { id: 'sq_night_l', title: 'Noite Tranquila', desc: 'Voltar para casa com segurança à noite.', type: 'period', target: 'night', reward: { energy: -5, knowledge: 5 } },
    { id: 'sq_family_l', title: 'Conversa em Família', desc: 'Conversar com pais/responsáveis sobre puberdade.', type: 'talk', target: 'family', reward: { happiness: 12, respect: 8 } },
    { id: 'sq_menstruation', title: 'Menstruação sem Dúvidas', desc: 'Identificar itens corretos para os dias de menstruação.', type: 'buy', target: 'pad', reward: { knowledge: 12, hygiene: 8 } },
    { id: 'sq_calendar', title: 'Calendário da Saúde', desc: 'Marcar corretamente o calendário do ciclo menstrual.', type: 'minigame', target: 'calendar', reward: { knowledge: 15 } },
    { id: 'sq_selfesteem', title: 'Autoestima', desc: 'Escolher frases positivas para colega insegura.', type: 'minigame', target: 'selfesteem', reward: { happiness: 12, respect: 8 } },
    { id: 'sq_choices', title: 'Boas Escolhas', desc: 'Resolver situações do dia a dia com decisões saudáveis.', type: 'choice', target: 'daily', reward: { knowledge: 8, respect: 8 } },
    { id: 'sq_fair_help', title: 'Feira de Ciências', desc: 'Ajudar na preparação do estande sobre puberdade.', type: 'talk', target: 'teacher', reward: { knowledge: 10, happiness: 8 } },
    { id: 'sq_habits', title: 'Hábitos Saudáveis', desc: 'Um dia inteiro com higiene, alimentação, hidratação e sono em equilíbrio.', type: 'meta_day', reward: { health: 15, energy: 10, hygiene: 10, happiness: 10 } },
    { id: 'sq_inclusion', title: 'Respeito às Diferenças', desc: 'Conversar com alunos diferentes e promover inclusão.', type: 'talk_count', target: 'friend', count: 2, reward: { respect: 15 } },
    { id: 'sq_pamphlets', title: 'Conhecimento é Poder', desc: 'Encontrar todos os folhetos educativos da cidade.', type: 'collect', targets: ['pamphlet'], count: 5, reward: { knowledge: 15 } },
    { id: 'sq_help_npc', title: 'Ajudando Quem Precisa', desc: 'Orientar NPC com dúvidas sobre adolescência.', type: 'talk', target: 'friend', reward: { knowledge: 8, respect: 10 } },
    { id: 'sq_example', title: 'Exemplo para a Turma', desc: 'Completar atividades educativas opcionais.', type: 'meta', reward: { knowledge: 15, respect: 10 } },
    { id: 'sq_all_lara', title: 'Crescendo com Confiança', desc: 'Concluir todas as missões secundárias de Lara.', type: 'meta', reward: { knowledge: 30, happiness: 20, money: 50 } }
  ]
};

/** Itens da economia / lojas */
export const SHOP_ITEMS = {
  market: [
    { id: 'apple', name: 'Maçã', price: 3, desc: 'Fruta fresca e nutritiva.', effect: { health: 5, energy: 3 }, category: 'food' },
    { id: 'banana', name: 'Banana', price: 2, desc: 'Energia rápida e natural.', effect: { energy: 6 }, category: 'food' },
    { id: 'water', name: 'Garrafa de Água', price: 2, desc: 'Hidratação essencial.', effect: { health: 3, energy: 2 }, category: 'food' },
    { id: 'sandwich', name: 'Sanduíche Natural', price: 6, desc: 'Refeição equilibrada.', effect: { health: 8, energy: 10 }, category: 'food' },
    { id: 'candy', name: 'Doce', price: 4, desc: 'Gostoso, mas com moderação.', effect: { happiness: 5, health: -2 }, category: 'food' },
    { id: 'soda', name: 'Refrigerante', price: 5, desc: 'Açúcar em excesso.', effect: { energy: 4, health: -4 }, category: 'food' }
  ],
  pharmacy: [
    { id: 'soap', name: 'Sabonete', price: 5, desc: 'Higiene básica do corpo.', effect: { hygiene: 10 }, category: 'hygiene' },
    { id: 'toothbrush', name: 'Escova de Dentes', price: 6, desc: 'Cuidado bucal diário.', effect: { hygiene: 8 }, category: 'hygiene' },
    { id: 'deodorant', name: 'Desodorante', price: 8, desc: 'Ajuda a controlar o odor.', effect: { hygiene: 12, happiness: 3 }, category: 'hygiene' },
    { id: 'pad', name: 'Absorvente', price: 7, desc: 'Produto de higiene menstrual.', effect: { hygiene: 5, knowledge: 3 }, category: 'hygiene' },
    { id: 'cream', name: 'Creme Hidratante', price: 9, desc: 'Cuidado com a pele.', effect: { hygiene: 6, happiness: 4 }, category: 'hygiene' }
  ],
  bookstore: [
    { id: 'pamphlet', name: 'Folheto Educativo', price: 1, desc: 'Informação confiável sobre puberdade.', effect: { knowledge: 5 }, category: 'education' },
    { id: 'book_health', name: 'Livro de Saúde', price: 15, desc: 'Conteúdo científico acessível.', effect: { knowledge: 15 }, category: 'education' },
    { id: 'notebook', name: 'Caderno', price: 8, desc: 'Para anotar o que aprender.', effect: { knowledge: 3 }, category: 'education' }
  ]
};

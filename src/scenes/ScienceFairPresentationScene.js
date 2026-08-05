import { audio } from '../systems/AudioSystem.js';
/**
 * Apresentação independente para a Feira de Ciências.
 * Não altera save, missões nem progresso da campanha.
 */
export class ScienceFairPresentationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ScienceFairPresentationScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    this.page = 0;

    this.pages = [
      {
        title: 'Crescendo com Confiança',
        body:
          'Projeto educativo em forma de RPG pixel art.\n\n' +
          'Uma aventura sobre adolescência, saúde e Bem Viver,\n' +
          'ambientada em Camaçari, Bahia.\n\n' +
          'Desenvolvido para a Feira de Ciências.'
      },
      {
        title: 'Autores e Escola',
        body:
          'Projeto escolar – Feira de Ciências\n\n' +
          'Escola: (preencher nome da escola)\n' +
          'Disciplina: Ciências / Saúde / Educação\n' +
          'Cidade: Camaçari – Bahia\n\n' +
          'Personagens protagonistas: Lucas Tavares e Lara'
      },
      {
        title: 'Objetivo do Jogo',
        body:
          'Ensinar sobre a puberdade de forma lúdica e segura.\n\n' +
          'O jogador vive a adolescência por meio de decisões\n' +
          'com consequências reais para a saúde, as emoções\n' +
          'e os relacionamentos.\n\n' +
          'Aprender brincando, sem medo e com informação confiável.'
      },
      {
        title: 'Puberdade e Hormônios',
        body:
          'O jogo aborda mudanças físicas e emocionais da adolescência:\n\n' +
          '• Voz, crescimento e pelos\n' +
          '• Hormônios e emoções mais intensas\n' +
          '• Ciclo menstrual (jornada da Lara)\n' +
          '• Mitos × verdades sobre o corpo\n\n' +
          'Tudo com linguagem adequada à idade.'
      },
      {
        title: 'Hábitos Saudáveis',
        body:
          'A rotina diária importa:\n\n' +
          '🧼 Higiene\n' +
          '🍎 Alimentação equilibrada\n' +
          '😴 Sono reparador\n' +
          '⚽ Exercícios físicos\n' +
          '💬 Saúde emocional e diálogo\n\n' +
          'Cada escolha no jogo reforça esses hábitos.'
      },
      {
        title: 'Lucas, Lara e as Escolhas',
        body:
          'Lucas e Lara enfrentam a mesma fase da vida\n' +
          'com perspectivas complementares.\n\n' +
          'Ouvir conselhos, cuidar de si e buscar informação\n' +
          'confiável melhora saúde, energia e felicidade.\n\n' +
          'Ignorar cuidados gera consequências no jogo —\n' +
          'como na vida real.'
      },
      {
        title: 'Missões e Medalhas',
        body:
          '15 capítulos principais para cada protagonista.\n\n' +
          'Missões secundárias: higiene, alimentação, gatos,\n' +
          'limpeza da cidade, plantio, autoestima e muito mais.\n\n' +
          'Medalhas e conquistas celebram boas escolhas\n' +
          'e a conclusão das atividades educativas.'
      },
      {
        title: 'Cidade Viva – Camaçari',
        body:
          'Mapa inspirado em Camaçari (Bahia):\n\n' +
          'Escola SESI · UBS · Mercado · Praça · Casa · Quadra\n\n' +
          'NPCs com rotinas por horário (professora, enfermeira,\n' +
          'família, amigos, comunidade).\n\n' +
          'Clima, ciclo dia/noite e interações no mapa.'
      },
      {
        title: 'Tecnologias',
        body:
          '• HTML5 + CSS3 + JavaScript\n' +
          '• Phaser 3 (engine de jogos 2D)\n' +
          '• Resolução 1280 × 960 · pixel art\n' +
          '• Save em slots + auto-save\n' +
          '• Execução no navegador (Live Server / Python)\n\n' +
          'Projeto aberto à edição no Visual Studio Code.'
      },
      {
        title: 'Resumo Final do Projeto',
        body:
          '✅ Objetivo: educar sobre puberdade com respeito e clareza.\n\n' +
          'O jogador aprende a cuidar do corpo, das emoções\n' +
          'e a buscar informação de qualidade.\n\n' +
          'Conhecer o próprio corpo na adolescência é um ato\n' +
          'de saúde, autonomia e Bem Viver.\n\n' +
          'Agradecemos aos professores, avaliadores e visitantes\n' +
          'da Feira de Ciências. Obrigado por conhecer nosso trabalho!'
      }
    ];

    // Fundo
    this.add.rectangle(0, 0, width, height, 0x0a1628).setOrigin(0);
    this.add.rectangle(0, 0, width, 70, 0x0f3460, 0.95).setOrigin(0);
    this.add.rectangle(0, 68, width, 3, 0xe94560).setOrigin(0);

    this.add.text(width / 2, 28, '🎓 Feira de Ciências – Resumo do Projeto', {
      fontFamily: 'Arial', fontSize: '22px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Painel lateral – indicadores de página
    this.sidePanel = this.add.container(0, 0);
    this.dots = [];
    const sideX = 36;
    this.pages.forEach((_, i) => {
      const dy = 110 + i * 36;
      const dot = this.add.circle(sideX, dy, 8, i === 0 ? 0xe94560 : 0x455a64)
        .setInteractive({ useHandCursor: true });
      const num = this.add.text(sideX + 18, dy, String(i + 1), {
        fontSize: '13px', color: '#a2d2ff'
      }).setOrigin(0, 0.5);
      dot.on('pointerdown', () => this.goTo(i));
      this.sidePanel.add([dot, num]);
      this.dots.push(dot);
    });

    // Área de conteúdo
    this.panel = this.add.rectangle(width / 2 + 20, height / 2 - 10, width - 160, height - 200, 0x12263a, 0.92)
      .setStrokeStyle(2, 0xa2d2ff);

    this.titleText = this.add.text(width / 2 + 20, 120, '', {
      fontFamily: 'Arial Black, Arial',
      fontSize: '28px',
      color: '#e94560',
      align: 'center',
      wordWrap: { width: width - 220 }
    }).setOrigin(0.5, 0);

    this.bodyText = this.add.text(width / 2 + 20, 180, '', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#e3f2fd',
      align: 'center',
      lineSpacing: 8,
      wordWrap: { width: width - 260 }
    }).setOrigin(0.5, 0);

    this.pageLabel = this.add.text(width / 2 + 20, height - 100, '', {
      fontSize: '14px', color: '#90a4ae'
    }).setOrigin(0.5);

    // Navegação
    this.prevBtn = this.makeNavBtn(width / 2 - 160, height - 50, '◀ Anterior', () => this.goTo(this.page - 1));
    this.nextBtn = this.makeNavBtn(width / 2 + 160, height - 50, 'Próximo ▶', () => this.goTo(this.page + 1));
    this.backBtn = this.makeNavBtn(width / 2, height - 50, '⬅ Menu Principal', () => {
      this.scene.start('TitleScene');
    }, 0x455a64);

    this.input.keyboard.on('keydown-LEFT', () => this.goTo(this.page - 1));
    this.input.keyboard.on('keydown-RIGHT', () => this.goTo(this.page + 1));
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('TitleScene'));

    this.renderPage();
  }

  makeNavBtn(x, y, label, cb, color = 0xe94560) {
    const bg = this.add.rectangle(x, y, 200, 40, color)
      .setInteractive({ useHandCursor: true })
      .setStrokeStyle(2, 0xffffff);
    const txt = this.add.text(x, y, label, {
      fontSize: '15px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);
    bg.on('pointerover', () => bg.setFillStyle(0xff6b81));
    bg.on('pointerout', () => bg.setFillStyle(color));
    bg.on('pointerdown', cb);
    return { bg, txt };
  }

  goTo(index) {
    if (index < 0 || index >= this.pages.length) return;
    this.page = index;
    audio.uiClick();
    // transição suave
    this.tweens.add({
      targets: [this.titleText, this.bodyText],
      alpha: 0,
      duration: 120,
      onComplete: () => {
        this.renderPage();
        this.tweens.add({ targets: [this.titleText, this.bodyText], alpha: 1, duration: 180 });
      }
    });
  }

  renderPage() {
    const p = this.pages[this.page];
    this.titleText.setText(p.title);
    this.bodyText.setText(p.body);
    this.pageLabel.setText(`Página ${this.page + 1} de ${this.pages.length}`);

    this.dots.forEach((d, i) => d.setFillStyle(i === this.page ? 0xe94560 : 0x455a64));

    // Na última página, destaque no botão voltar
    const last = this.page === this.pages.length - 1;
    this.nextBtn.bg.setVisible(!last);
    this.nextBtn.txt.setVisible(!last);
    this.prevBtn.bg.setVisible(this.page > 0);
    this.prevBtn.txt.setVisible(this.page > 0);
    this.backBtn.bg.setVisible(true);
    this.backBtn.txt.setVisible(true);
    if (last) {
      this.backBtn.bg.setPosition(this.cameras.main.width / 2, this.cameras.main.height - 50);
      this.backBtn.txt.setPosition(this.cameras.main.width / 2, this.cameras.main.height - 50);
      this.backBtn.bg.setFillStyle(0xe94560);
    } else {
      this.backBtn.bg.setPosition(this.cameras.main.width / 2, this.cameras.main.height - 50);
      this.backBtn.txt.setPosition(this.cameras.main.width / 2, this.cameras.main.height - 50);
      this.backBtn.bg.setFillStyle(0x455a64);
    }
  }
}

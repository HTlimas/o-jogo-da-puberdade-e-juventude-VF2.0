/**
 * InteriorScene – interiores ricos (casa, escola, UBS, mercado)
 * Sem alterar sistemas de missão/diálogo externos.
 */
export class InteriorScene extends Phaser.Scene {
  constructor() {
    super({ key: 'InteriorScene' });
  }

  init(data) {
    this.interiorType = data.type || 'home';
    this.returnScene = data.returnScene || 'WorldScene';
  }

  create() {
    const { width, height } = this.cameras.main;
    const configs = {
      home: {
        title: 'Casa',
        wall: 0x6d4c41,
        floor: 0xd7ccc8,
        accent: 0x8d6e63,
        message: 'Sua casa em Camaçari. Descanse e cuide da rotina.',
        npcs: [{ name: 'Mãe', role: 'family', dialogue: 'family_talk', key: 'npc_2', x: 0.68, y: 0.58 }]
      },
      school: {
        title: 'Escola SESI Milton Santos',
        wall: 0x1565c0,
        floor: 0xfff8e1,
        accent: 0x0d47a1,
        message: 'Corredores e sala de aula. Um bom lugar para aprender.',
        npcs: [{ name: 'Professora Mariana', role: 'teacher', dialogue: 'teacher_intro', key: 'npc_0', x: 0.55, y: 0.48 }]
      },
      ubs: {
        title: 'UBS de Camaçari',
        wall: 0x00897b,
        floor: 0xe0f2f1,
        accent: 0x00695c,
        message: 'Unidade Básica de Saúde. Tire dúvidas com a equipe.',
        npcs: [{ name: 'Enfermeira Camila', role: 'nurse', dialogue: 'nurse_intro', key: 'npc_1', x: 0.52, y: 0.55 }]
      },
      market: {
        title: 'Mercado Local',
        wall: 0xef6c00,
        floor: 0xffe0b2,
        accent: 0xe65100,
        message: 'Prateleiras e produtos. Escolhas alimentares importam.',
        npcs: [{ name: 'Vendedor', role: 'shop', dialogue: 'shop_hello', key: 'npc_3', x: 0.6, y: 0.55 }]
      }
    };

    const cfg = configs[this.interiorType] || configs.home;

    // Walls / floor
    this.add.rectangle(0, 0, width, height, cfg.wall).setOrigin(0);
    this.add.rectangle(0, height * 0.42, width, height * 0.58, cfg.floor).setOrigin(0);
    this.add.rectangle(0, height * 0.42 - 6, width, 10, cfg.accent).setOrigin(0);

    // Ceiling shadow
    this.add.rectangle(0, 0, width, 24, 0x000000, 0.25).setOrigin(0);

    // Window with light
    const wx = width * 0.12, wy = height * 0.12;
    this.add.rectangle(wx, wy, 120, 90, 0x81d4fa).setStrokeStyle(5, 0x4e342e);
    this.add.rectangle(wx + 58, wy, 5, 90, 0x4e342e);
    this.add.rectangle(wx, wy + 42, 120, 5, 0x4e342e);
    const light = this.add.circle(wx + 60, wy + 45, 70, 0xfff9c4, 0.08);
    this.tweens.add({ targets: light, alpha: 0.16, duration: 2000, yoyo: true, repeat: -1 });

    // Curtains
    this.add.rectangle(wx - 8, wy, 10, 90, 0xe91e63, 0.7);
    this.add.rectangle(wx + 118, wy, 10, 90, 0xe91e63, 0.7);

    // Furniture by type
    this.drawFurniture(cfg, width, height);

    // Title bar
    this.add.rectangle(width / 2, 36, 520, 52, 0x0a1628, 0.85).setStrokeStyle(2, 0xe94560);
    this.add.text(width / 2, 28, cfg.title, {
      fontFamily: 'Arial Black', fontSize: '26px', color: '#ffffff', stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5);
    this.add.text(width / 2, 52, cfg.message, {
      fontSize: '13px', color: '#a2d2ff', align: 'center', wordWrap: { width: 480 }
    }).setOrigin(0.5);

    // Player
    const charKey = window.gameData?.character || 'lucas';
    this.player = this.add.image(width * 0.32, height * 0.72, charKey).setScale(2.4).setDepth(10);
    this.tweens.add({ targets: this.player, scaleY: 2.5, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    // NPCs
    this.npcs = [];
    cfg.npcs.forEach(n => {
      const spr = this.add.image(width * n.x, height * n.y, n.key || 'npc_0')
        .setScale(2.4).setDepth(10).setInteractive({ useHandCursor: true });
      spr.setData('name', n.name);
      spr.setData('role', n.role);
      spr.setData('dialogue', n.dialogue);
      spr.on('pointerdown', () => this.talk(spr));
      this.npcs.push(spr);
      this.add.text(width * n.x, height * n.y - 48, n.name, {
        fontSize: '13px', color: '#fff', backgroundColor: '#000000aa', padding: { x: 6, y: 3 }
      }).setOrigin(0.5).setDepth(11);
    });

    this.add.text(width / 2, height - 78, '[E] Conversar   ·   Clique no NPC', {
      fontSize: '14px', color: '#e3f2fd'
    }).setOrigin(0.5);

    const exit = this.add.rectangle(width / 2, height - 36, 240, 40, 0xe94560)
      .setInteractive({ useHandCursor: true }).setStrokeStyle(2, 0xffffff);
    this.add.text(width / 2, height - 36, 'Sair (ESC)', {
      fontSize: '17px', color: '#fff', fontStyle: 'bold'
    }).setOrigin(0.5);

    exit.on('pointerdown', () => this.leave());
    this.input.keyboard.on('keydown-ESC', () => this.leave());
    this.input.keyboard.on('keydown-E', () => { if (this.npcs[0]) this.talk(this.npcs[0]); });

    const world = this.scene.get('WorldScene');
    if (world?.questSystem) world.questSystem.onLocation(this.interiorType);
  }

  drawFurniture(cfg, width, height) {
    const type = this.interiorType;
    if (type === 'home') {
      // Sofa
      this.add.rectangle(width * 0.72, height * 0.72, 160, 70, 0x5d4037);
      this.add.rectangle(width * 0.72, height * 0.68, 160, 20, 0x6d4c41);
      // Table + chairs
      this.add.rectangle(width * 0.28, height * 0.7, 100, 55, 0x8d6e63);
      this.add.rectangle(width * 0.22, height * 0.72, 28, 28, 0x6d4c41);
      this.add.rectangle(width * 0.34, height * 0.72, 28, 28, 0x6d4c41);
      // TV
      this.add.rectangle(width * 0.72, height * 0.52, 90, 55, 0x212121);
      this.add.rectangle(width * 0.72, height * 0.52, 70, 40, 0x1565c0);
      // Shelf
      this.add.rectangle(width * 0.12, height * 0.55, 70, 90, 0x795548);
      this.add.rectangle(width * 0.12, height * 0.48, 70, 8, 0x5d4037);
      this.add.rectangle(width * 0.12, height * 0.55, 70, 8, 0x5d4037);
      // Rug
      this.add.ellipse(width * 0.5, height * 0.78, 180, 50, 0xc62828, 0.5);
      // Plant
      this.add.rectangle(width * 0.9, height * 0.65, 18, 30, 0xa1887f);
      this.add.circle(width * 0.9, height * 0.58, 22, 0x2e7d32);
    } else if (type === 'school') {
      // Blackboard
      this.add.rectangle(width * 0.5, height * 0.28, 280, 100, 0x1b5e20).setStrokeStyle(6, 0x5d4037);
      this.add.text(width * 0.5, height * 0.28, 'Bem Viver', { fontSize: '22px', color: '#ffffff' }).setOrigin(0.5);
      // Desks
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
          const dx = width * (0.3 + i * 0.18);
          const dy = height * (0.62 + j * 0.12);
          this.add.rectangle(dx, dy, 70, 40, 0x8d6e63);
          this.add.rectangle(dx, dy - 22, 24, 18, 0x5d4037);
        }
      }
      // Teacher desk
      this.add.rectangle(width * 0.55, height * 0.48, 110, 45, 0x6d4c41);
    } else if (type === 'ubs') {
      // Reception
      this.add.rectangle(width * 0.5, height * 0.62, 200, 60, 0xffffff).setStrokeStyle(3, 0x00897b);
      this.add.text(width * 0.5, height * 0.62, 'Recepção', { fontSize: '16px', color: '#00695c' }).setOrigin(0.5);
      // Chairs waiting
      for (let i = 0; i < 4; i++) {
        this.add.rectangle(width * (0.2 + i * 0.12), height * 0.78, 50, 35, 0x4db6ac);
      }
      // Poster
      this.add.rectangle(width * 0.85, height * 0.3, 80, 100, 0xe0f7fa).setStrokeStyle(3, 0x00897b);
      this.add.text(width * 0.85, height * 0.3, 'Saúde\nAdolescente', {
        fontSize: '12px', color: '#00695c', align: 'center'
      }).setOrigin(0.5);
      // Cabinet
      this.add.rectangle(width * 0.15, height * 0.55, 60, 100, 0xb2dfdb);
    } else if (type === 'market') {
      // Shelves
      for (let i = 0; i < 4; i++) {
        this.add.rectangle(width * (0.2 + i * 0.18), height * 0.55, 80, 120, 0xffcc80);
        this.add.rectangle(width * (0.2 + i * 0.18), height * 0.48, 80, 12, 0xef6c00);
        this.add.rectangle(width * (0.2 + i * 0.18), height * 0.58, 80, 12, 0xef6c00);
      }
      // Counter
      this.add.rectangle(width * 0.7, height * 0.7, 160, 50, 0x5d4037);
      this.add.circle(width * 0.75, height * 0.68, 8, 0xffc107); // fruit
      this.add.circle(width * 0.8, height * 0.68, 8, 0xf44336);
    }
  }

  talk(npc) {
    const world = this.scene.get('WorldScene');
    if (world?.questSystem) world.questSystem.onTalk(npc.getData('role'));
    this.scene.pause();
    this.scene.launch('DialogueScene', {
      speaker: npc.getData('name'),
      dialogueKey: npc.getData('dialogue'),
      npcRole: npc.getData('role'),
      returnScene: 'InteriorScene'
    });
  }

  leave() {
    this.scene.stop();
    this.scene.resume('WorldScene');
  }
}

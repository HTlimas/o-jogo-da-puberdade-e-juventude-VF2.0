import { audio } from '../systems/AudioSystem.js';
import { SaveSystem } from '../systems/SaveSystem.js';
/**
 * DialogueScene – diálogos lineares e com escolhas
 * Usa o banco completo em data/dialogues.js
 */
import { DIALOGUES, NPC_DEFAULT_DIALOGUE, CHAPTER_NPC_DIALOGUES } from '../data/dialogues.js';

export class DialogueScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DialogueScene' });
  }

  init(data) {
    this.speaker = data.speaker || 'NPC';
    this.dialogueKey = data.dialogueKey || 'default';
    this.returnScene = data.returnScene || 'WorldScene';
    this.npcRole = data.npcRole || null;
    this.currentLine = 0;
    this.choiceMode = false;
    this.choiceButtons = [];
    this.lines = [];
    this.choices = null;
  }

  create() {
    const { width, height } = this.cameras.main;

    this.resolveDialogue();

    this.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);

    this.box = this.add.rectangle(width / 2, height - 110, Math.min(width - 80, 1180), 180, 0x0f3460, 0.96)
      .setStrokeStyle(3, 0xa2d2ff)
      .setDepth(10);

    this.nameText = this.add.text(60, height - 185, this.speaker, {
      fontFamily: 'Arial Black',
      fontSize: '20px',
      color: '#e94560',
      backgroundColor: '#0f3460',
      padding: { x: 12, y: 5 }
    }).setDepth(11);

    this.dialogueText = this.add.text(60, height - 150, '', {
      fontFamily: 'Arial',
      fontSize: '17px',
      color: '#ffffff',
      wordWrap: { width: Math.min(width - 120, 1100) },
      lineSpacing: 6
    }).setDepth(11);

    this.hint = this.add.text(width - 50, height - 30, 'Clique ou ESPAÇO', {
      fontSize: '13px',
      color: '#a2d2ff'
    }).setOrigin(1).setDepth(11);

    this.choicesContainer = this.add.container(0, 0).setDepth(12);

    this.showLine();

    this.input.on('pointerdown', () => {
      if (this.choiceMode) return;
      this.nextLine();
    });
    this.input.keyboard.on('keydown-SPACE', () => {
      if (!this.choiceMode) this.nextLine();
    });
    this.input.keyboard.on('keydown-ENTER', () => {
      if (!this.choiceMode) this.nextLine();
    });
  }

  resolveDialogue() {
    let key = this.dialogueKey;

    if (this.npcRole) {
      const chapter = window.gameData?.chapter || 1;
      const chapterMap = CHAPTER_NPC_DIALOGUES[chapter];
      if (chapterMap && chapterMap[this.npcRole]) {
        key = chapterMap[this.npcRole];
      } else if (NPC_DEFAULT_DIALOGUE[this.npcRole]) {
        key = NPC_DEFAULT_DIALOGUE[this.npcRole];
      }
    }

    if (window.gameData?.character === 'lara' && (window.gameData?.chapter || 1) === 5 && this.npcRole === 'nurse') {
      key = 'nurse_menstruation';
    }

    const data = DIALOGUES[key] || DIALOGUES['default'];

    if (data && !Array.isArray(data) && data.lines) {
      this.lines = data.lines;
      this.choices = data.choices || null;
    } else if (Array.isArray(data)) {
      this.lines = data;
      this.choices = null;
    } else {
      this.lines = DIALOGUES.default;
      this.choices = null;
    }

    this.dialogueKey = key;
  }

  showLine() {
    this.clearChoices();

    if (this.currentLine >= this.lines.length) {
      if (this.choices && this.choices.length) {
        this.showChoices();
      } else {
        this.closeDialogue();
      }
      return;
    }

    const line = this.lines[this.currentLine];
    const fullText = line.text || '';

    this.dialogueText.setText('');
    let i = 0;
    if (this.typeEvent) this.typeEvent.remove(false);

    this.typeEvent = this.time.addEvent({
      delay: 22,
      callback: () => {
        this.dialogueText.text += fullText[i];
        if (i % 4 === 0) audio.dialogue();
        i++;
        if (i >= fullText.length) {
          this.typeEvent = null;
        }
      },
      repeat: Math.max(0, fullText.length - 1)
    });
  }

  nextLine() {
    if (this.typeEvent) {
      this.typeEvent.remove(false);
      this.typeEvent = null;
      const line = this.lines[this.currentLine];
      if (line) this.dialogueText.setText(line.text || '');
      return;
    }

    this.currentLine++;
    this.showLine();
  }

  showChoices() {
    this.choiceMode = true;
    this.hint.setText('Clique na opção');
    this.dialogueText.setText('');

    const { width, height } = this.cameras.main;
    const startY = height - 280;

    this.choices.forEach((choice, index) => {
      const y = startY - index * 48;

      const bg = this.add.rectangle(width / 2, y, Math.min(width - 160, 900), 44, 0x16213e)
        .setStrokeStyle(2, 0xe94560)
        .setInteractive({ useHandCursor: true })
        .setDepth(12);

      const label = this.add.text(width / 2, y, choice.text, {
        fontSize: '15px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: Math.min(width - 200, 860) }
      }).setOrigin(0.5).setDepth(13);

      bg.on('pointerover', () => bg.setFillStyle(0x1f4068));
      bg.on('pointerout', () => bg.setFillStyle(0x16213e));
      bg.on('pointerdown', () => this.selectChoice(choice));

      this.choiceButtons.push(bg, label);
      this.choicesContainer.add([bg, label]);
    });
  }

  selectChoice(choice) {
    this.clearChoices();
    this.choiceMode = false;

    if (choice.flags && window.gameData) {
      if (!window.gameData.flags) window.gameData.flags = {};
      Object.assign(window.gameData.flags, choice.flags);
    }

    if (choice.quest) {
      const world = this.scene.get('WorldScene');
      if (world?.questSystem) {
        world.questSystem.completeObjective(choice.quest);
      }
    }

    if (choice.routine) {
      const world = this.scene.get('WorldScene');
      if (world?.routine && world?.timeWeather) {
        world.routine.perform(choice.routine, {
          location: world.currentLocation,
          timeSystem: world.timeWeather
        });
        if (world.questSystem) {
          world.questSystem.onRoutine(choice.routine);
        }
      }
    }

    if (choice.correct === true && window.gameData?.stats) {
      window.gameData.stats.knowledge = Math.min(100, (window.gameData.stats.knowledge || 0) + 5);
    }

    if (choice.next && DIALOGUES[choice.next]) {
      const nextData = DIALOGUES[choice.next];
      this.currentLine = 0;
      if (Array.isArray(nextData)) {
        this.lines = nextData;
        this.choices = null;
      } else if (nextData.lines) {
        this.lines = nextData.lines;
        this.choices = nextData.choices || null;
      }
      this.hint.setText('Clique ou ESPAÇO');
      this.showLine();
    } else {
      this.closeDialogue();
    }
  }

  clearChoices() {
    this.choiceButtons.forEach(b => b.destroy());
    this.choiceButtons = [];
    this.choicesContainer.removeAll(true);
  }

  closeDialogue() {
    if (window.gameData?.stats) {
      window.gameData.stats.knowledge = Math.min(100, (window.gameData.stats.knowledge || 0) + 3);
      window.gameData.stats.happiness = Math.min(100, (window.gameData.stats.happiness || 0) + 2);
    }

    try {
      SaveSystem.autoSave();
    } catch (e) {}

    this.scene.stop();
    this.scene.resume(this.returnScene);
  }
}

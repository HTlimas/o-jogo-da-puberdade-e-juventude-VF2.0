import { SaveSystem } from '../systems/SaveSystem.js';
export class CharacterSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelectScene' });
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(0, 0, width, height, 0x0f3460).setOrigin(0);

        this.add.text(width / 2, 40, 'ESCOLHA SEU PERSONAGEM', {
            fontFamily: 'Arial Black',
            fontSize: '32px',
            color: '#e94560',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(width / 2, 90, 'Cada personagem tem sua própria jornada de aprendizado', {
            fontSize: '16px',
            color: '#a2d2ff'
        }).setOrigin(0.5);

        // Lucas card
        this.createCharacterCard(width / 2 - 260, height / 2 + 40, 'lucas', 'LUCAS TAVARES', 14, 
            'Adolescente curioso que está descobrindo as mudanças do corpo. Gosta de esportes e de aprender sobre saúde.',
            () => this.selectCharacter('lucas'));

        // Lara card
        this.createCharacterCard(width / 2 + 260, height / 2 + 40, 'lara', 'LARA', 14,
            'Estudante de Ciências apaixonada por descobertas. Vai explorar o funcionamento do corpo humano e hormônios.',
            () => this.selectCharacter('lara'));

        // Back button
        const back = this.add.text(40, height - 40, '← Voltar', {
            fontSize: '20px',
            color: '#a2d2ff'
        }).setInteractive({ useHandCursor: true });

        back.on('pointerover', () => back.setColor('#ffffff'));
        back.on('pointerout', () => back.setColor('#a2d2ff'));
        back.on('pointerdown', () => this.scene.start('TitleScene'));
    }

    createCharacterCard(x, y, key, name, age, description, callback) {
        const card = this.add.container(x, y);

        const bg = this.add.rectangle(0, 0, 420, 420, 0x16213e)
            .setStrokeStyle(4, 0xe94560)
            .setInteractive({ useHandCursor: true });

        // Character sprite (placeholder)
        const sprite = this.add.image(0, -80, key).setScale(3);

        const nameText = this.add.text(0, 40, name, {
            fontFamily: 'Arial Black',
            fontSize: '22px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const ageText = this.add.text(0, 70, `${age} anos | SESI Milton Santos`, {
            fontSize: '14px',
            color: '#a2d2ff'
        }).setOrigin(0.5);

        const desc = this.add.text(0, 130, description, {
            fontSize: '14px',
            color: '#cccccc',
            align: 'center',
            wordWrap: { width: 340 }
        }).setOrigin(0.5);

        const selectLabel = this.add.text(0, 170, 'CLIQUE PARA SELECIONAR', {
            fontSize: '14px',
            color: '#e94560',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        card.add([bg, sprite, nameText, ageText, desc, selectLabel]);

        bg.on('pointerover', () => {
            bg.setStrokeStyle(4, 0xff6b81);
            this.tweens.add({ targets: card, scale: 1.05, duration: 150 });
        });

        bg.on('pointerout', () => {
            bg.setStrokeStyle(4, 0xe94560);
            this.tweens.add({ targets: card, scale: 1, duration: 150 });
        });

        bg.on('pointerdown', callback);

        return card;
    }

    selectCharacter(char) {
        window.gameData.character = char;
        window.gameData.player = {
            name: char === 'lucas' ? 'Lucas Tavares' : 'Lara',
            age: 14,
            school: 'SESI Milton Santos'
        };
        window.gameData.chapter = 1;
        window.gameData.stats = {
            health: 100,
            energy: 100,
            knowledge: 0,
            hygiene: 100,
            happiness: 80,
            respect: 50
        };
        window.gameData.inventory = [
            { id: 'pamphlet', name: 'Folheto Educativo', qty: 1, desc: 'Informações básicas sobre puberdade.' }
        ];
        window.gameData.quests = [
            { id: 'main_1', title: 'Um Novo Começo', status: 'active', desc: 'Explore Camaçari e conheça a escola.' }
        ];
        window.gameData.flags = {
            sleptWell: false,
            hygieneDone: false,
            ateBreakfast: false,
            exercisedToday: false
        };
        window.gameData.money = 50;
        window.gameData.day = 1;
        window.gameData.time = 8;
        window.gameData.minutes = 0;
        window.gameData.weather = 'sunny';
        window.gameData.questProgress = {
            chapter: 1,
            chapterObjectives: {},
            sideQuests: {},
            completedSide: [],
            talkCounts: {},
            actionCounts: {},
            streaks: {}
        };

        // Auto save
        SaveSystem.save(1);

        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.time.delayedCall(500, () => {
            this.scene.start('WorldScene');
        });
    }
}

import { audio } from '../systems/AudioSystem.js';
import { fadeIn } from '../systems/SceneUtil.js';
import { SaveSystem } from '../systems/SaveSystem.js';

export class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(0, 0, width, height, 0x071018).setOrigin(0);
        this.add.rectangle(0, 0, width, height * 0.4, 0x0d2137).setOrigin(0).setAlpha(0.9);
        this.add.rectangle(0, height * 0.35, width, height * 0.35, 0x123456, 0.7).setOrigin(0);
        this.add.rectangle(0, height * 0.65, width, height * 0.35, 0x0f3460, 0.95).setOrigin(0);

        const glow = this.add.circle(width * 0.75, height * 0.18, 120, 0xffcc80, 0.12);
        this.tweens.add({ targets: glow, alpha: 0.22, scale: 1.2, duration: 3200, yoyo: true, repeat: -1 });

        for (let i = 0; i < 50; i++) {
            const x = Phaser.Math.Between(0, width);
            const y = Phaser.Math.Between(0, height * 0.55);
            const star = this.add.circle(x, y, Phaser.Math.Between(1, 2), 0xffffff, Phaser.Math.FloatBetween(0.15, 0.5));
            this.tweens.add({ targets: star, alpha: 0.05, y: y - 30, duration: Phaser.Math.Between(2500, 5000), yoyo: true, repeat: -1 });
        }

        if (this.textures.exists('palm')) {
            for (let i = 0; i < 10; i++) {
                const key = i % 3 === 0 ? 'palm' : (i % 2 === 0 ? 'tree_tall' : 'tree');
                this.add.image(60 + i * 130, height * 0.62, key).setScale(2.4).setAlpha(0.4).setTint(0x061018);
            }
        }

        this.add.rectangle(width / 2, height * 0.2, 620, 140, 0x0a1628, 0.55).setStrokeStyle(2, 0xe94560);

        const title = this.add.text(width / 2, height * 0.17, 'CRESCENDO COM\nCONFIANÇA', {
            fontFamily: 'Arial Black, Arial', fontSize: '50px', color: '#e94560',
            align: 'center', stroke: '#000000', strokeThickness: 8, lineSpacing: 6
        }).setOrigin(0.5);
        this.tweens.add({ targets: title, scale: 1.04, duration: 2200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

        this.add.text(width / 2, height * 0.3, 'Camaçari, Bahia · Adolescência, saúde e Bem Viver', {
            fontFamily: 'Arial', fontSize: '17px', color: '#a2d2ff', align: 'center'
        }).setOrigin(0.5);

        const startY = height * 0.40;
        const gap = 62;
        this.createButton(width / 2, startY, 'NOVO JOGO', () => this.scene.start('CharacterSelectScene'));
        this.createButton(width / 2, startY + gap, 'CONTINUAR / SLOTS', () => this.openLoadMenu());
        this.createButton(width / 2, startY + gap * 2, '🎓 FEIRA DE CIÊNCIAS', () => this.scene.start('ScienceFairPresentationScene'));
        this.createButton(width / 2, startY + gap * 3, 'CONFIGURAÇÕES', () => this.showMessage('Use ESC no jogo para pausar e salvar.'));
        this.createButton(width / 2, startY + gap * 4, 'CRÉDITOS', () => this.showMessage('Crescendo com Confiança\nEducativo · Camaçari-BA\nPhaser 3 · 1280×960'));

        this.add.text(width - 16, height - 14, 'v1.3 | 1280×960 | Educativo', {
            fontSize: '13px', color: '#667'
        }).setOrigin(1, 1);

        this.input.setDefaultCursor('pointer');
        fadeIn(this);
        audio.resume();
        audio.startAmbient('day');
    }

    createButton(x, y, text, callback) {
        const btn = this.add.container(x, y);
        const bg = this.add.rectangle(0, 0, 340, 54, 0xe94560)
            .setInteractive({ useHandCursor: true }).setStrokeStyle(2, 0xffcdd2);
        const shine = this.add.rectangle(0, -15, 310, 12, 0xffffff, 0.12);
        const label = this.add.text(0, 0, text, {
            fontFamily: 'Arial', fontSize: '22px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);
        btn.add([bg, shine, label]);
        bg.on('pointerover', () => { bg.setFillStyle(0xff6b81); this.tweens.add({ targets: btn, scale: 1.05, duration: 100 }); });
        bg.on('pointerout', () => { bg.setFillStyle(0xe94560); this.tweens.add({ targets: btn, scale: 1, duration: 100 }); });
        bg.on('pointerdown', () => {
            audio.uiClick();
            this.tweens.add({ targets: btn, scale: 0.96, duration: 50, yoyo: true, onComplete: callback });
        });
        return btn;
    }

    openLoadMenu() {
        const { width, height } = this.cameras.main;
        const overlay = this.add.container(0, 0).setDepth(200);
        overlay.add(this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0).setInteractive());
        overlay.add(this.add.rectangle(width / 2, height / 2, 560, 420, 0x0f3460, 0.98).setStrokeStyle(3, 0xe94560));
        overlay.add(this.add.text(width / 2, height / 2 - 170, 'CARREGAR JOGO', {
            fontSize: '26px', color: '#fff', fontStyle: 'bold'
        }).setOrigin(0.5));

        for (let slot = 1; slot <= 3; slot++) {
            const info = SaveSystem.getInfo(slot);
            const y = height / 2 - 90 + (slot - 1) * 80;
            const label = info
                ? `Slot ${slot}: ${info.name} · Cap. ${info.chapter} · Dia ${info.day}`
                : `Slot ${slot}: (vazio)`;
            const bg = this.add.rectangle(width / 2, y, 480, 56, info ? 0x1a237e : 0x37474f)
                .setInteractive({ useHandCursor: true }).setStrokeStyle(2, 0xa2d2ff);
            const txt = this.add.text(width / 2, y, label, { fontSize: '16px', color: '#fff' }).setOrigin(0.5);
            overlay.add(bg);
            overlay.add(txt);
            if (info) {
                bg.on('pointerover', () => bg.setFillStyle(0xe94560));
                bg.on('pointerout', () => bg.setFillStyle(0x1a237e));
                bg.on('pointerdown', () => {
                    const data = SaveSystem.load(slot);
                    if (data) {
                        window.gameData = data;
                        this.scene.start('WorldScene');
                    }
                });
            }
        }

        const close = this.add.text(width / 2, height / 2 + 170, '[ Fechar ]', {
            fontSize: '16px', color: '#a2d2ff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        overlay.add(close);
        close.on('pointerdown', () => overlay.destroy());
    }

    showMessage(msg) {
        const { width, height } = this.cameras.main;
        const box = this.add.container(width / 2, height / 2).setDepth(200);
        const bg = this.add.rectangle(0, 0, 480, 160, 0x16213e).setStrokeStyle(3, 0xe94560).setInteractive();
        const text = this.add.text(0, -20, msg, {
            fontSize: '17px', color: '#ffffff', align: 'center', wordWrap: { width: 440 }
        }).setOrigin(0.5);
        const ok = this.add.text(0, 50, '[ OK ]', { fontSize: '16px', color: '#a2d2ff' })
            .setOrigin(0.5).setInteractive({ useHandCursor: true });
        box.add([bg, text, ok]);
        ok.on('pointerdown', () => box.destroy());
        bg.on('pointerdown', () => box.destroy());
    }
}

import { audio } from '../systems/AudioSystem.js';
import { SaveSystem } from '../systems/SaveSystem.js';

export class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        const { width, height } = this.cameras.main;
        this.add.rectangle(0, 0, width, height, 0x000000, 0.72).setOrigin(0);
        this.add.rectangle(width / 2, height / 2, 440, 460, 0x0f3460, 0.96).setStrokeStyle(3, 0xe94560);
        this.add.text(width / 2, height / 2 - 190, 'PAUSA', {
            fontFamily: 'Arial Black', fontSize: '34px', color: '#ffffff', stroke: '#000', strokeThickness: 5
        }).setOrigin(0.5);

        const buttons = [
            { label: 'Continuar', action: () => this.resumeGame() },
            { label: 'Salvar Slot 1', action: () => this.saveSlot(1) },
            { label: 'Salvar Slot 2', action: () => this.saveSlot(2) },
            { label: 'Salvar Slot 3', action: () => this.saveSlot(3) },
            { label: 'Som: Liga/Desliga', action: () => this.toggleAudio() },
            { label: 'Menu Principal', action: () => this.toTitle() },
        ];
        buttons.forEach((btn, i) => this.createButton(width / 2, height / 2 - 100 + i * 58, btn.label, btn.action));
        this.input.keyboard.on('keydown-ESC', () => this.resumeGame());
    }

    createButton(x, y, label, callback) {
        const bg = this.add.rectangle(x, y, 300, 48, 0xe94560)
            .setInteractive({ useHandCursor: true }).setStrokeStyle(2, 0xffcdd2);
        this.add.text(x, y, label, { fontSize: '18px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
        bg.on('pointerover', () => bg.setFillStyle(0xff6b81));
        bg.on('pointerout', () => bg.setFillStyle(0xe94560));
        bg.on('pointerdown', callback);
    }

    saveSlot(slot) {
        const ok = SaveSystem.save(slot);
        const { width, height } = this.cameras.main;
        const msg = this.add.text(width / 2, height / 2 + 200, ok ? `Salvo no Slot ${slot}!` : 'Erro ao salvar', {
            fontSize: '16px', color: ok ? '#4caf50' : '#e94560', backgroundColor: '#000000aa', padding: { x: 10, y: 6 }
        }).setOrigin(0.5);
        this.time.delayedCall(1500, () => msg.destroy());
    }

    resumeGame() {
        this.scene.stop();
        this.scene.resume('WorldScene');
    }

    toTitle() {
        SaveSystem.autoSave();
        this.scene.stop('UIScene');
        this.scene.stop('WorldScene');
        this.scene.stop();
        this.scene.start('TitleScene');
    }
}

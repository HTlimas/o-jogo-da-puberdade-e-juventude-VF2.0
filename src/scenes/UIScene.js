export class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        const { width } = this.cameras.main;

        // Premium top bar
        this.add.rectangle(0, 0, width, 64, 0x0a1628, 0.9).setOrigin(0).setScrollFactor(0).setDepth(50);
        this.add.rectangle(0, 62, width, 2, 0xe94560, 0.75).setOrigin(0).setScrollFactor(0).setDepth(50);
        this.add.rectangle(0, 0, width, 1, 0xa2d2ff, 0.3).setOrigin(0).setScrollFactor(0).setDepth(50);

        const name = window.gameData?.player?.name || 'Jogador';
        this.nameText = this.add.text(16, 12, name, {
            fontSize: '18px', color: '#ffffff', fontStyle: 'bold'
        }).setScrollFactor(0).setDepth(51);

        this.healthText = this.add.text(200, 10, '❤️ 100', { fontSize: '15px', color: '#e94560' }).setScrollFactor(0).setDepth(51);
        this.energyText = this.add.text(290, 10, '⚡ 100', { fontSize: '15px', color: '#ffeb3b' }).setScrollFactor(0).setDepth(51);
        this.knowledgeText = this.add.text(380, 10, '📚 0', { fontSize: '15px', color: '#a2d2ff' }).setScrollFactor(0).setDepth(51);
        this.hygieneText = this.add.text(470, 10, '🧼 100', { fontSize: '15px', color: '#4caf50' }).setScrollFactor(0).setDepth(51);
        this.happyText = this.add.text(570, 10, '😊 80', { fontSize: '15px', color: '#ff80ab' }).setScrollFactor(0).setDepth(51);
        this.moneyText = this.add.text(670, 10, '💰 R$ 50', { fontSize: '15px', color: '#ffeb3b' }).setScrollFactor(0).setDepth(51);

        this.weatherText = this.add.text(width - 16, 8, '☀️ Ensolarado', {
            fontSize: '15px', color: '#ffffff'
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(51);

        this.timeText = this.add.text(width - 16, 32, 'Dia 1 | 08:00 | Manhã', {
            fontSize: '13px', color: '#a2d2ff'
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(51);

        this.createHudButton(width - 420, 48, 'Missões (Q)', () => {
            const world = this.scene.get('WorldScene');
            if (world && world.questSystem) {
                this.scene.pause('WorldScene');
                this.scene.launch('QuestLogScene', { questSystem: world.questSystem });
            }
        });
        this.createHudButton(width - 300, 48, 'Rotina (R)', () => {
            const world = this.scene.get('WorldScene');
            if (world && world.openRoutineMenu) world.openRoutineMenu();
        });
        this.createHudButton(width - 170, 48, 'Inventário (I)', () => {
            this.scene.pause('WorldScene');
            this.scene.launch('InventoryScene');
        });
        this.createHudButton(width - 55, 48, 'Mapa (M)', () => {
            this.scene.pause('WorldScene');
            this.scene.launch('MapScene');
        });

        this.input.keyboard.on('keydown-I', () => {
            if (this.scene.isActive('WorldScene') && !this.scene.isPaused('WorldScene')) {
                this.scene.pause('WorldScene');
                this.scene.launch('InventoryScene');
            }
        });
        this.input.keyboard.on('keydown-M', () => {
            if (this.scene.isActive('WorldScene') && !this.scene.isPaused('WorldScene')) {
                this.scene.pause('WorldScene');
                this.scene.launch('MapScene');
            }
        });

        this.time.addEvent({ delay: 400, callback: this.updateHUD, callbackScope: this, loop: true });
    }

    createHudButton(x, y, label, callback) {
        const btn = this.add.text(x, y, label, {
            fontSize: '13px',
            color: '#e3f2fd',
            backgroundColor: '#1a237eee',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setScrollFactor(0).setDepth(51).setInteractive({ useHandCursor: true });

        btn.on('pointerover', () => { btn.setColor('#ffffff'); btn.setBackgroundColor('#e94560cc'); });
        btn.on('pointerout', () => { btn.setColor('#e3f2fd'); btn.setBackgroundColor('#1a237eee'); });
        btn.on('pointerdown', callback);
        return btn;
    }

    updateHUD() {
        if (!window.gameData || !window.gameData.stats) return;
        const s = window.gameData.stats;
        this.healthText.setText(`❤️ ${Math.round(s.health)}`);
        this.energyText.setText(`⚡ ${Math.round(s.energy)}`);
        this.knowledgeText.setText(`📚 ${Math.round(s.knowledge)}`);
        this.hygieneText.setText(`🧼 ${Math.round(s.hygiene)}`);
        this.happyText.setText(`😊 ${Math.round(s.happiness)}`);
        if (this.moneyText) this.moneyText.setText(`💰 R$ ${window.gameData.money || 0}`);

        const day = window.gameData.day || 1;
        const h = Math.floor(window.gameData.time || 8);
        const m = Math.floor(window.gameData.minutes || 0);
        let period = 'Manhã';
        if (h >= 5 && h < 7) period = 'Amanhecer';
        else if (h >= 7 && h < 12) period = 'Manhã';
        else if (h >= 12 && h < 17) period = 'Tarde';
        else if (h >= 17 && h < 19) period = 'Entardecer';
        else period = 'Noite';
        this.timeText.setText(`Dia ${day} | ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')} | ${period}`);

        const weatherIcons = {
            sunny: '☀️ Ensolarado', cloudy: '☁️ Nublado', rainy: '🌧️ Chuvoso',
            storm: '⛈️ Tempestade', foggy: '🌫️ Neblina'
        };
        this.weatherText.setText(weatherIcons[window.gameData.weather || 'sunny'] || weatherIcons.sunny);
    }
}

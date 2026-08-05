export class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MapScene' });
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(0, 0, width, height, 0x0f3460).setOrigin(0);

        this.add.text(width / 2, 30, 'MAPA DE CAMAÇARI', {
            fontFamily: 'Arial Black',
            fontSize: '28px',
            color: '#e94560'
        }).setOrigin(0.5);

        // Simplified map representation
        const locations = [
            { name: 'Escola SESI', x: 150, y: 150, color: 0x4caf50 },
            { name: 'UBS', x: 300, y: 140, color: 0xe91e63 },
            { name: 'Mercado', x: 450, y: 160, color: 0xff9800 },
            { name: 'Praça Central', x: 600, y: 150, color: 0x2196f3 },
            { name: 'Casa', x: 150, y: 320, color: 0x9c27b0 },
            { name: 'Quadra Esportiva', x: 350, y: 350, color: 0x8bc34a },
            { name: 'Igreja', x: 700, y: 320, color: 0xffeb3b },
            { name: 'Rio', x: 550, y: 250, color: 0x00bcd4 },
        ];

        locations.forEach(loc => {
            const circle = this.add.circle(loc.x, loc.y, 25, loc.color)
                .setInteractive({ useHandCursor: true })
                .setStrokeStyle(3, 0xffffff);

            this.add.text(loc.x, loc.y + 40, loc.name, {
                fontSize: '12px',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);

            circle.on('pointerover', () => {
                circle.setScale(1.2);
            });
            circle.on('pointerout', () => {
                circle.setScale(1);
            });
            circle.on('pointerdown', () => {
                this.showLocationInfo(loc.name);
            });
        });

        // Legend
        this.add.text(width / 2, height - 80, 'Clique nos locais para mais informações', {
            fontSize: '14px',
            color: '#a2d2ff'
        }).setOrigin(0.5);

        const close = this.add.text(width / 2, height - 40, '[ Fechar (ESC) ]', {
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        close.on('pointerdown', () => this.close());
        this.input.keyboard.on('keydown-ESC', () => this.close());
    }

    showLocationInfo(name) {
        const infos = {
            'Escola SESI': 'Escola SESI Milton Santos - Onde você estuda e aprende sobre Ciências e saúde.',
            'UBS': 'Unidade Básica de Saúde - Profissionais prontos para tirar dúvidas sobre o corpo e a adolescência.',
            'Mercado': 'Mercado local - Compre alimentos saudáveis e produtos de higiene.',
            'Praça Central': 'Praça - Espaço de lazer, encontros e atividades culturais.',
            'Casa': 'Sua casa - Lugar de descanso, conversas em família e segurança.',
            'Quadra Esportiva': 'Quadra - Pratique esportes, capoeira e mantenha o corpo em movimento.',
            'Igreja': 'Igreja - Espaço de comunidade e reflexão.',
            'Rio': 'Rio que corta a cidade - Natureza e importância do cuidado ambiental.'
        };

        const { width, height } = this.cameras.main;
        const msg = this.add.text(width / 2, height / 2 + 80, infos[name] || name, {
            fontSize: '15px',
            color: '#ffffff',
            backgroundColor: '#16213e',
            padding: { x: 15, y: 10 },
            wordWrap: { width: 500 },
            align: 'center'
        }).setOrigin(0.5);

        this.time.delayedCall(3000, () => msg.destroy());
    }

    close() {
        this.scene.stop();
        this.scene.resume('WorldScene');
    }
}

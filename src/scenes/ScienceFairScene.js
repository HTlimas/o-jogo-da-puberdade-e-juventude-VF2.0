export class ScienceFairScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ScienceFairScene' });
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(0, 0, width, height, 0x1a1a2e).setOrigin(0);

        this.add.text(width / 2, 60, 'FEIRA DE CIÊNCIAS', {
            fontFamily: 'Arial Black',
            fontSize: '36px',
            color: '#e94560'
        }).setOrigin(0.5);

        this.add.text(width / 2, 120, 'Apresente seu projeto sobre puberdade, saúde e Bem Viver!', {
            fontSize: '18px',
            color: '#a2d2ff',
            align: 'center'
        }).setOrigin(0.5);

        // Simple quiz / presentation
        this.add.text(width / 2, 200, 'Você preparou cartazes, maquetes e pesquisou sobre hormônios,\nhigiene, alimentação e respeito às diferenças.', {
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        const presentBtn = this.add.rectangle(width / 2, 320, 300, 50, 0xe94560)
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(3, 0xffffff);

        this.add.text(width / 2, 320, 'APRESENTAR PROJETO', {
            fontSize: '20px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        presentBtn.on('pointerdown', () => {
            this.scene.start('EndingScene');
        });

        presentBtn.on('pointerover', () => presentBtn.setFillStyle(0xff6b81));
        presentBtn.on('pointerout', () => presentBtn.setFillStyle(0xe94560));
    }
}

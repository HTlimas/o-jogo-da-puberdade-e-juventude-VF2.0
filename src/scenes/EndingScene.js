export class EndingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndingScene' });
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(0, 0, width, height, 0x0f3460).setOrigin(0);

        const name = window.gameData?.player?.name || 'Você';

        this.add.text(width / 2, 80, 'PARABÉNS!', {
            fontFamily: 'Arial Black',
            fontSize: '48px',
            color: '#e94560',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(width / 2, 160, `${name} concluiu a jornada!`, {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(width / 2, 220, 
            'A puberdade é uma fase natural do crescimento.\n' +
            'Com conhecimento, diálogo e apoio,\né possível enfrentá-la com segurança e confiança.\n\n' +
            'Cuidar de si, da comunidade e da natureza\ncontribui para uma vida mais saudável e para o Bem Viver.', {
            fontSize: '16px',
            color: '#a2d2ff',
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5);

        // Certificate
        const cert = this.add.rectangle(width / 2, 380, 500, 100, 0x16213e)
            .setStrokeStyle(3, 0xffeb3b);

        this.add.text(width / 2, 360, 'CERTIFICADO DE PARTICIPAÇÃO', {
            fontSize: '18px',
            color: '#ffeb3b',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(width / 2, 395, 'Projeto Educativo - Crescendo com Confiança\nCamaçari, Bahia', {
            fontSize: '14px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Buttons
        this.createButton(width / 2 - 150, 500, 'Menu Principal', () => {
            this.scene.start('TitleScene');
        });

        this.createButton(width / 2 + 150, 500, 'Explorar Livre', () => {
            this.scene.start('WorldScene');
        });
    }

    createButton(x, y, text, callback) {
        const bg = this.add.rectangle(x, y, 220, 45, 0xe94560)
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(2, 0xffffff);

        const label = this.add.text(x, y, text, {
            fontSize: '16px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        bg.on('pointerover', () => bg.setFillStyle(0xff6b81));
        bg.on('pointerout', () => bg.setFillStyle(0xe94560));
        bg.on('pointerdown', callback);
    }
}

export class InventoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InventoryScene' });
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(0, 0, width, height, 0x000000, 0.75).setOrigin(0);

        this.add.text(width / 2, 30, 'INVENTÁRIO', {
            fontFamily: 'Arial Black',
            fontSize: '28px',
            color: '#e94560'
        }).setOrigin(0.5);

        this.add.text(width / 2, 58, 'Clique em um item para usar', {
            fontSize: '13px',
            color: '#a2d2ff'
        }).setOrigin(0.5);

        this.refreshList();

        // Money
        this.moneyText = this.add.text(width / 2, height - 70, `Dinheiro: R$ ${window.gameData?.money || 0}`, {
            fontSize: '16px',
            color: '#ffeb3b'
        }).setOrigin(0.5);

        // Close
        const close = this.add.text(width / 2, height - 35, '[ Fechar (ESC) ]', {
            fontSize: '16px',
            color: '#a2d2ff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        close.on('pointerdown', () => this.close());
        this.input.keyboard.on('keydown-ESC', () => this.close());
    }

    refreshList() {
        if (this.listContainer) {
            this.listContainer.destroy(true);
        }
        this.listContainer = this.add.container(0, 0);

        const { width } = this.cameras.main;
        const inv = window.gameData?.inventory || [];

        if (inv.length === 0) {
            const empty = this.add.text(width / 2, 200, 'Inventário vazio', {
                fontSize: '18px',
                color: '#aaaaaa'
            }).setOrigin(0.5);
            this.listContainer.add(empty);
            return;
        }

        inv.forEach((item, i) => {
            const y = 95 + i * 55;
            const bg = this.add.rectangle(width / 2, y, 640, 52, 0x16213e)
                .setStrokeStyle(2, 0xe94560)
                .setInteractive({ useHandCursor: true });

            const name = this.add.text(width / 2 - 240, y - 8, item.name || 'Item', {
                fontSize: '16px',
                color: '#ffffff'
            });

            const desc = this.add.text(width / 2 - 240, y + 12, (item.desc || '').substring(0, 45), {
                fontSize: '12px',
                color: '#aaaaaa'
            });

            const qty = this.add.text(width / 2 + 200, y, `x${item.qty || 1}`, {
                fontSize: '16px',
                color: '#a2d2ff'
            }).setOrigin(0.5);

            const useLabel = this.add.text(width / 2 + 240, y, 'USAR', {
                fontSize: '12px',
                color: '#a5d6a7',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            bg.on('pointerover', () => bg.setFillStyle(0x1f4068));
            bg.on('pointerout', () => bg.setFillStyle(0x16213e));
            bg.on('pointerdown', () => this.useItem(item.id));

            this.listContainer.add([bg, name, desc, qty, useLabel]);
        });
    }

    useItem(itemId) {
        const world = this.scene.get('WorldScene');
        if (world && world.shopSystem) {
            const result = world.shopSystem.useItem(itemId);
            this.showFeedback(result.message, result.success);
            this.refreshList();
            if (this.moneyText) {
                this.moneyText.setText(`Dinheiro: R$ ${window.gameData?.money || 0}`);
            }
        }
    }

    showFeedback(msg, ok) {
        if (this.fb) this.fb.destroy();
        const { width, height } = this.cameras.main;
        this.fb = this.add.text(width / 2, height - 100, msg, {
            fontSize: '14px',
            color: ok ? '#a5d6a7' : '#ef9a9a',
            backgroundColor: '#000000cc',
            padding: { x: 10, y: 6 }
        }).setOrigin(0.5);
    }

    close() {
        this.scene.stop();
        this.scene.resume('WorldScene');
    }
}

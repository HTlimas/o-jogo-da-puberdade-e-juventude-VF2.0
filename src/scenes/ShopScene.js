export class ShopScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ShopScene' });
  }

  init(data) {
    this.shopType = data.shopType || 'market';
    this.shopTitle = data.title || 'Loja';
    this.shopSystem = data.shopSystem || null;
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.75).setOrigin(0);

    this.add.rectangle(width / 2, height / 2, 560, 460, 0x16213e)
      .setStrokeStyle(4, 0xe94560);

    this.add.text(width / 2, 55, this.shopTitle, {
      fontFamily: 'Arial Black',
      fontSize: '26px',
      color: '#e94560'
    }).setOrigin(0.5);

    this.moneyText = this.add.text(width / 2, 90, `Saldo: R$ ${window.gameData?.money || 0}`, {
      fontSize: '16px',
      color: '#ffeb3b'
    }).setOrigin(0.5);

    const items = this.shopSystem
      ? this.shopSystem.getShopItems(this.shopType)
      : [];

    if (items.length === 0) {
      this.add.text(width / 2, height / 2, 'Loja vazia no momento.', {
        fontSize: '18px',
        color: '#aaaaaa'
      }).setOrigin(0.5);
    } else {
      items.forEach((item, i) => {
        const y = 130 + i * 42;
        const canAfford = (window.gameData?.money || 0) >= item.price;

        const bg = this.add.rectangle(width / 2, y, 500, 38, canAfford ? 0x0f3460 : 0x333333)
          .setStrokeStyle(2, canAfford ? 0xe94560 : 0x555555)
          .setInteractive({ useHandCursor: canAfford });

        this.add.text(width / 2 - 230, y, item.name, {
          fontSize: '15px',
          color: canAfford ? '#ffffff' : '#777777'
        }).setOrigin(0, 0.5);

        this.add.text(width / 2 + 80, y, item.desc.substring(0, 28) + (item.desc.length > 28 ? '…' : ''), {
          fontSize: '12px',
          color: '#aaaaaa'
        }).setOrigin(0, 0.5);

        this.add.text(width / 2 + 220, y, `R$ ${item.price}`, {
          fontSize: '15px',
          color: canAfford ? '#ffeb3b' : '#666666'
        }).setOrigin(1, 0.5);

        if (canAfford) {
          bg.on('pointerover', () => bg.setFillStyle(0x1f4068));
          bg.on('pointerout', () => bg.setFillStyle(0x0f3460));
          bg.on('pointerdown', () => this.buyItem(item));
        }
      });
    }

    const close = this.add.text(width / 2, height - 40, '[ Fechar (ESC) ]', {
      fontSize: '16px',
      color: '#a2d2ff'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    close.on('pointerdown', () => this.close());
    this.input.keyboard.on('keydown-ESC', () => this.close());
  }

  buyItem(item) {
    if (!this.shopSystem) return;
    const result = this.shopSystem.buy(item.id, this.shopType);
    this.showFeedback(result.message, result.success);
    this.moneyText.setText(`Saldo: R$ ${window.gameData?.money || 0}`);
  }

  showFeedback(msg, ok) {
    if (this.fb) this.fb.destroy();
    const { width, height } = this.cameras.main;
    this.fb = this.add.text(width / 2, height - 80, msg, {
      fontSize: '15px',
      color: ok ? '#a5d6a7' : '#ef9a9a',
      backgroundColor: '#000000cc',
      padding: { x: 12, y: 6 }
    }).setOrigin(0.5);
  }

  close() {
    this.scene.stop();
    this.scene.resume('WorldScene');
  }
}

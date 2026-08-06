export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRoundedRect(width / 2 - 160, height / 2 - 25, 320, 50, 10);

        const progressBar = this.add.graphics();

        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Carregando...', {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const percentText = this.add.text(width / 2, height / 2, '0%', {
            font: '18px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xe94560, 1);
            progressBar.fillRoundedRect(width / 2 - 150, height / 2 - 15, 300 * value, 30, 8);
            percentText.setText(Math.round(value * 100) + '%');
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        this.createProceduralAssets();
    }

createProceduralAssets() {
        // Protagonists
        this.createCharacterTexture('lucas', 0x42a5f5, 0x3e2723);
        this.createCharacterTexture('lara', 0xec407a, 0x4a148c);

        // Unique NPCs
        this.createNpcTexture('npc_0', 0x5c6bc0, 0x3e2723, 0xffcc80, { coat: 0xffffff, glasses: true, hairStyle: 'bun', pants: 0x37474f }); // teacher
        this.createNpcTexture('npc_1', 0x26a69a, 0x212121, 0xffdbac, { coat: 0xe0f7fa, hairStyle: 'short', pants: 0xffffff }); // nurse
        this.createNpcTexture('npc_2', 0xab47bc, 0x4e342e, 0xffcc80, { skirt: 0x6a1b9a, hairStyle: 'long' }); // mother
        this.createNpcTexture('npc_3', 0xff7043, 0x212121, 0xffdbac, { apron: true, hairStyle: 'short', pants: 0x5d4037 }); // vendor
        this.createNpcTexture('npc_4', 0x66bb6a, 0x3e2723, 0xffdbac, { bag: 0x1565c0, cap: 0x1b5e20, hairStyle: 'short' }); // friend
        this.createNpcTexture('npc_5', 0xef5350, 0x212121, 0xffcc80, { hairStyle: 'short', pants: 0x212121, shoes: 0xffffff }); // coach
        this.createNpcTexture('npc_6', 0x78909c, 0x9e9e9e, 0xffe0b2, { coat: 0x37474f, hairStyle: 'short' }); // padre/community
        this.createNpcTexture('npc_7', 0x8d6e63, 0xe0e0e0, 0xffe0b2, { skirt: 0x5d4037, hairStyle: 'bun' }); // elder

        this.createRichTiles();
        this.createUITextures();
        this.createItemTextures();
    }

createCharacterTexture(key, bodyColor, hairColor) {
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        // Ground shadow
        g.fillStyle(0x000000, 0.28);
        g.fillEllipse(16, 46, 16, 5);
        // Legs
        g.fillStyle(0x1a237e, 1);
        g.fillRect(10, 33, 5, 12);
        g.fillRect(17, 33, 5, 12);
        // Shoes with highlight
        g.fillStyle(0x212121, 1);
        g.fillRect(9, 43, 7, 4);
        g.fillRect(16, 43, 7, 4);
        g.fillStyle(0x616161, 1);
        g.fillRect(10, 43, 5, 1);
        g.fillRect(17, 43, 5, 1);
        // Torso with shading
        g.fillStyle(bodyColor, 1);
        g.fillRect(8, 16, 16, 18);
        const darker = Phaser.Display.Color.IntegerToColor(bodyColor).darken(18).color;
        g.fillStyle(darker, 0.45);
        g.fillRect(8, 28, 16, 6);
        // Collar / neckline
        g.fillStyle(0xffffff, 0.35);
        g.fillRect(12, 16, 8, 2);
        // Belt
        g.fillStyle(0x4e342e, 1);
        g.fillRect(8, 31, 16, 3);
        g.fillStyle(0xffc107, 1);
        g.fillRect(14, 31, 4, 3);
        // Arms
        g.fillStyle(0xffcc80, 1);
        g.fillRect(4, 17, 4, 14);
        g.fillRect(24, 17, 4, 14);
        // Hands
        g.fillStyle(0xffdbac, 1);
        g.fillRect(4, 29, 4, 3);
        g.fillRect(24, 29, 4, 3);
        // Head
        g.fillStyle(0xffdbac, 1);
        g.fillRect(10, 3, 12, 14);
        // Ears
        g.fillRect(8, 8, 2, 4);
        g.fillRect(22, 8, 2, 4);
        // Hair volume
        g.fillStyle(hairColor, 1);
        g.fillRect(8, 0, 16, 8);
        g.fillRect(7, 4, 3, 6);
        g.fillRect(22, 4, 3, 6);
        g.fillRect(9, 7, 14, 2);
        // Hair shine
        const hairLite = Phaser.Display.Color.IntegerToColor(hairColor).lighten(25).color;
        g.fillStyle(hairLite, 0.5);
        g.fillRect(11, 1, 5, 2);
        // Eyes
        g.fillStyle(0xffffff, 1);
        g.fillRect(11, 8, 4, 4);
        g.fillRect(17, 8, 4, 4);
        g.fillStyle(0x3e2723, 1);
        g.fillRect(12, 9, 2, 3);
        g.fillRect(18, 9, 2, 3);
        g.fillStyle(0xffffff, 1);
        g.fillRect(12, 9, 1, 1);
        g.fillRect(18, 9, 1, 1);
        // Brows
        g.fillStyle(hairColor, 1);
        g.fillRect(11, 7, 4, 1);
        g.fillRect(17, 7, 4, 1);
        // Nose / mouth
        g.fillStyle(0xe0a070, 1);
        g.fillRect(15, 12, 2, 2);
        g.fillStyle(0xc62828, 1);
        g.fillRect(13, 14, 6, 1);
        g.generateTexture(key, 32, 48);
        g.destroy();
    }

    createNpcTexture(key, bodyColor, hairColor, skinColor, extras = {}) {
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        const skin = skinColor || 0xffdbac;
        g.fillStyle(0x000000, 0.25);
        g.fillEllipse(16, 46, 15, 5);
        // Legs / shoes
        g.fillStyle(extras.pants || 0x37474f, 1);
        g.fillRect(10, 33, 5, 12);
        g.fillRect(17, 33, 5, 12);
        g.fillStyle(extras.shoes || 0x212121, 1);
        g.fillRect(9, 43, 7, 4);
        g.fillRect(16, 43, 7, 4);
        // Body
        g.fillStyle(bodyColor, 1);
        g.fillRect(8, 16, 16, 18);
        // Skirt option
        if (extras.skirt) {
            g.fillStyle(extras.skirt, 1);
            g.fillRect(7, 28, 18, 10);
        }
        // Coat / lab
        if (extras.coat) {
            g.fillStyle(extras.coat, 1);
            g.fillRect(6, 16, 20, 20);
            g.fillStyle(bodyColor, 1);
            g.fillRect(12, 18, 8, 10);
        }
        // Belt
        g.fillStyle(0x5d4037, 1);
        g.fillRect(8, 31, 16, 2);
        // Arms
        g.fillStyle(skin, 1);
        g.fillRect(4, 17, 4, 14);
        g.fillRect(24, 17, 4, 14);
        // Head
        g.fillStyle(skin, 1);
        g.fillRect(10, 3, 12, 14);
        // Hair
        g.fillStyle(hairColor, 1);
        if (extras.hairStyle === 'bun') {
            g.fillRect(10, 1, 12, 6);
            g.fillCircle(16, 1, 4);
        } else if (extras.hairStyle === 'short') {
            g.fillRect(9, 1, 14, 6);
        } else if (extras.hairStyle === 'long') {
            g.fillRect(8, 1, 16, 8);
            g.fillRect(7, 8, 4, 10);
            g.fillRect(21, 8, 4, 10);
        } else {
            g.fillRect(8, 0, 16, 8);
            g.fillRect(7, 4, 3, 5);
            g.fillRect(22, 4, 3, 5);
        }
        // Cap
        if (extras.cap) {
            g.fillStyle(extras.cap, 1);
            g.fillRect(8, 0, 16, 5);
            g.fillRect(6, 4, 6, 3);
        }
        // Glasses
        if (extras.glasses) {
            g.fillStyle(0x212121, 1);
            g.fillRect(11, 8, 4, 3);
            g.fillRect(17, 8, 4, 3);
            g.fillRect(15, 9, 2, 1);
        }
        // Eyes
        g.fillStyle(0xffffff, 1);
        g.fillRect(11, 8, 4, 3);
        g.fillRect(17, 8, 4, 3);
        g.fillStyle(0x333333, 1);
        g.fillRect(12, 9, 2, 2);
        g.fillRect(18, 9, 2, 2);
        // Mouth
        g.fillStyle(0xc62828, 1);
        g.fillRect(13, 14, 6, 1);
        // Backpack
        if (extras.bag) {
            g.fillStyle(extras.bag, 1);
            g.fillRect(22, 18, 6, 10);
        }
        g.generateTexture(key, 32, 48);
        g.destroy();
    }

    createRichTiles() {
        for (let v = 0; v < 4; v++) {
            const g = this.make.graphics({ x: 0, y: 0, add: false });
            g.fillStyle(0x3d8b40, 1);
            g.fillRect(0, 0, 32, 32);
            g.fillStyle(0x4caf50, 1);
            for (let i = 0; i < 12; i++) {
                g.fillRect(((i * 7 + v * 3) % 30) + 1, ((i * 11 + v * 5) % 30) + 1, 2, 2);
            }
            g.fillStyle(0x81c784, 0.6);
            for (let i = 0; i < 6; i++) {
                g.fillRect(((i * 13 + v * 2) % 28) + 2, ((i * 9 + v * 7) % 28) + 2, 1, 2);
            }
            if (v === 2) {
                g.fillStyle(0xffeb3b, 1);
                g.fillRect(8, 10, 2, 2);
                g.fillStyle(0xe91e63, 1);
                g.fillRect(22, 18, 2, 2);
            }
            if (v === 3) {
                g.fillStyle(0xffffff, 1);
                g.fillRect(14, 6, 2, 2);
                g.fillStyle(0x9c27b0, 1);
                g.fillRect(6, 22, 2, 2);
            }
            g.generateTexture(v === 0 ? 'grass' : `grass_${v}`, 32, 32);
            g.destroy();
        }

        const path = this.make.graphics({ x: 0, y: 0, add: false });
        path.fillStyle(0xc4a35a, 1);
        path.fillRect(0, 0, 32, 32);
        path.fillStyle(0xb8954a, 1);
        path.fillRect(0, 0, 16, 16);
        path.fillRect(16, 16, 16, 16);
        path.fillStyle(0xd4b36a, 0.5);
        path.fillRect(4, 4, 3, 3);
        path.fillRect(20, 12, 2, 2);
        path.fillRect(10, 22, 3, 2);
        path.generateTexture('path', 32, 32);
        path.destroy();

        const water = this.make.graphics({ x: 0, y: 0, add: false });
        water.fillStyle(0x1565c0, 1);
        water.fillRect(0, 0, 32, 32);
        water.fillStyle(0x1e88e5, 1);
        water.fillRect(0, 4, 32, 4);
        water.fillRect(0, 16, 32, 4);
        water.fillRect(0, 28, 32, 3);
        water.fillStyle(0x42a5f5, 0.5);
        water.fillRect(4, 6, 8, 2);
        water.fillRect(18, 18, 10, 2);
        water.fillStyle(0x90caf9, 0.35);
        water.fillRect(10, 8, 4, 1);
        water.fillRect(22, 20, 5, 1);
        water.generateTexture('water', 32, 32);
        water.destroy();

        const road = this.make.graphics({ x: 0, y: 0, add: false });
        road.fillStyle(0x37474f, 1);
        road.fillRect(0, 0, 32, 32);
        road.fillStyle(0x455a64, 1);
        road.fillRect(0, 0, 32, 2);
        road.fillRect(0, 30, 32, 2);
        road.fillStyle(0xffc107, 1);
        road.fillRect(14, 2, 4, 6);
        road.fillRect(14, 12, 4, 6);
        road.fillRect(14, 22, 4, 6);
        road.generateTexture('road', 32, 32);
        road.destroy();

        const roadH = this.make.graphics({ x: 0, y: 0, add: false });
        roadH.fillStyle(0x37474f, 1);
        roadH.fillRect(0, 0, 32, 32);
        roadH.fillStyle(0x455a64, 1);
        roadH.fillRect(0, 0, 2, 32);
        roadH.fillRect(30, 0, 2, 32);
        roadH.fillStyle(0xffc107, 1);
        roadH.fillRect(2, 14, 6, 4);
        roadH.fillRect(12, 14, 6, 4);
        roadH.fillRect(22, 14, 6, 4);
        roadH.generateTexture('road_h', 32, 32);
        roadH.destroy();

        const build = this.make.graphics({ x: 0, y: 0, add: false });
        build.fillStyle(0xbcaaa4, 1);
        build.fillRect(0, 0, 32, 32);
        build.fillStyle(0xa1887f, 1);
        for (let y = 0; y < 32; y += 8) build.fillRect(0, y, 32, 1);
        for (let x = 0; x < 32; x += 10) build.fillRect(x, 0, 1, 32);
        build.fillStyle(0x5d4037, 1);
        build.fillRect(0, 0, 32, 2);
        build.generateTexture('building', 32, 32);
        build.destroy();

        const roof = this.make.graphics({ x: 0, y: 0, add: false });
        roof.fillStyle(0xc62828, 1);
        roof.fillRect(0, 0, 32, 32);
        roof.fillStyle(0xb71c1c, 1);
        for (let y = 0; y < 32; y += 6) roof.fillRect(0, y, 32, 2);
        roof.fillStyle(0xe53935, 0.5);
        roof.fillRect(0, 0, 32, 4);
        roof.generateTexture('roof', 32, 32);
        roof.destroy();

        const roofB = this.make.graphics({ x: 0, y: 0, add: false });
        roofB.fillStyle(0x1565c0, 1);
        roofB.fillRect(0, 0, 32, 32);
        roofB.fillStyle(0x0d47a1, 1);
        for (let y = 0; y < 32; y += 6) roofB.fillRect(0, y, 32, 2);
        roofB.generateTexture('roof_blue', 32, 32);
        roofB.destroy();

        const win = this.make.graphics({ x: 0, y: 0, add: false });
        win.fillStyle(0x81d4fa, 1);
        win.fillRect(2, 2, 28, 28);
        win.fillStyle(0x4fc3f7, 1);
        win.fillRect(4, 4, 11, 11);
        win.fillRect(17, 4, 11, 11);
        win.fillRect(4, 17, 11, 11);
        win.fillRect(17, 17, 11, 11);
        win.fillStyle(0x5d4037, 1);
        win.fillRect(0, 0, 32, 2);
        win.fillRect(0, 30, 32, 2);
        win.fillRect(0, 0, 2, 32);
        win.fillRect(30, 0, 2, 32);
        win.fillRect(15, 0, 2, 32);
        win.fillRect(0, 15, 32, 2);
        win.generateTexture('window', 32, 32);
        win.destroy();

        const door = this.make.graphics({ x: 0, y: 0, add: false });
        door.fillStyle(0x5d4037, 1);
        door.fillRect(4, 0, 24, 32);
        door.fillStyle(0x4e342e, 1);
        door.fillRect(6, 2, 20, 28);
        door.fillStyle(0xffc107, 1);
        door.fillCircle(22, 18, 2);
        door.generateTexture('door', 32, 32);
        door.destroy();

        const tree = this.make.graphics({ x: 0, y: 0, add: false });
        tree.fillStyle(0x5d4037, 1);
        tree.fillRect(13, 22, 6, 14);
        tree.fillStyle(0x2e7d32, 1);
        tree.fillCircle(16, 14, 12);
        tree.fillStyle(0x388e3c, 1);
        tree.fillCircle(10, 16, 7);
        tree.fillCircle(22, 16, 7);
        tree.fillStyle(0x43a047, 1);
        tree.fillCircle(16, 8, 8);
        tree.fillStyle(0x66bb6a, 0.5);
        tree.fillCircle(12, 10, 3);
        tree.generateTexture('tree', 32, 36);
        tree.destroy();

        const bush = this.make.graphics({ x: 0, y: 0, add: false });
        bush.fillStyle(0x2e7d32, 1);
        bush.fillCircle(10, 20, 9);
        bush.fillCircle(22, 20, 9);
        bush.fillCircle(16, 14, 8);
        bush.fillStyle(0x66bb6a, 0.5);
        bush.fillCircle(12, 16, 3);
        bush.generateTexture('bush', 32, 32);
        bush.destroy();

        const flower = this.make.graphics({ x: 0, y: 0, add: false });
        flower.fillStyle(0x4caf50, 1);
        flower.fillRect(15, 16, 2, 12);
        flower.fillStyle(0xe91e63, 1);
        flower.fillCircle(16, 12, 5);
        flower.fillStyle(0xffeb3b, 1);
        flower.fillCircle(16, 12, 2);
        flower.generateTexture('flower', 32, 32);
        flower.destroy();

        const fence = this.make.graphics({ x: 0, y: 0, add: false });
        fence.fillStyle(0x8d6e63, 1);
        fence.fillRect(0, 12, 32, 3);
        fence.fillRect(0, 22, 32, 3);
        fence.fillRect(4, 8, 3, 20);
        fence.fillRect(14, 8, 3, 20);
        fence.fillRect(24, 8, 3, 20);
        fence.generateTexture('fence', 32, 32);
        fence.destroy();

        const sand = this.make.graphics({ x: 0, y: 0, add: false });
        sand.fillStyle(0xffe082, 1);
        sand.fillRect(0, 0, 32, 32);
        sand.fillStyle(0xffd54f, 1);
        sand.fillRect(0, 0, 16, 16);
        sand.fillRect(16, 16, 16, 16);
        sand.generateTexture('sand', 32, 32);
        sand.destroy();

        const court = this.make.graphics({ x: 0, y: 0, add: false });
        court.fillStyle(0x2e7d32, 1);
        court.fillRect(0, 0, 32, 32);
        court.fillStyle(0xffffff, 0.7);
        court.fillRect(0, 0, 32, 1);
        court.fillRect(0, 31, 32, 1);
        court.fillRect(0, 0, 1, 32);
        court.fillRect(31, 0, 1, 32);
        court.fillRect(15, 0, 2, 32);
        court.generateTexture('court', 32, 32);
        court.destroy();

        const bridge = this.make.graphics({ x: 0, y: 0, add: false });
        bridge.fillStyle(0x6d4c41, 1);
        bridge.fillRect(0, 8, 32, 16);
        bridge.fillStyle(0x5d4037, 1);
        bridge.fillRect(0, 8, 32, 3);
        bridge.fillRect(0, 21, 32, 3);
        bridge.fillStyle(0x8d6e63, 1);
        for (let x = 2; x < 32; x += 6) bridge.fillRect(x, 11, 3, 10);
        bridge.generateTexture('bridge', 32, 32);
        bridge.destroy();
    


        // === EXTRA PREMIUM DECOR ===
        const mk = (key, draw) => {
            const g = this.make.graphics({ x: 0, y: 0, add: false });
            draw(g);
            g.generateTexture(key, 32, 32);
            g.destroy();
        };

        // Palm tree (tall uses 32x48)
        {
            const g = this.make.graphics({ x: 0, y: 0, add: false });
            g.fillStyle(0x6d4c41, 1);
            g.fillRect(14, 18, 4, 18);
            g.fillStyle(0x2e7d32, 1);
            g.fillEllipse(16, 12, 22, 14);
            g.fillStyle(0x43a047, 1);
            g.fillEllipse(8, 14, 10, 8);
            g.fillEllipse(24, 14, 10, 8);
            g.fillEllipse(16, 6, 12, 8);
            g.fillStyle(0x81c784, 0.5);
            g.fillCircle(12, 8, 3);
            g.generateTexture('palm', 32, 40);
            g.destroy();
        }

        // Tall tree
        {
            const g = this.make.graphics({ x: 0, y: 0, add: false });
            g.fillStyle(0x5d4037, 1);
            g.fillRect(13, 20, 6, 16);
            g.fillStyle(0x1b5e20, 1);
            g.fillCircle(16, 12, 14);
            g.fillStyle(0x2e7d32, 1);
            g.fillCircle(8, 14, 8);
            g.fillCircle(24, 14, 8);
            g.fillStyle(0x43a047, 1);
            g.fillCircle(16, 4, 9);
            g.fillStyle(0x000000, 0.2);
            g.fillEllipse(16, 38, 12, 4);
            g.generateTexture('tree_tall', 32, 42);
            g.destroy();
        }

        // Rock
        mk('rock', g => {
            g.fillStyle(0x78909c, 1);
            g.fillEllipse(16, 20, 20, 14);
            g.fillStyle(0x90a4ae, 1);
            g.fillEllipse(14, 17, 10, 7);
            g.fillStyle(0x546e7a, 1);
            g.fillEllipse(20, 22, 8, 5);
        });

        // Street lamp
        mk('lamp', g => {
            g.fillStyle(0x37474f, 1);
            g.fillRect(14, 10, 4, 22);
            g.fillStyle(0x263238, 1);
            g.fillRect(10, 8, 12, 4);
            g.fillStyle(0xfff59d, 1);
            g.fillCircle(16, 6, 5);
            g.fillStyle(0xffffff, 0.5);
            g.fillCircle(15, 5, 2);
        });

        // Bench
        mk('bench', g => {
            g.fillStyle(0x6d4c41, 1);
            g.fillRect(2, 16, 28, 4);
            g.fillRect(4, 20, 3, 8);
            g.fillRect(25, 20, 3, 8);
            g.fillStyle(0x8d6e63, 1);
            g.fillRect(2, 12, 28, 4);
        });

        // Trash bin
        mk('bin', g => {
            g.fillStyle(0x455a64, 1);
            g.fillRoundedRect(8, 8, 16, 22, 3);
            g.fillStyle(0x37474f, 1);
            g.fillRect(6, 8, 20, 4);
            g.fillStyle(0x78909c, 1);
            g.fillRect(12, 14, 8, 2);
        });

        // Sign
        mk('sign', g => {
            g.fillStyle(0x5d4037, 1);
            g.fillRect(14, 16, 4, 16);
            g.fillStyle(0xfff176, 1);
            g.fillRoundedRect(4, 4, 24, 14, 2);
            g.fillStyle(0x5d4037, 1);
            g.fillRect(8, 8, 16, 2);
            g.fillRect(8, 12, 12, 2);
        });

        // Flower pot
        mk('pot', g => {
            g.fillStyle(0xa1887f, 1);
            g.fillRect(10, 18, 12, 12);
            g.fillStyle(0x8d6e63, 1);
            g.fillRect(8, 16, 16, 4);
            g.fillStyle(0x2e7d32, 1);
            g.fillCircle(16, 12, 7);
            g.fillStyle(0xe91e63, 1);
            g.fillCircle(16, 10, 3);
        });

        // Grass tall tuft
        mk('grass_tall', g => {
            g.fillStyle(0x558b2f, 1);
            g.fillRect(8, 14, 2, 16);
            g.fillRect(12, 10, 2, 20);
            g.fillRect(16, 12, 2, 18);
            g.fillRect(20, 16, 2, 14);
            g.fillStyle(0x7cb342, 1);
            g.fillRect(10, 12, 1, 10);
            g.fillRect(18, 14, 1, 12);
        });

        // Water edge foam
        mk('water_edge', g => {
            g.fillStyle(0x1565c0, 1);
            g.fillRect(0, 8, 32, 24);
            g.fillStyle(0x42a5f5, 1);
            g.fillRect(0, 8, 32, 4);
            g.fillStyle(0xe3f2fd, 0.7);
            g.fillRect(2, 6, 6, 2);
            g.fillRect(12, 5, 8, 2);
            g.fillRect(24, 7, 5, 2);
        });

        // Sidewalk
        mk('sidewalk', g => {
            g.fillStyle(0xb0bec5, 1);
            g.fillRect(0, 0, 32, 32);
            g.fillStyle(0x90a4ae, 1);
            g.fillRect(0, 0, 32, 1);
            g.fillRect(0, 15, 32, 1);
            g.fillRect(0, 31, 32, 1);
            g.fillRect(0, 0, 1, 32);
            g.fillRect(15, 0, 1, 32);
            g.fillRect(31, 0, 1, 32);
            g.fillStyle(0xcfd8dc, 0.5);
            g.fillRect(2, 2, 10, 10);
        });

     // Roof green (church accent)
mk('roof_green', g => {
    g.fillStyle(0x2e7d32, 1);
    g.fillRect(0, 0, 32, 32);
    g.fillStyle(0x1b5e20, 1);
    for (let y = 0; y < 32; y += 6) {
        g.fillRect(0, y, 32, 2);
    }
    g.fillStyle(0x66bb6a, 0.4);
    g.fillRect(0, 0, 32, 4);
});

}

createUITextures() {
    const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xe94560, 1);
        g.fillRoundedRect(0, 0, 200, 50, 10);
        g.lineStyle(3, 0xffffff, 0.5);
        g.strokeRoundedRect(0, 0, 200, 50, 10);
        g.generateTexture('button', 200, 50);
        g.destroy();

        const p = this.make.graphics({ x: 0, y: 0, add: false });
        p.fillStyle(0x16213e, 0.95);
        p.fillRoundedRect(0, 0, 400, 300, 15);
        p.lineStyle(4, 0xe94560, 1);
        p.strokeRoundedRect(0, 0, 400, 300, 15);
        p.generateTexture('panel', 400, 300);
        p.destroy();

        const d = this.make.graphics({ x: 0, y: 0, add: false });
        d.fillStyle(0x0f3460, 0.95);
        d.fillRoundedRect(0, 0, 900, 140, 12);
        d.lineStyle(3, 0xa2d2ff, 1);
        d.strokeRoundedRect(0, 0, 900, 140, 12);
        d.generateTexture('dialogue_box', 900, 140);
        d.destroy();

        const c = this.make.graphics({ x: 0, y: 0, add: false });
        c.fillStyle(0xffffff, 1);
        c.fillTriangle(0, 0, 0, 20, 14, 14);
        c.lineStyle(1, 0x000000, 1);
        c.strokeTriangle(0, 0, 0, 20, 14, 14);
        c.generateTexture('cursor', 16, 22);
        c.destroy();

        const h = this.make.graphics({ x: 0, y: 0, add: false });
        h.fillStyle(0xe94560, 1);
        h.fillCircle(8, 8, 8);
        h.generateTexture('icon_health', 16, 16);
        h.destroy();
    }

    createItemTextures() {
        const items = [
            { key: 'item_book', color: 0x8bc34a },
            { key: 'item_apple', color: 0xf44336 },
            { key: 'item_soap', color: 0x03a9f4 },
            { key: 'item_ball', color: 0xff9800 },
            { key: 'item_water', color: 0x00bcd4 },
            { key: 'item_pamphlet', color: 0xffeb3b },
            { key: 'apple', color: 0xf44336 },
            { key: 'soap', color: 0x03a9f4 },
            { key: 'water', color: 0x00bcd4 },
            { key: 'pamphlet', color: 0xffeb3b },
            { key: 'pad', color: 0xf8bbd9 },
            { key: 'toothbrush', color: 0x4fc3f7 },
            { key: 'deodorant', color: 0x80cbc4 },
        ];
        items.forEach(item => {
            const g = this.make.graphics({ x: 0, y: 0, add: false });
            g.fillStyle(item.color, 1);
            g.fillRoundedRect(2, 2, 28, 28, 6);
            g.lineStyle(2, 0xffffff, 0.6);
            g.strokeRoundedRect(2, 2, 28, 28, 6);
            g.generateTexture(item.key, 32, 32);
            g.destroy();
        });
    }

    create() {
        this.scene.start('TitleScene');
    }
}

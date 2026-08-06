import { fadeIn } from '../systems/SceneUtil.js';
import { SaveSystem } from '../systems/SaveSystem.js';
import { TimeWeatherSystem } from '../systems/TimeWeatherSystem.js';
import { RoutineSystem } from '../systems/RoutineSystem.js';
import { QuestSystem } from '../systems/QuestSystem.js';
import { ShopSystem } from '../systems/ShopSystem.js';

export class WorldScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WorldScene' });
        this.player = null;
        this.cursors = null;
        this.wasd = null;
        this.npcs = [];
        this.interactables = [];
        this.currentMap = 'city';
        this.tileSize = 32;
        this.mapWidth = 48;
        this.mapHeight = 36;
        this.timeWeather = null;
        this.routine = null;
        this.questSystem = null;
        this.shopSystem = null;
        this.currentLocation = 'city';
    }

    create() {
        const { width, height } = this.cameras.main;

        // Generate a simple top-down map inspired by the city image
        this.generateMap();
        

        // Sistemas
        this.timeWeather = new TimeWeatherSystem(this);
        this.routine = new RoutineSystem(this);
        this.questSystem = new QuestSystem(this);
        this.shopSystem = new ShopSystem(this);
        this.timeWeather.createVisuals();

        // Hook: quando o dia muda no TimeWeather, avisa o QuestSystem
        const originalOnNewDay = this.timeWeather.onNewDay.bind(this.timeWeather);
        this.timeWeather.onNewDay = () => {
            originalOnNewDay();
            if (this.questSystem) this.questSystem.onNewDay();
        };

        // Player
        const startX = 10 * this.tileSize;
        const startY = 15 * this.tileSize;
        const charKey = window.gameData.character || 'lucas';
        
        this.player = this.physics.add.sprite(startX, startY, charKey);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(18, 24);
        this.player.body.setOffset(7, 20);
        this.player.setDepth(10);
        this.player.setScale(1.6);
       this.createBuildingColliders();
        this.tweens.add({
            targets: this.player,
            scaleY: 1.65,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Camera follow
        this.cameras.main.startFollow(this.player, true, 0.07, 0.07);
        this.cameras.main.setDeadzone(100, 80);
        this.cameras.main.setRoundPixels(true);
        // Auto-save a cada 90s
        this.time.addEvent({
            delay: 90000,
            loop: true,
            callback: () => {
                try { SaveSystem.autoSave(); } catch (e) {}
            }
        });
        this.cameras.main.setDeadzone(80, 60);
        this.cameras.main.setBounds(0, 0, this.mapWidth * this.tileSize, this.mapHeight * this.tileSize);
        this.physics.world.setBounds(0, 0, this.mapWidth * this.tileSize, this.mapHeight * this.tileSize);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.routineKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.questKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        // NPCs
        this.spawnNPCs();
        this.createRoutineHotspots();
        this.createShopZones();
        this.createSideQuestProps();

        // UI Scene (HUD)
        if (!this.scene.isActive('UIScene')) {
            this.scene.launch('UIScene');
        }

        // Input mouse for interaction
        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.tryInteract();
            }
        });

        // Chapter intro
        fadeIn(this);
        this.showChapterIntro();

        // Floating interact prompt
        this.interactPrompt = this.add.text(0, 0, '[E] Interagir', {
            fontSize: '14px',
            color: '#ffffff',
            backgroundColor: '#000000aa',
            padding: { x: 8, y: 4 }
        }).setDepth(100).setVisible(false);
    }

    generateMap() {
        const T = this.tileSize;
        const cx = (x, y) => [x * T + 16, y * T + 16];

        // Grass base with variants
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                const variant = (x * 3 + y * 7) % 4;
                const key = variant === 0 ? 'grass' : `grass_${variant}`;
                this.add.image(...cx(x, y), key).setDepth(0);
            }
        }

        // Horizontal main road
        for (let x = 0; x < this.mapWidth; x++) {
            this.add.image(...cx(x, 12), 'road_h').setDepth(1);
            this.add.image(...cx(x, 13), 'road_h').setDepth(1);
        }
        // Vertical roads
        for (let y = 0; y < this.mapHeight; y++) {
            this.add.image(...cx(8, y), 'road').setDepth(1);
            this.add.image(...cx(20, y), 'road').setDepth(1);
            this.add.image(...cx(32, y), 'road').setDepth(1);
        }

        // River + bridges
        for (let y = 0; y < this.mapHeight; y++) {
            this.add.image(...cx(25, y), 'water').setDepth(1);
            this.add.image(...cx(26, y), 'water').setDepth(1);
        }
        this.add.image(...cx(25, 12), 'bridge').setDepth(2);
        this.add.image(...cx(26, 12), 'bridge').setDepth(2);
        this.add.image(...cx(25, 13), 'bridge').setDepth(2);
        this.add.image(...cx(26, 13), 'bridge').setDepth(2);

        // Helper: detailed building
        const placeBuilding = (bx, by, w, h, label, roofKey = 'roof') => {
            for (let dy = 0; dy < h; dy++) {
                for (let dx = 0; dx < w; dx++) {
                    const px = bx + dx;
                    const py = by + dy;
                    if (dy === 0) {
                        this.add.image(...cx(px, py), roofKey).setDepth(2);
                    } else if (dy === h - 1 && dx === Math.floor(w / 2)) {
                        this.add.image(...cx(px, py), 'door').setDepth(2);
                    } else if (dx === 0 || dx === w - 1 || dy === h - 1) {
                        this.add.image(...cx(px, py), 'building').setDepth(2);
                    } else {
                        this.add.image(...cx(px, py), 'window').setDepth(2);
                    }
                }
            }
            this.add.text((bx + w / 2) * T, (by - 0.4) * T, label, {
                fontSize: '11px',
                color: '#ffffff',
                backgroundColor: '#000000aa',
                padding: { x: 5, y: 2 }
            }).setOrigin(0.5).setDepth(5);
        };

        placeBuilding(2, 2, 5, 4, 'Escola SESI', 'roof_blue');
        placeBuilding(10, 2, 4, 3, 'UBS', 'roof_blue');
        placeBuilding(16, 3, 3, 3, 'Mercado', 'roof');
        placeBuilding(2, 16, 4, 3, 'Casa', 'roof');
        placeBuilding(34, 16, 4, 4, 'Igreja', 'roof');

        // Praça (sand + fountain feel)
        for (let dy = 0; dy < 3; dy++) {
            for (let dx = 0; dx < 4; dx++) {
                this.add.image(...cx(28 + dx, 2 + dy), 'sand').setDepth(1);
            }
        }
        this.add.text(30 * T, 1.5 * T, 'Praça', {
            fontSize: '11px', color: '#ffffff', backgroundColor: '#000000aa', padding: { x: 5, y: 2 }
        }).setOrigin(0.5).setDepth(5);

        // Quadra
        for (let dy = 0; dy < 4; dy++) {
            for (let dx = 0; dx < 6; dx++) {
                this.add.image(...cx(10 + dx, 20 + dy), 'court').setDepth(1);
            }
        }
        this.add.text(13 * T, 19.5 * T, 'Quadra', {
            fontSize: '11px', color: '#ffffff', backgroundColor: '#000000aa', padding: { x: 5, y: 2 }
        }).setOrigin(0.5).setDepth(5);

        // Paths
        for (let x = 2; x < 8; x++) {
            this.add.image(...cx(x, 7), 'path').setDepth(1);
        }
        for (let y = 6; y < 12; y++) {
            this.add.image(...cx(4, y), 'path').setDepth(1);
        }
        for (let x = 2; x < 7; x++) {
            this.add.image(...cx(x, 15), 'path').setDepth(1);
        }

        // Fence around school
        for (let x = 1; x <= 7; x++) {
            this.add.image(...cx(x, 1), 'fence').setDepth(2);
            this.add.image(...cx(x, 6), 'fence').setDepth(2);
        }

        // Trees (fixed-ish positions for denser look, avoid roads/river)
        const treeSpots = [
            [1, 8], [3, 9], [6, 10], [9, 8], [11, 9], [14, 1], [15, 8],
            [17, 10], [19, 7], [22, 3], [23, 8], [27, 6], [29, 8], [31, 4],
            [33, 8], [35, 3], [37, 10], [1, 14], [6, 14], [9, 15], [14, 15],
            [18, 16], [22, 18], [27, 15], [30, 18], [33, 14], [36, 22],
            [1, 22], [3, 25], [7, 24], [17, 25], [22, 22], [28, 24], [35, 26],
            [38, 5], [38, 15], [5, 28], [12, 27], [20, 28], [30, 27]
        ];
        treeSpots.forEach(([tx, ty]) => {
            if (tx >= 0 && tx < this.mapWidth && ty >= 0 && ty < this.mapHeight) {
                this.add.image(...cx(tx, ty), 'tree').setDepth(3);
            }
        });

        // Bushes, flowers, props
        const decor = [
            [3, 6, 'bush'], [7, 5, 'bush'], [12, 6, 'flower'], [18, 2, 'flower'],
            [28, 5, 'bush'], [31, 5, 'flower'], [4, 19, 'bush'], [8, 18, 'flower'],
            [15, 19, 'bush'], [22, 11, 'flower'], [34, 14, 'bush'], [37, 18, 'flower'],
            [9, 22, 'bush'], [16, 23, 'flower'], [1, 17, 'flower'], [27, 1, 'bush'],
            [2, 8, 'grass_tall'], [5, 11, 'grass_tall'], [13, 10, 'grass_tall'],
            [19, 9, 'grass_tall'], [23, 4, 'grass_tall'], [30, 7, 'grass_tall'],
            [36, 9, 'grass_tall'], [7, 17, 'grass_tall'], [14, 18, 'grass_tall'],
            [21, 16, 'rock'], [29, 10, 'rock'], [3, 23, 'rock'], [33, 20, 'rock'],
            [7, 8, 'lamp'], [15, 7, 'lamp'], [22, 9, 'lamp'], [30, 12, 'lamp'],
            [9, 14, 'lamp'], [18, 14, 'lamp'], [28, 14, 'bench'], [29, 14, 'bench'],
            [12, 14, 'bin'], [21, 11, 'bin'], [4, 8, 'sign'], [17, 7, 'sign'],
            [3, 15, 'pot'], [6, 15, 'pot'], [11, 6, 'pot'], [35, 15, 'pot'],
            [2, 10, 'palm'], [38, 8, 'palm'], [38, 20, 'palm'], [1, 26, 'palm'],
            [16, 1, 'tree_tall'], [24, 6, 'tree_tall'], [31, 16, 'tree_tall'],
            [8, 26, 'tree_tall'], [19, 26, 'palm'], [26, 20, 'bush'], [32, 22, 'flower']
        ];
        decor.forEach(([dx, dy, key]) => {
            if (dx >= 0 && dx < this.mapWidth && dy >= 0 && dy < this.mapHeight) {
                this.add.image(...cx(dx, dy), key).setDepth(3);
            }
        });

        // Sidewalks near school and market
        for (let x = 2; x < 8; x++) {
            this.add.image(...cx(x, 6), 'sidewalk').setDepth(1);
        }
        for (let x = 10; x < 14; x++) {
            this.add.image(...cx(x, 5), 'sidewalk').setDepth(1);
        }
        for (let x = 16; x < 19; x++) {
            this.add.image(...cx(x, 6), 'sidewalk').setDepth(1);
        }

        // Water edge foam along river banks
        for (let y = 0; y < this.mapHeight; y++) {
            if (y !== 12 && y !== 13) {
                this.add.image(...cx(24, y), 'water_edge').setDepth(1).setAlpha(0.85);
                this.add.image(...cx(27, y), 'water_edge').setDepth(1).setAlpha(0.85);
            }
        }

        // Subtle ambient: gentle sway on trees (visual only)
        
        // Water shimmer (visual only)
        this.children.list.filter(c => c.texture && c.texture.key === 'water').forEach((spr, i) => {
            this.tweens.add({
                targets: spr,
                alpha: { from: 0.85, to: 1 },
                duration: 1400 + (i % 5) * 200,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
        // Lamp glow pulse
        this.children.list.filter(c => c.texture && c.texture.key === 'lamp').forEach((spr, i) => {
            this.tweens.add({
                targets: spr,
                alpha: { from: 0.75, to: 1 },
                duration: 1800 + i * 100,
                yoyo: true,
                repeat: -1
            });
        });

        this.children.list.filter(c => c.texture && ['tree','palm','tree_tall','bush'].includes(c.texture.key)).slice(0, 25).forEach((spr, i) => {
            this.tweens.add({
                targets: spr,
                angle: { from: -1.5, to: 1.5 },
                duration: 2200 + (i % 7) * 180,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }

    spawnNPCs() {
        const npcData = [
            { x: 12, y: 6, key: 'npc_0', name: 'Professora Mariana', role: 'teacher', dialogue: 'teacher_intro' },
            { x: 11, y: 5, key: 'npc_1', name: 'Enfermeira Camila', role: 'nurse', dialogue: 'health_intro' },
            { x: 4, y: 18, key: 'npc_2', name: 'Mãe', role: 'family', dialogue: 'family_talk' },
            { x: 18, y: 5, key: 'npc_3', name: 'Vendedor', role: 'shop', dialogue: 'shop_hello' },
            { x: 30, y: 5, key: 'npc_4', name: 'Amigo Pedro', role: 'friend', dialogue: 'friend_chat' },
            { x: 15, y: 22, key: 'npc_5', name: 'Treinador', role: 'sports', dialogue: 'sports_talk' },
            { x: 35, y: 18, key: 'npc_6', name: 'Padre', role: 'community', dialogue: 'community' },
            { x: 22, y: 14, key: 'npc_7', name: 'Senhora Rosa', role: 'elder', dialogue: 'elder_wisdom' },
        ];

        npcData.forEach(data => {
            const npc = this.physics.add.sprite(data.x * this.tileSize + 16, data.y * this.tileSize + 16, data.key);
            npc.setImmovable(false);
            npc.setDepth(9);
            npc.setScale(1.5);
            npc.setData('name', data.name);
            npc.setData('role', data.role);
            npc.setData('dialogue', data.dialogue);
            npc.setInteractive({ useHandCursor: true });

            npc.on('pointerdown', () => {
                this.startDialogue(npc);
            });

            this.npcs.push(npc);
            this.physics.add.collider(this.player, npc);
        });
    }

    update(time, delta) {
        if (!this.player) return;

        const speed = 180;
        this.player.setVelocity(0);

        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.player.setVelocityX(speed);
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.player.setVelocityY(speed);
        }

        // Normalize diagonal
        if (this.player.body.velocity.x !== 0 && this.player.body.velocity.y !== 0) {
            this.player.body.velocity.normalize().scale(speed);
        }

        // Interact key
        if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
            this.tryInteract();
        }

        // ESC pause
        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.scene.pause();
            this.scene.launch('PauseScene');
        }

        // Tecla R – menu de rotina
        if (Phaser.Input.Keyboard.JustDown(this.routineKey)) {
            this.openRoutineMenu();
        }

        // Tecla Q – log de missões
        if (Phaser.Input.Keyboard.JustDown(this.questKey)) {
            this.scene.pause();
            this.scene.launch('QuestLogScene', { questSystem: this.questSystem });
        }

        // Tecla F – entrar no interior do local atual
        if (this.enterKey && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            if (['home', 'school', 'ubs', 'market'].includes(this.currentLocation)) {
                this.enterInterior(this.currentLocation);
            }
        }

        // Sistemas
        if (this.timeWeather) {
            this.timeWeather.update(time, delta);
        }
        if (this.routine) {
            // degradação passiva a cada ~6 segundos reais ≈ 0.2h de jogo
            this._decayAcc = (this._decayAcc || 0) + delta;
            if (this._decayAcc > 6000) {
                this.routine.applyPassiveDecay(0.2);
                this._decayAcc = 0;
            }
        }

        // Detecta localização atual pelo tile
        
        // NPC routines (wander)
        this.wanderNPCs(delta);

        this.updateCurrentLocation();

        // Update interact prompt
        this.updateInteractPrompt();
    }

    updateInteractPrompt() {
        let nearest = null;
        let minDist = 50;
        let isHotspot = false;
        let hotspotLabel = '';

        this.npcs.forEach(npc => {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
            if (dist < minDist) {
                minDist = dist;
                nearest = npc;
                isHotspot = false;
            }
        });

        // Hotspots de rotina
        if (this.hotspots) {
            this.hotspots.forEach(h => {
                const dist = Phaser.Math.Distance.Between(
                    this.player.x, this.player.y,
                    h.zone.x, h.zone.y
                );
                if (dist < 55 && dist < minDist) {
                    minDist = dist;
                    nearest = h;
                    isHotspot = true;
                    hotspotLabel = h.label;
                }
            });
        }

        if (this.sideProps) {
            this.sideProps.forEach(z => {
                const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, z.x, z.y);
                if (dist < 50 && dist < minDist) {
                    minDist = dist;
                    nearest = z;
                    isHotspot = true;
                    hotspotLabel = z.getData('label') || 'Interagir';
                }
            });
        }

        if (nearest) {
            this.interactPrompt.setVisible(true);
            if (isHotspot) {
                this.interactPrompt.setPosition(nearest.zone.x, nearest.zone.y - 30);
                this.interactPrompt.setText(`[E] ou Clique – ${hotspotLabel}`);
            } else {
                this.interactPrompt.setPosition(nearest.x, nearest.y - 40);
                this.interactPrompt.setText(`[E] Falar com ${nearest.getData('name')}`);
            }
        } else {
            this.interactPrompt.setVisible(false);
        }
    }

    tryInteract() {
        let nearestNpc = null;
        let nearestHotspot = null;
        let minDist = 50;

        this.npcs.forEach(npc => {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
            if (dist < minDist) {
                minDist = dist;
                nearestNpc = npc;
                nearestHotspot = null;
            }
        });

        if (this.hotspots) {
            this.hotspots.forEach(h => {
                const dist = Phaser.Math.Distance.Between(
                    this.player.x, this.player.y,
                    h.zone.x, h.zone.y
                );
                if (dist < 55 && dist < minDist) {
                    minDist = dist;
                    nearestHotspot = h;
                    nearestNpc = null;
                }
            });
        }

        // side quest props
        if (this.sideProps) {
            let best = null, bd = 50;
            this.sideProps.forEach(z => {
                const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, z.x, z.y);
                if (d < bd) { bd = d; best = z; }
            });
            if (best) {
                this.doSideAction(best.getData('action'), best.getData('label'));
                return;
            }
        }

        if (nearestHotspot) {
            this.openRoutineMenu(nearestHotspot.location);
        } else if (nearestNpc) {
            this.startDialogue(nearestNpc);
        }
    }

    startDialogue(npc) {
        const name = npc.getData('name');
        const dialogueKey = npc.getData('dialogue');
        const role = npc.getData('role');

        // Progresso de missões
        if (this.questSystem && role) {
            this.questSystem.onTalk(role);
        }

        // Se for vendedor, abre loja
        if (role === 'shop') {
            this.openShop('market', 'Mercado Local');
            return;
        }

        this.scene.pause();
        this.scene.launch('DialogueScene', {
            speaker: name,
            dialogueKey: dialogueKey,
            npcRole: role,
            returnScene: 'WorldScene'
        });
    }

    createShopZones() {
        // Zona extra de farmácia perto da UBS
        const pharma = this.add.zone(12 * this.tileSize + 16, 5 * this.tileSize + 16, 40, 40)
            .setInteractive({ useHandCursor: true });
        pharma.on('pointerdown', () => this.openShop('pharmacy', 'Farmácia / UBS'));
        this.add.text(12 * this.tileSize + 16, 5 * this.tileSize - 8, 'Farmácia', {
            fontSize: '11px', color: '#ffffff', backgroundColor: '#00000088', padding: { x: 3, y: 1 }
        }).setOrigin(0.5).setDepth(5);
    }

    openShop(shopType, title) {
        this.scene.pause();
        this.scene.launch('ShopScene', {
            shopType,
            title,
            shopSystem: this.shopSystem
        });
    }

    showChapterIntro() {
        const chapter = window.gameData.chapter || 1;
        const titles = {
            1: 'Capítulo 1 – Um Novo Começo',
            2: 'Capítulo 2 – As Primeiras Mudanças',
            3: 'Capítulo 3 – Conhecendo Meu Corpo',
            4: 'Capítulo 4 – Higiene é Cuidado',
            5: 'Capítulo 5 – Menstruação sem Medo'
        };

        const title = titles[chapter] || `Capítulo ${chapter}`;

        const { width, height } = this.cameras.main;
        const overlay = this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.7).setOrigin(0).setScrollFactor(0).setDepth(200);
        
        const text = this.add.text(width / 2, height / 2, title, {
            fontFamily: 'Arial Black',
            fontSize: '28px',
            color: '#e94560',
            align: 'center',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0).setDepth(201);

        const sub = this.add.text(width / 2, height / 2 + 50, 'Explore a cidade e converse com as pessoas', {
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(201);

        this.time.delayedCall(2500, () => {
            this.tweens.add({
                targets: [overlay, text, sub],
                alpha: 0,
                duration: 800,
                onComplete: () => {
                    overlay.destroy();
                    text.destroy();
                    sub.destroy();
                }
            });
        });
    }

    /** Hotspots de rotina (casa, quadra, etc.) */
    createRoutineHotspots() {
        this.hotspots = [];

        const spots = [
            { x: 4, y: 17, location: 'home', label: 'Casa – Rotina' },
            { x: 12, y: 22, location: 'park', label: 'Quadra – Exercícios' },
            { x: 4, y: 4, location: 'school', label: 'Escola' },
            { x: 11, y: 4, location: 'ubs', label: 'UBS' }
        ];

        spots.forEach(s => {
            const zone = this.add.zone(
                s.x * this.tileSize + 16,
                s.y * this.tileSize + 16,
                48, 48
            ).setInteractive({ useHandCursor: true });

            zone.setData('location', s.location);
            zone.setData('label', s.label);

            // Indicador visual sutil
            const marker = this.add.circle(
                s.x * this.tileSize + 16,
                s.y * this.tileSize + 16,
                10, 0xe94560, 0.35
            ).setDepth(4);

            this.tweens.add({
                targets: marker,
                alpha: 0.15,
                scale: 1.4,
                duration: 1200,
                yoyo: true,
                repeat: -1
            });

            zone.on('pointerdown', () => {
                this.openRoutineMenu(s.location);
            });

            this.hotspots.push({ zone, marker, location: s.location, label: s.label });
        });
    }

    updateCurrentLocation() {
        this.currentLocation = this.currentLocation || 'world';
        if (!this.player) return;

        const px = Math.floor(this.player.x / this.tileSize);
        const py = Math.floor(this.player.y / this.tileSize);
        // market zone
        if (px >= 15 && px <= 19 && py >= 2 && py <= 7) { this.currentLocation = 'market'; return; }

        let loc = 'city';
        if (px >= 2 && px <= 6 && py >= 15 && py <= 19) {
            loc = 'home';
        } else if (px >= 2 && px <= 7 && py >= 2 && py <= 6) {
            loc = 'school';
        } else if (px >= 9 && px <= 14 && py >= 2 && py <= 5) {
            loc = 'ubs';
        } else if (px >= 9 && px <= 16 && py >= 19 && py <= 24) {
            loc = 'park';
        }

        if (loc !== this.currentLocation) {
            this.currentLocation = loc;
            if (this.questSystem && loc !== 'city') {
                this.questSystem.onLocation(loc);
            }
        }
    }

    openRoutineMenu(forcedLocation = null) {
        const loc = forcedLocation || this.currentLocation || 'any';
        this.scene.pause();
        this.scene.launch('RoutineMenuScene', {
            location: loc,
            timeSystem: this.timeWeather,
            routineSystem: this.routine
        });
    }

    /** Chamado por outras cenas se necessário */

    enterInterior(type) {
        this.scene.pause();
        this.scene.launch('InteriorScene', { type, returnScene: 'WorldScene' });
    }

    createSideQuestProps() {
        const T = this.tileSize;
        const props = [
            { x: 29, y: 4, key: 'flower', action: 'feed_cat', label: 'Gato' },
            { x: 30, y: 5, key: 'flower', action: 'feed_cat', label: 'Gato' },
            { x: 28, y: 3, key: 'bush', action: 'feed_dog', label: 'Caramelo' },
            { x: 27, y: 4, key: 'bin', action: 'clean', label: 'Lixo' },
            { x: 31, y: 3, key: 'bin', action: 'clean', label: 'Lixo' },
            { x: 6, y: 25, key: 'tree', action: 'plant', label: 'Plantar' },
        ];
        this.sideProps = [];
        props.forEach(p => {
            const zone = this.add.zone(p.x * T + 16, p.y * T + 16, 40, 40)
                .setInteractive({ useHandCursor: true });
            zone.setData('action', p.action);
            zone.setData('label', p.label);
            zone.on('pointerdown', () => this.doSideAction(p.action, p.label));
            this.sideProps.push(zone);
        });
    }

    doSideAction(action, label) {
        if (this.questSystem) {
            this.questSystem.onAction(action);
            if (action === 'feed_cat' || action === 'feed_dog') {
                this.questSystem.onAction(action);
            }
        }
        const key = action === 'feed_dog' ? 'feed_dog' : action === 'feed_cat' ? 'feed_cat' : action === 'clean' ? 'clean_plaza' : action === 'plant' ? 'plant_tree' : null;
        if (key) {
            this.scene.pause();
            this.scene.launch('DialogueScene', {
                speaker: label || 'Ação',
                dialogueKey: key,
                returnScene: 'WorldScene'
            });
        } else {
            // toast via quest system if available
            if (this.questSystem) this.questSystem.showToast(`${label}: ação realizada!`);
        }
    }



    wanderNPCs(delta) {
        if (!this.npcs) return;
        const hour = Math.floor(window.gameData?.time || 12);
        const isNight = hour >= 19 || hour < 6;
        const isSchoolHours = hour >= 7 && hour < 17;

        this.npcs.forEach(npc => {
            if (!npc.body) return;
            const role = npc.getData('role') || '';
            if (!npc.getData('homeX')) {
                npc.setData('homeX', npc.x);
                npc.setData('homeY', npc.y);
                npc.setData('wanderTimer', Phaser.Math.Between(800, 3000));
                npc.setData('active', true);
            }

            // Rotinas por papel e horário
            let active = true;
            let radius = 48;
            let speed = 35;

            if (role === 'teacher') {
                active = isSchoolHours;
                radius = 40;
            } else if (role === 'nurse') {
                active = hour >= 7 && hour < 18;
                radius = 36;
            } else if (role === 'family') {
                // Mãe fica perto de casa; à noite quase parada
                active = true;
                radius = isNight ? 20 : 40;
                speed = isNight ? 15 : 30;
            } else if (role === 'shop') {
                active = hour >= 8 && hour < 19;
                radius = 30;
            } else if (role === 'friend') {
                active = !isNight;
                radius = 70;
                speed = 50;
            } else if (role === 'sports') {
                active = hour >= 10 && hour < 18;
                radius = 60;
                speed = 45;
            } else if (role === 'elder' || role === 'community') {
                active = hour >= 8 && hour < 20;
                radius = 35;
            }

            // Clima: chuva reduz movimento
            const weather = window.gameData?.weather || 'sunny';
            if (weather === 'rainy' || weather === 'storm') {
                speed *= 0.5;
                radius *= 0.7;
            }

            npc.setData('active', active);
            npc.setAlpha(active ? 1 : 0.35);

            if (!active) {
                npc.setVelocity(0, 0);
                return;
            }

            let timer = npc.getData('wanderTimer') - delta;
            const hx = npc.getData('homeX');
            const hy = npc.getData('homeY');

            if (timer <= 0) {
                const tx = hx + Phaser.Math.Between(-radius, radius);
                const ty = hy + Phaser.Math.Between(-radius, radius);
                const angle = Phaser.Math.Angle.Between(npc.x, npc.y, tx, ty);
                npc.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
                npc.setData('wanderTimer', Phaser.Math.Between(1200, 4000));
                if (Phaser.Math.Distance.Between(npc.x, npc.y, hx, hy) > radius + 20) {
                    const a2 = Phaser.Math.Angle.Between(npc.x, npc.y, hx, hy);
                    npc.setVelocity(Math.cos(a2) * (speed + 10), Math.sin(a2) * (speed + 10));
                }
            } else {
                npc.setData('wanderTimer', timer);
                if (timer < 500) npc.setVelocity(0, 0);
            }
        });
    }



    createBuildingColliders() {
        this.buildingBodies = this.physics.add.staticGroup();
        const T = this.tileSize;
        const blocks = [
            [2, 2, 5, 3], [10, 2, 4, 2], [16, 3, 3, 2], [2, 16, 4, 2], [34, 16, 4, 3],
        ];
        blocks.forEach(([bx, by, w, h]) => {
            const cx = (bx + w / 2) * T;
            const cy = (by + h / 2) * T;
            const body = this.buildingBodies.create(cx, cy, 'building');
            if (body) {
                body.setVisible(false);
                body.setSize(w * T - 8, h * T - 8);
                body.refreshBody();
            }
        });
        this.physics.add.collider(this.player, this.buildingBodies);
    }


    getTimeWeather() {
        return this.timeWeather;
    }

    getRoutine() {
        return this.routine;
    }
}

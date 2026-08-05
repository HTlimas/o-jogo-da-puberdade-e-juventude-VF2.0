/**
 * TimeWeatherSystem.js
 * Gerencia ciclo dia/noite, avanço de tempo e clima.
 * Integrado ao gameData global.
 */

export class TimeWeatherSystem {
    constructor(scene) {
        this.scene = scene;
        this.timeScale = 1;           // 1 = tempo normal (pode acelerar)
        this.minutesPerRealSecond = 2; // 2 minutos de jogo por segundo real
        this.lastUpdate = 0;
        this.weatherTimer = 0;
        this.weatherDuration = 0;

        // Possíveis climas e seus efeitos
        this.weatherTypes = {
            sunny: {
                name: 'Ensolarado',
                icon: '☀️',
                color: 0xfff3b0,
                alpha: 0.0,
                effects: { energy: 0, happiness: +0.02, health: 0 },
                particle: null
            },
            cloudy: {
                name: 'Nublado',
                icon: '☁️',
                color: 0x90a4ae,
                alpha: 0.15,
                effects: { energy: -0.01, happiness: -0.01, health: 0 },
                particle: null
            },
            rainy: {
                name: 'Chuvoso',
                icon: '🌧️',
                color: 0x455a64,
                alpha: 0.35,
                effects: { energy: -0.03, happiness: -0.02, health: -0.01 },
                particle: 'rain'
            },
            storm: {
                name: 'Tempestade',
                icon: '⛈️',
                color: 0x263238,
                alpha: 0.5,
                effects: { energy: -0.05, happiness: -0.04, health: -0.02 },
                particle: 'rain'
            },
            foggy: {
                name: 'Neblina',
                icon: '🌫️',
                color: 0xb0bec5,
                alpha: 0.4,
                effects: { energy: -0.02, happiness: -0.01, health: 0 },
                particle: null
            }
        };

        // Períodos do dia
        this.periods = {
            dawn:   { start: 5,  end: 7,  name: 'Amanhecer',  tint: 0xffcc80 },
            morning:{ start: 7,  end: 12, name: 'Manhã',      tint: 0xfff8e1 },
            afternoon:{start:12, end: 17, name: 'Tarde',      tint: 0xffe0b2 },
            evening:{ start: 17, end: 19, name: 'Entardecer', tint: 0xff8a65 },
            night:  { start: 19, end: 5,  name: 'Noite',      tint: 0x1a237e }
        };

        this.overlay = null;
        this.rainEmitter = null;
        this.initFromGameData();
    }

    initFromGameData() {
        if (!window.gameData) return;

        if (typeof window.gameData.time !== 'number') {
            window.gameData.time = 8; // 08:00
        }
        if (typeof window.gameData.day !== 'number') {
            window.gameData.day = 1;
        }
        if (!window.gameData.weather) {
            window.gameData.weather = 'sunny';
        }
        if (!window.gameData.minutes) {
            window.gameData.minutes = 0;
        }
    }

    /** Chamado no create() da WorldScene */
    createVisuals() {
        const cam = this.scene.cameras.main;

        // Overlay de clima / período do dia
        this.overlay = this.scene.add.rectangle(
            0, 0,
            this.scene.mapWidth * this.scene.tileSize,
            this.scene.mapHeight * this.scene.tileSize,
            0x000000, 0
        ).setOrigin(0).setDepth(40).setScrollFactor(1);

        // Partículas de chuva (criadas sob demanda)
        this.createRainParticles();
    }

    createRainParticles() {
        this.rainEmitter = null;
        this.leafEmitter = null;
        this.dustEmitter = null;
        this.fogOverlay = null;
        try {
            if (!this.scene.textures.exists('raindrop')) {
                const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
                g.fillStyle(0xa0d8ef, 1);
                g.fillRect(0, 0, 2, 10);
                g.generateTexture('raindrop', 2, 10);
                g.destroy();
            }
            if (!this.scene.textures.exists('leaf_p')) {
                const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
                g.fillStyle(0x66bb6a, 1);
                g.fillEllipse(4, 4, 8, 5);
                g.generateTexture('leaf_p', 8, 8);
                g.destroy();
            }
            if (!this.scene.textures.exists('dust_p')) {
                const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
                g.fillStyle(0xc4a35a, 0.8);
                g.fillCircle(2, 2, 2);
                g.generateTexture('dust_p', 4, 4);
                g.destroy();
            }
            const maxX = (this.scene.mapWidth || 48) * (this.scene.tileSize || 32);
            const maxY = (this.scene.mapHeight || 36) * (this.scene.tileSize || 32);

            this.rainEmitter = this.scene.add.particles(0, 0, 'raindrop', {
                x: { min: 0, max: maxX },
                y: -30,
                lifespan: 1400,
                speedY: { min: 280, max: 480 },
                speedX: { min: -20, max: 40 },
                scale: { start: 0.5, end: 0.2 },
                quantity: 0,
                frequency: 50,
                alpha: { start: 0.55, end: 0.1 }
            });
            this.rainEmitter.setDepth(45).stop();

            this.leafEmitter = this.scene.add.particles(0, 0, 'leaf_p', {
                x: { min: 0, max: maxX },
                y: { min: 0, max: maxY * 0.6 },
                lifespan: 4000,
                speedX: { min: 20, max: 60 },
                speedY: { min: 10, max: 40 },
                rotate: { min: 0, max: 360 },
                scale: { start: 0.8, end: 0.3 },
                quantity: 0,
                frequency: 1200,
                alpha: { start: 0.7, end: 0.1 }
            });
            this.leafEmitter.setDepth(35).stop();

            this.dustEmitter = this.scene.add.particles(0, 0, 'dust_p', {
                x: { min: 0, max: maxX },
                y: { min: maxY * 0.3, max: maxY },
                lifespan: 2500,
                speedX: { min: -15, max: 30 },
                speedY: { min: -5, max: 10 },
                scale: { start: 0.6, end: 0.1 },
                quantity: 0,
                frequency: 900,
                alpha: { start: 0.35, end: 0 }
            });
            this.dustEmitter.setDepth(20).stop();

            this.fogOverlay = this.scene.add.rectangle(
                0, 0, maxX, maxY, 0xb0bec5, 0
            ).setOrigin(0).setDepth(42).setScrollFactor(1);
        } catch (e) {
            this.rainEmitter = null;
        }
    }

    /** Atualiza tempo e clima a cada frame */
    update(time, delta) {
        if (!window.gameData) return;

        this.lastUpdate += delta;

        // Avança minutos de jogo
        if (this.lastUpdate >= 1000 / this.timeScale) {
            const realSeconds = this.lastUpdate / 1000;
            const gameMinutes = realSeconds * this.minutesPerRealSecond * this.timeScale;

            window.gameData.minutes = (window.gameData.minutes || 0) + gameMinutes;

            while (window.gameData.minutes >= 60) {
                window.gameData.minutes -= 60;
                window.gameData.time = (window.gameData.time || 0) + 1;

                if (window.gameData.time >= 24) {
                    window.gameData.time = 0;
                    window.gameData.day = (window.gameData.day || 1) + 1;
                    this.onNewDay();
                }
            }

            this.lastUpdate = 0;
            this.applyPeriodEffects();
            this.updateWeatherVisuals();
        }

        // Troca de clima ocasional
        this.weatherTimer += delta;
        if (this.weatherTimer > this.weatherDuration) {
            this.changeWeatherRandomly();
        }
    }

    getCurrentPeriod() {
        const h = window.gameData.time || 8;
        for (const [key, period] of Object.entries(this.periods)) {
            if (period.start < period.end) {
                if (h >= period.start && h < period.end) return { key, ...period };
            } else {
                // night wraps around
                if (h >= period.start || h < period.end) return { key, ...period };
            }
        }
        return { key: 'morning', ...this.periods.morning };
    }

    applyPeriodEffects() {
        const period = this.getCurrentPeriod();
        const stats = window.gameData.stats;
        if (!stats) return;

        // Efeitos leves por período
        if (period.key === 'night') {
            stats.energy = Math.max(0, stats.energy - 0.05);
        } else if (period.key === 'morning') {
            // leve recuperação se dormiu bem (flag)
            if (window.gameData.flags?.sleptWell) {
                stats.energy = Math.min(100, stats.energy + 0.1);
            }
        }
    }

    updateWeatherVisuals() {
        if (!this.overlay) return;

        const weather = this.weatherTypes[window.gameData.weather] || this.weatherTypes.sunny;
        const period = this.getCurrentPeriod();

        // Combina cor do clima + período
        let tint = weather.color;
        let alpha = weather.alpha;

        if (period.key === 'night') {
            alpha = Math.max(alpha, 0.45);
            tint = 0x0d1b2a;
        } else if (period.key === 'evening') {
            alpha = Math.max(alpha, 0.25);
        } else if (period.key === 'dawn') {
            alpha = Math.max(alpha, 0.15);
        }

        this.overlay.setFillStyle(tint, alpha);

        // Partículas por clima
        try {
            const wkey = window.gameData.weather || 'sunny';
            if (this.rainEmitter) {
                if (weather.particle === 'rain') {
                    this.rainEmitter.start();
                    this.rainEmitter.setQuantity(wkey === 'storm' ? 6 : 3);
                } else {
                    this.rainEmitter.stop();
                }
            }
            if (this.leafEmitter) {
                if (wkey === 'sunny' || wkey === 'cloudy') {
                    this.leafEmitter.start();
                    this.leafEmitter.setQuantity(1);
                } else {
                    this.leafEmitter.stop();
                }
            }
            if (this.dustEmitter) {
                if (wkey === 'sunny') {
                    this.dustEmitter.start();
                    this.dustEmitter.setQuantity(1);
                } else {
                    this.dustEmitter.stop();
                }
            }
            if (this.fogOverlay) {
                this.fogOverlay.setAlpha(wkey === 'foggy' ? 0.35 : (wkey === 'cloudy' ? 0.08 : 0));
            }
            // Relâmpago em tempestade
            if (wkey === 'storm' && this.overlay && Math.random() < 0.02) {
                this.overlay.setFillStyle(0xffffff, 0.35);
                this.scene.time.delayedCall(80, () => this.updateWeatherVisuals());
            }
        } catch (e) { /* ignore */ }
    }

    changeWeatherRandomly() {
        const keys = Object.keys(this.weatherTypes);
        // Mais chance de sol e nublado
        const weights = { sunny: 40, cloudy: 30, rainy: 15, foggy: 10, storm: 5 };
        let total = 0;
        const list = [];
        keys.forEach(k => {
            total += weights[k] || 10;
            list.push({ key: k, w: total });
        });

        const r = Phaser.Math.Between(1, total);
        let chosen = 'sunny';
        for (const item of list) {
            if (r <= item.w) {
                chosen = item.key;
                break;
            }
        }

        window.gameData.weather = chosen;
        this.weatherDuration = Phaser.Math.Between(45000, 120000); // 45s a 2min real
        this.weatherTimer = 0;

        // Feedback visual rápido
        if (this.scene && this.scene.add) {
            const w = this.weatherTypes[chosen];
            const txt = this.scene.add.text(
                this.scene.cameras.main.centerX,
                80,
                `${w.icon} Clima: ${w.name}`,
                {
                    fontSize: '18px',
                    color: '#ffffff',
                    backgroundColor: '#000000aa',
                    padding: { x: 12, y: 6 }
                }
            ).setOrigin(0.5).setScrollFactor(0).setDepth(300);

            this.scene.tweens.add({
                targets: txt,
                alpha: 0,
                y: 50,
                duration: 2500,
                onComplete: () => txt.destroy()
            });
        }
    }

    /** Força um clima específico (usado por eventos) */
    setWeather(key) {
        if (this.weatherTypes[key]) {
            window.gameData.weather = key;
            this.weatherTimer = 0;
            this.weatherDuration = Phaser.Math.Between(60000, 150000);
            this.updateWeatherVisuals();
        }
    }

    /** Avança o tempo manualmente (ex: dormir) */
    advanceTime(hours) {
        if (!window.gameData) return;

        let h = (window.gameData.time || 0) + hours;
        while (h >= 24) {
            h -= 24;
            window.gameData.day = (window.gameData.day || 1) + 1;
            this.onNewDay();
        }
        window.gameData.time = h;
        window.gameData.minutes = 0;
        this.updateWeatherVisuals();
    }

    onNewDay() {
        // Reset leve de flags diárias
        if (window.gameData.flags) {
            window.gameData.flags.sleptWell = false;
            window.gameData.flags.ateBreakfast = false;
            window.gameData.flags.exercisedToday = false;
            window.gameData.flags.hygieneDone = false;
        }

        // Mesada diária (economia)
        const allowance = 10;
        window.gameData.money = (window.gameData.money || 0) + allowance;
        if (this.scene && this.scene.add) {
            const txt = this.scene.add.text(
                this.scene.cameras.main.centerX,
                120,
                `💰 Mesada do dia: +R$ ${allowance}`,
                {
                    fontSize: '16px',
                    color: '#ffeb3b',
                    backgroundColor: '#000000aa',
                    padding: { x: 12, y: 6 }
                }
            ).setOrigin(0.5).setScrollFactor(0).setDepth(300);
            this.scene.tweens.add({
                targets: txt,
                alpha: 0,
                y: 90,
                delay: 2000,
                duration: 800,
                onComplete: () => txt.destroy()
            });
        }

        // Pequena chance de mudança de clima no novo dia
        if (Phaser.Math.Between(0, 100) < 40) {
            this.changeWeatherRandomly();
        }
    }

    getTimeString() {
        const h = Math.floor(window.gameData.time || 0);
        const m = Math.floor(window.gameData.minutes || 0);
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }

    getPeriodName() {
        return this.getCurrentPeriod().name;
    }

    getWeatherInfo() {
        const w = this.weatherTypes[window.gameData.weather] || this.weatherTypes.sunny;
        return { key: window.gameData.weather, ...w };
    }

    /** Acelera ou desacelera o tempo (debug / opções) */
    setTimeScale(scale) {
        this.timeScale = Math.max(0.1, Math.min(10, scale));
    }
}

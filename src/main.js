/**
 * Crescendo com Confiança - Jogo Educativo sobre Puberdade
 * Ambientado em Camaçari, Bahia
 * Desenvolvido com Phaser 3
 */

import { BootScene } from './scenes/BootScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { TitleScene } from './scenes/TitleScene.js';
import { CharacterSelectScene } from './scenes/CharacterSelectScene.js';
import { WorldScene } from './scenes/WorldScene.js';
import { DialogueScene } from './scenes/DialogueScene.js';
import { PauseScene } from './scenes/PauseScene.js';
import { InventoryScene } from './scenes/InventoryScene.js';
import { MapScene } from './scenes/MapScene.js';
import { UIScene } from './scenes/UIScene.js';
import { ScienceFairScene } from './scenes/ScienceFairScene.js';
import { EndingScene } from './scenes/EndingScene.js';
import { RoutineMenuScene } from './scenes/RoutineMenuScene.js';
import { ShopScene } from './scenes/ShopScene.js';
import { QuestLogScene } from './scenes/QuestLogScene.js';
import { InteriorScene } from './scenes/InteriorScene.js';
import { ScienceFairPresentationScene } from './scenes/ScienceFairPresentationScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    pixelArt: true,
    roundPixels: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        PreloadScene,
        TitleScene,
        CharacterSelectScene,
        WorldScene,
        DialogueScene,
        PauseScene,
        InventoryScene,
        MapScene,
        UIScene,
        ScienceFairScene,
        EndingScene,
        RoutineMenuScene,
        ShopScene,
        QuestLogScene,
        InteriorScene,
        ScienceFairPresentationScene
    ],
    input: {
        mouse: {
            target: document.body
        },
        touch: {
            target: document.body
        }
    }
};

// Hide loading screen when game starts
window.addEventListener('load', () => {
    const loading = document.getElementById('loading-screen');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => loading.remove(), 500);
        }, 800);
    }
});

const game = new Phaser.Game(config);

// Global game data
window.gameData = {
    player: null,
    character: null, // 'lucas' or 'lara'
    chapter: 1,
    inventory: [],
    quests: [],
    stats: {
        health: 100,
        energy: 100,
        knowledge: 0,
        hygiene: 100,
        happiness: 80,
        respect: 50
    },
    flags: {
        sleptWell: false,
        hygieneDone: false,
        ateBreakfast: false,
        exercisedToday: false
    },
    money: 50,
    day: 1,
    time: 8,          // horas (0-23)
    minutes: 0,       // minutos (0-59)
    weather: 'sunny', // sunny | cloudy | rainy | storm | foggy
    saveSlots: []
};

export default game;

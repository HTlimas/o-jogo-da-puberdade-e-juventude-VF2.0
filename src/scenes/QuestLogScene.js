export class QuestLogScene extends Phaser.Scene {
    constructor() {
        super({ key: 'QuestLogScene' });
    }

    init(data) {
        this.questSystem = data.questSystem;
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(0, 0, width, height, 0x000000, 0.75).setOrigin(0);
        this.add.rectangle(width / 2, height / 2, Math.min(900, width - 80), height - 100, 0x0f3460, 0.97)
            .setStrokeStyle(3, 0xe94560);

        this.add.text(width / 2, 60, 'MISSÕES', {
            fontFamily: 'Arial Black', fontSize: '32px', color: '#ffffff', stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5);

        const qs = this.questSystem;
        let y = 110;
        const left = width / 2 - 400;

        // Capítulo atual
        if (qs) {
            const chapter = qs.getCurrentChapterData ? qs.getCurrentChapterData() : null;
            if (chapter) {
                this.add.text(left, y, `Capítulo: ${chapter.title || chapter.id || ''}`, {
                    fontSize: '18px', color: '#ffeb3b', fontStyle: 'bold'
                });
                y += 28;
                this.add.text(left, y, chapter.desc || chapter.objective || '', {
                    fontSize: '14px', color: '#a2d2ff', wordWrap: { width: 800 }
                });
                y += 50;
            }

            this.add.text(left, y, 'Missões secundárias', {
                fontSize: '16px', color: '#e94560', fontStyle: 'bold'
            });
            y += 30;

            const sides = qs.getSideQuests ? qs.getSideQuests() : (qs.sideQuests || []);
            const list = Array.isArray(sides) ? sides : [];
            list.slice(0, 12).forEach(q => {
                const done = q.completed || (qs.isSideComplete && qs.isSideCompleted(q.id));
                const mark = done ? '✅' : '⬜';
                this.add.text(left, y, `${mark}  ${q.title || q.id}`, {
                    fontSize: '15px', color: done ? '#81c784' : '#ffffff'
                });
                y += 26;
            });

            if (list.length === 0) {
                this.add.text(left, y, 'Explore a cidade para descobrir missões.', {
                    fontSize: '14px', color: '#90a4ae'
                });
            }
        }

        const close = this.add.text(width / 2, height - 40, '[ Fechar (ESC / Q) ]', {
            fontSize: '16px', color: '#a2d2ff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        close.on('pointerdown', () => this.close());
        this.input.keyboard.on('keydown-ESC', () => this.close());
        this.input.keyboard.on('keydown-Q', () => this.close());
    }

    close() {
        this.scene.stop();
        this.scene.resume('WorldScene');
    }
}

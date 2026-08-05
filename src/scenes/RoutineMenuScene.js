/**
 * Menu de ações de rotina (dormir, higiene, comer, exercitar...)
 * Aberto pelo jogador quando interage com locais específicos ou pelo botão de rotina.
 */
export class RoutineMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RoutineMenuScene' });
    }

    init(data) {
        this.location = data.location || 'any'; // 'home', 'school', 'park', 'any'
        this.timeSystem = data.timeSystem || null;
        this.routineSystem = data.routineSystem || null;
    }

    create() {
        const { width, height } = this.cameras.main;

        // Fundo escuro
        this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0);

        // Painel
        this.add.rectangle(width / 2, height / 2, 520, 420, 0x16213e)
            .setStrokeStyle(4, 0xe94560);

        this.add.text(width / 2, 70, 'ROTINA DIÁRIA', {
            fontFamily: 'Arial Black',
            fontSize: '28px',
            color: '#e94560'
        }).setOrigin(0.5);

        this.add.text(width / 2, 105, `Local: ${this.getLocationName()} | ${this.getTimeInfo()}`, {
            fontSize: '14px',
            color: '#a2d2ff'
        }).setOrigin(0.5);

        // Lista de ações
        const actions = this.getContextualActions();
        const startY = 140;

        actions.forEach((action, i) => {
            const y = startY + i * 48;
            const can = this.routineSystem
                ? this.routineSystem.canPerform(action.id, { location: this.location })
                : { ok: true };

            const bg = this.add.rectangle(width / 2, y, 460, 42, can.ok ? 0x0f3460 : 0x333333)
                .setStrokeStyle(2, can.ok ? 0xe94560 : 0x555555)
                .setInteractive({ useHandCursor: can.ok });

            const label = this.add.text(width / 2 - 210, y, `${action.icon}  ${action.name}`, {
                fontSize: '16px',
                color: can.ok ? '#ffffff' : '#777777'
            }).setOrigin(0, 0.5);

            if (action.cost) {
                this.add.text(width / 2 + 200, y, `R$ ${action.cost}`, {
                    fontSize: '14px',
                    color: can.ok ? '#ffeb3b' : '#666666'
                }).setOrigin(1, 0.5);
            }

            if (can.ok) {
                bg.on('pointerover', () => bg.setFillStyle(0x1f4068));
                bg.on('pointerout', () => bg.setFillStyle(0x0f3460));
                bg.on('pointerdown', () => this.doAction(action.id));
            } else {
                bg.on('pointerdown', () => {
                    this.showFeedback(can.reason || 'Não é possível agora.');
                });
            }
        });

        // Botão fechar
        const closeBtn = this.add.text(width / 2, height - 50, '[ Fechar (ESC) ]', {
            fontSize: '16px',
            color: '#a2d2ff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        closeBtn.on('pointerover', () => closeBtn.setColor('#ffffff'));
        closeBtn.on('pointerout', () => closeBtn.setColor('#a2d2ff'));
        closeBtn.on('pointerdown', () => this.close());

        this.input.keyboard.on('keydown-ESC', () => this.close());
    }

    getLocationName() {
        const names = {
            home: 'Casa',
            school: 'Escola',
            park: 'Praça / Quadra',
            ubs: 'UBS',
            any: 'Qualquer lugar'
        };
        return names[this.location] || this.location;
    }

    getTimeInfo() {
        if (!this.timeSystem) return '';
        return `${this.timeSystem.getTimeString()} – ${this.timeSystem.getPeriodName()}`;
    }

    getContextualActions() {
        if (!this.routineSystem) return [];

        const all = Object.values(this.routineSystem.actions);

        // Filtra por local
        return all.filter(a => {
            if (!a.requirements?.location) return true;
            return a.requirements.location === this.location;
        });
    }

    doAction(actionId) {
        if (!this.routineSystem) return;

        const result = this.routineSystem.perform(actionId, {
            location: this.location,
            timeSystem: this.timeSystem
        });

        this.showFeedback(result.message, result.success);

        if (result.success) {
            const world = this.scene.get('WorldScene');
            if (world && world.questSystem) {
                world.questSystem.onRoutine(actionId);
            }
            this.time.delayedCall(1800, () => this.close());
        }
    }

    showFeedback(msg, success = true) {
        const { width, height } = this.cameras.main;

        // Remove feedback anterior
        if (this.feedbackText) this.feedbackText.destroy();

        this.feedbackText = this.add.text(width / 2, height - 100, msg, {
            fontSize: '15px',
            color: success ? '#a5d6a7' : '#ef9a9a',
            backgroundColor: '#000000cc',
            padding: { x: 14, y: 8 },
            align: 'center',
            wordWrap: { width: 480 }
        }).setOrigin(0.5).setDepth(20);
    }

    close() {
        this.scene.stop();
        this.scene.resume('WorldScene');
    }
}

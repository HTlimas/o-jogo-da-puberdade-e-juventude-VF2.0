/**
 * RoutineSystem.js
 * Gerencia ações de rotina diária: dormir, higiene, alimentação,
 * exercício e seus impactos nos stats do jogador.
 */

export class RoutineSystem {
    constructor(scene) {
        this.scene = scene;

        // Ações disponíveis e seus efeitos
        this.actions = {
            sleep: {
                id: 'sleep',
                name: 'Dormir',
                icon: '🛏️',
                description: 'Dormir bem recupera energia e saúde.',
                durationHours: 8,
                requirements: { location: 'home' },
                effects: {
                    energy: +70,
                    health: +15,
                    happiness: +10,
                    hygiene: -5
                },
                flags: { sleptWell: true },
                message: 'Você dormiu bem e acordou descansado(a)!',
                badMessage: 'Você dormiu pouco... continua cansado(a).'
            },
            short_rest: {
                id: 'short_rest',
                name: 'Descansar um pouco',
                icon: '😌',
                description: 'Uma pausa rápida para recuperar energia.',
                durationHours: 1,
                effects: {
                    energy: +20,
                    happiness: +5
                },
                message: 'Você descansou e se sente um pouco melhor.'
            },
            hygiene: {
                id: 'hygiene',
                name: 'Cuidar da Higiene',
                icon: '🧼',
                description: 'Tomar banho, escovar os dentes e se cuidar.',
                durationHours: 0.5,
                effects: {
                    hygiene: +40,
                    happiness: +8,
                    health: +5
                },
                flags: { hygieneDone: true },
                message: 'Você está limpo(a) e cheiroso(a)! Autoestima em alta.'
            },
            eat_healthy: {
                id: 'eat_healthy',
                name: 'Comer de forma equilibrada',
                icon: '🥗',
                description: 'Refeição com frutas, legumes e proteínas.',
                durationHours: 0.5,
                cost: 8,
                effects: {
                    energy: +25,
                    health: +12,
                    happiness: +8
                },
                flags: { ateBreakfast: true },
                message: 'Que refeição nutritiva! Seu corpo agradece.'
            },
            eat_junk: {
                id: 'eat_junk',
                name: 'Comer doces e refrigerante',
                icon: '🍬',
                description: 'Gostoso, mas em excesso faz mal.',
                durationHours: 0.3,
                cost: 5,
                effects: {
                    energy: +10,
                    health: -8,
                    happiness: +5,
                    hygiene: -3
                },
                message: 'Gostoso... mas você sente um pouco de culpa depois.'
            },
            exercise: {
                id: 'exercise',
                name: 'Praticar atividade física',
                icon: '🏃',
                description: 'Correr, jogar bola, capoeira...',
                durationHours: 1.5,
                effects: {
                    energy: -15,
                    health: +18,
                    happiness: +15,
                    hygiene: -10
                },
                flags: { exercisedToday: true },
                message: 'Ótimo treino! Você se sente mais forte e disposto(a).'
            },
            study: {
                id: 'study',
                name: 'Estudar / Ler',
                icon: '📚',
                description: 'Aprender mais sobre saúde e o corpo.',
                durationHours: 1,
                effects: {
                    energy: -10,
                    knowledge: +12,
                    happiness: +5
                },
                message: 'Você aprendeu coisas novas e úteis!'
            },
            talk_family: {
                id: 'talk_family',
                name: 'Conversar com a família',
                icon: '👨‍👩‍👧',
                description: 'Diálogo aberto fortalece vínculos e autoestima.',
                durationHours: 0.5,
                effects: {
                    happiness: +15,
                    respect: +5
                },
                message: 'A conversa fez bem. Você se sente apoiado(a).'
            }
        };
    }

    /** Verifica se a ação pode ser realizada agora */
    canPerform(actionId, context = {}) {
        const action = this.actions[actionId];
        if (!action) return { ok: false, reason: 'Ação desconhecida.' };

        const stats = window.gameData?.stats || {};
        const money = window.gameData?.money || 0;

        // Custo
        if (action.cost && money < action.cost) {
            return { ok: false, reason: `Você precisa de R$ ${action.cost}.` };
        }

        // Localização (simples)
        if (action.requirements?.location === 'home' && context.location !== 'home') {
            return { ok: false, reason: 'Você precisa estar em casa para isso.' };
        }

        // Já fez hoje?
        if (action.flags) {
            for (const flag of Object.keys(action.flags)) {
                if (window.gameData.flags?.[flag] && ['hygieneDone', 'exercisedToday', 'ateBreakfast'].includes(flag)) {
                    // permite repetir, mas avisa
                }
            }
        }

        // Energia mínima para exercício
        if (actionId === 'exercise' && (stats.energy || 0) < 20) {
            return { ok: false, reason: 'Você está muito cansado(a) para se exercitar.' };
        }

        return { ok: true };
    }

    /** Executa a ação e aplica efeitos */
    perform(actionId, context = {}) {
        const check = this.canPerform(actionId, context);
        if (!check.ok) {
            return { success: false, message: check.reason };
        }

        const action = this.actions[actionId];
        const stats = window.gameData.stats;
        const timeSystem = context.timeSystem;

        // Custo
        if (action.cost) {
            window.gameData.money = Math.max(0, (window.gameData.money || 0) - action.cost);
        }

        // Aplica efeitos nos stats
        if (action.effects) {
            for (const [stat, value] of Object.entries(action.effects)) {
                if (stats[stat] !== undefined) {
                    stats[stat] = Phaser.Math.Clamp(stats[stat] + value, 0, 100);
                }
            }
        }

        // Flags
        if (action.flags) {
            if (!window.gameData.flags) window.gameData.flags = {};
            Object.assign(window.gameData.flags, action.flags);
        }

        // Avança o tempo
        if (timeSystem && action.durationHours) {
            timeSystem.advanceTime(action.durationHours);
        }

        // Mensagem de feedback
        let message = action.message || 'Ação realizada.';

        // Casos especiais
        if (actionId === 'sleep') {
            const hoursSlept = action.durationHours;
            if (hoursSlept >= 7) {
                message = action.message;
                window.gameData.flags.sleptWell = true;
            } else {
                message = action.badMessage || message;
                stats.energy = Math.min(stats.energy, 40);
            }
        }

        // Salva automaticamente
        localStorage.setItem('crescendo_save', JSON.stringify(window.gameData));

        return {
            success: true,
            message,
            action,
            newStats: { ...stats }
        };
    }

    /** Retorna lista de ações disponíveis no contexto atual */
    getAvailableActions(context = {}) {
        return Object.values(this.actions).filter(action => {
            const check = this.canPerform(action.id, context);
            return check.ok || true; // mostra todas, mas desabilita as impossíveis depois
        });
    }

    /** Aplica degradação natural dos stats com o passar do tempo */
    applyPassiveDecay(deltaHours = 0.1) {
        const stats = window.gameData?.stats;
        if (!stats) return;

        // Higiene cai lentamente
        stats.hygiene = Math.max(0, stats.hygiene - 0.8 * deltaHours);

        // Energia cai mais à noite ou com atividade
        stats.energy = Math.max(0, stats.energy - 1.2 * deltaHours);

        // Felicidade cai se higiene ou energia estiverem muito baixas
        if (stats.hygiene < 30 || stats.energy < 20) {
            stats.happiness = Math.max(0, stats.happiness - 1.5 * deltaHours);
        }

        // Saúde sofre se hábitos ruins se acumulam
        if (stats.hygiene < 20 && stats.energy < 20) {
            stats.health = Math.max(0, stats.health - 0.5 * deltaHours);
        }
    }

    /** Gera um resumo da rotina do dia para feedback */
    getDaySummary() {
        const flags = window.gameData?.flags || {};
        const stats = window.gameData?.stats || {};

        const summary = [];

        if (flags.sleptWell) summary.push('✅ Dormiu bem');
        else summary.push('⚠️ Sono insuficiente');

        if (flags.hygieneDone) summary.push('✅ Cuidou da higiene');
        else summary.push('⚠️ Higiene negligenciada');

        if (flags.ateBreakfast || flags.ateHealthy) summary.push('✅ Alimentação ok');
        else summary.push('⚠️ Alimentação irregular');

        if (flags.exercisedToday) summary.push('✅ Se exercitou');
        else summary.push('⚠️ Pouco movimento');

        return {
            lines: summary,
            overall: stats.health > 70 && stats.energy > 50 && stats.hygiene > 50
                ? 'Ótimo equilíbrio hoje!'
                : 'Há espaço para melhorar a rotina.'
        };
    }
}

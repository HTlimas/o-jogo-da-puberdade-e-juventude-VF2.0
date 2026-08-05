/**
 * QuestSystem – gerencia capítulos principais e missões secundárias
 */
import { CHAPTERS } from '../data/chapters.js';
import { SIDE_QUESTS } from '../data/quests.js';

export class QuestSystem {
  constructor(scene) {
    this.scene = scene;
    this.initGameData();
  }

  initGameData() {
    if (!window.gameData) return;
    if (!window.gameData.questProgress) {
      window.gameData.questProgress = {
        chapter: 1,
        chapterObjectives: {},
        sideQuests: {},
        completedSide: [],
        talkCounts: {},
        actionCounts: {},
        streaks: {}
      };
    }
    // Garante chapter no root também
    if (!window.gameData.chapter) window.gameData.chapter = 1;
  }

  getCharacter() {
    return window.gameData?.character === 'lara' ? 'lara' : 'lucas';
  }

  getCurrentChapterData() {
    const char = this.getCharacter();
    const list = CHAPTERS[char] || [];
    const ch = window.gameData.chapter || 1;
    return list.find(c => c.id === ch) || list[0];
  }

  getAllChapters() {
    return CHAPTERS[this.getCharacter()] || [];
  }

  getSideQuests() {
    return SIDE_QUESTS[this.getCharacter()] || [];
  }

  /** Marca objetivo de capítulo como completo */
  completeObjective(objectiveId) {
    const prog = window.gameData.questProgress;
    const chapter = this.getCurrentChapterData();
    if (!chapter) return false;

    if (!prog.chapterObjectives[chapter.id]) {
      prog.chapterObjectives[chapter.id] = {};
    }
    if (prog.chapterObjectives[chapter.id][objectiveId]) return false; // já feito

    prog.chapterObjectives[chapter.id][objectiveId] = true;
    this.showToast(`Objetivo concluído: ${this.getObjectiveText(objectiveId)}`);
    this.checkChapterCompletion();
    this.save();
    return true;
  }

  getObjectiveText(objectiveId) {
    const ch = this.getCurrentChapterData();
    const obj = ch?.objectives?.find(o => o.id === objectiveId);
    return obj?.text || objectiveId;
  }

  isObjectiveDone(objectiveId) {
    const ch = window.gameData.chapter || 1;
    return !!window.gameData.questProgress?.chapterObjectives?.[ch]?.[objectiveId];
  }

  checkChapterCompletion() {
    const chapter = this.getCurrentChapterData();
    if (!chapter) return;

    const prog = window.gameData.questProgress.chapterObjectives[chapter.id] || {};
    const allDone = chapter.objectives.every(o => prog[o.id]);

    if (allDone) {
      this.finishChapter(chapter);
    }
  }

  finishChapter(chapter) {
    // Recompensas
    this.applyReward(chapter.reward);

    this.showToast(`🎉 Capítulo ${chapter.id} concluído: ${chapter.title}!`, 4000);

    // Avança
    const next = (window.gameData.chapter || 1) + 1;
    const max = this.getAllChapters().length;
    if (next <= max) {
      window.gameData.chapter = next;
      window.gameData.questProgress.chapter = next;
      // Pequena intro do próximo
      this.scene?.time?.delayedCall(2500, () => {
        this.showToast(`Novo capítulo: ${this.getCurrentChapterData()?.title || ''}`, 3000);
      });
    } else {
      // Fim da campanha principal
      this.scene?.time?.delayedCall(2000, () => {
        if (this.scene.scene) {
          this.scene.scene.pause('WorldScene');
          this.scene.scene.launch('ScienceFairScene');
        }
      });
    }
    this.save();
  }

  applyReward(reward = {}) {
    const stats = window.gameData.stats;
    if (!stats) return;
    for (const [k, v] of Object.entries(reward)) {
      if (k === 'money') {
        window.gameData.money = (window.gameData.money || 0) + v;
      } else if (stats[k] !== undefined) {
        stats[k] = Math.min(100, Math.max(0, stats[k] + v));
      }
    }
  }

  // ——— Eventos genéricos que o jogo dispara ———

  onTalk(npcRole) {
    // Objetivos de capítulo
    const ch = this.getCurrentChapterData();
    if (ch) {
      ch.objectives.forEach(obj => {
        if (obj.type === 'talk' && obj.target === npcRole) {
          this.completeObjective(obj.id);
        }
      });
    }

    // Side quests de conversa
    this.getSideQuests().forEach(sq => {
      if (this.isSideCompleted(sq.id)) return;
      if (sq.type === 'talk' && sq.target === npcRole) {
        this.completeSideQuest(sq.id);
      }
      if (sq.type === 'talk_count' && sq.target === npcRole) {
        const key = `talk_${npcRole}`;
        const prog = window.gameData.questProgress;
        prog.talkCounts[key] = (prog.talkCounts[key] || 0) + 1;
        if (prog.talkCounts[key] >= (sq.count || 1)) {
          this.completeSideQuest(sq.id);
        }
      }
    });
  }

  onLocation(locationKey) {
    const ch = this.getCurrentChapterData();
    if (ch) {
      ch.objectives.forEach(obj => {
        if (obj.type === 'location' && obj.target === locationKey) {
          this.completeObjective(obj.id);
        }
        if (obj.type === 'explore') {
          this.completeObjective(obj.id);
        }
      });
    }

    this.getSideQuests().forEach(sq => {
      if (this.isSideCompleted(sq.id)) return;
      if (sq.type === 'location' && sq.target === locationKey) {
        // Verifica clima se necessário
        if (sq.weather && window.gameData.weather !== sq.weather) return;
        this.completeSideQuest(sq.id);
      }
    });
  }

  onRoutine(actionId) {
    const ch = this.getCurrentChapterData();
    if (ch) {
      ch.objectives.forEach(obj => {
        if (obj.type === 'routine' && obj.target === actionId) {
          this.completeObjective(obj.id);
        }
      });
    }

    this.getSideQuests().forEach(sq => {
      if (this.isSideCompleted(sq.id)) return;
      if (sq.type === 'routine' && sq.target === actionId) {
        this.completeSideQuest(sq.id);
      }
      if (sq.type === 'streak') {
        // Streaks são atualizados no onNewDay / flags
      }
    });
  }

  onBuy(itemId) {
    const ch = this.getCurrentChapterData();
    if (ch) {
      ch.objectives.forEach(obj => {
        if (obj.type === 'buy' && obj.target === itemId) {
          this.completeObjective(obj.id);
        }
      });
    }
    this.getSideQuests().forEach(sq => {
      if (this.isSideCompleted(sq.id)) return;
      if (sq.type === 'buy' && sq.target === itemId) {
        this.completeSideQuest(sq.id);
      }
      if (sq.type === 'collect' && sq.targets?.includes(itemId)) {
        // Conta itens no inventário
        this.checkCollectQuest(sq);
      }
    });
  }

  onAction(actionKey) {
    const prog = window.gameData.questProgress;
    prog.actionCounts[actionKey] = (prog.actionCounts[actionKey] || 0) + 1;

    this.getSideQuests().forEach(sq => {
      if (this.isSideCompleted(sq.id)) return;
      if (sq.type === 'action' && sq.target === actionKey) {
        const needed = sq.count || 1;
        if (prog.actionCounts[actionKey] >= needed) {
          this.completeSideQuest(sq.id);
        }
      }
    });
  }

  onWeather(weatherKey) {
    this.getSideQuests().forEach(sq => {
      if (this.isSideCompleted(sq.id)) return;
      if (sq.type === 'weather' && sq.target === weatherKey) {
        this.completeSideQuest(sq.id);
      }
    });
  }

  onPeriod(periodKey) {
    this.getSideQuests().forEach(sq => {
      if (this.isSideCompleted(sq.id)) return;
      if (sq.type === 'period' && sq.target === periodKey) {
        this.completeSideQuest(sq.id);
      }
    });
  }

  checkCollectQuest(sq) {
    const inv = window.gameData.inventory || [];
    const hasAll = (sq.targets || []).every(t => inv.some(i => i.id === t));
    if (hasAll) this.completeSideQuest(sq.id);
  }

  isSideCompleted(id) {
    return (window.gameData.questProgress?.completedSide || []).includes(id);
  }

  completeSideQuest(id) {
    if (this.isSideCompleted(id)) return;
    const sq = this.getSideQuests().find(q => q.id === id);
    if (!sq) return;

    window.gameData.questProgress.completedSide.push(id);
    this.applyReward(sq.reward);
    this.showToast(`✨ Missão secundária: ${sq.title}`, 3500);
    this.save();

    // Meta quests
    this.checkMetaQuests();
  }

  checkMetaQuests() {
    const all = this.getSideQuests().filter(q => q.type !== 'meta' && q.type !== 'meta_day');
    const done = window.gameData.questProgress.completedSide || [];
    const allDone = all.every(q => done.includes(q.id));
    if (allDone) {
      const meta = this.getSideQuests().find(q => q.type === 'meta');
      if (meta && !this.isSideCompleted(meta.id)) {
        this.completeSideQuest(meta.id);
      }
    }
  }

  /** Chamado quando o dia muda – atualiza streaks */
  onNewDay() {
    const flags = window.gameData.flags || {};
    const streaks = window.gameData.questProgress.streaks || {};

    ['sleptWell', 'hygieneDone'].forEach(flag => {
      if (flags[flag]) {
        streaks[flag] = (streaks[flag] || 0) + 1;
      } else {
        streaks[flag] = 0;
      }
    });
    window.gameData.questProgress.streaks = streaks;

    this.getSideQuests().forEach(sq => {
      if (this.isSideCompleted(sq.id)) return;
      if (sq.type === 'streak' && streaks[sq.target] >= (sq.count || 3)) {
        this.completeSideQuest(sq.id);
      }
    });
  }

  getProgressSummary() {
    const ch = this.getCurrentChapterData();
    if (!ch) return { title: '', done: 0, total: 0, objectives: [] };

    const prog = window.gameData.questProgress.chapterObjectives[ch.id] || {};
    const objectives = ch.objectives.map(o => ({
      ...o,
      done: !!prog[o.id]
    }));
    const done = objectives.filter(o => o.done).length;
    return {
      id: ch.id,
      title: ch.title,
      summary: ch.summary,
      done,
      total: objectives.length,
      objectives
    };
  }

  showToast(msg, duration = 2500) {
    if (!this.scene || !this.scene.add) return;
    const { width } = this.scene.cameras.main;
    const t = this.scene.add.text(width / 2, 100, msg, {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#0f3460ee',
      padding: { x: 14, y: 8 },
      align: 'center',
      wordWrap: { width: 500 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(400);

    this.scene.tweens.add({
      targets: t,
      alpha: 0,
      y: 70,
      delay: duration - 600,
      duration: 600,
      onComplete: () => t.destroy()
    });
  }

  save() {
    try {
      localStorage.setItem('crescendo_save', JSON.stringify(window.gameData));
    } catch (e) {}
  }
}

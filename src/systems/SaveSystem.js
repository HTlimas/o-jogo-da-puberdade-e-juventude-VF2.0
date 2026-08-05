/**
 * SaveSystem – 3 slots + auto-save
 * Preserva toda a estrutura de window.gameData
 */
const PREFIX = 'crescendo_slot_';
const AUTO_KEY = 'crescendo_save'; // compatível com saves antigos

export class SaveSystem {
  static slotKey(slot) {
    return PREFIX + slot;
  }

  static save(slot = 1) {
    try {
      const data = {
        ...window.gameData,
        savedAt: new Date().toISOString(),
        version: '1.3'
      };
      const json = JSON.stringify(data);
      localStorage.setItem(this.slotKey(slot), json);
      localStorage.setItem(AUTO_KEY, json); // último save
      return true;
    } catch (e) {
      console.warn('Save failed', e);
      return false;
    }
  }

  static autoSave() {
    return this.save(1);
  }

  static load(slot = 1) {
    try {
      let raw = localStorage.getItem(this.slotKey(slot));
      if (!raw && slot === 1) raw = localStorage.getItem(AUTO_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Load failed', e);
      return null;
    }
  }

  static hasSave(slot = 1) {
    return !!(localStorage.getItem(this.slotKey(slot)) || (slot === 1 && localStorage.getItem(AUTO_KEY)));
  }

  static getInfo(slot) {
    const data = this.load(slot);
    if (!data) return null;
    return {
      slot,
      character: data.character || '?',
      name: data.player?.name || data.character || 'Jogador',
      chapter: data.chapter || 1,
      day: data.day || 1,
      money: data.money || 0,
      savedAt: data.savedAt || null
    };
  }

  static delete(slot) {
    localStorage.removeItem(this.slotKey(slot));
  }
}

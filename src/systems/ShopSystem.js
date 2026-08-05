/**
 * ShopSystem – economia e lojas
 */
import { SHOP_ITEMS } from '../data/quests.js';

export class ShopSystem {
  constructor(scene) {
    this.scene = scene;
  }

  getShopItems(shopType) {
    return SHOP_ITEMS[shopType] || [];
  }

  canBuy(itemId, shopType) {
    const item = this.findItem(itemId, shopType);
    if (!item) return { ok: false, reason: 'Item não encontrado.' };
    const money = window.gameData?.money || 0;
    if (money < item.price) return { ok: false, reason: `Precisa de R$ ${item.price}.` };
    return { ok: true, item };
  }

  buy(itemId, shopType) {
    const check = this.canBuy(itemId, shopType);
    if (!check.ok) return { success: false, message: check.reason };

    const item = check.item;
    window.gameData.money -= item.price;

    // Adiciona ao inventário
    if (!window.gameData.inventory) window.gameData.inventory = [];
    const existing = window.gameData.inventory.find(i => i.id === item.id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      window.gameData.inventory.push({
        id: item.id,
        name: item.name,
        qty: 1,
        desc: item.desc,
        effect: item.effect,
        category: item.category
      });
    }

    // Avisa o QuestSystem
    if (this.scene.questSystem) {
      this.scene.questSystem.onBuy(item.id);
    }

    this.save();
    return {
      success: true,
      message: `Você comprou ${item.name} por R$ ${item.price}.`,
      item
    };
  }

  useItem(itemId) {
    const inv = window.gameData.inventory || [];
    const item = inv.find(i => i.id === itemId);
    if (!item || (item.qty || 0) < 1) {
      return { success: false, message: 'Você não tem esse item.' };
    }

    // Aplica efeito
    const stats = window.gameData.stats;
    if (item.effect && stats) {
      for (const [k, v] of Object.entries(item.effect)) {
        if (stats[k] !== undefined) {
          stats[k] = Math.min(100, Math.max(0, stats[k] + v));
        }
      }
    }

    item.qty -= 1;
    if (item.qty <= 0) {
      window.gameData.inventory = inv.filter(i => i.id !== itemId);
    }

    if (this.scene.questSystem) {
      // Alguns usos contam como ação
      this.scene.questSystem.onAction(`use_${itemId}`);
    }

    this.save();
    return {
      success: true,
      message: `Você usou ${item.name}.`,
      item
    };
  }

  findItem(itemId, shopType) {
    const list = this.getShopItems(shopType);
    return list.find(i => i.id === itemId);
  }

  getMoney() {
    return window.gameData?.money || 0;
  }

  save() {
    try {
      localStorage.setItem('crescendo_save', JSON.stringify(window.gameData));
    } catch (e) {}
  }
}

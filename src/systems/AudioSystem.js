/**
 * AudioSystem – sons procedurais via Web Audio API (sem arquivos externos)
 */
export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.master = 0.35;
    this._ambient = null;
  }

  ensure() {
    if (this.ctx) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
    } catch (e) {
      this.enabled = false;
    }
  }

  resume() {
    this.ensure();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  tone(freq, duration = 0.12, type = 'sine', volume = 0.2) {
    if (!this.enabled) return;
    this.ensure();
    if (!this.ctx) return;
    try {
      const t0 = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(volume * this.master, t0 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t0);
      osc.stop(t0 + duration + 0.02);
    } catch (e) { /* ignore */ }
  }

  uiClick() { this.tone(660, 0.08, 'triangle', 0.15); }
  uiHover() { this.tone(520, 0.05, 'sine', 0.08); }
  uiConfirm() { this.tone(880, 0.1, 'triangle', 0.18); this.tone(1100, 0.12, 'sine', 0.12); }
  dialogue() { this.tone(400, 0.04, 'square', 0.06); }
  success() { this.tone(523, 0.1, 'sine', 0.15); this.tone(659, 0.12, 'sine', 0.12); this.tone(784, 0.15, 'sine', 0.1); }
  rainSoft() { this.tone(180, 0.3, 'sawtooth', 0.03); }

  startAmbient(mood = 'day') {
    this.stopAmbient();
    this.ensure();
    if (!this.ctx || !this.enabled) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = mood === 'night' ? 110 : (mood === 'rain' ? 90 : 130);
      gain.gain.value = 0.025 * this.master;
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      this._ambient = { osc, gain };
    } catch (e) { /* ignore */ }
  }

  stopAmbient() {
    if (this._ambient) {
      try { this._ambient.osc.stop(); } catch (e) {}
      this._ambient = null;
    }
  }

  setEnabled(v) {
    this.enabled = !!v;
    if (!v) this.stopAmbient();
  }
}

export const audio = new AudioSystem();

import { Injectable, signal, computed } from '@angular/core';

export type DoshaType = 'vata' | 'pitta' | 'kapha' | null;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly STORAGE_KEY = 'ayurveda_user_dosha';
  
  private readonly _savedDosha = signal<DoshaType>(this.loadDosha());
  
  readonly savedDosha = this._savedDosha.asReadonly();
  
  readonly hasProfile = computed(() => this._savedDosha() !== null);

  saveDosha(dosha: DoshaType): void {
    this._savedDosha.set(dosha);
    if (dosha) {
      localStorage.setItem(this.STORAGE_KEY, dosha);
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  clearProfile(): void {
    this.saveDosha(null);
  }

  private loadDosha(): DoshaType {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === 'vata' || stored === 'pitta' || stored === 'kapha') {
        return stored as DoshaType;
      }
    } catch (e) {
      // Ignore localStorage errors (e.g., SSR or incognito mode limitations)
    }
    return null;
  }
}

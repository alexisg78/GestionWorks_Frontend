import { Injectable, effect, signal } from '@angular/core';

export type Theme = 'corporate' | 'dracula';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';

  private readonly _theme = signal<Theme>(this.getInitialTheme());

  readonly theme = this._theme.asReadonly();

  constructor() {
    effect(() => {
      const theme = this._theme();

      document.documentElement.setAttribute('data-theme', theme);

      localStorage.setItem(this.STORAGE_KEY, theme);
    });
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
  }

  toggleTheme(): void {
    this._theme.update((current) => (current === 'corporate' ? 'dracula' : 'corporate'));
  }

  private getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);

    if (savedTheme === 'corporate' || savedTheme === 'dracula') {
      return savedTheme;
    }

    return 'dracula';
  }
}

import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Theme } from './theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';

  constructor(
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService
  ) {}

  get(): Theme {
    return (
      (this.localStorageService.getItem(this.storageKey) as Theme) ||
      Theme.LIGHT
    );
  }

  set(theme: Theme): void {
    this.removeInOverlayContainer();
    this.localStorageService.setItem(this.storageKey, theme);
    this.addInOverlayContainer();
  }

  isDarkMode(): boolean {
    return this.get() === Theme.DARK;
  }

  switch(): void {
    this.set(this.isDarkMode() ? Theme.LIGHT : Theme.DARK);
  }

  private addInOverlayContainer(): void {
    this.overlayContainer.getContainerElement().classList.add(this.get());
  }

  private removeInOverlayContainer(): void {
    this.overlayContainer.getContainerElement().classList.remove(this.get());
  }
}

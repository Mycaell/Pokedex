import { Component, OnInit } from '@angular/core';
import { Theme } from './shared/theme.enum';

import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  color = '#262835';
  disabled = false;

  ngOnInit(): void {}

  getTheme(): Theme {
    return this.themeService.get();
  }

  switchTheme(): void {
    this.themeService.switch();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ThemeService } from './shared/theme.service';
import { Theme } from './shared/theme.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private router: Router
    ) {}

  ngOnInit(): void {}

  getTheme(): Theme {
    return this.themeService.get();
  }

  getUrl(): String {
    return `url(assets/images/background/${this.getTheme()}.png)`
  }

  switchTheme(): void {
    this.themeService.switch();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  showBackButton(): boolean {

    const url = this.router.url;

    if(url.length == 1){
      return false;
    }else{
      return true;
    }

  }
}

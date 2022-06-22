import { Component, OnInit } from '@angular/core';

import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public darkMode: boolean = false;

  color: ThemePalette = 'accent';
  disabled = false;

  constructor() {}

  ngOnInit(): void {}
}

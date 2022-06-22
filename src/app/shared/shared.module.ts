import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from './material/material.module';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [HeaderComponent, SearchComponent, LoaderComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [HeaderComponent, SearchComponent, LoaderComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [HeaderComponent, SearchComponent, ListComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [HeaderComponent, SearchComponent, ListComponent],
})
export class SharedModule {}

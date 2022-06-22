import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokeDetailComponent } from './poke-detail/poke-detail.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [PokeListComponent, PokeDetailComponent],
  imports: [CommonModule, PagesRoutingModule, SharedModule, MaterialModule],
})
export class PagesModule {}

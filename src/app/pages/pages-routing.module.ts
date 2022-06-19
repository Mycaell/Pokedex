import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokeDetailComponent } from './poke-detail/poke-detail.component';
import { PokeListComponent } from './poke-list/poke-list.component';

const routes: Routes = [
  {
    path: '',
    component: PokeListComponent,
  },
  {
    path: 'details/:id',
    component: PokeDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

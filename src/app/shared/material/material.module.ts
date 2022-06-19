import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class MaterialModule {}

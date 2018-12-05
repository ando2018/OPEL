import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CoreComponent } from './core/core.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [CoreComponent]
})
export class CoreModule {}

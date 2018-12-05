import { NgModule } from '@angular/core';
import { NgxWigModule } from 'ngx-wig';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { CommonModule } from '@angular/common';
import { SpecialOffersComponent } from './special-offers/special-offers.component';

@NgModule({
    imports: [CommonModule, NgxWigModule, FormsModule, ReactiveFormsModule, NgSelectModule],
    declarations: [SpecialOffersComponent]
})
export class SpecialOffersModule {}

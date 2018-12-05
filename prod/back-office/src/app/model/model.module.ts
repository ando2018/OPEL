import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ModelCo2ConsumptionComponent } from './model-co2-consumption/model-co2-consumption.component';
import { ModelCo2ConsumptionFormComponent } from './model-co2-consumption-form/model-co2-consumption-form.component';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelOptionsComponent } from './model-options/model-options.component';
import { ModelOptionsFormComponent } from './model-options-form/model-options-form.component';
import { ModelPricesComponent } from './model-prices/model-prices.component';
import { ModelPricesFormComponent } from './model-prices-form/model-prices-form.component';
import { ModelRootComponent } from './model-root/model-root.component';
import { ModelTechnicalComponent } from './model-technical/model-technical.component';
import { ModelTechnicalFormComponent } from './model-technical-form/model-technical-form.component';
import { ModelDetailRootComponent } from './model-detail-root/model-detail-root.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { ModelDetailHomeComponent } from './model-detail-home/model-detail-home.component';
import { ModelDetailHomeFormComponent } from './model-detail-home-form/model-detail-home-form.component';


@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, ReactiveFormsModule, NgxSmartModalModule],
    declarations: [
        ModelCo2ConsumptionComponent,
        ModelCo2ConsumptionFormComponent,
        ModelListComponent,
        ModelOptionsComponent,
        ModelOptionsFormComponent,
        ModelPricesComponent,
        ModelPricesFormComponent,
        ModelRootComponent,
        ModelTechnicalComponent,
        ModelTechnicalFormComponent,
        ModelDetailRootComponent,
        ModelDetailHomeComponent,
        ModelDetailHomeFormComponent
    ],
    providers: [NgxSmartModalService]
})
export class ModelModule { }

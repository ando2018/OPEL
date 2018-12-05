import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { VehicleRootComponent } from './vehicle-root/vehicle-root.component';
import { VehicleFilterComponent } from './vehicle-filter/vehicle-filter.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { GammeFormComponent } from './gamme-form/gamme-form.component';
import { VehicleDetailRootComponent } from './vehicle-detail-root/vehicle-detail-root.component';
import { VehicleListRootComponent } from './vehicle-list-root/vehicle-list-root.component';
import { VehicleBrochureComponent } from './vehicle-brochure/vehicle-brochure.component';
import { VehicleBrochureFormComponent } from './vehicle-brochure-form/vehicle-brochure-form.component';
import { VehicleVideosComponent } from './vehicle-videos/vehicle-videos.component';
import { VehicleVideosFormComponent } from './vehicle-videos-form/vehicle-videos-form.component';
import { VehicleIframesComponent } from './vehicle-iframes/vehicle-iframes.component';
import { VehicleIframesFormComponent } from './vehicle-iframes-form/vehicle-iframes-form.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSmartModalModule.forChild()
    ],
    declarations: [
        VehicleRootComponent,
        VehicleFilterComponent,
        VehicleListComponent,
        GammeFormComponent,
        VehicleDetailRootComponent,
        VehicleListRootComponent,
        VehicleBrochureComponent,
        VehicleBrochureFormComponent,
        VehicleVideosComponent,
        VehicleVideosFormComponent,
        VehicleIframesComponent,
        VehicleIframesFormComponent,
        VehicleComponent,
        VehicleFormComponent
    ],
    providers: [NgxSmartModalService]
})
export class VehiclesModule {}

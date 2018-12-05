import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { CoreRootComponent } from './core/core-root/core-root.component';
import { CarInfosRootComponent } from './car-infos/car-infos-root/car-infos-root.component';
import { EquipmentsComponent } from './car-infos/equipments/equipments.component';
import { OptionsComponent } from './car-infos/options/options.component';
import { TechnicalDatasComponent } from './car-infos/technical-datas/technical-datas.component';
import { VideosComponent } from './car-infos/videos/videos.component';
import { AuthenticationComponent } from './configuration/authentication/authentication.component';
import { ConfigurationComponent } from './configuration/configuration/configuration.component';
import { BrochureFormComponent } from './car-infos/brochure/brochure.component';
import { UserGuardService } from './core/_service/user-guard.service';
import { EnvironmentalInfosComponent } from './car-infos/environmental-infos/environmental-infos.component';
import { PriceDetailsComponent } from './car-infos/price-details/price-details.component';
import { BrochureSentComponent } from './car-infos/brochure-sent/brochure-sent.component';
import { CarInfosSlidesContainerComponent } from './car-infos/car-infos-slides-container/car-infos-slides-container.component';
import { BrochurePdfComponent } from './analytics/brochure-pdf/brochure-pdf.component';

const routes = [
    { path: '', redirectTo: 'stand', pathMatch: 'full' },
    { path: 'analytics-pdf/:name/:url', component: BrochurePdfComponent },
    {
        path: 'stand',
        component: CoreRootComponent,
        children: [
            { path: '', redirectTo: 'car-infos', pathMatch: 'full' },
            {
                path: 'car-infos',
                component: CarInfosRootComponent,
                children: [
                    { path: '', redirectTo: 'slides', pathMatch: 'full' },
                    { path: 'slides', component: CarInfosSlidesContainerComponent},
                    { path: 'brochure-request-sent', component: BrochureSentComponent },
                    /*{ path: 'equipments', component: EquipmentsComponent },
                    { path: 'options', component: OptionsComponent },
                    { path: 'technical-datas', component: TechnicalDatasComponent },
                    { path: 'videos', component: VideosComponent },
                    { path: 'brochure', component: BrochureFormComponent },
                    { path: 'environmental-infos', component: EnvironmentalInfosComponent },*/
                    { path: 'price-details', component: PriceDetailsComponent }
                ]
            }
        ]
    },
    { path: 'authentication', component: AuthenticationComponent },
    { path: 'configuration', component: ConfigurationComponent, canActivate: [UserGuardService] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

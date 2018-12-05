import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../app/auth-guard';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { CoreComponent } from './core/core/core.component';
import { VehicleRootComponent } from './vehicles/vehicle-root/vehicle-root.component';
import { SpecialOffersComponent } from './special-offers/special-offers/special-offers.component';
import { ConfidentialityComponent } from './confidentiality/confidentiality/confidentiality.component';
import { VehicleListRootComponent } from './vehicles/vehicle-list-root/vehicle-list-root.component';
import { VehicleDetailRootComponent } from './vehicles/vehicle-detail-root/vehicle-detail-root.component';
import { VehicleBrochureComponent } from './vehicles/vehicle-brochure/vehicle-brochure.component';
import { VehicleVideosComponent } from './vehicles/vehicle-videos/vehicle-videos.component';
import { VehicleIframesComponent } from './vehicles/vehicle-iframes/vehicle-iframes.component';
import { VehicleBrochureFormComponent } from './vehicles/vehicle-brochure-form/vehicle-brochure-form.component';
import { VehicleVideosFormComponent } from './vehicles/vehicle-videos-form/vehicle-videos-form.component';
import { VehicleIframesFormComponent } from './vehicles/vehicle-iframes-form/vehicle-iframes-form.component';
import { VehicleComponent } from './vehicles/vehicle/vehicle.component';
import { ModelRootComponent } from './model/model-root/model-root.component';
import { VehicleFormComponent } from './vehicles/vehicle-form/vehicle-form.component';
import { ModelOptionsComponent } from './model/model-options/model-options.component';
import { ModelTechnicalComponent } from './model/model-technical/model-technical.component';
import { ModelCo2ConsumptionComponent } from './model/model-co2-consumption/model-co2-consumption.component';
import { ModelPricesComponent } from './model/model-prices/model-prices.component';
import { ModelDetailRootComponent } from './model/model-detail-root/model-detail-root.component';
import { ModelOptionsFormComponent } from './model/model-options-form/model-options-form.component';
import { ModelTechnicalFormComponent } from './model/model-technical-form/model-technical-form.component';
import { ModelCo2ConsumptionFormComponent } from './model/model-co2-consumption-form/model-co2-consumption-form.component';
import { ModelPricesFormComponent } from './model/model-prices-form/model-prices-form.component';
import { ModelDetailHomeComponent } from './model/model-detail-home/model-detail-home.component';
import { ModelDetailHomeFormComponent } from './model/model-detail-home-form/model-detail-home-form.component';
import { VehicleResolver } from './vehicles/vehicle.resolver';
import { ModelResolver } from './model/model.resolver';

const routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: 'authentication', component: AuthenticationComponent },
    {
        path: 'admin',
        component: CoreComponent,
        canActivate: [AuthenticationGuard],
        children: [
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            {
                path: 'vehicles',
                component: VehicleRootComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list',
                        component: VehicleListRootComponent
                    },
                    {
                        path: 'detail/:vehicleId',
                        component: VehicleDetailRootComponent,
                        resolve: { vehicle: VehicleResolver },
                        children: [
                            { path: '', redirectTo: 'vehicle', pathMatch: 'full' },
                            { path: 'vehicle', component: VehicleComponent },
                            { path: 'brochures', component: VehicleBrochureComponent },
                            { path: 'videos', component: VehicleVideosComponent },
                            { path: 'iframes', component: VehicleIframesComponent },
                            {
                                path: 'models',
                                component: ModelRootComponent,
                                children: [
                                    {
                                        path: 'detail/:modelId',
                                        component: ModelDetailRootComponent,
                                        resolve: { model: ModelResolver },
                                        children: [
                                            { path: '', redirectTo: 'home', pathMatch: 'full' },
                                            { path: 'home', component: ModelDetailHomeComponent },
                                            { path: 'options', component: ModelOptionsComponent },
                                            {
                                                path: 'technicals',
                                                component: ModelTechnicalComponent
                                            },
                                            {
                                                path: 'co2-consumption',
                                                component: ModelCo2ConsumptionComponent
                                            },
                                            { path: 'prices', component: ModelPricesComponent }
                                        ]
                                    },
                                    {
                                        path: 'edit/:modelId',
                                        component: ModelDetailRootComponent,
                                        resolve: { model: ModelResolver },
                                        children: [
                                            { path: '', redirectTo: 'home', pathMatch: 'full' },
                                            {
                                                path: 'home',
                                                component: ModelDetailHomeFormComponent
                                            },
                                            {
                                                path: 'options',
                                                component: ModelOptionsFormComponent
                                            },
                                            {
                                                path: 'technicals',
                                                component: ModelTechnicalFormComponent
                                            },
                                            {
                                                path: 'co2-consumption',
                                                component: ModelCo2ConsumptionFormComponent
                                            },
                                            { path: 'prices', component: ModelPricesFormComponent }
                                        ]
                                    },
                                    {
                                        path: 'new',
                                        component: ModelDetailRootComponent,
                                        resolve: { vehicle: VehicleResolver, model: ModelResolver },
                                        children: [
                                            { path: '', component: ModelDetailHomeFormComponent }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'edit/:vehicleId',
                        component: VehicleDetailRootComponent,
                        resolve: { vehicle: VehicleResolver },
                        children: [
                            { path: '', redirectTo: 'vehicle', pathMatch: 'full' },
                            { path: 'vehicle', component: VehicleFormComponent },
                            { path: 'brochures', component: VehicleBrochureFormComponent },
                            { path: 'videos', component: VehicleVideosFormComponent },
                            { path: 'iframes', component: VehicleIframesFormComponent }
                        ]
                    },
                    {
                        path: 'new',
                        resolve: { vehicle: VehicleResolver },
                        component: VehicleDetailRootComponent,
                        children: [{ path: 'vehicle', component: VehicleFormComponent }]
                    }
                ]
            },
            { path: 'special-offers', component: SpecialOffersComponent },
            { path: 'confidentiality', component: ConfidentialityComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [VehicleResolver, ModelResolver]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import * as svc from './services';

const services = [
    svc.GaHomePageService,
    svc.GaMenuService,
    svc.GaGenericListService,
    svc.GaGenericIframeService,
    svc.GaPageVehiculeService,
    svc.GaPageConfigurateurService,
    svc.GaPageAccessoiresService,
    svc.GaPageVideoService,
    svc.GaPageOffresSpeciales,
    svc.GaPageBrochureService,
    svc.GaQrCodeService
];

@NgModule({
    providers: [...services]
})
export class GaModule {
}

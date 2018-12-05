import { Injectable } from '@angular/core';
import * as constants from '../const';
import { GaPageVehiculeService } from './ga-page-vehicule.service';
import { GaPageConfigurateurService } from './ga-page-configurateur.service';
import { GaPageAccessoiresService } from './ga-page-accessoires.service';
import { GoogleAnalyticsEventsService } from '../../_service/google-analytics-events.service';

@Injectable()
export class GaGenericIframeService {
    constructor(
        private gaVehicleService: GaPageVehiculeService,
        private gaConfigurateurService: GaPageConfigurateurService,
        private gaAccessoiresService: GaPageAccessoiresService,
        private service: GoogleAnalyticsEventsService
    ) {}

    public loadIframe(name, route) {
        const path = route.split('/')[route.split('/').length - 1];

        const e = {
            event: constants.SHOW_EVENT
        };

        switch (path) {
            case constants.vehiclesRoute:
                e['action'] = this.gaVehicleService.actionLoadIframe(name);
                e['label'] = this.gaVehicleService.tagLoadIframe(name);
                e['category'] = constants.VEHICLES_CATEGORY;
                break;

            case constants.configuratorRoute:
                e['action'] = this.gaConfigurateurService.actionLoadIframe(name);
                e['label'] = this.gaConfigurateurService.tagLoadIframe(name);
                e['category'] = constants.CONFIGURATOR_CATEGORY;
                break;

            case constants.accessoriesRoute:
                e['action'] = this.gaAccessoiresService.actionIframeLoad(name);
                e['label'] = this.gaAccessoiresService.tagIframeLoad(name);
                e['category'] = constants.ACCESSORIES_CATEGORY;
                break;

            default:
                break;
        }

        this.service.emitEvent(e);
    }
}

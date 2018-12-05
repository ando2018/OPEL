import { Injectable } from '@angular/core';
import * as constants from '../const';
import { GaPageVehiculeService } from './ga-page-vehicule.service';
import { GaPageConfigurateurService } from './ga-page-configurateur.service';
import { GaPageAccessoiresService } from './ga-page-accessoires.service';
import { GoogleAnalyticsEventsService } from '../../_service/google-analytics-events.service';


@Injectable()
export class GaGenericListService {
    constructor(
        private vehicleService: GaPageVehiculeService,
        private configuratorService: GaPageConfigurateurService,
        private accessoriesService: GaPageAccessoiresService,
        private service: GoogleAnalyticsEventsService
    ) {}

    public clicVehicle(vehicle, route) {
        const name = vehicle['name'];
        const path = route.split('/')[route.split('/').length - 1];

        const e = {
            event: constants.CLICK_EVENT
        };

        switch (path) {
            case constants.vehiclesRoute:
                e['action'] = this.vehicleService.actionClick(name);
                e['label'] = this.vehicleService.tagClick(name);
                e['category'] = constants.VEHICLES_CATEGORY;
                break;

            case constants.configuratorRoute:
                e['action'] = this.configuratorService.actionClick(name);
                e['label'] = this.configuratorService.tagClick(name);
                e['category'] = constants.CONFIGURATOR_CATEGORY;
                break;

            case constants.accessoriesRoute:
                e['action'] = this.accessoriesService.actionClick(name);
                e['label'] = this.accessoriesService.tagClick(name);
                e['category'] = constants.ACCESSORIES_CATEGORY;
                break;

            default:
                break;
        }

        this.service.emitEvent(e);
    }
}

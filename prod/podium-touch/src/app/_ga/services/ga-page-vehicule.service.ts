import { Injectable } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../../_service/google-analytics-events.service';
import { SlugifierService } from '../../_service/slugifer.service';

@Injectable()
export class GaPageVehiculeService {
    constructor(private service: GoogleAnalyticsEventsService, private slugifier: SlugifierService) {
    }

    public actionClick = name => `CLIC ${name.toUpperCase()}`;
    public tagClick = name => `CLIC_VEHICULE_${this.slugifier.slugify(name, true).toUpperCase()}`;

    public actionLoadIframe = name => `AFFICHAGE IFRAME VIEW LIEN FICHE ${name.toUpperCase()}`;
    public tagLoadIframe = name => `PAGE-EXT_FICHE_${this.slugifier.slugify(name, true).toUpperCase()}`;
}

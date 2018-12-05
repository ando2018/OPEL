import { Injectable } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../../_service/google-analytics-events.service';
import { SlugifierService } from '../../_service/slugifer.service';

@Injectable()
export class GaPageConfigurateurService {
    constructor(
        private service: GoogleAnalyticsEventsService,
        private slugifier: SlugifierService
    ) {}

    public actionClick = name => `CLIC ${name.toUpperCase()}`;
    public tagClick = name => `CLIC_CONFIGURATEUR_${this.slugifier.slugify(name, true).toUpperCase()}`;

    public actionLoadIframe = name => `AFFICHAGE IFRAME VIEW ${name.toUpperCase()}`;
    public tagLoadIframe = name => `PAGE-EXT_CONFIG_${this.slugifier.slugify(name, true).toUpperCase()}`;
}

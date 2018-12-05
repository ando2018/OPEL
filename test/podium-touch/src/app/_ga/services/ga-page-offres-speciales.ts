import { Injectable } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../../_service/google-analytics-events.service';
import { SlugifierService } from '../../_service/slugifer.service';
import { SHOW_EVENT, SPECIAL_OFFERS_CATEGORY } from '../const';

@Injectable()
export class GaPageOffresSpeciales {
    constructor(private service: GoogleAnalyticsEventsService, private slugifier: SlugifierService) {}

    public show(slide, index) {
        const e = {
            category: SPECIAL_OFFERS_CATEGORY,
            action: this.action(slide, index),
            label: this.tag(slide, index),
            event: SHOW_EVENT
        };

        this.service.emitEvent(e);
    }

    private action = (slide, index) => `AFFICHAGE OFFRE ${index} - ${slide['months'].toUpperCase()} - ${slide['title'].toUpperCase()}`;
    private tag = (slide, index) => `PAGE_OFFRE_${index} - ${this.slugifier.slugify(slide['months'], true).toUpperCase()}_${this.slugifier.slugify(slide['title'], true).toUpperCase()}`;
}

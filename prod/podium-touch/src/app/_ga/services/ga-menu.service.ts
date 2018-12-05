import { Injectable } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../../_service/google-analytics-events.service';
import { SlugifierService } from '../../_service/slugifer.service';
import { CLICK_EVENT, NAVIGATION_CATEGORY } from '../const';

@Injectable()
export class GaMenuService {
    constructor(private service: GoogleAnalyticsEventsService, private slugifier: SlugifierService) {}

    public click(menu) {
        const event = {
            category: NAVIGATION_CATEGORY,
            action: this.actionClick(menu),
            label: this.tagClick(menu),
            event: CLICK_EVENT
        };

        this.service.emitEvent(event);
    }

    private actionClick = name => `CLIC MENU ENTRÉE ${name.toUpperCase()}`;
    private tagClick = name => `CLIC_NAV_${this.slugifier.slugify(name, true).toUpperCase()}`;
}

import { Injectable } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../../_service/google-analytics-events.service';
import { SlugifierService } from '../../_service/slugifer.service';
import { BROCHURE_REQUEST_CATEGORY, CLICK_EVENT, SHOW_EVENT } from '../const';

@Injectable()
export class GaPageBrochureService {
    constructor(
        private service: GoogleAnalyticsEventsService,
        private slugifier: SlugifierService
    ) {}

    public click(name) {
        const e = {
            category: BROCHURE_REQUEST_CATEGORY,
            action: this.actionClick(name),
            label: this.tagClick(name),
            event: CLICK_EVENT
        };

        this.service.emitEvent(e);
    }

    public showForm(name) {
        const e = {
            category: BROCHURE_REQUEST_CATEGORY,
            action: this.actionShowForm(name),
            label: this.tagShowForm(name),
            event: SHOW_EVENT
        };

        this.service.emitEvent(e);
    }

    public submit(name) {
        const e = {
            category: BROCHURE_REQUEST_CATEGORY,
            action: this.actionSubmit(name),
            label: this.tagSubmit(name),
            event: CLICK_EVENT
        };

        this.service.emitEvent(e);
    }

    private actionClick = name => `CLIC ${name}`;
    private tagClick = name => `CLIC_BROCHURE_${this.slugifier.slugify(name, true).toUpperCase()}`;

    private actionShowForm = name => `AFFICHAGE PAGE FORMULAIRE ${name}`;
    private tagShowForm = name =>
        `PAGE_BROCHURE_FORM_${this.slugifier.slugify(name, true).toUpperCase()}`;

    private actionSubmit = name => `CLIC BOUTON VALIDER PAGE FORMULAIRE ${name}`;
    private tagSubmit = name =>
        `CLIC_BT_VALID-FORM_${this.slugifier.slugify(name, true).toUpperCase()}`;
}

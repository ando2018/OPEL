import { Injectable } from '@angular/core';

declare let ga: Function;

@Injectable()
export class GoogleAnalyticsEventsService {
    constructor() {
    }

    // public emitEvent(event: { category: string, label: string, action: string, value: string, event: string }) {
    public emitEvent(event) {
        ga('send', 'event', {
            eventCategory: event.category,
            eventLabel: event.label,
            eventAction: event.action,
            eventValue: event.value
        });
    }
}

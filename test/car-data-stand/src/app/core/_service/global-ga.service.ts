import { Injectable } from '@angular/core';
import { GoogleAnalyticsEventsService } from './google-analytics-events.service';
import { CAR_DATA_STAND_CATEGORY, CLICK_EVENT, SCAN_EVENT, SHOW_EVENT } from '../_const/constants';
import { SlugifierService } from './slugifier.service';

@Injectable()
export class GlobalGaService {
    constructor(private ga: GoogleAnalyticsEventsService, private slugifier: SlugifierService) { }

    public clickMenu(menu) {
        const e = {
            category: CAR_DATA_STAND_CATEGORY,
            action: this.actionClickMenu(menu),
            label: this.tagClickMenu(menu),
            event: CLICK_EVENT
        };

        this.ga.emitEvent(e);
    }

    public showForm(name) {
        const e = {
            category: CAR_DATA_STAND_CATEGORY,
            action: this.actionShowForm(name),
            label: this.tagShowForm(name),
            event: SHOW_EVENT
        };

        this.ga.emitEvent(e);
    }

    public submitForm(name) {
        const e = {
            category: CAR_DATA_STAND_CATEGORY,
            action: this.actionSubmitForm(name),
            label: this.tagSubmitForm(name),
            event: CLICK_EVENT
        };

        this.ga.emitEvent(e);
    }

    public showThankYouPage(name) {
        const e = {
            category: CAR_DATA_STAND_CATEGORY,
            action: this.actionShowThankYouPage(name),
            label: this.tagShowThankYouPage(name),
            event: SHOW_EVENT
        };

        this.ga.emitEvent(e);
    }

    public clickRetour() {
        const e = {
            category: CAR_DATA_STAND_CATEGORY,
            action: this.actionClickRetour(),
            label: this.tagClickRetour(),
            event: CLICK_EVENT
        };

        this.ga.emitEvent(e);
    }

    public showPriceDetailsPage(name) {
        const e = {
            category: CAR_DATA_STAND_CATEGORY,
            action: this.actionShowPriceDetailPage(name),
            label: this.tagShowPriceDetailPage(name),
            event: SHOW_EVENT
        };

        this.ga.emitEvent(e);
    }

    public showPage(name) {
        const e = {
            category: CAR_DATA_STAND_CATEGORY,
            action: this.actionShowPage(name),
            label: this.tagShowPage(name),
            event: SHOW_EVENT
        };

        this.ga.emitEvent(e);
    }

    public scanQrCode(name) {
        const e = {
            category: CAR_DATA_STAND_CATEGORY,
            action: this.actionScanQrCode(name),
            label: this.tagScanQrCode(name),
            event: SCAN_EVENT
        };

        this.ga.emitEvent(e);
    }

    private actionClickMenu = menu => `clic entrée menu`.toUpperCase();
    private tagClickMenu = menu => `CLIC_MENU_${this.slugifier.slugify(menu, true).toUpperCase()}`;

    private actionShowForm = name => `AFFICHAGE PAGE FORMULAIRE`;
    private tagShowForm = name => `PAGE_BROCHURE_FORM_${this.slugifier.slugify(name, true).toUpperCase()}_CARDATA`;

    private actionSubmitForm = name => `CLIC SUR BOUTTON VALIDER`;
    private tagSubmitForm = name => `CLIC_BT_VALID-FORM_${this.slugifier.slugify(name, true).toUpperCase()}8CARDATA`;

    private actionShowThankYouPage = menu => `AFFICHAGE DE LA PAGE DE CONRIFMATION`;
    private tagShowThankYouPage = menu => `PAGE_BROCHURE_FORM_CONFIRM_OK_CARDATA`;

    private actionClickRetour = () => `CLIC BOUTON RETOUR PRIX`;
    private tagClickRetour = () => `CLIC_Bt_RETOUR_PRIX`;

    private actionShowPriceDetailPage = name => `AFFICHAGE PAGE DE DéTAIL PRIX DE ${this.slugifier.stripTag(name, ' ')}`.toUpperCase();
    private tagShowPriceDetailPage = name => `PAGE_DETAIL_PRIX_${this.slugifier.slugify(name, true).toUpperCase()}`;

    private actionShowPage = name => `AFFICHAGE PAGE ${name}`.toUpperCase();
    private tagShowPage = name => `PAGE_${this.slugifier.slugify(name, true).toUpperCase()}`;

    private actionScanQrCode = name => `SCAN QR CODE ${name.toUpperCase()}`;
    private tagScanQrCode = name => `SCAN_QR_CODE_${this.slugifier.slugify(name, true).toUpperCase()}`;
}

import { Injectable } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../../_service/google-analytics-events.service';

import * as constants from '../const';
import { SlugifierService } from '../../_service/slugifer.service';

@Injectable()
export class GaHomePageService {

    constructor(private service: GoogleAnalyticsEventsService, private slugifier: SlugifierService) {}

    public showPage(index: number, src: string): void {
        const names = constants.menuItems;

        switch (src) {
            case constants.srcDefault:
                this.affichageHomePage(names[index]); break;

            case constants.srcButton:
                this.clickIcon(names[index]); break;

            case constants.srcZoneText:
                this.clickText(names[index]); break;

            default:
                break;
        }
    }

    public showGamePage(category, name): void {
        const e = {
            category: category,
            action: this.affichagePageGame(name),
            label: this.tagAffichagePageGame(name),
            event: constants.SHOW_EVENT
        };

        this.service.emitEvent(e);
    }

    public affichageHomePage(name) {
        const e = {
            category: constants.HOME_CATEGORY,
            action: this.actionAffichage(name),
            label: this.tagAffichage(name),
            event: constants.SHOW_EVENT
        };

        this.service.emitEvent(e);
    }

    public clickIcon(name) {
        const e = {
            category: constants.HOME_CATEGORY,
            action: this.actionClickIcon(name),
            label: this.tagClickIcon(name),
            event: constants.CLICK_EVENT
        };

        this.service.emitEvent(e);
    }

    public clickText(name) {
        const e = {
            category: constants.HOME_CATEGORY,
            action: this.actionClickTxt(name),
            label: this.tagClickTxt(name),
            event: constants.CLICK_EVENT
        };

        this.service.emitEvent(e);
    }

    public clickFooterLink(name) {
        const e = {
            category: constants.HOME_CATEGORY,
            action: this.actionFooterLink(name),
            label: this.tagFooterLink(name),
            event: constants.CLICK_EVENT
        };

        this.service.emitEvent(e);
    }

    public loadFooterIframe(name) {
        const e = {
            category: constants.HOME_CATEGORY,
            action: this.actionIframeFooter(name),
            label: this.tagIframeFooter(name),
            event: constants.CLICK_EVENT
        };

        this.service.emitEvent(e);
    }

    private affichagePageGame = game => `AFFICHAGE PAGE GAMME ${this.slugifier.slugify(game, false).toUpperCase()}`;
    private tagAffichagePageGame = game =>  `PAGE_${this.slugifier.slugify(game, true).toLocaleUpperCase()}_GAMME`;

    private actionAffichage = name => `AFFICHAGE HOME PAGE ${name.toUpperCase()}`;
    private tagAffichage = name => `PAGE_HOME_${this.slugifier.slugify(name, true).toUpperCase()}`;

    private actionClickIcon = name => `CLIC HP BOUTON ${name.toUpperCase()} OU FLECHE HAUT/BAS`;
    private tagClickIcon = name => `CLIC_HOME_Bt_${this.slugifier.slugify(name, true).toUpperCase()}`;

    private actionClickTxt = name => `CLIC HP ZONE TEXTE ${name.toUpperCase()}`;
    private tagClickTxt = name => `'CLIC_HOME_ZoneTxt_${this.slugifier.slugify(name, true).toUpperCase()}`;

    private actionFooterLink = name => `CLIC ${name.toUpperCase()}`;
    private tagFooterLink = name => `CLICK_FOOTER_${this.slugifier.slugify(name, true).toUpperCase()}`;

    private actionIframeFooter = name => `AFFICHAGE IFRAME VIEW ${name.toUpperCase()}`;
    private tagIframeFooter = name => `PAGE_FOOTER_${this.slugifier.slugify(name, true).toUpperCase()}`;
}

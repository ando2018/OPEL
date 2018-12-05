import { Injectable } from '@angular/core';
import { SlugifierService } from '../../_service/slugifer.service';
import { GoogleAnalyticsEventsService } from '../../_service/google-analytics-events.service';
import * as constants from '../const';

@Injectable()
export class GaPageVideoService {
    constructor(private slugifier: SlugifierService, private service: GoogleAnalyticsEventsService) {}

    public click(game) {
        const e = {
            category: constants.VIDEOS_CATEGORY,
            action: this.clickVideo(game),
            label: this.tagClickVideo(game),
            event: constants.CLICK_EVENT
        };

        this.service.emitEvent(e);
    }

    public clickBackButton(game, index, name) {
        const e = {
            category: constants.VIDEOS_CATEGORY,
            action: this.backButton(game, name),
            label: this.tagBackButton(game, index, name),
            event: constants.CLICK_EVENT
        };

        this.service.emitEvent(e);
    }

    public play(game, name) {
        const e = {
            category: constants.VIDEOS_CATEGORY,
            action: this.playVideo(game, name),
            label: this.tagPlayVideo(game, name),
            event: constants.CLICK_EVENT
        };

        this.service.emitEvent(e);
    }

    public show(game, name) {
        const e = {
            category: constants.VIDEOS_CATEGORY,
            action: this.showVideo(game, name),
            label: this.tagShowVideo(game, name),
            event: constants.SHOW_EVENT
        };

        this.service.emitEvent(e);
    }

    private clickVideo = video => `CLIC ${video.toUpperCase()}`;
    private tagClickVideo = video => `CLIC_VIDEOS_${this.slugifier.slugify(video, false).toUpperCase()}`;

    private backButton = (game, video) => `CLIC BOUTON RETOUR VIDEO ${game.toUpperCase()} - ${video.toUpperCase()}`;
    private tagBackButton = (game, index, video) => `CLIC_BT_RETOUR_VIDEOS_${this.slugifier.slugify(game, true).toUpperCase()}_${index}-${this.slugifier.slugify(video, true).toUpperCase()}`;

    private playVideo = (game, video) => `CLIC PLAY ${game.toUpperCase()} - ${video.toUpperCase()}`;
    private tagPlayVideo = (game, video) => `CLIC_BT_PLAY_VIDEOS_${this.slugifier.slugify(game, true).toUpperCase()} - ${this.slugifier.slugify(video, true).toUpperCase()}`;

    private showVideo = (game, video) => `AFFICHAGE/VISIONNAGE ${game} - ${video}`.toUpperCase();
    private tagShowVideo = (game, video) => ``;
}

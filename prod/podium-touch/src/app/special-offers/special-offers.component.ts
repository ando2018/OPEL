import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { RouterWatcherService } from '../_service/router-watcher.service';
import { GaHomePageService, GaPageOffresSpeciales } from '../_ga/services';
import * as constants from '../_ga/const';
import { SpecialOffersService } from '../_service/special-offers.service';
import { SpecialOffer, Offer } from '../special-offer.model';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-special-offers',
    templateUrl: './special-offers.component.html',
    styleUrls: ['./special-offers.component.css']
})
export class SpecialOffersComponent implements OnInit {
    constructor(
        private routerWatcherService: RouterWatcherService,
        private gaHomePageService: GaHomePageService,
        private gaSpecialOffers: GaPageOffresSpeciales,
        private specialOffersService: SpecialOffersService
    ) {}

    swiperConfig: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: 1,
        keyboard: true,
        mousewheel: true,
        scrollbar: false,
        navigation: true,
        pagination: false,
        loop: true,
        width: 1920
    };

    slides: Slide[] = [];

    public currentSlide: Slide;
    public currentIndex = 0;

    ngOnInit() {
        this.specialOffersService.getSpecialOffer().subscribe((specialOffer: SpecialOffer) => {
            this.slides = specialOffer.offers.map((offer: Offer) => ({
                title: offer.title,
                months: offer.months.join('-'),
                src: environment.isMock
                    ? `assets/img/${offer.fileName}`
                    : `${environment.mediasBaseUrl}/${environment.imagesFolder}/${offer.fileName}`
            }));

            // We need to reassign slide height
            this.swiperConfig = {
                ...this.swiperConfig,
                height: window.innerHeight
            };

            this.currentSlide = this.slides[0];
        });
        this.currentSlide && this.gaSpecialOffers.show(this.currentSlide, this.currentIndex + 1);
        this.gaHomePageService.showGamePage(constants.SPECIAL_OFFERS_CATEGORY, 'offres spéciales');
    }

    indexChange(i) {
        this.currentSlide = this.slides[i];
        this.currentSlide && this.gaSpecialOffers.show(this.currentSlide, i + 1);
        this.routerWatcherService.resetWatcher(null, 'Special offers slides change');
    }
}

interface Slide {
    title: string;
    months: string;
    src: string;
}

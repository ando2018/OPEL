import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperAutoplayInterface, SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { SlidesService } from '../_service/slides.service';
import { environment } from '../../../environments/environment';
import { GlobalSharedService } from '../_service/global-shared.service';

@Component({
    selector: 'app-carrousel',
    templateUrl: './carrousel.component.html',
    styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

    public slides = [];
    public hideCarousel: boolean;

    private autoplayConfig: SwiperAutoplayInterface = {
        disableOnInteraction: false,
        delay: 5000
    };

    public config: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: 1,
        keyboard: true,
        mousewheel: false,
        scrollbar: false,
        navigation: true,
        pagination: true,
        allowTouchMove: true,
        autoplay: this.autoplayConfig
    };

    @ViewChild(SwiperComponent) componentRef?: SwiperComponent;

    constructor(
        private slidesService: SlidesService,
        private sharedService: GlobalSharedService
    ) {
    }

    ngOnInit() {
        this.slidesService.getSlides().subscribe(slides =>
            slides && slides.length > 0 && (this.slides = slides.map(name => ({
                title: name, src: `${environment.mediasBaseUrl}/${environment.imagesFolder}/${name}`
            }))));

        this.sharedService.showBrochureSent().subscribe(value => this.hideCarousel = value);
    }
}

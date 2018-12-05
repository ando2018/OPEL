import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SWIPER_CONFIG, SwiperAutoplayInterface, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';

import { UserService } from './_service/user.service';
import { CoreRootComponent } from './core-root/core-root.component';
import { FooterComponent } from './footer/footer.component';
import { CoreRoutingModule } from './core-routing.module';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { UserGuardService } from './_service/user-guard.service';
import { SlidesService } from './_service/slides.service';
import { GoogleAnalyticsEventsService } from './_service/google-analytics-events.service';
import { GlobalGaService } from './_service/global-ga.service';
import { SlugifierService } from './_service/slugifier.service';

const autoplayConfig: SwiperAutoplayInterface = {
    disableOnInteraction: false
};

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    allowTouchMove: false
    // autoplay: autoplayConfig
};

@NgModule({
    imports: [CommonModule, CoreRoutingModule, SwiperModule],
    declarations: [CoreRootComponent, FooterComponent, CarrouselComponent],
    providers:
        [
            UserService,
            UserGuardService,
            SlidesService,
            GoogleAnalyticsEventsService,
            GlobalGaService,
            SlugifierService,
            { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }
        ]
})
export class CoreModule {
}

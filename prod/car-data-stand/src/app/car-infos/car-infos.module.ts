import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localefr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';

import { CarInfosRootComponent } from './car-infos-root/car-infos-root.component';
import { CarInfosSlidesContainerComponent } from './car-infos-slides-container/car-infos-slides-container.component';
import { CarInfosNavsComponent } from './car-infos-navs/car-infos-navs.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { OptionsComponent } from './options/options.component';
import { TechnicalDatasComponent } from './technical-datas/technical-datas.component';
import { VideosComponent } from './videos/videos.component';

import { CarInfosRoutingModule } from './car-infos-routing.module';
import { CarBannerComponent } from './car-banner/car-banner.component';
import { BrochureFormComponent } from './brochure/brochure.component';
import { InfoCarbuComponent } from './info-carbu/info-carbu.component';

import { CarInfosServices } from './_service/car-infos.services';
import { SharedService } from './_service/shared.service';
import { CarInfosResolver } from './_service/car-infos.resolver';
import { EnvironmentalInfosComponent } from './environmental-infos/environmental-infos.component';
import { PriceDetailsComponent } from './price-details/price-details.component';
import { BrochureSentComponent } from './brochure-sent/brochure-sent.component';
import { LoaderComponent } from '../core/loader/loader.component';
import { QRCodeModule } from 'angularx-qrcode';

registerLocaleData(localefr);

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    observer: true,
    direction: 'horizontal',
    threshold: 50,
    spaceBetween: 5,
    slidesPerView: 1,
    centeredSlides: true
};

@NgModule({
    imports: [
        CommonModule,
        CarInfosRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SwiperModule,
        NgxSmartModalModule.forRoot(),
        QRCodeModule
    ],
    declarations: [
        CarInfosRootComponent,
        CarInfosSlidesContainerComponent,
        CarInfosNavsComponent,
        EquipmentsComponent,
        OptionsComponent,
        TechnicalDatasComponent,
        VideosComponent,
        CarBannerComponent,
        BrochureFormComponent,
        InfoCarbuComponent,
        EnvironmentalInfosComponent,
        PriceDetailsComponent,
        BrochureSentComponent,
        LoaderComponent
    ],
    providers: [
        CarInfosServices,
        SharedService,
        CarInfosResolver,
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }
    ]
})
export class CarInfosModule {}

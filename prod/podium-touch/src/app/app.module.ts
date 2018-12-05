import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeComponent } from './home/home.component';
import { CoreComponent } from './core/core.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { VideosComponent } from './videos/videos.component';
import { SpecialOffersComponent } from './special-offers/special-offers.component';
import { BrochureComponent } from './brochure/brochure.component';
import { BrochureFormComponent } from './brochure-form/brochure-form.component';
import { AppRoutingModule } from './app-routing.module';
import { MyOpelComponent } from './my-opel/my-opel.component';
import { RousseauComponent } from './rousseau/rousseau.component';
import { VideoComponent } from './video/video.component';
import { SharedService } from './_service/shared.service';
import { SlugifierService } from './_service/slugifer.service';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { RouterWatcherService } from './_service/router-watcher.service';
import { VideoCategoriesComponent } from './video-categories/video-categories.component';
import { BrochureRequestSentComponent } from './brochure-request-sent/brochure-request-sent.component';
import { GenericListComponent } from './generic-list/generic-list.component';
import { GenericIframeComponent } from './generic-iframe/generic-iframe.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { IframeTrackerDirective } from './_directive/iframe-tracker.directive';
import { WebMailBrochureComponent } from './web-mail-brochure/web-mail-brochure.component';
import { GoogleAnalyticsEventsService } from './_service/google-analytics-events.service';
import { BrochurePdfComponent } from './analytics/brochure-pdf/brochure-pdf.component';
import { GaModule } from './_ga/ga.module';
import { QRCodeModule } from 'angularx-qrcode';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'vertical',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    height: window.innerHeight,
    width: 1920,
    scrollbar: false,
    navigation: true,
    pagination: false,
    autoHeight: true,
    loop: true
};

@NgModule({
    declarations: [
        IframeTrackerDirective,
        AppComponent,
        HomeComponent,
        CoreComponent,
        VehiclesComponent,
        ConfiguratorComponent,
        AccessoriesComponent,
        VideosComponent,
        SpecialOffersComponent,
        BrochureFormComponent,
        MyOpelComponent,
        RousseauComponent,
        VideoComponent,
        LegalNoticeComponent,
        VideoCategoriesComponent,
        BrochureRequestSentComponent,
        GenericListComponent,
        GenericIframeComponent,
        BrochureComponent,
        WebMailBrochureComponent,
        BrochurePdfComponent
    ],
    imports: [
        BrowserModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        SwiperModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxSmartModalModule.forChild(),
        GaModule,
        QRCodeModule
    ],
    providers: [
        SharedService,
        SlugifierService,
        RouterWatcherService,
        NgxSmartModalService,
        GoogleAnalyticsEventsService,
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

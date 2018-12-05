import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { SharedService } from '../_service';
import { GlobalGaService, GlobalSharedService, RouterWatcherService } from '../../core/_service';
import * as nav from '../../core/_const/constants';

@Component({
    selector: 'app-car-infos-slides-container',
    templateUrl: './car-infos-slides-container.component.html',
    styleUrls: ['./car-infos-slides-container.component.css']
})
export class CarInfosSlidesContainerComponent implements OnInit{

    public carInfos;
    public currentIndex = 0;
    public showPriceDetails = false;
    public showBrochureSent = false;
    public menus = [nav.HOME_EQUIPMENTS, nav.MODEL_OPTIONS, nav.TECHNICAL_DATAS, nav.BROCHURE_REQUEST, nav.CO2_CONSUMPTION];

    public config: SwiperConfigInterface = {
        a11y: true,
        direction: 'horizontal',
        slidesPerView: 1,
        keyboard: true,
        mousewheel: true,
        scrollbar: false,
        navigation: false,
        pagination: true,
        width: 1080,
        allowTouchMove: true
    };

    constructor(
        private sharedService: SharedService,
        private globalSharedService: GlobalSharedService,
        private gaService: GlobalGaService,
        private routerWatcher: RouterWatcherService
    ) {}

    ngOnInit() {
        this.sharedService.getModel()
            .pipe(filter(i => !!i))
            .subscribe(infos => this.carInfos = infos);
        this.sharedService.getIndex().subscribe(index => this.currentIndex = index);
        this.globalSharedService.showPriceDetails().subscribe(val => this.showPriceDetails = val);
        this.globalSharedService.showBrochureSent().subscribe(val => this.showBrochureSent = val);
        this.menus[this.currentIndex] && this.gaService.showPage(this.menus[this.currentIndex]);
    }

    public indexChange(index) {
        this.sharedService.setIndex(index);
        this.menus[this.currentIndex] && this.gaService.showPage(this.menus[this.currentIndex]);
        this.routerWatcher.resetWatcher(null, 'From Sliding main menu');
    }
}
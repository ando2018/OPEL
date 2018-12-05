import { Component, OnInit } from '@angular/core';

import { SharedService } from '../_service/shared.service';
import { GlobalSharedService } from '../../core/_service/global-shared.service';
import { GlobalGaService } from '../../core/_service/global-ga.service';
import { PRICE } from '../../core/_const/constants';

@Component({
    selector: 'app-car-banner',
    templateUrl: './car-banner.component.html',
    styleUrls: ['./car-banner.component.css']
})
export class CarBannerComponent implements OnInit {

    public carInfos;
    public showPriceDetails: boolean;
    public showBrochureRequestSent: boolean;

    constructor(
        private sharedService: SharedService,
        private globalSharedService: GlobalSharedService,
        private gaService: GlobalGaService
    ) {
    }

    ngOnInit() {
        this.sharedService.getCarInfos().subscribe(infos => infos && (this.carInfos = infos));
        this.globalSharedService.showPriceDetails().subscribe(display => this.showPriceDetails = display);
        this.globalSharedService.showBrochureSent().subscribe(display => this.showBrochureRequestSent = display);
    }

    clickPrice() {
        this.gaService.clickMenu(PRICE);
    }
}

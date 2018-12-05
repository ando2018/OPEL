import { Component, OnInit } from '@angular/core';

import { SharedService } from '../_service';
import { GlobalGaService, GlobalSharedService } from '../../core/_service';
import { PRICE } from '../../core/_const/constants';
import { ConfigurationModel } from '../../configuration/_model/configuration.model';

@Component({
    selector: 'app-car-banner',
    templateUrl: './car-banner.component.html',
    styleUrls: ['./car-banner.component.css']
})
export class CarBannerComponent implements OnInit {

    public carInfos;
    public showPriceDetails: boolean;
    public showBrochureRequestSent: boolean;
    public configuration: ConfigurationModel;

    constructor(
        private sharedService: SharedService,
        private globalSharedService: GlobalSharedService,
        private gaService: GlobalGaService
    ) {
    }

    ngOnInit() {
        this.sharedService.getModel().subscribe(infos => infos && (this.carInfos = infos));
        this.globalSharedService.showPriceDetails().subscribe(display => this.showPriceDetails = display);
        this.globalSharedService.showBrochureSent().subscribe(display => this.showBrochureRequestSent = display);
        this.globalSharedService.getConfiguration().subscribe(c => this.configuration = c);
    }

    clickPrice() {
        this.gaService.clickMenu(PRICE);
    }
}

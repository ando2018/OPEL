import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

import { SharedService } from '../_service/shared.service';
import { environment } from '../../../environments/environment';
import { GlobalSharedService } from '../../core/_service/global-shared.service';
import { GlobalGaService } from '../../core/_service/global-ga.service';
import { CO2_CONSUMPTION } from '../../core/_const/constants';

@Component({
    selector: 'app-info-carbu',
    templateUrl: './info-carbu.component.html',
    styleUrls: ['./info-carbu.component.css']
})
export class InfoCarbuComponent implements OnInit {

    public display = false;

    public carInfos;
    public imgSrc;
    public showPriceDetails: boolean;
    public showBrochureRequestSent: boolean;

    constructor(
        private sharedService: SharedService,
        public globalSharedService: GlobalSharedService,
        private gaService: GlobalGaService
    ) {
    }

    ngOnInit() {
        this.sharedService.getCarInfos().pipe(
            filter(info => info && info.hasOwnProperty('environment'))
        ).subscribe(info => {
            this.carInfos = info;
            this.imgSrc = `${environment.mediasBaseUrl}/${environment.imagesFolder}/${this.carInfos.environment.image}`;
            // this.gaService.showPage(CO2_CONSUMPTION);
        });

        this.globalSharedService.showPriceDetails().subscribe(value => this.showPriceDetails = value);
        this.globalSharedService.showBrochureSent().subscribe(value => this.showBrochureRequestSent = value);
    }

}

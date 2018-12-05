import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GlobalSharedService } from '../../core/_service/global-shared.service';
import { SharedService } from '../_service/shared.service';
import { environment } from '../../../environments/environment';
import { GlobalGaService } from '../../core/_service/global-ga.service';
import { PRICE } from '../../core/_const/constants';

@Component({
    selector: 'app-price-details',
    templateUrl: './price-details.component.html',
    styleUrls: ['./price-details.component.css']
})
export class PriceDetailsComponent implements OnInit, OnDestroy {

    public loading: boolean;
    public carInfos: any;
    public priceDetailsSrc = `${environment.mediasBaseUrl}/${environment.imagesFolder}/OPEL_Prix_Insignia_Hall.jpg`;

    constructor(
        private globalSharedService: GlobalSharedService,
        private sharedService: SharedService,
        private gaService: GlobalGaService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.globalSharedService.setShowPriceDetails(true);
        this.sharedService.loading().subscribe(loading => this.loading = loading);
        this.sharedService.getCarInfos().subscribe(carInfos => carInfos && this.gaService.showPriceDetailsPage(carInfos['name']));
        // this.gaService.showPage(PRICE);
    }

    ngOnDestroy(): void {
        this.globalSharedService.setShowPriceDetails(false);
    }

    retour() {
        this.gaService.clickRetour();
        this.location.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { GlobalSharedService } from '../../core/_service/global-shared.service';
import * as nav from '../../core/_const/constants';
import { GlobalGaService } from '../../core/_service/global-ga.service';
import { SharedService } from '../_service/shared.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-car-infos-navs',
    templateUrl: './car-infos-navs.component.html',
    styleUrls: ['./car-infos-navs.component.css']
})
export class CarInfosNavsComponent implements OnInit {

    public equipments = nav.HOME_EQUIPMENTS;
    public modelOptions = nav.MODEL_OPTIONS;
    public technicalDatas = nav.TECHNICAL_DATAS;
    public brochureRequest = nav.BROCHURE_REQUEST;
    public price = nav.PRICE;
    public co2conso = nav.CO2_CONSUMPTION;
    public currentMenu = '';

    public menus = [nav.HOME_EQUIPMENTS, nav.MODEL_OPTIONS, nav.TECHNICAL_DATAS, nav.BROCHURE_REQUEST, nav.CO2_CONSUMPTION];
    public routes = [nav.routeEquipmens, nav.routeModelOptions, nav.routeTechnicalDatas, nav.routeBrochureRequest, nav.routeCO2Conso];

    public showPriceDetails: boolean;
    public showBrochureRequestSent: boolean;

    constructor(
        private globalSharedService: GlobalSharedService,
        private gaService: GlobalGaService,
        private sharedService: SharedService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.globalSharedService.showPriceDetails().subscribe(value => this.showPriceDetails = value);
        this.globalSharedService.showBrochureSent().subscribe(value => this.showBrochureRequestSent = value);
        this.sharedService.getIndex().subscribe(index => this.currentMenu = this.menus[index]);
    }

    select(menu) {
        this.gaService.clickMenu(menu);
        this.sharedService.setIndex(this.menus.indexOf(menu));
    }
}

import { Component, OnInit } from '@angular/core';

import { SharedService } from '../_service/shared.service';
import { GlobalGaService } from '../../core/_service/global-ga.service';
import { HOME_EQUIPMENTS } from '../../core/_const/constants';

@Component({
    selector: 'app-equipments',
    templateUrl: './equipments.component.html',
    styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {

    public equipments;
    public loading: boolean;

    constructor(
        private sharedService: SharedService,
        private gaService: GlobalGaService
    ) {
    }

    ngOnInit() {
        this.sharedService.getCarCategory().subscribe(category => category && (this.equipments = category['equipments']));
        this.sharedService.loading().subscribe(loading => this.loading = loading);
    }

}

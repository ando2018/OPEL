import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_service/shared.service';
import { GlobalGaService } from '../../core/_service/global-ga.service';
import { CO2_CONSUMPTION } from '../../core/_const/constants';

@Component({
    selector: 'app-environmental-infos',
    templateUrl: './environmental-infos.component.html',
    styleUrls: ['./environmental-infos.component.css']
})
export class EnvironmentalInfosComponent implements OnInit {

    public loading: boolean;

    constructor(
        private sharedService: SharedService,
        private gaService: GlobalGaService
    ) {
    }

    ngOnInit() {
        this.sharedService.loading().subscribe(loading => this.loading = loading);
        // this.gaService.showPage(CO2_CONSUMPTION);
    }

}

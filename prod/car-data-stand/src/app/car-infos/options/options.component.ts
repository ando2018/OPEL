import { Component, OnInit } from '@angular/core';

import { SharedService } from '../_service/shared.service';
import { GlobalGaService } from '../../core/_service/global-ga.service';
import { MODEL_OPTIONS } from '../../core/_const/constants';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

    public carInfos;
    public loading: boolean;

    constructor(
        private sharedService: SharedService,
        private gaService: GlobalGaService
    ) {
    }

    ngOnInit() {
        this.sharedService.getCarInfos().subscribe(infos => infos && (this.carInfos = infos));
        // this.gaService.showPage(MODEL_OPTIONS);
        this.sharedService.loading().subscribe(loading => this.loading = loading);
    }

}

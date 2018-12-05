import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_service/shared.service';
import { environment } from '../../../environments/environment';
import { GlobalGaService } from '../../core/_service/global-ga.service';
import { TECHNICAL_DATAS } from '../../core/_const/constants';

@Component({
    selector: 'app-technical-datas',
    templateUrl: './technical-datas.component.html',
    styleUrls: ['./technical-datas.component.css']
})
export class TechnicalDatasComponent implements OnInit {

    public datas;
    public imageFolder = `${environment.mediasBaseUrl}/${environment.imagesFolder}/`;
    public loading: boolean;

    constructor(
        private sharedService: SharedService,
        private gaService: GlobalGaService
    ) {
    }

    ngOnInit() {
        this.sharedService.getCarInfos().subscribe(infos => infos && (this.datas = infos.technicalDatas));
        // this.gaService.showPage(TECHNICAL_DATAS);
        this.sharedService.loading().subscribe(loading => this.loading = loading);
    }
}

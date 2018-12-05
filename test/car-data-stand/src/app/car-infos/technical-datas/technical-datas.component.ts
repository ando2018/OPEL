import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-technical-datas',
    templateUrl: './technical-datas.component.html',
    styleUrls: ['./technical-datas.component.css']
})
export class TechnicalDatasComponent implements OnInit {

    public datas;
    public imageFolder = `${environment.mediasBaseUrl}/${environment.imagesFolder}/`;
    public loading: boolean;

    constructor(private sharedService: SharedService) {
    }

    ngOnInit() {
        this.sharedService.getModel().subscribe(v => v && (this.datas = v.technicalDatas));
        this.sharedService.loading().subscribe(loading => this.loading = loading);
    }
}

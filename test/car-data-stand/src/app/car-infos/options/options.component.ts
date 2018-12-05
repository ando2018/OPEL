import { Component, OnInit } from '@angular/core';

import { SharedService } from '../_service';
// import { GlobalSharedService } from '../../core/_service/global-shared.service';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

    public loading: boolean;
    public options: any[];

    constructor(
        private sharedService: SharedService,
        // private globalSharedService: GlobalSharedService
    ) {
    }

    ngOnInit() {
        this.sharedService.loading().subscribe(loading => this.loading = loading);
        // this.globalSharedService.getConfiguration().subscribe(c => this.options = c.options);
        this.sharedService.getModel().subscribe(m =>this.options = m.options.map(o => ({name: o})));
    }

}

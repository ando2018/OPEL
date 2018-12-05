import { Component, OnInit } from '@angular/core';

import { SharedService } from '../_service';

@Component({
    selector: 'app-equipments',
    templateUrl: './equipments.component.html',
    styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {

    public equipments;
    public loading: boolean;

    constructor(private sharedService: SharedService) {
    }

    ngOnInit() {
        this.sharedService.getVehicle().subscribe(category => category && (this.equipments = category['equipments']));
        this.sharedService.loading().subscribe(loading => this.loading = loading);
    }

}

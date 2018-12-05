import { Component, OnInit } from '@angular/core';

import { Vehicle } from '../vehicle.model';
import { environment } from '../../../environments/environment';
import { VehicleSharedService } from '../vehicle-shared.service';
@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle.component.html',
    styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

    vehicleDetail: Vehicle;
    visualName: string;
    shown = false;
    selectedSlide = '';
    selectedSlideFilename = '';
    isMock = environment.isMock;

    constructor(private vehicleShared: VehicleSharedService) { }

    ngOnInit() {

        this.vehicleShared.getVehicle().subscribe(res => {
            if (res) {
                this.vehicleDetail = res;
                this.vehicleDetail.equipments.inside = this.vehicleDetail.equipments.inside.filter((o, i) => o !== '');
                this.vehicleDetail.equipments.outside = this.vehicleDetail.equipments.outside.filter((o, i) => o !== '');
                this.visualName = `${environment.mediasBaseUrl}/${environment.imagesFolder}/${this.vehicleDetail.visual}`;
            }
        });
    }

    show(slide) {
        this.shown = true;
        this.selectedSlide = slide;
        this.selectedSlideFilename = this.vehicleShared.getNameFile(slide);
    }
}

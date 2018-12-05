import { Component, OnInit } from '@angular/core';

import { Vehicle } from '../vehicle.model';
import { VehicleSharedService } from '../vehicle-shared.service';

@Component({
    selector: 'app-vehicle-iframes',
    templateUrl: './vehicle-iframes.component.html',
    styleUrls: ['./vehicle-iframes.component.css']
})
export class VehicleIframesComponent implements OnInit {
    vehicle: Vehicle;
    constructor(private vehicleSharedService: VehicleSharedService) {}
    ngOnInit() {
        this.vehicleSharedService.getVehicle().subscribe(vehicle => (this.vehicle = vehicle));
    }
}

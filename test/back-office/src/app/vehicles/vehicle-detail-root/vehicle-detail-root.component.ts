import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VehicleSharedService } from '../vehicle-shared.service';
import { Vehicle } from '../vehicle.model';

@Component({
    selector: 'app-vehicle-detail-root',
    templateUrl: './vehicle-detail-root.component.html',
    styleUrls: ['./vehicle-detail-root.component.css']
})
export class VehicleDetailRootComponent implements OnInit {
    vehicleId: string;
    vehicle: Vehicle;

    constructor(
        private router: Router,
        private vehicleShared: VehicleSharedService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.vehicle = data.vehicle;
            this.vehicleShared.setVehicle(data.vehicle);
        });

        this.route.params.subscribe(params => {
            this.vehicleId = params.vehicleId;
        });
    }

    get vehicleIsCreated() {
        return !!(this.vehicle && this.vehicle._id);
    }

    goToList() {
        this.router.navigate(['/admin/vehicles/list']);
    }

    getModelRoute(): string {
        return `/admin/vehicles/detail/${this.vehicleId}/models`;
    }
}

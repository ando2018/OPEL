import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Gamme } from '../gamme.model';
import { Vehicle } from '../vehicle.model';
import { environment } from '../../../environments/environment';
import { VehicleSharedService } from '../vehicle-shared.service';


@Component({
    selector: 'app-vehicle-list',
    templateUrl: './vehicle-list.component.html',
    styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
    isMock = environment.isMock;
    isAllGamme = true;
    @Input() gamme: Gamme;
    @Input() vehicles: Vehicle;
    @Output() editGamme = new EventEmitter<string>();
    @Output() deleteVehicle = new EventEmitter<string>();

    constructor(private router: Router, private vehicleShared: VehicleSharedService) { }

    ngOnInit() {
        this.vehicleShared.gammeSelectedSubject.subscribe(res => {
            this.isAllGamme = !res ? false : true;
        });
    }

    modifyGamme() {
        this.editGamme.emit('edit');
    }

    goToDetail(vehicle: Vehicle) {
        this.vehicleShared.setVehicle(vehicle);
        this.router.navigate(['/admin/vehicles/detail', vehicle._id]);
    }

    goToEdit(vehicle: Vehicle) {
        this.vehicleShared.setVehicle(vehicle);
        this.router.navigate(['/admin/vehicles/edit', vehicle._id]);
    }

    goToDelete(vehicle: Vehicle) {
        this.deleteVehicle.emit(vehicle._id);
    }

    getVisual(vehicle: Vehicle) {
        return `${environment.mediasBaseUrl}/${environment.imagesFolder}/${vehicle.visual}`;
    }
}

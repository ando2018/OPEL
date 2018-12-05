import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from './vehicle.model';
import { Category } from './category.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
@Injectable({
    providedIn: 'root'
})
export class VehicleSharedService {

    alertFormModalId = 'alertFormModalId';
    currentGamme: Category;
    private vehicleSubject = new BehaviorSubject<Vehicle>(null);
    gammeSelectedSubject = new BehaviorSubject<Category>(null);
    constructor(private modalService: NgxSmartModalService) { }

    setVehicle(vehicle: Vehicle) {
        this.vehicleSubject.next(vehicle);
    }

    getVehicle(): Observable<Vehicle> {
        return this.vehicleSubject.asObservable();
    }

    setGammeSelected(gamme: Category) {
        this.currentGamme = gamme;
        this.gammeSelectedSubject.next(gamme);
    }

    getGammeSelected(): Observable<Category> {
        return this.gammeSelectedSubject.asObservable();
    }

    getCurrentgamme() {
        return this.currentGamme;
    }

    openAlertModal() {
        this.modalService.getModal(this.alertFormModalId).open();
    }

    cloaseAlertModal() {
        this.modalService.close(this.alertFormModalId);
    }

    getNameFile(path) {
        return path.split('/')[path.split('/').length - 1];
    }
}

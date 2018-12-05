import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { GlobalSharedService } from '../../global-shared.service';

import { VehicleSharedService } from '../vehicle-shared.service';
import { VehicleService } from '../vehicle.service';
import { Gamme } from '../gamme.model';

@Component({
    selector: 'app-vehicle-list-root',
    templateUrl: './vehicle-list-root.component.html',
    styleUrls: ['./vehicle-list-root.component.css']
})
export class VehicleListRootComponent implements OnInit, AfterViewInit {
    gammes: Gamme[] = [];
    selectedGamme: Gamme;
    vehicles = [];
    gammeFormModalId = 'gamme-form';
    alertFormModalId = 'alertFormModalId';
    gammeFormMode = '';
    currentVehicleIdToDelete: string;
    constructor(
        private vehicleService: VehicleService,
        private modalService: NgxSmartModalService,
        private vehicleSharedService: VehicleSharedService,
        private globalSharedService: GlobalSharedService
    ) { }


    ngAfterViewInit() {
        this.modalService.getModal(this.alertFormModalId).onDataAdded.subscribe((modal) => {
            const action = this.modalService.getModalData(this.alertFormModalId);
            if (action && action.type === 'ok') {
                this.deleteVehicle(this.currentVehicleIdToDelete);
            } else {
                this.modalService.getModal(this.alertFormModalId).close();
            }
        });
    }

    ngOnInit() {
        this.initGammes(null);
        if (this.gammes.length > 0) {
            this.setSelectedGamme(this.gammes[0]);
        }
    }

    initGammes(gamme) {
        this.vehicleService.getGammes().subscribe(res => {
            this.gammes = res.sort((a, b) => {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            });
            this.gammes.unshift({ '_id': '', 'name': 'TOUS' });
            if (gamme) {
                const elementPos = this.gammes.map(function (x) { return x._id; }).indexOf(gamme._id);
                this.selectedGamme = this.gammes[elementPos];
                this.setSelectedGamme(this.selectedGamme);
            }

        }, error => {
            this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
        });
    }

    setSelectedGamme(gamme) {
        if (gamme && gamme.name !== 'TOUS') {
            this.selectedGamme = gamme;
            this.vehicleSharedService.setGammeSelected(this.selectedGamme);
            this.vehicleService.getVehiclesByGamme(gamme).subscribe(res => {
                this.vehicles = res;
            }, error => {
                this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
            });
        } else {
            this.vehicleService.getVehicles().subscribe(res => {
                this.vehicles = res;
                this.selectedGamme = undefined;
            }, error => {
                this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
            });
        }
    }

    createGamme(name) {
        if (name) {
            this.vehicleService.createGamme(name).subscribe(res => {
                this.globalSharedService.toasterSuccess({ body: 'Création avec succès' }).subscribe(() => { });
                this.initGammes(res);
                this.modalService.close(this.gammeFormModalId);
            }, error => {
                this.globalSharedService.toasterError({ body: error.error.error }).subscribe(() => { });
            });
        }
    }

    updateGamme(gamme) {
        if (gamme) {
            this.vehicleService.updateGamme(gamme).subscribe(res => {
                this.globalSharedService.toasterSuccess({ body: 'Modifications enregistrées' }).subscribe(() => { });
                this.initGammes(gamme);
                this.modalService.close(this.gammeFormModalId);
            }, error => {
                this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
            });
        }
    }

    // deleteGamme(gammeId) {
    //     if (gammeId) {
    //         this.vehicleService.deleteGamme(gammeId).subscribe(res => {
    //             this.initGammes();
    //         });
    //     }
    // }

    openGammeForm(mode) {
        this.gammeFormMode = mode;
        if (mode === 'create') {
            this.vehicleSharedService.setGammeSelected({ _id: null, name: '' });
        } else {
            this.vehicleSharedService.setGammeSelected(this.selectedGamme);
        }
        this.modalService.getModal(this.gammeFormModalId).open();
    }


    closeGammeForm(data) {
        if (data && data._id !== null) {
            this.updateGamme(data);
        } else {
            this.createGamme(data.name);
        }
    }

    openModalConfirmVehicle(vehicleId) {
        this.currentVehicleIdToDelete = vehicleId;
        this.modalService.resetModalData(this.alertFormModalId);
        this.modalService.getModal(this.alertFormModalId).open();
    }

    deleteVehicle(vehicleId) {
        if (vehicleId) {
            this.vehicleService.deleteVehicle(vehicleId).subscribe(res => {
                if (res) {
                    this.globalSharedService.toasterSuccess({ body: 'Suppression avec succès' }).subscribe(() => { });
                    this.modalService.getModal(this.alertFormModalId).close();
                    this.setSelectedGamme(this.selectedGamme);
                }
            }, error => {
                this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
            });
        }
    }
}

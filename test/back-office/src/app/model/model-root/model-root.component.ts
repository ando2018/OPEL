import { AfterViewInit, Component, OnInit } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { ModelService } from '../model.service';
import { VehicleSharedService } from '../../vehicles/vehicle-shared.service';
import { Model } from '../model.model';
import { Vehicle } from '../../vehicles/vehicle.model';
import { ModelSharedService } from '../model-shared.service';

@Component({
    selector: 'app-model-root',
    templateUrl: './model-root.component.html',
    styleUrls: ['./model-root.component.css']
})
export class ModelRootComponent implements OnInit, AfterViewInit {
    models: Model[];
    currentVehicle: Vehicle;
    alertFormModalId = 'alertFormModalId';
    currentModelIdToDelete: string;
    isFirstReload = true;

    constructor(
        private vehicleSharedService: VehicleSharedService,
        private modelService: ModelService,
        private modalService: NgxSmartModalService,
        private modelShared: ModelSharedService
    ) { }

    ngAfterViewInit() {
        this.modalService.getModal(this.alertFormModalId).onDataAdded.subscribe(modal => {
            const action = this.modalService.getModalData(this.alertFormModalId);
            if (action && action.type === 'ok' && this.currentModelIdToDelete) {
                this.deleteModel(this.currentModelIdToDelete);
            } else {
                this.modalService.getModal(this.alertFormModalId).close();
            }
        });
        this.modelShared.reloadModelsSubject.subscribe(res => {
            if (res) {
                this.initModels();
            }
        });
    }

    ngOnInit() {
        this.initModels();
        this.modelShared.setModel(undefined);
    }

    initModels() {
        this.vehicleSharedService
            .getVehicle()
            .pipe(
                flatMap(vehicle => {
                    this.currentVehicle = vehicle;
                    return this.modelService.getVehicleModels(vehicle);
                })
            )
            .subscribe(models => {
                this.models = models;
            });
    }

    deleteModel(modelId: string) {
        this.modelService.deleteModel(modelId).subscribe(res => {
            if (res) {
                this.modalService.getModal(this.alertFormModalId).close();
                this.getModels();
            }
        });
    }

    getModels() {
        this.modelService.getVehicleModels(this.currentVehicle).subscribe(models => {
            this.models = models;
        });
    }

    openModalConfirmModel(model) {
        this.currentModelIdToDelete = model._id;
        this.modalService.resetModalData(this.alertFormModalId);
        this.modalService.getModal(this.alertFormModalId).open();
    }
}

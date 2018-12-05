import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Model } from '../model.model';
import { ModelSharedService } from '../model-shared.service';
import { VehicleSharedService } from '../../vehicles/vehicle-shared.service';
import { ModelService } from '../model.service';

@Component({
    selector: 'app-model-list',
    templateUrl: './model-list.component.html',
    styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit, OnChanges {
    @Input() models: Model[];

    @Output() deleteModel = new EventEmitter<Model>();
    selectedModel: Model;
    vehicleId: string;

    constructor(
        private router: Router,
        private modelShared: ModelSharedService,
        private route: ActivatedRoute,
        private vehicleSharedService: VehicleSharedService,
        private modelService: ModelService
    ) { }


    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.models.currentValue && changes.models.currentValue.length > 0) {
            if (changes.models.currentValue) {
                this.goToDetail(changes.models.currentValue[0]);
            }
        }
    }

    ngOnInit() {
        this.modelShared.reloadModels(null);
        this.vehicleSharedService.getVehicle().subscribe(vehicle => {
            this.vehicleId = vehicle._id;
        });
        this.modelShared.refreshModelListSubject.subscribe(res => {
            if (this.models) {
                const indexModel = this.models.map(function (x) { return x._id; }).indexOf(res._id);
                if (indexModel > -1) {
                    this.models[indexModel].name = res.name;
                }
            }
        });
        this.modelShared.getCurrentModel().subscribe(model => {
            model ? this.goToDetail(model) : this.selectedModel = null;
        });
        this.modelShared.reloadModelsSubject.subscribe(res => {
            if (res) {
                this.selectedModel = res;
            }
        });
    }

    goToDetail(model: Model) {
        this.modelService.getModelById(model._id).subscribe(res => {
            this.selectedModel = res;
            this.modelShared.setModel(res);
            this.modelShared.setRefreshModelList(res);
            this.router.navigate(['detail', res._id], { relativeTo: this.route });
        });
    }

    goToEdit(model: Model) {
        this.modelService.getModelById(model._id).subscribe(res => {
            this.selectedModel = res;
            this.modelShared.setModel(res);
            this.modelShared.setRefreshModelList(res);
            this.router.navigate(['edit', res._id], { relativeTo: this.route });
        });
    }

    goToDelete(index: number) {
        this.deleteModel.next(this.models[index]);
    }


}

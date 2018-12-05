import { Component, OnInit } from '@angular/core';
import { Model } from '../model.model';
import { ModelSharedService } from '../model-shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-model-detail-root',
    templateUrl: './model-detail-root.component.html',
    styleUrls: ['./model-detail-root.component.css']
})
export class ModelDetailRootComponent implements OnInit {
    model: Model;
    modelName: string;

    constructor(private modelSharedService: ModelSharedService, private route: ActivatedRoute) { }

    ngOnInit() {

        this.route.data.subscribe(data => {
            if (data) {
                this.model = data.model;
                this.modelName = (data.model._id === '') ? null : this.model.name;
                this.modelSharedService.setRefreshModelList(data.model);
                // this.modelSharedService.setCurrentModel(data._model);
                this.modelSharedService.setModel(data.model);
            }
        });

        this.modelSharedService.refreshModelListSubject.subscribe(res => {
            if (res) {
                this.modelName = (res._id === '') ? null : res.name;
            }
        });
    }

    get modelIsCreated() {
        return !!(this.model && this.model._id);
    }
}

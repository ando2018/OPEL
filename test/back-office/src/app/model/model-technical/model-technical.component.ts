import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Model } from '../model.model';
import { ModelSharedService } from '../model-shared.service';

@Component({
    selector: 'app-model-technical',
    templateUrl: './model-technical.component.html',
    styleUrls: ['./model-technical.component.css']
})
export class ModelTechnicalComponent implements OnInit {
    model: Model;
    isMock = environment.isMock;
    constructor(private modelSharedService: ModelSharedService) { }
    ngOnInit() {
        this.modelSharedService.getModel().subscribe(model => (this.model = model));
    }
    getImage() {
        const image = this.model.technicalDatas.externalDimensions.schema;
        return `${environment.mediasBaseUrl}/${environment.imagesFolder}/${image}`;
    }
}

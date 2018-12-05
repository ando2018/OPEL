import { Component, OnInit } from '@angular/core';
import { ModelSharedService } from '../model-shared.service';
import { Model } from '../model.model';

@Component({
    selector: 'app-model-co2-consumption',
    templateUrl: './model-co2-consumption.component.html',
    styleUrls: ['./model-co2-consumption.component.css']
})
export class ModelCo2ConsumptionComponent implements OnInit {
    model: Model;
    constructor(private modelSharedService: ModelSharedService) {}
    ngOnInit() {
        this.modelSharedService.getModel().subscribe(model => (this.model = model));
    }
}

import { Component, OnInit } from '@angular/core';
import { ModelSharedService } from '../model-shared.service';
import { Model } from '../model.model';

@Component({
    selector: 'app-model-options',
    templateUrl: './model-options.component.html',
    styleUrls: ['./model-options.component.css']
})
export class ModelOptionsComponent implements OnInit {
    model: Model;
    constructor(private modelSharedService: ModelSharedService) {}
    ngOnInit() {
        this.modelSharedService.getModel().subscribe(model => (this.model = model));
    }
}

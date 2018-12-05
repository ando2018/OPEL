import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalSharedService } from '../../global-shared.service';
import { ModelSharedService } from '../model-shared.service';
import { Model } from '../model.model';
import { ModelService } from '../model.service';


@Component({
    selector: 'app-model-options-form',
    templateUrl: './model-options-form.component.html',
    styleUrls: ['./model-options-form.component.css']
})
export class ModelOptionsFormComponent implements OnInit {
    model: Model;
    options: any[];
    constructor(
        private modelSharedService: ModelSharedService,
        private modelService: ModelService,
        private router: Router,
        private globalSharedService: GlobalSharedService
    ) { }
    ngOnInit() {
        this.modelSharedService.getModel().subscribe(model => {
            if (model) {
                this.model = model;
                this.options = model.options.map(text => ({ text }));
            }
        });
    }

    addOption() {
        this.options.push({ text: '' });
    }

    removeOption(index: number) {
        this.options = this.options.filter((o, i) => i !== index);
    }

    saveOptions() {
        this.options = this.options.filter((o, i) => o.text !== '');
        const model = { _id: this.model._id, options: this.options.map(o => o.text) };
        this.modelService.partialUpdate(model).subscribe((savedModel: Model) => {
            this.modelSharedService.setModel(savedModel);
            // this.modelSharedService.setRefreshModelList(savedModel);
            this.globalSharedService.toasterSuccess({ body: 'Modifications enregistrées' })
                .subscribe(() => this.router.navigate([
                    `/admin/vehicles/detail/{{savedModel.vehiculeId}}/models/edit/{{savedModel._id}}/technicals`
                ]));
        }, error => {
            this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
        });
    }
}

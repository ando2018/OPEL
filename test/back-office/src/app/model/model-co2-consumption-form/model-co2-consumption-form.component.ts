import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlobalSharedService } from '../../global-shared.service';
import { ModelSharedService } from '../model-shared.service';
import { Model } from '../model.model';
import { ModelService } from '../model.service';

@Component({
    selector: 'app-model-co2-consumption-form',
    templateUrl: './model-co2-consumption-form.component.html',
    styleUrls: ['./model-co2-consumption-form.component.css']
})
export class ModelCo2ConsumptionFormComponent implements OnInit {
    form: FormGroup;
    model: Model;
    btnSubmitClicked = false;

    constructor(
        private modelSharedService: ModelSharedService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private modelService: ModelService,
        private globalSharedService: GlobalSharedService
    ) { }

    ngOnInit() {
        this.modelSharedService.getModel().subscribe(model => {
            this.model = model;
            this.initForm(this.model.environment);
        });
    }

    initForm(environment) {
        this.form = this.fb.group({
            carburant: [environment.carburant, Validators.required],
            c02: [environment.c02, Validators.required],
            urban: [environment.urban, Validators.required],
            extraUrban: [environment.extraUrban, Validators.required],
            mixte: [environment.mixte, Validators.required]
        });
    }

    saveCo2Consumption() {
        if (this.form.valid) {
            const partial: Partial<Model> = {
                _id: this.model._id,
                environment: this.form.value
            };
            this.modelService.partialUpdate(partial).subscribe((updatedModel: Model) => {
                this.modelSharedService.setModel(updatedModel);
                // this.modelSharedService.setRefreshModelList(updatedModel);
                this.globalSharedService.toasterSuccess({ body: 'Modifications enregistrées' })
                    .subscribe(() => this.router.navigate(['../prices'], { relativeTo: this.route }));

            }, error => {
                this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
            });
        }
    }

    formValidation() {
        this.btnSubmitClicked = true;
        return this.btnSubmitClicked;
    }
    isRequired(value) {
        if (this.btnSubmitClicked) {
            if (!this.form.get(value).valid) {
                this.form.get(value).markAsDirty();
            }
        }
        return !this.form.get(value).valid && this.form.get(value).dirty;
    }
}

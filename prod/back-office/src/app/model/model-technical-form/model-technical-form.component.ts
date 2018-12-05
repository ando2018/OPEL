import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

import { GlobalSharedService } from '../../global-shared.service';
import { ModelSharedService } from '../model-shared.service';
import { Model } from '../model.model';
import { ModelService } from '../model.service';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { VehicleService } from '../../vehicles/vehicle.service';

@Component({
    selector: 'app-model-technical-form',
    templateUrl: './model-technical-form.component.html',
    styleUrls: ['./model-technical-form.component.css']
})
export class ModelTechnicalFormComponent implements OnInit {
    form: FormGroup;
    model: Model;
    schemaToUpload: File;
    fileAccepted = ['PNG', 'JPEG', 'JPG'];
    private schemaSrc = '';
    btnSubmitClicked = false;

    constructor(
        private modelSharedService: ModelSharedService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private modelService: ModelService,
        private vehicleService: VehicleService,
        private globalSharedService: GlobalSharedService
    ) { }

    ngOnInit() {
        this.modelSharedService.getModel().subscribe(model => {
            this.model = model;
            this.initForm(this.model);
        });
    }

    get schemaUrl(): string {
        const fileName = this.form.get('externalDimensions').get('schema').value;
        return (
            this.schemaSrc ||
            (environment.isMock
                ? fileName && `assets/img/${fileName}`
                : fileName &&
                `${environment.mediasBaseUrl}/${environment.imagesFolder}/${fileName}`)
        );
    }

    private initForm(model: Model) {
        this.form = this.fb.group({
            externalDimensions: this.initExternalDimensions(
                model.technicalDatas.externalDimensions
            ),
            internalDimensions: this.initInternalDimensions(
                model.technicalDatas.internalDimensions
            ),
            weightLoad: this.initWeightLoad(model.technicalDatas.weightLoad)
        });
    }

    private initExternalDimensions(externalDimensions): FormGroup {
        return this.fb.group({
            schema: [externalDimensions.schema, Validators.required],
            empattement: [externalDimensions.empattement, Validators.required],
            totalLength: [externalDimensions.totalLength, Validators.required],
            emptyHeight: [externalDimensions.totalLength, Validators.required],
            widthWithMirror: [externalDimensions.totalLength, Validators.required],
            widthWithoutMirror: [externalDimensions.totalLength, Validators.required],
            turningRadius: [externalDimensions.totalLength, Validators.required]
        });
    }

    private initInternalDimensions(internalDimensions): FormGroup {
        return this.fb.group({
            loadingVolume: [internalDimensions.loadingVolume, Validators.required]
        });
    }

    private initWeightLoad(weightLoad): FormGroup {
        return this.fb.group({
            weight: [weightLoad.weight, Validators.required],
            tank: [weightLoad.tank, Validators.required],
            maxWeightBrakedTrailer: [weightLoad.maxWeightBrakedTrailer, Validators.required],
            maxWeightNoBrakedTrailer: [weightLoad.maxWeightNoBrakedTrailer, Validators.required],
            totalWeightAllowed: [weightLoad.totalWeightAllowed, Validators.required]
        });
    }

    handleFileInput(file: FileList) {
        if (
            file.item(0) &&
            file.item(0).name &&
            this.fileAccepted.indexOf(
                file
                    .item(0)
                    .name.split('.')
                [file.item(0).name.split('.').length - 1].toUpperCase()
            ) === -1
        ) {
            this.globalSharedService
                .toasterWarrning({
                    body: 'l\'enregistrement ne supporte que les types : PNG , JPEG, JPG'
                })
                .subscribe(() => { });
        } else {
            this.schemaToUpload = file.item(0);
            this.form
                .get('externalDimensions')
                .get('schema')
                .setValue(this.schemaToUpload.name);
            const fr = new FileReader();
            fr.onload = () => (this.schemaSrc = fr.result);
            fr.readAsDataURL(this.schemaToUpload);
        }
    }

    saveTechnicals() {
        if (this.form.valid) {
            const partial: Partial<Model> = {
                _id: this.model._id,
                technicalDatas: this.form.value
            };
            this.uploadSchemaIfAny()
                .pipe(flatMap(() => this.modelService.partialUpdate(partial)))
                .subscribe(
                    (updatedModel: Model) => {
                        this.modelSharedService.setModel(updatedModel);
                        // this.modelSharedService.setRefreshModelList(updatedModel);
                        this.globalSharedService
                            .toasterSuccess({ body: 'Modifications enregistrées' })
                            .subscribe(() =>
                                this.router.navigate(['../co2-consumption'], {
                                    relativeTo: this.route
                                })
                            );
                    },
                    error => {
                        this.globalSharedService
                            .toasterError({ body: error.statusText })
                            .subscribe(() => { });
                    }
                );
        }
    }

    uploadSchemaIfAny(): Observable<boolean> {
        return this.schemaToUpload ? this.vehicleService.sendVisual(this.schemaToUpload) : of(true);
    }

    formValidation() {
        this.btnSubmitClicked = true;
        return this.btnSubmitClicked;
    }
    isRequired(value) {
        if (!value) {
            return true;
        }
        if (this.btnSubmitClicked) {
            if (!value.valid) {
                value.markAsDirty();
            }
        }
        return !value.valid && value.dirty;
    }
}

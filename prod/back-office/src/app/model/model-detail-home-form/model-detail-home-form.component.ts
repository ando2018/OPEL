import { Component, OnInit, AfterViewInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { flatMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GlobalSharedService } from '../../global-shared.service';

import { Model } from '../model.model';
import { ModelSharedService } from '../model-shared.service';
import { ModelService } from '../model.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { VehicleService } from '../../vehicles/vehicle.service';

@Component({
    selector: 'app-model-detail-home-form',
    templateUrl: './model-detail-home-form.component.html',
    styleUrls: ['./model-detail-home-form.component.css']
})
export class ModelDetailHomeFormComponent implements OnInit, AfterViewInit {
    model: Model;
    form: FormGroup;
    list: Slide[];
    btnSubmitClicked = false;
    filePattern = /\.(jpe?g|JPE?G|PNG|png)$/i;

    constructor(
        private modelSharedService: ModelSharedService,
        private modelService: ModelService,
        private router: Router,
        private fb: FormBuilder,
        private vehicleService: VehicleService,
        private globalSharedService: GlobalSharedService
    ) { }

    ngAfterViewInit() {
        // this.form = this.initForm(null);
    }

    ngOnInit() {
        this.modelSharedService.getModel().subscribe(model => {
            if (model) {
                this.model = model;
                this.list = model.visuals.map(name => ({
                    name,
                    src: environment.isMock
                        ? `assets/img/${name}`
                        : `${environment.mediasBaseUrl}/${environment.imagesFolder}/${name}`,
                    file: null,
                    isDelete: false
                }));
                this.form = this.initForm(model);
                if (model && model._id === '') {
                    this.modelSharedService.setCurrentModel(null);
                }
            }
        });
    }

    handleFileInput(files: FileList) {
        let addedFiles: File[] = Object.values(files);
        addedFiles = addedFiles.filter(
            (o, i) => this.filePattern.test(o.name));
        if (files.length !== addedFiles.length) {
            this.globalSharedService
                .toasterWarrning({
                    body: 'l\'enregistrement ne supporte que les types : PNG , JPEG, JPG'
                })
                .subscribe(() => { });
        }
        Promise.all(addedFiles.map(this.readFileAsDataUrl)).then((dataUrls: string[]) => {
            const newList = addedFiles.map((file, i) => ({
                name: file.name,
                src: dataUrls[i],
                file,
                isDelete: false
            }));
            this.list = [...this.list, ...newList];
            this.setVisualValueInForm(this.list);
        });
    }

    deleteFromList(index: number) {
        this.list[index].isDelete = true;
        this.setVisualValueInForm(this.list);
    }
    reloadFromList(index: number) {
        this.list[index].isDelete = false;
        this.setVisualValueInForm(this.list);
    }

    saveModel() {
        this.list = this.list.filter((e, i) => !e.isDelete);
        this.form.get('visuals').setValue(this.list.map(({ name }) => name));
        const model: Model = { ...this.model, ...this.form.value };
        this.uploadVisualsIfAny(this.list)
            .pipe(flatMap(() => this.createOrUpdate(model)))
            .subscribe(this.onModelSaved.bind(this), err => {
                this.globalSharedService.toasterError({ body: err.statusText }).subscribe(() => { });
            });
    }

    private createOrUpdate(model: Model): Observable<Model> {
        return model._id
            ? this.modelService.partialUpdate(model)
            : this.modelService.createModel(model);
    }

    private onModelSaved(savedModel: Model) {
        this.modelSharedService.setRefreshModelList(savedModel);
        this.modelSharedService.setModel(savedModel);
        this.modelSharedService.reloadModels(savedModel);
        this.globalSharedService
            .toasterSuccess({ body: 'Modifications enregistrées' })
            .subscribe(() =>
                this.router.navigate([
                    '/admin/vehicles/detail',
                    savedModel.vehiculeId,
                    'models',
                    'edit',
                    savedModel._id,
                    'options'
                ])
            );
    }

    private initForm(model: Model) {
        return this.fb.group({
            name: [model.name, Validators.compose([
                Validators.required,
                Validators.maxLength(50)
            ])],
            description: [model.description, Validators.compose([
                Validators.required,
                Validators.maxLength(300)
            ])],
            visuals: [model.visuals, this.visualsMinLengthValidator]
        });
    }

    private visualsMinLengthValidator(control: AbstractControl): { [key: string]: any } | null {
        return control.value.length < 1 ? { visualMinLength: { value: control.value } } : null;
    }

    private setVisualValueInForm(list: Slide[]) {
        this.form.get('visuals').setValue(list.map(({ name }) => name));
    }

    private readFileAsDataUrl(file: File): Promise<string> {
        return new Promise(resolve => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });
    }

    private uploadVisualsIfAny(list: Slide[]): Observable<boolean> {
        const filesToUpload = list.filter(e => e.file).map(({ file }) => file);
        return filesToUpload.length ? this.sendFiles(filesToUpload) : of(true);
    }

    private sendFiles(files: File[]): Observable<boolean> {
        return forkJoin(files.map(this.vehicleService.sendVisual)).pipe(map(() => true));
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
            if (!this.form.get(value).valid) {
                this.form.get(value).markAsDirty();
            }
        }
        return !this.form.get(value).valid && this.form.get(value).dirty;
    }

}

interface Slide {
    name: string;
    src: string;
    file: File;
    isDelete: boolean;
}

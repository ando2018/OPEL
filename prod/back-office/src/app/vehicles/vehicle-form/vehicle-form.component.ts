import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'node_modules/rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { Vehicle } from '../vehicle.model';
import { VehicleSharedService } from '../vehicle-shared.service';
import { VehicleService } from '../vehicle.service';
import { Gamme } from '../gamme.model';
import { environment } from '../../../environments/environment';
import { GlobalSharedService } from '../../global-shared.service';

@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
    form: FormGroup;
    gammes: Gamme[];
    visualToUpload: File;
    windowURL = window.URL || window['webkitURL'];
    filePattern = /\.(jpe?g|JPE?G|PNG|png)$/i;
    btnSubmitClicked = false;
    private visualSrc = '';
    private vehicle: Vehicle;

    constructor(
        private vehicleSharedService: VehicleSharedService,
        private vehicleService: VehicleService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private globalSharedService: GlobalSharedService
    ) { }

    ngOnInit() {
        this.vehicleSharedService.getVehicle().subscribe(vehicle => {
            this.vehicle = vehicle;
            if (this.vehicle.equipments.inside.length === 0) {
                this.vehicle.equipments.inside.push('');
            }
            if (this.vehicle.equipments.outside.length === 0) {
                this.vehicle.equipments.outside.push('');
            }
            this.form = this.initForm(vehicle);
        });
        this.vehicleService.getGammes().subscribe(res => {
            this.gammes = res;
        });
    }

    get insideEquipments(): FormArray {
        return this.form.get('equipments').get('inside') as FormArray;
    }

    get outsideEquipments(): FormArray {
        return this.form.get('equipments').get('outside') as FormArray;
    }

    get visualUrl(): string {
        const fileName = this.form.get('visual').value;
        return (
            this.visualSrc ||
            (environment.isMock
                ? fileName && `assets/img/${fileName}`
                : fileName &&
                `${environment.mediasBaseUrl}/${environment.imagesFolder}/${fileName}`)
        );
    }

    handleFileInput(file: FileList) {
        setTimeout(() => {
            // const element = document.getElementById('visualVehicle');
            // || this.checkDimensionFile(element, 300, 300)
            if (!this.filePattern.test(file.item(0).name)) {
                this.globalSharedService.toasterWarrning({
                    body: 'l\'enregistrement ne supporte que les types : PNG, JPEG, JPG '
                }).subscribe(() => { });
            } else {
                this.visualToUpload = file.item(0);
                this.form.get('visual').setValue(this.visualToUpload.name);
                const fr = new FileReader();
                fr.onload = (e) => {
                    this.visualSrc = fr.result;
                };
                fr.readAsDataURL(this.visualToUpload);
            }
        });
    }

    private checkDimensionFile(file, width, height) {
        console.log(file['naturalWidth'], width, file['naturalHeight'], height);
        return file['naturalWidth'] !== width || file['naturalHeight'] !== height;
    }

    removeEquipment(type: string, index: number) {
        const formArray = this.form.get('equipments').get(type) as FormArray;
        formArray.removeAt(index);
    }

    addEquipment(type: string) {
        const formArray = this.form.get('equipments').get(type) as FormArray;
        formArray.push(new FormControl(''));
    }

    saveVehicle() {
        const vehicle: Vehicle = { ...this.vehicle, ...this.form.value };
        vehicle.equipments.inside = vehicle.equipments.inside.filter((o, i) => o !== '');
        vehicle.equipments.outside = vehicle.equipments.outside.filter((o, i) => o !== '');
        this.uploadVisualIfAny()
            .pipe(
                flatMap(() => this.createOrUpdate(vehicle)),
                tap((savedVehicle: Vehicle) => this.vehicleSharedService.setVehicle(savedVehicle))
            )
            .subscribe(this.onVehicleSaved.bind(this), err => {
                this.globalSharedService.toasterError({ body: err.statusText }).subscribe(() => { });
            });
    }

    private onVehicleSaved(savedVehicle: Vehicle) {
        this.globalSharedService
            .toasterSuccess({
                body: 'Vehicule enregistré avec succès'
            })
            .subscribe(() =>
                this.router.navigate(['/admin/vehicles/edit', savedVehicle._id, 'brochures'])
            );
    }

    private uploadVisualIfAny(): Observable<boolean> {
        return this.visualToUpload ? this.vehicleService.sendVisual(this.visualToUpload) : of(true);
    }

    private createOrUpdate(vehicle: Vehicle): Observable<Vehicle> {
        return vehicle._id
            ? this.vehicleService.partialUpdate(vehicle)
            : this.vehicleService.createVehicle(vehicle);
    }

    private initForm(vehicle: Vehicle): FormGroup {
        return this.fb.group({
            _id: vehicle._id,
            name: [vehicle.name, Validators.compose([
                Validators.required,
                Validators.maxLength(100)
            ])],
            gammeId: [vehicle.gammeId, Validators.required],
            visual: [vehicle.visual, Validators.required],
            equipments: this.initEquipments(vehicle.equipments)
        });
    }

    private initEquipments(equipments): FormGroup {
        return this.fb.group({
            inside: this.fb.array(equipments.inside),
            outside: this.fb.array(equipments.outside)
        });
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

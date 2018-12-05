import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
    ValidationErrors
} from '@angular/forms';
import { GlobalSharedService } from '../../global-shared.service';
import { Router } from '@angular/router';

import { Vehicle } from '../vehicle.model';
import { VehicleSharedService } from '../vehicle-shared.service';
import { VehicleService } from '../vehicle.service';

@Component({
    selector: 'app-vehicle-iframes-form',
    templateUrl: './vehicle-iframes-form.component.html',
    styleUrls: ['./vehicle-iframes-form.component.css']
})
export class VehicleIframesFormComponent implements OnInit {
    vehicle: Vehicle;
    form: FormGroup;

    constructor(
        private vehicleSharedService: VehicleSharedService,
        private fb: FormBuilder,
        private vehicleService: VehicleService,
        private router: Router,
        private globalSharedService: GlobalSharedService
    ) { }

    ngOnInit() {
        this.vehicleSharedService.getVehicle().subscribe(vehicle => {
            this.vehicle = vehicle;
            this.initForm();
        });
    }

    initForm() {
        this.form = this.fb.group({
            vehicleIframeUrl: [
                this.vehicle.vehicleIframeUrl,
                Validators.compose([this.urlOrEmpty, this.opelUrlValidator])
            ],
            accesoriesIframeUrl: [
                this.vehicle.accesoriesIframeUrl,
                Validators.compose([this.urlOrEmpty, this.accessoriesUrlValidator])
            ],
            configuratorIframeUrl: [
                this.vehicle.configuratorIframeUrl,
                Validators.compose([this.urlOrEmpty, this.opelUrlValidator])
            ]
        });
    }

    notUrl(controlName): boolean {
        return !!(
            this.form.get(controlName).dirty &&
            this.form.get(controlName).errors &&
            this.form.get(controlName).errors.pattern
        );
    }

    invalidUrl(controlName): boolean {
        return !!(
            this.form.get(controlName).dirty &&
            this.form.get(controlName).errors &&
            this.form.get(controlName).errors.invalidUrl &&
            !this.form.get(controlName).errors.pattern
        );
    }

    private opelUrlValidator(control: AbstractControl): ValidationErrors | null {
        return control.value === ''
            ? null
            : control.value.indexOf('https://www.opel.fr/vehicules/') === 0
                ? null
                : { invalidUrl: { value: control.value } };
    }

    private accessoriesUrlValidator(control: AbstractControl): ValidationErrors | null {
        return control.value === ''
            ? null
            : control.value.indexOf('https://www.opel-accessories.com/opel_aoc/') === 0
                ? null
                : { invalidUrl: { value: control.value } };
    }

    private urlOrEmpty(control: AbstractControl): ValidationErrors | null {
        const urlPattern = new RegExp(
            '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?'
        );
        return control.value === '' ? null : Validators.pattern(urlPattern)(control); // Allow empty url
    }

    update() {
        if (this.form.valid) {
            const partial = { _id: this.vehicle._id, ...this.form.value };
            this.vehicleService.partialUpdate(partial).subscribe(
                (updatedVehicle: Vehicle) => {
                    this.vehicleSharedService.setVehicle(updatedVehicle);
                    this.onSaved();
                },
                error => {
                    this.globalSharedService
                        .toasterError({ body: error.statusText })
                        .subscribe(() => { });
                }
            );
        }
    }

    private onSaved() {
        this.globalSharedService
            .toasterSuccess({ body: 'Modifications enregistrées' })
            .subscribe(() =>
                this.router.navigate(
                    this.vehicle._id
                        ? [`/admin/vehicles/detail/${this.vehicle._id}/models`]
                        : ['models']
                )
            );
    }
}

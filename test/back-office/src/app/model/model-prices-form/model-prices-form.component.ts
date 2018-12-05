import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ModelSharedService } from '../model-shared.service';
import { GlobalSharedService } from '../../global-shared.service';
import { Model } from '../model.model';
import { ModelService } from '../model.service';

@Component({
    selector: 'app-model-prices-form',
    templateUrl: './model-prices-form.component.html',
    styleUrls: ['./model-prices-form.component.css']
})
export class ModelPricesFormComponent implements OnInit {

    priceValue: number;
    model: Model;
    vehicleId: string;
    form: FormGroup;
    btnSubmitClicked = false;

    private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', ' '];
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        const current = JSON.stringify(this.priceValue);
        const next = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }

    constructor(
        private modelSharedService: ModelSharedService,
        private modelService: ModelService,
        private router: Router,
        private el: ElementRef,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private globalSharedService: GlobalSharedService
    ) { }



    ngOnInit() {
        this.modelSharedService.getModel().subscribe(model => {
            if (model) {
                this.model = model;
                this.vehicleId = model.vehiculeId;
                this.priceValue = model.price;
                this.initForm(model);
            }
        });
    }

    savePrice(value) {
        if (value) {
            const model = { _id: this.model._id, price: value.price };
            this.modelService.partialUpdate(model).subscribe(savedModel => {
                this.modelSharedService.setModel(savedModel);
                this.globalSharedService.toasterSuccess({ body: 'Modifications enregistrées' }).subscribe(() => {
                    this.router.navigate([`/admin/vehicles/detail/${this.vehicleId}/models/detail/${this.model._id}/home`]);
                });
            }, error => {
                this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
            });
        }
    }

    private initForm(model: Model) {
        this.form = this.fb.group({
            price: [model.price, Validators.compose([
                Validators.required,
                Validators.maxLength(50)
            ])]
        });
    }

    formValidation() {
        this.btnSubmitClicked = true;
        return this.btnSubmitClicked;
    }
    isRequired(value) {
        if (this.btnSubmitClicked) {
            if (this.form.get(value).value < 1) {
                this.form.get(value).markAsDirty();
            }
        }
        return this.form.get(value).value < 1 && this.form.get(value).dirty;
    }
}

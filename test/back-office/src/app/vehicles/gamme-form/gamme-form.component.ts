import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gamme } from '../gamme.model';
import { GlobalSharedService } from '../../global-shared.service';
import { VehicleSharedService } from '../vehicle-shared.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-gamme-form',
    templateUrl: './gamme-form.component.html',
    styleUrls: ['./gamme-form.component.css']
})
export class GammeFormComponent implements OnInit {

    gammeForm = { _id: null, name: '' };
    form: FormGroup;
    btnSubmitClicked = false;
    @Input() gamme: Gamme;

    @Input()
    set mode(arg: string) { }

    @Output() closeForm = new EventEmitter<Gamme>();

    constructor(public modalshared: NgxSmartModalService,
        private globalSharedService: GlobalSharedService,
        private fb: FormBuilder,
        private vehicleSharedService: VehicleSharedService) {
    }

    ngOnInit() {
        this.initForm(this.gammeForm);
        this.modalshared.getModal('gamme-form').onOpen.subscribe(ev => {
            this.btnSubmitClicked = false;
        });
        this.vehicleSharedService.getGammeSelected().subscribe(res => {
            if (res) {
                this.initForm(res);
            }
        });
    }

    saveGamme(value) {
        if (value) {
            this.closeForm.emit({ '_id': value._id, 'name': value.name });
        }
    }

    private initForm(gamme: Gamme) {
        this.form = this.fb.group({
            name: [gamme.name, Validators.compose([
                Validators.required,
                Validators.maxLength(200)
            ])],
            _id: gamme._id
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

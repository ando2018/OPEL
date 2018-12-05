import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { filter } from 'rxjs/operators';

import { CarInfosServices, SharedService } from '../_service';
import { environment } from '../../../environments/environment';
import { GlobalGaService } from '../../core/_service';

@Component({
    selector: 'app-brochure',
    templateUrl: './brochure.component.html',
    styleUrls: ['./brochure.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrochureFormComponent implements OnInit {
    public form: FormGroup;
    public model;
    public vehicle;
    public showError = false;
    public loading = false;

    public qrCodeSrc;

    constructor(
        private fb: FormBuilder,
        private service: CarInfosServices,
        private sharedService: SharedService,
        private router: Router,
        private ngxSmartModalService: NgxSmartModalService,
        private gaService: GlobalGaService
    ) {}

    ngOnInit() {
        this.initForm();
        this.initData();
    }

    public submit(value) {
        this.gaService.submitForm(this.model['name']);
        if (this.form.valid) {
            const { brochureFile, brochureName, gammeName: gamme } = this.vehicle;
            this.loading = true;
            this.service
                .sendBrochureRequest({ ...value, brochureFile, gamme: gamme || ' ', brochureName })
                .subscribe(
                    res => {
                        this.loading = false;
                        this.router.navigate(['/stand/car-infos/brochure-request-sent']);
                    },
                    err => {
                        this.loading = false;
                    }
                );
        } else {
            this.showError = true;
        }
    }

    private initData() {
        this.sharedService.getModel().subscribe(infos => infos && (this.model = infos));
        this.sharedService.getVehicle().pipe(filter(v => !!v)).subscribe(cat => {
            this.vehicle = cat;
            const pdfUrl = `${environment.qrCodeBaseUrl}/brochures/${this.vehicle.brochureFile}`;
            this.qrCodeSrc =  `${environment.appBaseUrl}/stand/analytics-pdf/${this.vehicle.brochureName}/${btoa(pdfUrl)}`;
        });
        this.sharedService.loading().subscribe(loading => (this.loading = loading));
    }

    private initForm() {
        this.form = this.fb.group({
            email: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.pattern(
                        // tslint:disable-next-line:max-line-length
                        /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                    )
                ])
            ]
        });

        this.form.valueChanges.subscribe(value => (this.showError = false));
    }
}

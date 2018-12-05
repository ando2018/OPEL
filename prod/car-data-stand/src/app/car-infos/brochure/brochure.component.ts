import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CarInfosServices } from '../_service/car-infos.services';
import { SharedService } from '../_service/shared.service';
import { environment } from '../../../environments/environment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { GlobalGaService } from '../../core/_service/global-ga.service';

declare const keyLime;

@Component({
    selector: 'app-brochure',
    templateUrl: './brochure.component.html',
    styleUrls: ['./brochure.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrochureFormComponent implements OnInit {
    public form: FormGroup;
    public carInfos;
    public carCategory;
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
    ) { }

    ngOnInit() {
        this.initForm();
        this.initData();
    }

    public submit(value) {
        this.gaService.submitForm(this.carInfos['name']);
        if (this.form.valid) {
            // const { brochureFile, brochureName, gammeName: gamme } = this.carInfos;
            this.carInfos.brochureName = this.carInfos.name.replace('<br>',' ');
            const { brochureFile, brochureName, gammeName: gamme } = this.carInfos;
            // const { brochureFile = "Insignia_18.0_Main-F.pdf", brochureName, gammeName: gamme } = this.carInfos;
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
        this.sharedService.getCarInfos().subscribe(infos => infos && (this.carInfos = infos));
        this.sharedService.getCarCategory().subscribe(cat => cat && (this.carCategory = cat));
        this.sharedService.getCarCategory().pipe(filter(v => !!v)).subscribe(cat => {
            this.carCategory = cat;
            this.carInfos.brochureFile = "Insignia_18.0_Main-F.pdf";
            const pdfUrl = `${environment.qrCodeBaseUrl}/brochures/${this.carInfos.brochureFile}`;
            this.qrCodeSrc = `${environment.brochureBaseUrl}/stand/analytics-pdf/${
                this.carCategory.name.split('<br/>').join(' ')}/${btoa(pdfUrl)}`;
                this.qrCodeSrc = this.qrCodeSrc.replace(/ /g,"%20"); 
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

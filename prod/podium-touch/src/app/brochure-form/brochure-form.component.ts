import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';

import { SharedService } from '../_service/shared.service';
import { HttpService } from '../_service/http.service';
import { RouterWatcherService } from '../_service/router-watcher.service';
import { GaPageBrochureService } from '../_ga/services';
import { Vehicle } from '../vehicle.model';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-brochure-form',
    templateUrl: './brochure-form.component.html',
    styleUrls: ['./brochure-form.component.css']
})
export class BrochureFormComponent implements OnInit {
    public loading: boolean;
    public showErrors = false;
    public qrCodeSrc;
    public wallpaperSrc = '';
    public emailForm: FormGroup;

    public vehicle: Vehicle;

    constructor(
        private fb: FormBuilder,
        private service: HttpService,
        private router: Router,
        private routerWatcherService: RouterWatcherService,
        private gaBrochure: GaPageBrochureService,
        private sharedService: SharedService
    ) { }

    ngOnInit() {
        this.sharedService.getBrochure().subscribe((v: Vehicle) => {
            if (!v) {
                this.router.navigate(['/pages/brochure']);
            } else {
                this.vehicle = v;
                this.vehicle.brochureName && this.gaBrochure.showForm(this.vehicle.brochureName);

                const pdfUrl = `${environment.qrCodeBaseUrl}/brochures/${this.vehicle.brochureFile}`;
                this.qrCodeSrc = `${environment.brochureBaseUrl}/podium/analytics-pdf/${this.vehicle.brochureName}/${btoa(pdfUrl)}`;
                this.qrCodeSrc = this.qrCodeSrc.replace(/ /g, "%20");
            }
        });

        this.initForm();
    }

    private initForm() {
        this.emailForm = this.fb.group({
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

        this.emailForm.valueChanges
            .pipe(
                tap(val => (this.showErrors = false)),
                debounceTime(1000)
            )
            .subscribe(value => {
                this.showErrors = false;
                this.routerWatcherService.resetWatcher(null, 'Brochure request form edit');
            });
    }

    public submit(value: any) {
        this.gaBrochure.submit(this.vehicle.brochureName);

        if (this.emailForm.valid) {
            const request = {
                ...value,
                gamme: this.vehicle.gammeName,
                brochureName: this.vehicle.brochureName,
                brochureFile: this.vehicle.brochureFile
            };

            this.loading = true;
            this.service.sendBrochureRequest(request).subscribe(
                res => {
                    this.loading = false;
                    this.router.navigate(['/pages/brochure-request-sent']);
                },
                err => {
                    this.loading = false;
                },
                () => this.routerWatcherService.resetWatcher(null, 'Brochure request sent.')
            );
        } else {
            this.showErrors = true;
        }

        this.routerWatcherService.resetWatcher(null, 'Brochure request form submit');
    }
}

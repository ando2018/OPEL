import { Component, OnInit } from '@angular/core';
import { GlobalSharedService } from '../../global-shared.service';
import { timeout } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Confidentiality } from '../confidentiality.model';
import { ConfidentialityService } from '../confidentiality.service';
import { VehicleSharedService } from '../../vehicles/vehicle-shared.service';


@Component({
    selector: 'app-confidentiality',
    templateUrl: './confidentiality.component.html',
    styleUrls: ['./confidentiality.component.css']
})
export class ConfidentialityComponent implements OnInit {
    isMock = environment.isMock;

    confidentiality: Confidentiality;
    privacy: Confidentiality;
    zoom = 100;
    scale = 1;

    shown = false;
    btnSaveIsShown = false;

    filePattern = /\.(jpe?g|JPE?G|PNG|png)$/i;

    private visualConfidentialitySrc = '';
    private visualPrivacySrc = '';

    confidentialityToUpload: File;
    privacyToUpload: File;
    isPrivacyFileExist = false;
    isConfidentialityFileExist = false;

    selectedSlide = '';
    selectedSlideFilename = '';

    constructor(
        private globalSharedService: GlobalSharedService,
        private confidentialityService: ConfidentialityService,
        private vehicleShared: VehicleSharedService,
        private vehicleSharedService: VehicleSharedService
    ) { }

    ngOnInit() {
        this.getConfidentiality();
        this.getPrivacy();
    }

    getConfidentiality() {
        this.confidentialityService.getConfidentiality().subscribe(item => {
            this.confidentiality = item[0];
            this.isConfidentialityFileExist = item[0].status;
        }, error => {
            this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
        });
    }

    getPrivacy() {
        this.confidentialityService.getPrivacy().subscribe(item => {
            this.privacy = item[0];
            this.isPrivacyFileExist = item[0].status;
        }, error => {
            this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
        });
    }

    handleInput(file: FileList, type: string) {
        if (!this.filePattern.test(file.item(0).name)) {
            this.globalSharedService.toasterWarrning({ body: 'l\'enregistrement ne supporte que les types : PNG, JPEG ,JPG' })
                .subscribe(() => { });
        } else {
            if (type === 'confidentiality') {
                this.confidentialityToUpload = file.item(0);
                this.isConfidentialityFileExist = true;
                const fr = new FileReader();
                fr.onload = () => (this.visualConfidentialitySrc = fr.result);
                fr.readAsDataURL(this.confidentialityToUpload);
            } else {
                this.privacyToUpload = file.item(0);
                this.isPrivacyFileExist = true;
                const fr = new FileReader();
                fr.onload = () => (this.visualPrivacySrc = fr.result);
                fr.readAsDataURL(this.privacyToUpload);
            }
        }
        this.btnSaveIsShown = true;
    }

    getUrl(type: string) {
        return (type === 'confidentiality') ? (this.visualConfidentialitySrc && this.visualConfidentialitySrc.includes('base64')) ?
            this.visualConfidentialitySrc :
            `${environment.mediasBaseUrl}/${environment.imagesFolder}/${this.confidentiality.filename}` :
            (this.visualPrivacySrc && this.visualPrivacySrc.includes('base64')) ?
                this.visualPrivacySrc :
                `${environment.mediasBaseUrl}/${environment.imagesFolder}/${this.privacy.filename}`;
    }

    show(slide) {
        this.shown = true;
        this.selectedSlide = slide;
        this.selectedSlideFilename = this.vehicleShared.getNameFile(slide).split('?')[0];
    }


    saveConfidentiality() {
        if (this.confidentialityToUpload) {
            this.sendImage(this.confidentialityToUpload, 'confidentiality.png');
        }
        if (this.privacyToUpload) {
            this.sendImage(this.privacyToUpload, 'privacy.png');
        }
        this.globalSharedService.toasterSuccess({ body: 'Modification enregistré' }).subscribe(() => { });
    }

    sendImage(file: File, name: string) {
        this.confidentialityService.sendImage(file, name).subscribe(resSend => {
            this.getConfidentiality();
            this.getPrivacy();
        }, error => {
            this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
        });
    }

    getFileName(url) {
        return this.vehicleSharedService.getNameFile(url);
    }

    getZoom(zoom) {
        return (!!window['chrome'] && !!window['chrome'].webstore) ? zoom + '%' : 'scale(' + this.scale + ')';
    }

}

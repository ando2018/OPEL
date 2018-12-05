import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { GlobalSharedService } from '../../global-shared.service';

import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle.model';
import { VehicleSharedService } from '../vehicle-shared.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-vehicle-brochure-form',
    templateUrl: './vehicle-brochure-form.component.html',
    styleUrls: ['./vehicle-brochure-form.component.css']
})
export class VehicleBrochureFormComponent implements OnInit {
    isMock = environment.isMock;
    vehicle: Vehicle;
    filePdfToUpload: File = null;
    fileQrCodeToUpload: File = null;
    fileWallPaperToUpload: File = null;
    filepdfPattern = /\.(PDF|pdf)$/i;
    fileQrCodePattern = /\.(jpe?g|JPE?G|PNG|png)$/i;
    fileWallPaperPattern = /\.(jpe?g|JPE?G|PNG|png)$/i;
    qrCodeSrc: String = null;
    brochureFile: String;
    wallPaperSrc: String;
    pdfIsClick = true;
    form: FormGroup;
    btnSubmitClicked = false;

    constructor(
        private vehicleService: VehicleService,
        private vehicleShared: VehicleSharedService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private globalSharedService: GlobalSharedService
    ) { }

    ngOnInit() {

        this.vehicleShared.getVehicle().subscribe(v => {
            this.vehicle = { ...v };
            this.initForm(this.vehicle);
            this.vehicle.brochureFile = this.vehicle.brochureFile ? `${environment.mediasBaseUrl}/${
                environment.brochuresFolder}/${this.vehicle.brochureFile}` : this.vehicle.brochureFile;
            this.vehicle.brochureQrCode = this.vehicle.brochureQrCode ? `${environment.mediasBaseUrl}/${
                environment.qrCodeFolder
                }/${this.vehicle.brochureQrCode}` : this.vehicle.brochureQrCode;
            this.vehicle.brochureWallpaper = this.vehicle.brochureWallpaper ? `${environment.mediasBaseUrl}/${
                environment.imagesFolder
                }/${this.vehicle.brochureWallpaper}` : this.vehicle.brochureWallpaper;
        });
    }

    private initForm(vehicle: Vehicle) {
        this.form = this.fb.group({
            brochureName: [vehicle.brochureName, Validators.compose([
                Validators.required,
                Validators.maxLength(60)
            ])],
            brochureFile: [vehicle.brochureFile, Validators.required],
            brochureQrCode: [vehicle.brochureQrCode, Validators.required],
            brochureWallpaper: [vehicle.brochureWallpaper, Validators.required]
        });
    }

    handleFilePdfInput(filesPdf: FileList) {
        if (!this.filepdfPattern.test(filesPdf.item(0).name)) {
            this.globalSharedService.toasterWarrning({ body: 'l\'enregistrement ne supporte que les types : PDF' }).subscribe(() => { });
        } else {
            this.pdfIsClick = false;
            this.filePdfToUpload = filesPdf.item(0);
            this.form.get('brochureFile').setValue(this.filePdfToUpload.name);
            const fr = new FileReader();
            fr.onload = () => (this.brochureFile = fr.result);
            fr.readAsDataURL(this.filePdfToUpload);
        }
    }

    handleFileQrCodeInput(filesQrCode: FileList) {

        if (!this.fileQrCodePattern.test(filesQrCode.item(0).name)) {
            this.globalSharedService.toasterWarrning({ body: 'l\'enregistrement ne supporte que les types : PNG , JPEG, JPG' })
                .subscribe(() => { });
        } else {
            this.fileQrCodeToUpload = filesQrCode.item(0);
            this.form.get('brochureQrCode').setValue(this.fileQrCodeToUpload.name);
            const fr = new FileReader();
            fr.onload = () => (this.qrCodeSrc = fr.result);
            fr.readAsDataURL(this.fileQrCodeToUpload);
        }
    }

    handleFileWallPaperInput(files: FileList) {

        if (!this.fileWallPaperPattern.test(files.item(0).name)) {
            this.globalSharedService.toasterWarrning({ body: 'l\'enregistrement ne supporte que les types : PNG , JPEG, JPG' })
                .subscribe(() => { });
        } else {
            this.fileWallPaperToUpload = files.item(0);
            this.form.get('brochureWallpaper').setValue(this.fileWallPaperToUpload.name);
            const fr = new FileReader();
            fr.onload = () => (this.wallPaperSrc = fr.result);
            fr.readAsDataURL(this.fileWallPaperToUpload);
        }
    }

    sendQrCode() {
        this.vehicleService.sendQrCode(this.fileQrCodeToUpload).subscribe(resSend => {
            const partial: Partial<Vehicle> = {
                _id: this.vehicle._id,
                brochureQrCode: this.fileQrCodeToUpload.name
            };
            this.vehicleService.partialUpdate(partial).subscribe(res => {
                this.fileQrCodeToUpload = null;
                this.vehicleShared.setVehicle(res);
            }, error => {
                this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
            });
        }, error => {
            this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
        });
    }

    sendBrochure() {
        this.vehicleService.sendBrochure(this.filePdfToUpload).subscribe(resSend => {
            const partial: Partial<Vehicle> = {
                _id: this.vehicle._id,
                brochureFile: this.filePdfToUpload.name
            };
            this.vehicleService.partialUpdate(partial).subscribe(res => {
                this.filePdfToUpload = null;
                this.vehicleShared.setVehicle(res);
                this.pdfIsClick = true;
            }, error => {
                this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
            });
        }, error => {
            this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
        });
    }

    sendWallPaper() {
        this.vehicleService.sendVisual(this.fileWallPaperToUpload).subscribe(resSend => {
            const partial: Partial<Vehicle> = {
                _id: this.vehicle._id,
                brochureWallpaper: this.fileWallPaperToUpload.name
            };
            this.vehicleService.partialUpdate(partial).subscribe(res => {
                this.fileWallPaperToUpload = null;
                this.vehicleShared.setVehicle(res);
            }, error => {
                this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
            });
        }, error => {
            this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
        });
    }

    saveBrochureForm(form) {
        if (this.fileWallPaperToUpload) {
            this.sendWallPaper();
        }
        if (this.filePdfToUpload) {
            this.sendBrochure();
        }
        if (this.fileQrCodeToUpload) {
            this.sendQrCode();
        }
        const partial: Partial<Vehicle> = {
            _id: this.vehicle._id,
            brochureName: form.brochureName
        };
        this.vehicleService.partialUpdate(partial).subscribe(res => {
            this.vehicleShared.setVehicle(res);
            this.globalSharedService.toasterSuccess({ body: 'Modifications enregistrées' })
                .subscribe(() => this.router.navigate(['../videos'], { relativeTo: this.route }));
        }, error => {
            this.globalSharedService.toasterError({ body: error.statusText }).subscribe(() => { });
        });

        if (!this.filePdfToUpload && !this.fileQrCodeToUpload) {
            this.router.navigate(['../videos'], { relativeTo: this.route });
        }
    }

    get qrCodeUrl(): String {
        return (
            this.qrCodeSrc ||
            (this.vehicle &&
                this.vehicle.brochureQrCode &&
                this.vehicle.brochureQrCode.indexOf('.') > -1
                ? `${this.vehicle.brochureQrCode}`
                : null)
        );
    }

    get wallPaperUrl(): String {
        return (
            this.wallPaperSrc ||
            (this.vehicle &&
                this.vehicle.brochureWallpaper &&
                this.vehicle.brochureWallpaper.indexOf('.') > -1
                ? `${this.vehicle.brochureWallpaper}`
                : null)
        );
    }

    get brochureUrl(): String {
        return (
            this.brochureFile ||
            (this.vehicle &&
                this.vehicle.brochureFile &&
                this.vehicle.brochureFile.indexOf('.') > -1
                ? `${this.vehicle.brochureFile}`
                : null)
        );
    }

    getFileName(url: string) {
        return (
            (this.filePdfToUpload && this.filePdfToUpload.name) ||
            this.vehicleShared.getNameFile(this.vehicle.brochureFile) ||
            this.vehicleShared.getNameFile(url)
        );
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

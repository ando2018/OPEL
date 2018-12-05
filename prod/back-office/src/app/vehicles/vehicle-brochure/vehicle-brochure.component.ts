import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehicleSharedService } from '../vehicle-shared.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-vehicle-brochure',
    templateUrl: './vehicle-brochure.component.html',
    styleUrls: ['./vehicle-brochure.component.css']
})
export class VehicleBrochureComponent implements OnInit {
    isMock = environment.isMock;
    vehicle: Vehicle;
    shown = false;
    selectedSlide = '';
    selectedSlideFilename = '';
    constructor(private vehicleSharedService: VehicleSharedService) { }
    ngOnInit() {
        this.vehicleSharedService.getVehicle().subscribe(vehicle => (this.vehicle = vehicle));
    }

    get qrCodeSrc() {
        return (this.vehicle && this.vehicle.brochureQrCode && this.vehicle.brochureQrCode.indexOf('.') > -1) ?
            `${environment.mediasBaseUrl}/${environment.qrCodeFolder}/${this.vehicle.brochureQrCode}` : null;
    }

    get wallPaperSrc() {
        return (this.vehicle && this.vehicle.brochureWallpaper && this.vehicle.brochureWallpaper.indexOf('.') > -1) ?
            `${environment.mediasBaseUrl}/${environment.imagesFolder}/${this.vehicle.brochureWallpaper}` : null;
    }

    get brochureFile() {
        return (this.vehicle && this.vehicle.brochureFile && this.vehicle.brochureFile.indexOf('.') > -1) ?
            `${environment.mediasBaseUrl}/${environment.brochuresFolder}/${this.vehicle.brochureFile}` : null;
    }

    getFileName(url: string) {
        return this.vehicleSharedService.getNameFile(url);
    }

    show(slide) {
        this.shown = true;
        this.selectedSlide = slide;
        this.selectedSlideFilename = this.vehicleSharedService.getNameFile(slide);
    }
}

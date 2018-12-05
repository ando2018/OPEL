import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_service/shared.service';
import { GaMenuService } from '../_ga/services';
import * as nav from '../_ga/const';
import { VehicleService } from '../_service/vehicle.service';
import { Vehicle } from '../vehicle.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-core',
    templateUrl: './core.component.html',
    styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
    public displayNavs: boolean;

    public navLogo = nav.navLogo;
    public navVehicule = nav.navVehicule;
    public navConfigurator = nav.navConfigurator;
    public navAccessories = nav.navAccessories;
    public navOffers = nav.navOffers;
    public navVideos = nav.navVideos;
    public navBrochure = nav.navBrochure;

    constructor(
        private sharedService: SharedService,
        private gaMenuService: GaMenuService,
        private vehicleService: VehicleService
    ) {}

    ngOnInit() {
        this.sharedService
            .displayRequestSent()
            .subscribe(display => setTimeout(() => (this.displayNavs = !display)));

        this.vehicleService
            .getVehicles()
            .pipe(map(this.formatVehicle.bind(this)))
            .subscribe((vehicles: Vehicle[]) => this.sharedService.setVehicles(vehicles));
    }

    private formatVehicle(vehicles: Vehicle[]): Vehicle[] {
        return vehicles.map(vehicle => {
            vehicle.visual = environment.isMock
                ? `assets/img/visuals/${vehicle.visual}`
                : `${environment.mediasBaseUrl}/${environment.imagesFolder}/${vehicle.visual}`;

            vehicle.brochureQrCode = `${environment.mediasBaseUrl}/${environment.qrCodeFolder}/${
                vehicle.brochureQrCode
            }`;
            vehicle.brochureWallpaper = environment.isMock
                ? `assets/img/brochure/${vehicle.brochureWallpaper}`
                : `${environment.mediasBaseUrl}/${environment.imagesFolder}/${
                      vehicle.brochureWallpaper
                  }`;

            vehicle.vehicleIframeUrl = vehicle.vehicleIframeUrl.replace('https://www.opel.fr/', '');

            vehicle.configuratorIframeUrl = vehicle.configuratorIframeUrl.replace(
                'https://www.opel.fr/',
                ''
            );

            vehicle.accesoriesIframeUrl = vehicle.accesoriesIframeUrl.replace(
                'https://www.opel-accessories.com/',
                ''
            );

            return vehicle;
        });
    }

    public navigateTo(link) {
        this.gaMenuService.click(link);
    }

    videosIsActive() {
        return window.location.href.includes('pages/video');
    }

    brochureIsActive() {
        return window.location.href.includes('pages/brochure');
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../_service/shared.service';
import * as constants from '../_ga/const';
import { GaHomePageService, GaPageBrochureService } from '../_ga/services';
import { Vehicle } from '../vehicle.model';

@Component({
    selector: 'app-brochure',
    templateUrl: './brochure.component.html',
    styleUrls: ['./brochure.component.css']
})
export class BrochureComponent implements OnInit {
    constructor(
        private router: Router,
        private sharedService: SharedService,
        private gaHomePageService: GaHomePageService,
        private gaBrochure: GaPageBrochureService
    ) {}

    public categories = [];

    ngOnInit() {
        this.sharedService.getVehicles().subscribe((vehicles: Vehicle[]) => {
            this.categories = vehicles
                .filter(
                    v =>
                        v.brochureFile &&
                        v.brochureQrCode &&
                        v.brochureQrCode &&
                        v.brochureWallpaper
                )
                .reduce((m, o) => {
                    const found = m.find(c => c.name === o.gammeName);
                    found ? found.vehicles.push(o) : m.push({ name: o.gammeName, vehicles: [o] });
                    return m;
                }, []);
        });

        this.gaHomePageService.showGamePage(constants.BROCHURE_REQUEST_CATEGORY, 'Brochure');
    }

    goToBrochure(brochure: Vehicle) {
        const {
            gammeName = '',
            brochureName = '',
            brochureFile = '',
            brochureQrCode = ''
        } = brochure;
        this.sharedService.setBrochure(brochure);
        this.gaBrochure.click(brochureName);
        this.router.navigate([
            '/pages',
            'brochure-form',
            gammeName,
            brochureFile,
            brochureName,
            brochureQrCode
        ]);
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { GaHomePageService } from '../_ga/services';
import * as constants from '../_ga/const';
import { SharedService } from '../_service/shared.service';
import { Vehicle } from '../vehicle.model';

@Component({
    selector: 'app-configurator',
    templateUrl: './configurator.component.html',
    styleUrls: ['./configurator.component.css', '../vehicles/vehicles.component.css']
})
export class ConfiguratorComponent implements OnInit, OnDestroy {
    currentVehicle: any;
    categories = [];
    //iframeBaseUrl = environment.opelIframeBaseUrl;
    iframeBaseUrl = environment.opelIframeUrl;
    navigationSubscription;

    constructor(
        private router: Router,
        private gaHomePageService: GaHomePageService,
        private sharedService: SharedService
    ) { }

    ngOnInit() {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.currentVehicle = null;
            }
        });

        this.sharedService.getVehicles().subscribe((vehicles: Vehicle[]) => {
            this.categories = vehicles.filter(v => v.configuratorIframeUrl).reduce((m, o) => {
                const found = m.find(c => c.name === o.gammeName);
                found ? found.vehicles.push(o) : m.push({ name: o.gammeName, vehicles: [o] });
                return m;
            }, []);
        });

        this.gaHomePageService.showGamePage(constants.CONFIGURATOR_CATEGORY, 'configurateur');
    }

    setCurrentVehicle(vehicle) {
        this.currentVehicle = vehicle;
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
}

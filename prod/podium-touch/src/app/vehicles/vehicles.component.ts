import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { RouterWatcherService } from '../_service/router-watcher.service';
import { GaHomePageService } from '../_ga/services';
import * as constants from '../_ga/const';
import { SharedService } from '../_service/shared.service';
import { Vehicle } from '../vehicle.model';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit, OnDestroy {
    currentVehicle: any;
    categories: Vehicle[] = [];
    iframeBaseUrl = environment.opelIframeBaseUrl;
    navigationSubscription;

    constructor(
        private router: Router,
        private routerWatcherService: RouterWatcherService,
        private gaHomePageService: GaHomePageService,
        private sharedService: SharedService
    ) {}

    ngOnInit() {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.currentVehicle = null;
            }
        });

        this.sharedService.getVehicles().subscribe((vehicles: Vehicle[]) => {
            this.categories = vehicles.filter(v => v.vehicleIframeUrl).reduce((m, o) => {
                const found = m.find(c => c.name === o.gammeName);
                found ? found.vehicles.push(o) : m.push({ name: o.gammeName, vehicles: [o] });
                return m;
            }, []);
        });

        this.gaHomePageService.showGamePage(constants.VEHICLES_CATEGORY, 'véhicules');
    }

    setCurrentVehicle(vehicle) {
        this.currentVehicle = vehicle;
        this.routerWatcherService.resetWatcher();
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Vehicle } from './vehicle.model';
import { VehicleService } from './vehicle.service';
import { VehicleSharedService } from './vehicle-shared.service';
import { flatMap, first } from 'rxjs/operators';

@Injectable()
export class VehicleResolver implements Resolve<Vehicle> {
    constructor(
        private vehicleService: VehicleService,
        private vehicleSharedService: VehicleSharedService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Vehicle> {
        const vehicleId = route.params['vehicleId'];
        return vehicleId
            ? this.vehicleSharedService.getVehicle().pipe(
                  first(),
                  flatMap(
                      vehicle =>
                          vehicle ? of(vehicle) : this.vehicleService.getVehicleById(vehicleId)
                  )
              )
            : this.vehicleSharedService.getGammeSelected().pipe(
                  first(),
                  flatMap(gamme => this.vehicleService.vehicleFactory(gamme ? gamme._id : ''))
              );
    }
}

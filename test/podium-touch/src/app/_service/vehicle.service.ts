import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Vehicle } from '../vehicle.model';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    constructor(private http: HttpClient) {}

    public getVehicles(): Observable<Vehicle[]> {
        return this.http
            .get(
                environment.isMock ? 'assets/mocks/vehicles.json' : `${environment.apiUrl}/vehicule`
            )
            .pipe(map(res => res as Vehicle[]));
    }
}

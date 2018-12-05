import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

import { BrochureRequestModel } from '../model/brochure-request.model';

@Injectable()
export class CarInfosServices {

    constructor(
        private http: HttpClient
    ) {
    }

    public sendBrochureRequest(request: BrochureRequestModel): Observable<any> {
        return this.http.post(`${environment.apiUrl}/brochure`, request);
    }

    public getModelByVehicleId(id: string): Observable<any> {
        return this.http.get(`${environment.apiUrl}/_model/findByVehiculeId/${id}`);
    }

    public getVehicle(id: string): Observable<any> {
        return this.http.get(`${environment.apiUrl}/vehicule/${id}`);
    }
}

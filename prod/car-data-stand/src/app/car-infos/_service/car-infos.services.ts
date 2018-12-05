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

    public getCarInfos(params: any): Observable<any> {
        const id = '5b28f1c69d93513b347ffd1b';
        return this.http.get(`${environment.apiUrl}/model/${id}`);
    }

    public getCategory(id: string): Observable<any> {
        return this.http.get(`${environment.apiUrl}/category/${id}`);
    }
}

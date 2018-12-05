import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { SpecialOffer } from '../special-offer.model';

@Injectable({
    providedIn: 'root'
})
export class SpecialOffersService {
    constructor(private http: HttpClient) {}

    public getSpecialOffer(): Observable<SpecialOffer> {
        return this.http
            .get(
                environment.isMock
                    ? 'assets/mocks/special-offers.json'
                    : `${environment.apiUrl}/special-offer`
            )
            .pipe(map(res => res[0] as SpecialOffer));
    }
}

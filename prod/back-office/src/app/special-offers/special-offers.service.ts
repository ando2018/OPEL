import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SpecialOffer } from './special-offers.model';
import { environment } from '../../environments/environment';
import { first } from 'rxjs/internal/operators/first';

@Injectable({
    providedIn: 'root'
})
export class SpecialOffersService {
    constructor(private http: HttpClient) {
    }

    getSpecialOffers(): Observable<SpecialOffer> {
        if (environment.isMock) {
            return this.http
                .get('http://localhost:4200/assets/mocks/specialOffers.json')
                .pipe(map(res => res[0] as SpecialOffer));
        } else {
            return this.http
                .get(`${environment.apiUrl}/special-offer`)
                .pipe(map(res => (res[0] ? (res[0] as SpecialOffer) : this.specialOfferFactory())));
        }
    }

    createSpecialOffer(specialOffer: SpecialOffer): Observable<SpecialOffer> {
        if (environment.isMock) {
            return new Observable(observer => observer.next(this.specialOfferFactory()));
        } else {
            if (!specialOffer.legalNotice) {
                specialOffer.legalNotice = '<br>';
            }
            if (!specialOffer.offers) {
                specialOffer.offers = [];
            }
            const { _id, ...offer } = this.formatBeforeSave(specialOffer);
            return this.http
                .post(`${environment.apiUrl}/special-offer`, offer)
                .pipe(map(res => res as SpecialOffer));
        }
    }

    updateSpecialOffer(specialOffer: SpecialOffer): Observable<SpecialOffer> {
        if (environment.isMock) {
            return new Observable(observer => observer.next(specialOffer));
        } else {
            return this.http
                .put(`${environment.apiUrl}/special-offer`, this.formatBeforeSave(specialOffer))
                .pipe(map(res => res as SpecialOffer));
        }
    }

    partialUpdate(specialOffer: Partial<SpecialOffer>): Observable<SpecialOffer> {
        return this.http
            .patch(`${environment.apiUrl}/special-offer/${specialOffer._id}`, specialOffer)
            .pipe(map(res => res as SpecialOffer));
    }

    sendSpecialOffersVisual(file: File): Observable<boolean> {
        if (environment.isMock) {
            return of(true);
        } else {
            const formData = new FormData();
            formData.append('visual', file, file.name);
            return this.http.post(`${environment.apiUrl}/upload/visual`, formData).pipe(
                map(() => true)
            );
        }
    }

    private formatBeforeSave({ _id, legalNotice, offers }: SpecialOffer) {
        return {
            _id,
            legalNotice,
            offers: offers.map(({ title, months, fileName }) => ({
                title,
                months,
                fileName
            }))
        };
    }

    private specialOfferFactory(): SpecialOffer {
        const specialOffer = {
            _id: '',
            offers: [],
            legalNotice: ''
        };
        return specialOffer as SpecialOffer;
    }
}

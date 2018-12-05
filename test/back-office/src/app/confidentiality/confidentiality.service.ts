import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Confidentiality } from './confidentiality.model';
import { environment } from '../../environments/environment';
import { first } from 'rxjs/internal/operators/first';

@Injectable({
    providedIn: 'root'
})
export class ConfidentialityService {
    constructor(private http: HttpClient) { }

    getConfidentiality(): Observable<any> {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', `${environment.mediasBaseUrl}/${environment.imagesFolder}/confidentiality.png`, false);
        xhr.send();
        if (xhr.status === 404) {
            return new Observable(observer => observer
                .next([{ _id: '', status: false, filename: 'confidentiality.png?time=' + new Date().getTime() + '}' }]));
        } else {
            return new Observable(observer => observer
                .next([{ _id: '', status: true, filename: 'confidentiality.png?time=' + new Date().getTime() + '}' }]));
        }
    }

    getPrivacy(): Observable<any> {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', `${environment.mediasBaseUrl}/${environment.imagesFolder}/privacy.png`, false);
        xhr.send();
        if (xhr.status === 404) {
            return new Observable(observer => observer
                .next([{ _id: '', status: false, filename: 'privacy.png?time=' + new Date().getTime() + '}' }]));
        } else {
            return new Observable(observer => observer
                .next([{ _id: '', status: true, filename: 'privacy.png?time=' + new Date().getTime() + '}' }]));
        }
    }

    sendImage(file: File, name: string): Observable<boolean> {
        const formData = new FormData();
        formData.append('visual', file, name);
        return this.http
            .post(`${environment.apiUrl}/upload/visual`, formData)
            .pipe(first(), map(() => true));
    }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Gamme } from './gamme.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { Vehicle } from './vehicle.model';
import { environment } from '../../environments/environment';
import { first } from 'rxjs/internal/operators/first';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private counter = 0;

    constructor(private http: HttpClient) { }

    getGammes(): Observable<Gamme[]> {
        if (environment.isMock) {
            return this.http
                .get('http://localhost:4200/assets/mocks/gammes.json')
                .pipe(map(res => res as Gamme[]));
        } else {
            return this.http.get(`${environment.apiUrl}/gamme`).pipe(map(res => res as Category[]));
        }
    }

    getVehiclesByGamme(gamme: Gamme): Observable<Vehicle[]> {
        if (environment.isMock) {
            return this.http
                .get('http://localhost:4200/assets/mocks/vehicles.json')
                .pipe(map(res => res as Vehicle[]));
        } else {
            return this.http
                .get(`${environment.apiUrl}/vehicule/findByGammeId/${gamme._id}`)
                .pipe(map(res => res as Vehicle[]));
        }
    }

    getVehicles(): Observable<Vehicle[]> {
        if (environment.isMock) {
            return this.http
                .get('http://localhost:4200/assets/mocks/vehicles.json')
                .pipe(map(res => res as Vehicle[]));
        } else {
            return this.http
                .get(`${environment.apiUrl}/vehicule`)
                .pipe(map(res => res as Vehicle[]));
        }
    }

    createGamme(name: string) {
        const params = { name: name };
        return this.http
            .post(`${environment.apiUrl}/gamme`, params)
            .pipe(map(res => res as Category));
    }

    deleteGamme(categoryId: string) {
        return this.http.delete(`${environment.apiUrl}/gamme/${categoryId}`);
    }

    updateGamme(category: Category) {
        const params = category;
        return this.http.put(`${environment.apiUrl}/gamme`, params);
    }

    getVehicleById(vehicleId: string): Observable<Vehicle> {
        if (environment.isMock) {
            return this.http.get('http://localhost:4200/assets/mocks/vehicles.json').pipe(
                map(res => {
                    const vehicles = res as Vehicle[];
                    return vehicles.find(v => v._id === vehicleId);
                })
            );
        } else {
            return this.http
                .get(`${environment.apiUrl}/vehicule/${vehicleId}`)
                .pipe(map(res => res as Vehicle));
        }
    }

    deleteVehicle(vehicleId: string) {
        return this.http.delete(`${environment.apiUrl}/vehicule/${vehicleId}`);
    }

    sendQrCode(file) {
        const formData = new FormData();
        formData.append('qrcode', file, file.name);
        return this.http.post(`${environment.apiUrl}/upload/qrcode`, formData);
    }

    sendVisual = (file: File): Observable<boolean> => {
        if (environment.isMock) {
            return of(true);
        } else {
            const formData = new FormData();
            formData.append('visual', file, file.name);
            return this.http.post(`${environment.apiUrl}/upload/visual`, formData).pipe(
                first(),
                map(() => true)
            );
        }
    }

    sendVideo = (file): Observable<boolean> => {
        if (environment.isMock) {
            this.counter++;
            return new Observable(observer => {
                setTimeout(
                    () => (this.counter % 2 ? observer.error(true) : observer.next(true)),
                    4000
                );
            });
        } else {
            const formData = new FormData();
            formData.append('videos', file, file.name);
            return this.http
                .post(`${environment.apiUrl}/upload/videos`, formData)
                .pipe(map(() => true));
        }
    }

    sendBrochure(file) {
        const formData = new FormData();
        formData.append('brochures', file, file.name);
        return this.http.post(`${environment.apiUrl}/upload/brochures`, formData);
    }

    createVehicle(vehicle: Vehicle) {
        if (environment.isMock) {
            return this.http
                .get('http://localhost:4200/assets/mocks/vehicles.json')
                .pipe(map(res => res[0] as Vehicle));
        } else {
            delete vehicle._id;
            return this.http
                .post(`${environment.apiUrl}/vehicule`, vehicle)
                .pipe(map(res => res as Vehicle));
        }
    }

    partialUpdate(vehicle: Partial<Vehicle>): Observable<Vehicle> {
        if (environment.isMock) {
            return this.http
                .get('http://localhost:4200/assets/mocks/vehicles.json')
                .pipe(map(res => res[0] as Vehicle));
        } else {
            return this.http
                .patch(`${environment.apiUrl}/vehicule/${vehicle._id}`, vehicle)
                .pipe(map(res => res as Vehicle));
        }
    }

    vehicleFactory(gammeId: string): Observable<Vehicle> {
        const vehicle = {
            _id: '',
            name: '',
            gammeId,
            visual: '',
            equipments: {
                inside: [''],
                outside: ['']
            },
            brochureFile: '',
            brochureQrCode: '',
            brochureName: '',
            brochureWallpaper: '',
            vehicleIframeUrl: '',
            accesoriesIframeUrl: '',
            configuratorIframeUrl: '',
            videos: []
        };

        return of(vehicle as Vehicle);
    }
}

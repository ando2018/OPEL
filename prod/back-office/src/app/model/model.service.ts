import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Model } from './model.model';
import { Vehicle } from '../vehicles/vehicle.model';

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    constructor(private http: HttpClient) {
    }

    partialUpdate(model: Partial<Model>): Observable<Model> {
        if (environment.isMock) {
            return this.http
                .get('http://localhost:4200/assets/mocks/model.json')
                .pipe(map(res => res as Model));
        } else {
            return this.http
                .patch(`${environment.apiUrl}/model/${model._id}`, model)
                .pipe(map(res => res as Model));
        }
    }

    getVehicleModels(vehicle: Vehicle): Observable<Model[]> {
        if (environment.isMock) {
            return this.http
                .get('http://localhost:4200/assets/mocks/models.json')
                .pipe(map(res => res as Model[]));
        } else {
            return this.http
                .get(`${environment.apiUrl}/model/findByVehiculeId/${vehicle._id}`)
                .pipe(map(res => res as Model[]));
        }
    }

    getModelById(modelId: string): Observable<Model> {
        if (environment.isMock) {
            return this.http.get('http://localhost:4200/assets/mocks/models.json').pipe(
                map(res => {
                    const models = res as Model[];
                    return models.find(v => v._id === modelId);
                })
            );
        } else {
            return this.http
                .get(`${environment.apiUrl}/model/${modelId}`)
                .pipe(map(res => res as Model));
        }
    }

    deleteModel(modelId: string) {
        return this.http.delete(`${environment.apiUrl}/model/${modelId}`);
    }

    createModel(model: Model) {
        delete model._id;
        model.price = !model.price ? 0 : model.price;
        if (environment.isMock) {
            return this.http
                .get('http://localhost:4200/assets/mocks/model.json')
                .pipe(map(res => res as Model));
        } else {
            return this.http
                .post(`${environment.apiUrl}/model`, model)
                .pipe(map(res => res as Model));
        }
    }

    modelFactory(vehicleId: string): Observable<Model> {
        const newModel = {
            _id: '',
            name: '',
            description: '',
            vehiculeId: vehicleId,
            options: [''],
            visuals: [],
            price: null,
            technicalDatas: {
                externalDimensions: {
                    schema: '',
                    empattement: null,
                    totalLength: null,
                    emptyHeight: null,
                    widthWithMirror: null,
                    widthWithoutMirror: null,
                    turningRadius: null
                },
                internalDimensions: {
                    loadingVolume: ''
                },
                weightLoad: {
                    weight: '',
                    tank: null,
                    maxWeightBrakedTrailer: '',
                    maxWeightNoBrakedTrailer: '',
                    totalWeightAllowed: ''
                }
            },
            environment: {
                carburant: '',
                co2: '',
                urban: '',
                extraUrban: '',
                mixte: '',
                images: ''
            }
        };

        return of(newModel as Model);
    }
}

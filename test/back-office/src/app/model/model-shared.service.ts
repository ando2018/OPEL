import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Model } from './model.model';

@Injectable({
    providedIn: 'root'
})
export class ModelSharedService {
    private modelSubject = new BehaviorSubject<Model>(null);
    reloadModelsSubject = new BehaviorSubject<Model>(null);
    private modelSelectedSubject = new BehaviorSubject<Model>(null);
    refreshModelListSubject = new BehaviorSubject<Model>(null);
    constructor() { }

    setModel(model: Model) {
        this.modelSubject.next(model);
    }

    reloadModels(model: Model) {
        this.reloadModelsSubject.next(model);
    }

    setRefreshModelList(model: Model) {
        this.refreshModelListSubject.next(model);
    }

    getModel(): Observable<Model> {
        return this.modelSubject.asObservable();
    }

    setCurrentModel(model: Model) {
        this.modelSelectedSubject.next(model);
    }

    getCurrentModel(): Observable<Model> {
        return this.modelSelectedSubject.asObservable();
    }
}

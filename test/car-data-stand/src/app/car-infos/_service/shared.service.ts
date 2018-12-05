import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SharedService {

    private loadingSubject = new BehaviorSubject(false);
    public loadedSubject = new BehaviorSubject(false);
    private modelSubject = new BehaviorSubject(null);
    private vehicleSubject = new BehaviorSubject(null);
    private carInfosSlideIndexSubject = new BehaviorSubject<number>(0);

    public setModel(model): void {
        this.modelSubject.next(model);
    }

    public getModel(): Observable<any> {
        return this.modelSubject.asObservable();
    }

    public setVehicle(vehicle): void {
        this.vehicleSubject.next(vehicle);
    }

    public getVehicle(): Observable<any> {
        return this.vehicleSubject.asObservable();
    }

    public setLoading(loading: boolean): void {
        this.loadingSubject.next(loading);
    }

    public loading(): Observable<boolean> {
        return this.loadingSubject.asObservable();
    }

    public setLoaded(loaded: boolean): void {
        this.loadedSubject.next(loaded);
    }

    public loaded(): Observable<boolean> {
        return this.loadedSubject.asObservable();
    }

    public setIndex(index: number): void {
        this.carInfosSlideIndexSubject.next(index);
    }

    public getIndex(): Observable<number> {
        return this.carInfosSlideIndexSubject.asObservable();
    }
}

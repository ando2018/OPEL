import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SharedService {

    private loadingSubject = new BehaviorSubject(false);
    public loadedSubject = new BehaviorSubject(false);
    private carInfosSubject = new BehaviorSubject(null);
    private carCategorySubject = new BehaviorSubject(null);
    private carInfosSlideIndexSubject = new BehaviorSubject<number>(0);

    public setCarInfos(infos): void {
        this.carInfosSubject.next(infos);
    }

    public getCarInfos(): Observable<any> {
        return this.carInfosSubject.asObservable();
    }

    public setCarCategory(category): void {
        this.carCategorySubject.next(category);
    }

    public getCarCategory(): Observable<any> {
        return this.carCategorySubject.asObservable();
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

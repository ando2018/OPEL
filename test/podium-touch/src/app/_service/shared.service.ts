import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Vehicle } from '../vehicle.model';

@Injectable()
export class SharedService {
    private videoSubject = new BehaviorSubject<any>({});
    private vehiclesSubject = new BehaviorSubject<any>([]);
    private brochureSubject = new BehaviorSubject<any>(null);
    private brochureRequestSentSubject = new BehaviorSubject<boolean>(false);

    constructor() {}

    public setCurrentVideo(video: any): void {
        this.videoSubject.next(video);
    }

    public getCurrentVideo(): Observable<any> {
        return this.videoSubject.asObservable();
    }

    public displayRequestSent(): Observable<boolean> {
        return this.brochureRequestSentSubject.asObservable();
    }

    public showBrochureRequestSent(display: boolean): void {
        this.brochureRequestSentSubject.next(display);
    }

    public setVehicles(vehicles: Vehicle[]) {
        this.vehiclesSubject.next(vehicles);
    }

    public getVehicles(): Observable<Vehicle[]> {
        return this.vehiclesSubject.asObservable();
    }

    public setBrochure(brochure): void {
        this.brochureSubject.next(brochure);
    }

    public getBrochure(): Observable<any> {
        return this.brochureSubject.asObservable();
    }
}

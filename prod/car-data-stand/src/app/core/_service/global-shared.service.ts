import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class GlobalSharedService {
    private subject = new BehaviorSubject<boolean>(false);
    private brochureSubject = new BehaviorSubject<boolean>(false);

    constructor() {}

    public showPriceDetails(): Observable<boolean> {
        return this.subject.asObservable();
    }

    public setShowPriceDetails(value: boolean) {
        this.subject.next(value);
    }

    public showBrochureSent(): Observable<boolean> {
        return this.brochureSubject.asObservable();
    }

    public setShowBrochureSent(value: boolean): void {
        this.brochureSubject.next(value);
    }
}

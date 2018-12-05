import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigurationModel } from '../../configuration/_model/configuration.model';


@Injectable()
export class GlobalSharedService {
    private subject = new BehaviorSubject<boolean>(false);
    private brochureSubject = new BehaviorSubject<boolean>(false);
    private configuredSubject = new BehaviorSubject<boolean>(false);
    private configurationSubject = new BehaviorSubject<ConfigurationModel>(null);

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

    public isConfigured(): Observable<boolean> {
        return this.configuredSubject.asObservable();
    }

    public configure(value: boolean): void {
        this.configuredSubject.next(value);
    }

    public setConfiguration(conf: ConfigurationModel) {
        this.configurationSubject.next(conf);
    }

    public getConfiguration(): Observable<ConfigurationModel> {
        return this.configurationSubject.asObservable();
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class GlobalSharedService {

    Unauthorized = new BehaviorSubject<boolean>(false);
    isLoading = new BehaviorSubject<boolean>(false);

    constructor(private toastrService: ToastrService) { }

    public setLoader(value: boolean): void {
        setTimeout(() => {
            this.isLoading.next(value);
        });
    }

    toasterSuccess(param): Observable<any> {
        return new Observable(observer => {
            this.toastrService.success(param.body, 'Succès', {
                timeOut: 2000,
                positionClass: 'toast-bottom-right'
            }).onHidden.subscribe(res => {
                observer.next();
            });
        });
    }

    toasterError(param): Observable<any> {
        return new Observable(observer => {
            this.toastrService.error(param.detail ? param.body + '-' + param.detail : param.body, 'Erreur', {
                timeOut: 3000,
                positionClass: 'toast-bottom-right'
            }).onHidden.subscribe(res => {
                this.Unauthorized.next(true);
                observer.next();
            });
        });
    }

    toasterWarrning(param): Observable<any> {
        return new Observable(observer => {
            this.toastrService.warning(param.body, 'Attention', {
                timeOut: 3000,
                positionClass: 'toast-bottom-right'
            }).onHidden.subscribe(res => {
                observer.next();
            });
        });
    }
}

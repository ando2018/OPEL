import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable()
export class CarInfosResolver implements Resolve<Observable<any>> {

    constructor(
        private sharedService: SharedService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.sharedService.getCarInfos();
    }

}

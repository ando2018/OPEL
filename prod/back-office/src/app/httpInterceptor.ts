import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalSharedService } from '../app/global-shared.service';

@Injectable()
export class BoHttpInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private globalSharedService: GlobalSharedService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (request && request.url.indexOf('upload/video') === -1) {
        this.globalSharedService.setLoader(true);
        // }
        const req = request.clone({
            headers: request.headers.set('Authorization', `bearer ${JSON.parse(localStorage.getItem('token'))} `)
        });
        return next.handle(req).pipe(
            tap((evt) => {
                if (evt instanceof HttpResponse) {
                    this.globalSharedService.setLoader(false);
                }
            }, err => {
                this.globalSharedService.setLoader(false);
                this.globalSharedService.Unauthorized.subscribe(res => {
                    if (res === true && err && err.status === 401) {
                        localStorage.clear();
                        this.router.navigate(['/authentication']);
                    }
                });
            })
        );
    }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from './user.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor{

    constructor(private userService: UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const request = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this.userService.getToken()}`)
        });

        return next.handle(request);
    }
}

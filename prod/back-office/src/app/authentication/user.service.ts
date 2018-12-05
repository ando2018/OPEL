import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    public login(credentials: any): Observable<any> {
        if (environment.isMock === true) {
            return of({
                user: { _id: '5b4f3e58752fd0314052e67a', email: 'opeladmin@yahoo.fr' },
                token:
                    // tslint:disable-next-line:max-line-length
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjRmM2U1ODc1MmZkMDMxNDA1MmU2N2EiLCJlbWFpbCI6Im9wZWxhZG1pbkB5YWhvby5mciIsImlhdCI6MTUzMTkyNDE5OCwiZXhwIjoxNTMyMDk2OTk4fQ.xxheXvzXpjcuR-G5okBhjW8kQbZMb2VA8fIzrxA8l8M'
            });
        } else {
            return this.http.post(`${environment.apiUrl}/authentication/login`, credentials);
        }
    }
}

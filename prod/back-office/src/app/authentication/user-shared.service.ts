import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserServiceShared {

    private subject: Subject<UserModel> = new Subject<UserModel>();
    private loaded = false;

    constructor() {
    }

    public getUser(): boolean | Observable<UserModel> {
        return !!localStorage.getItem('token');
    }

    public setUser(user: UserModel): void {
        this.loaded = !!user;
        this.subject.next(user);
    }
}

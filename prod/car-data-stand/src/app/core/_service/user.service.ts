import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private subject: Subject<UserModel> = new Subject<UserModel>();
    private loaded = false;

    constructor() {
    }

    public getUser(): boolean | Observable<UserModel> {
        return !this.loaded ? false : this.subject.asObservable();
    }

    public setUser(user: UserModel): void {
        this.loaded = !!user;
        this.subject.next(user);
    }
}

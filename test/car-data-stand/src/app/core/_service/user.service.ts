import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public getUser(): UserModel {
        return <UserModel>(JSON.parse(localStorage.getItem('stand_user')));
    }

    public setUser(user: UserModel): void {
        !!user ? localStorage.setItem('stand_user', JSON.stringify(user)) : localStorage.removeItem('stand_user');
    }

    public setToken(token: string) {
        !!token ? localStorage.setItem('stand_token', JSON.stringify(token)) : localStorage.removeItem('stand_token');
    }

    public getToken(): string {
        return JSON.parse(localStorage.getItem('stand_token'));
    }
}

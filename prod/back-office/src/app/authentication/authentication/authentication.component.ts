import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlobalSharedService } from '../../global-shared.service';
import { UserService } from '../user.service';
import { UserServiceShared } from '../user-shared.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
    public form: FormGroup;
    public loading = false;

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private userServiceShared: UserServiceShared,
        private globalSharedService: GlobalSharedService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    logIn(value) {
        this.loading = true;
        this.userService.login(value).subscribe(
            res => {
                localStorage.setItem('token', JSON.stringify(res['token']));
                localStorage.setItem('user', JSON.stringify(res['user']['email']));
                this.userServiceShared.setUser(res);
                this.globalSharedService.toasterSuccess({ body: 'Utilisateur connecté' })
                    .subscribe(() => this.router.navigate(['/admin']));
            },
            err => {
                this.loading = false;
                this.globalSharedService.toasterError({ body: err.error.message }).subscribe(() => { });
            }
        );
    }

    private initForm() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from '../service/configuration.service';
import { UserService } from '../../core/_service/user.service';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
    public form: FormGroup;
    public loading = false;
    public showError: boolean;
    public errorMessage: string;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private service: ConfigurationService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    logIn(value) {
        this.loading = true;
        this.service.login(value).subscribe(
            res => {
                localStorage.setItem('token', JSON.stringify(res['token']));
                this.userService.setUser(res.user);
                // this.userService.setToken(res.token);
                this.router.navigate(['/configuration']);
            },
            err => {
                this.showError = true;
                this.loading = false;
                this.errorMessage = (err && err.error && err.error.message) || 'Une erreur est survenue';
            },
            () => this.loading = false
        );
    }

    private initForm() {
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.form.valueChanges.pipe(debounceTime(5000)).subscribe(v => this.showError = false);
    }
}

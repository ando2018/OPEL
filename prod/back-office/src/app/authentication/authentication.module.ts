import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule
    ],
    declarations: [AuthenticationComponent]
})
export class AuthenticationModule { }

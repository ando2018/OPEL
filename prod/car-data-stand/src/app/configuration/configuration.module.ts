import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigurationService } from './service/configuration.service';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule],
    providers: [ConfigurationService],
    declarations: [AuthenticationComponent, ConfigurationComponent]
})
export class ConfigurationModule {}

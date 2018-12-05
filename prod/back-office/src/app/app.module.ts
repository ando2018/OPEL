import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BoHttpInterceptor } from './httpInterceptor';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfidentialityModule } from './confidentiality/confidentiality.module';
import { CoreModule } from './core/core.module';
import { SpecialOffersModule } from './special-offers/special-offers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ModelModule } from './model/model.module';
import { AppRoutingModule } from './app.routing-module';
import { UserServiceShared } from '../app/authentication/user-shared.service';
import { LoaderComponent } from '../app/core/loader/loader.component';

@NgModule({
    declarations: [AppComponent, LoaderComponent],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        AuthenticationModule,
        ConfidentialityModule,
        CoreModule,
        SpecialOffersModule,
        VehiclesModule,
        AppRoutingModule,
        ModelModule,
        NgxSmartModalModule
    ],
    providers: [NgxSmartModalService, UserServiceShared,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BoHttpInterceptor,
            multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }

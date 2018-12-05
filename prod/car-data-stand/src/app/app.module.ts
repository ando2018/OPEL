import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrochurePdfComponent } from './analytics/brochure-pdf/brochure-pdf.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CarInfosModule } from './car-infos/car-infos.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { GlobalSharedService } from './core/_service/global-shared.service';
import { RouterWatcherService } from './core/_service/router-watcher.service';

@NgModule({
    declarations: [AppComponent, BrochurePdfComponent],
    imports: [
        BrowserModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        RouterModule,
        AppRoutingModule,
        CarInfosModule,
        ConfigurationModule,
        CoreModule
    ],
    providers: [GlobalSharedService, RouterWatcherService],
    bootstrap: [AppComponent]
})
export class AppModule {}

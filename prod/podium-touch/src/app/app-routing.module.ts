import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoreComponent } from './core/core.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { VideosComponent } from './videos/videos.component';
import { SpecialOffersComponent } from './special-offers/special-offers.component';
import { BrochureComponent } from './brochure/brochure.component';
import { BrochureRequestSentComponent } from './brochure-request-sent/brochure-request-sent.component';
import { MyOpelComponent } from './my-opel/my-opel.component';
import { RousseauComponent } from './rousseau/rousseau.component';
import { VideoComponent } from './video/video.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { VideoCategoriesComponent } from './video-categories/video-categories.component';
import { BrochureFormComponent } from './brochure-form/brochure-form.component';
import { WebMailBrochureComponent } from './web-mail-brochure/web-mail-brochure.component';
import { BrochurePdfComponent } from './analytics/brochure-pdf/brochure-pdf.component';

const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'analytics-pdf/:name/:url', component: BrochurePdfComponent },
    { path: 'home', component: HomeComponent },
    {
        path: 'pages',
        component: CoreComponent,
        children: [
            {
                path: 'vehicles',
                component: VehiclesComponent
            },
            { path: 'configurator', component: ConfiguratorComponent },
            { path: 'accessories', component: AccessoriesComponent },
            { path: 'videos-categories', component: VideoCategoriesComponent },
            { path: 'videos/:category', component: VideosComponent },
            { path: 'play-video/:title', component: VideoComponent },
            { path: 'special-offers', component: SpecialOffersComponent },
            { path: 'brochure', component: BrochureComponent },
            { path: 'brochure-form/:name/:brochureFile/:brochureName/:qrCode', component: BrochureFormComponent },
            { path: 'brochure-request-sent', component: BrochureRequestSentComponent },
            { path: 'my-opel', component: MyOpelComponent },
            { path: 'rousseau', component: RousseauComponent },
            { path: 'legal-notice', component: LegalNoticeComponent },
            { path: 'web/email-brochure/:id', component: WebMailBrochureComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}

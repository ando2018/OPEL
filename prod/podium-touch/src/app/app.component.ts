import { Component, OnInit } from '@angular/core';
import { SharedService } from './_service/shared.service';
import { RouterWatcherService } from './_service/router-watcher.service';
import { NavigationEnd, Router } from '@angular/router';
import { GaHomePageService } from './_ga/services';
import { environment } from '../environments/environment';

declare let ga: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public displayLinks: boolean;
    constructor(
        private sharedService: SharedService,
        private routerWatcherService: RouterWatcherService,
        private router: Router,
        private gaHomePageService: GaHomePageService) { }

    ngOnInit(): void {
        this.appendGaTrackingCode();
        this.routerWatcherService.watch();
        this.sharedService
            .displayRequestSent()
            .subscribe(display => setTimeout(() => (this.displayLinks = !display)));

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
    }

    navigateTo(name) {
        this.gaHomePageService.clickFooterLink(name);
    }

    showLegalNotice() {
        return (
            window.location.href.includes('special-offers') ||
            window.location.href.includes('legal-notice')
        );
    }

    private appendGaTrackingCode() {
        try {
            const script = document.createElement('script');
            script.innerHTML = `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', '` + environment.googleAnalyticsKey + `', 'auto');
          `;
            document.head.appendChild(script);
        } catch (ex) {
            console.error('Error appending google analytics');
            console.error(ex);
        }
    }
}

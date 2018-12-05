import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterWatcherService } from './core/_service/router-watcher.service';
import { environment } from '../environments/environment';

declare var ga: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Car data stand';

    constructor(private router: Router, private routerWatcher: RouterWatcherService){}

    ngOnInit() {
        this.appendGaTrackingCode();
        this.routerWatcher.watch();
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
                this.routerWatcher.resetWatcher(event, 'Route changed');
            }
        });
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

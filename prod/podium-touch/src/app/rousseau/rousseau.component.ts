import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { RouterWatcherService } from '../_service/router-watcher.service';
import { GaHomePageService } from '../_ga/services';

@Component({
    selector: 'app-rousseau',
    templateUrl: './rousseau.component.html',
    styleUrls: ['./rousseau.component.css']
})
export class RousseauComponent implements OnInit {
    public iframeIsLoading: boolean;
    public iframeSrc;
    public debug = false;

    constructor(
        private cd: ChangeDetectorRef,
        public sanitizer: DomSanitizer,
        private routerWatcherService: RouterWatcherService,
        private gaHomeService: GaHomePageService) {}

    ngOnInit() {
        this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
            `${environment.rousseauIframeBaseUrl}`
        );
        this.iframeIsLoading = true;
        this.cd.detectChanges();
    }

    onLoad() {
        this.iframeIsLoading = false;
        this.cd.detectChanges();
        this.routerWatcherService.resetWatcher(null, 'rousseau');

        this.gaHomeService.loadFooterIframe('rousseau');
    }

    iframeClick(event) {
        this.routerWatcherService.resetWatcher(null, 'rousseau');
    }
}

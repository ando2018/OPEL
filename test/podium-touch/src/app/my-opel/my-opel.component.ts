import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { RouterWatcherService } from '../_service/router-watcher.service';
import { GaHomePageService } from '../_ga/services';

@Component({
    selector: 'app-my-opel',
    templateUrl: './my-opel.component.html',
    styleUrls: ['./my-opel.component.css']
})
export class MyOpelComponent implements OnInit {
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
            `${environment.myopelIframeBaseUrl}`
        );
        this.iframeIsLoading = true;
        this.cd.detectChanges();
    }

    onLoad() {
        this.iframeIsLoading = false;
        this.cd.detectChanges();
        this.routerWatcherService.resetWatcher(null, 'my opel');
        this.gaHomeService.loadFooterIframe('my opel');
    }

    iframeClick(event) {
        this.routerWatcherService.resetWatcher(null, 'my opel');
    }
}

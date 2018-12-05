import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterWatcherService } from '../_service/router-watcher.service';
import { GaGenericIframeService } from '../_ga/services/ga-generic-iframe.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-generic-iframe',
    templateUrl: './generic-iframe.component.html',
    styleUrls: ['./generic-iframe.component.css']
})
export class GenericIframeComponent implements OnInit {
    iframeIsLoading: boolean;
    iframeSrc;
    public debug = false;
    @Input() baseUrl: string;
    @Input() partUrl: string;
    @Input() vehicleName: string;
    constructor(
        public sanitizer: DomSanitizer,
        private cd: ChangeDetectorRef,
        private routerWatcherService: RouterWatcherService,
        private gaService: GaGenericIframeService,
        private router: Router) {}

    ngOnInit() {
        this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
            `${this.baseUrl}/${this.partUrl}`
        );
        this.iframeIsLoading = true;
        this.cd.detectChanges();
    }

    onLoad() {
        this.iframeIsLoading = false;
        this.cd.detectChanges();
        this.routerWatcherService.resetWatcher(null, 'From generic iframe onLoad');
        this.vehicleName && this.gaService.loadIframe(this.vehicleName, this.router.url);
    }

    public iframeClick() {
        this.routerWatcherService.resetWatcher(null, 'Generic iframe event');
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../_service/shared.service';

@Component({
    selector: 'app-brochure-request-sent',
    templateUrl: './brochure-request-sent.component.html',
    styleUrls: ['./brochure-request-sent.component.css']
})
export class BrochureRequestSentComponent implements OnInit, OnDestroy {
    constructor(private sharedService: SharedService) {}

    ngOnInit() {
        this.sharedService.showBrochureRequestSent(true);
    }

    ngOnDestroy(): void {
        this.sharedService.showBrochureRequestSent(false);
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalGaService, GlobalSharedService } from '../../core/_service';
import { SharedService } from '../_service';

@Component({
    selector: 'app-brochure-sent',
    templateUrl: './brochure-sent.component.html',
    styleUrls: ['./brochure-sent.component.css']
})
export class BrochureSentComponent implements OnInit, OnDestroy {

    public carInfos;

    constructor(
        private globalSharedService: GlobalSharedService,
        private sharedService: SharedService,
        private gaService: GlobalGaService
    ) {
    }

    ngOnInit() {
        this.globalSharedService.setShowBrochureSent(true);
        this.sharedService.getModel().subscribe(info => info && (this.carInfos = info));
        this.gaService.showThankYouPage(this.carInfos['name']);
    }

    ngOnDestroy(): void {
        this.globalSharedService.setShowBrochureSent(false);
    }
}

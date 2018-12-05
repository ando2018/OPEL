import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalSharedService } from '../../core/_service/global-shared.service';
import { SharedService } from '../_service/shared.service';
import { GlobalGaService } from '../../core/_service/global-ga.service';

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
        this.sharedService.getCarInfos().subscribe(info => info && (this.carInfos = info));
        this.gaService.showThankYouPage(this.carInfos['name']);
    }

    ngOnDestroy(): void {
        this.globalSharedService.setShowBrochureSent(false);
    }
}

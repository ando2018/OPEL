import { Component, OnInit } from '@angular/core';
import { GlobalSharedService } from '../_service/global-shared.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    public showPriceDetails: boolean;
    public showBrochureRequestSent: boolean;

    constructor(
        private globalSharedService: GlobalSharedService
    ) {
    }

    ngOnInit() {
        this.globalSharedService.showPriceDetails().subscribe(value => this.showPriceDetails = value);
        this.globalSharedService.showBrochureSent().subscribe(value => this.showBrochureRequestSent = value);
    }
}

import { Component, OnInit } from '@angular/core';
import { SpecialOffersService } from '../_service/special-offers.service';
import { SpecialOffer } from '../special-offer.model';
import { Location } from '@angular/common';

@Component({
    selector: 'app-legal-notice',
    templateUrl: './legal-notice.component.html',
    styleUrls: ['./legal-notice.component.css']
})
export class LegalNoticeComponent implements OnInit {
    legalNotice = '';
    constructor(private location: Location, private specialOfferService: SpecialOffersService) {}

    ngOnInit() {
        this.specialOfferService.getSpecialOffer().subscribe((specialOffer: SpecialOffer) => {
            this.legalNotice = specialOffer.legalNotice;
        });
    }

    goBack() {
        this.location.back();
    }
}

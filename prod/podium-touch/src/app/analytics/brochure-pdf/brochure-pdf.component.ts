import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GaQrCodeService } from '../../_ga/services/ga-qr-code.service';

@Component({
    selector: 'app-brochure-pdf',
    templateUrl: './brochure-pdf.component.html',
    styleUrls: ['./brochure-pdf.component.css']
})
export class BrochurePdfComponent implements OnInit {

    public brochureUrl: string;
    public brochureName: string;

    constructor(private route: ActivatedRoute, private gaService: GaQrCodeService) {
    }

    ngOnInit() {
        this.route.params.subscribe(p => {
            this.brochureUrl = atob(p.url); // MD5 decode
            this.brochureName = p.name;
            this.gaService.scanQrCode(this.brochureName);

            window.location.replace(this.brochureUrl);
        });
    }
}

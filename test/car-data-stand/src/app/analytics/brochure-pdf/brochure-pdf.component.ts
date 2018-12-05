import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalGaService } from '../../core/_service';

@Component({
    selector: 'app-brochure-pdf',
    templateUrl: './brochure-pdf.component.html',
    styleUrls: ['./brochure-pdf.component.css']
})
export class BrochurePdfComponent implements OnInit {

    public brochureUrl: string;
    public brochureName: string;

    constructor(private route: ActivatedRoute, private gaService: GlobalGaService) {
    }

    ngOnInit() {
        this.route.params.subscribe(p => {
            this.brochureUrl = atob(p.url);
            this.brochureName = p.name;
            this.gaService.scanQrCode(this.brochureName);
            window.location.replace(this.brochureUrl);
        });
    }
}

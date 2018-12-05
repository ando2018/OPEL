import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-web-mail-brochure',
    templateUrl: './web-mail-brochure.component.html',
    styleUrls: [
        './web-mail-brochure.component.css',
        '../brochure-request-sent/brochure-request-sent.component.css'
    ]
})
export class WebMailBrochureComponent implements OnInit {
    public email: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {}
}

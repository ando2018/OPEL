import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Model } from '../model.model';
import { ModelSharedService } from '../model-shared.service';

@Component({
    selector: 'app-model-prices',
    templateUrl: './model-prices.component.html',
    styleUrls: ['./model-prices.component.css']
})
export class ModelPricesComponent implements OnInit {
    model: Model;
    constructor(
        private router: Router,
        private modelShared: ModelSharedService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.modelShared.getModel().subscribe(res => {
            this.model = res;
        });
    }
}

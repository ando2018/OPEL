import { Component, OnInit } from '@angular/core';

import { CarInfosServices } from '../_service/car-infos.services';
import { SharedService } from '../_service/shared.service';
import { SlidesService } from '../../core/_service/slides.service';

@Component({
    selector: 'app-car-infos-root',
    templateUrl: './car-infos-root.component.html',
    styleUrls: ['./car-infos-root.component.css']
})
export class CarInfosRootComponent implements OnInit {

    public carInfos;
    public loaded: boolean;
    public loading: boolean;

    constructor(
        private carInfosService: CarInfosServices,
        private sharedService: SharedService,
        private slideService: SlidesService
    ) {
    }

    ngOnInit() {
        this.initData();
        this.sharedService.loaded().subscribe(v => this.loaded = v);
        this.sharedService.loading().subscribe(v => this.loading = v);
    }

    private initData() {
        this.sharedService.setLoading(true);
        this.sharedService.setLoaded(false);

        this.sharedService.getCarInfos().subscribe(infos => infos && (this.carInfos = infos));
        this.carInfosService.getCarInfos({})
            .subscribe(
                res => {
                    const model = res;
                    this.sharedService.setCarInfos(model);
                    this.slideService.setSlides(model ? model['visuals'] : []);
                    model && this.carInfosService.getCategory(model.categoryId || model.vehiculeId)
                        .subscribe(cat => {
                            this.sharedService.setCarCategory(cat);
                            this.sharedService.setLoading(false);
                            this.sharedService.setLoaded(true);
                        }, err => this.sharedService.setLoaded(false));
                },
            err => this.sharedService.setLoaded(false));
    }
}

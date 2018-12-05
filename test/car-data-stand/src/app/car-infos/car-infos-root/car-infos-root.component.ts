import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';

import { ConfigurationModel } from '../../configuration/_model/configuration.model';
import { CarInfosServices, SharedService } from '../_service';
import { GlobalSharedService, SlidesService } from '../../core/_service';
import { ConfigurationService } from '../../configuration/_service/configuration.service';

@Component({
    selector: 'app-car-infos-root',
    templateUrl: './car-infos-root.component.html',
    styleUrls: ['./car-infos-root.component.css']
})
export class CarInfosRootComponent implements OnInit {

    public carInfos;
    public loaded: boolean;
    public loading: boolean;
    private configuration: ConfigurationModel;

    constructor(
        private carInfosService: CarInfosServices,
        private sharedService: SharedService,
        private slideService: SlidesService,
        private globalSharedService: GlobalSharedService,
        private configurationService: ConfigurationService
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
        this.sharedService.getModel().subscribe(infos => infos && (this.carInfos = infos));
        this.globalSharedService.getConfiguration().subscribe(c => this.configuration = c);

        const c = this.configurationService.getConfiguration({});
        c && this.globalSharedService.setConfiguration(c);

        c && this.carInfosService.getModelByVehicleId(this.configuration.vehicle)
            .pipe(filter((res: any[]) => res.length > 0), map(res => res[0]))
            .subscribe(
                res => {
                    const model = res;
                    this.sharedService.setModel(model);
                    this.slideService.setSlides(model ? model['visuals'] : []);
                    model && this.carInfosService.getVehicle(model.vehiculeId)
                        .subscribe(cat => {
                            this.sharedService.setVehicle(cat);
                            this.sharedService.setLoading(false);
                            this.sharedService.setLoaded(true);
                        }, err => this.sharedService.setLoaded(false));
                },
                err => this.sharedService.setLoaded(false));
    }
}

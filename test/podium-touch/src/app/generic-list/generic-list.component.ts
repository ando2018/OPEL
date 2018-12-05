import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterWatcherService } from '../_service/router-watcher.service';
import { GaPageVehiculeService } from '../_ga/services';
import { ActivatedRoute, Router } from '@angular/router';
import { GaGenericListService } from '../_ga/services/ga-generic-list.service';

@Component({
    selector: 'app-generic-list',
    templateUrl: './generic-list.component.html',
    styleUrls: ['./generic-list.component.css']
})
export class GenericListComponent implements OnInit {
    @Input() categories = [];
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onSelect = new EventEmitter<any>();
    constructor(
        private routerWatcherService: RouterWatcherService,
        private gaService: GaPageVehiculeService,
        private genericGaService: GaGenericListService,
        private route: Router
    ) {}

    ngOnInit() {}

    selectVehicle(vehicle) {
        this.onSelect.emit(vehicle);
        this.genericGaService.clicVehicle(vehicle, this.route.url);
        this.routerWatcherService.resetWatcher(null, 'From generic list onSelect');
    }
}

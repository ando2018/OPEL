import { Component, OnInit } from '@angular/core';
import { GlobalSharedService } from '../_service/global-shared.service';
import { ConfigurationModel } from '../../configuration/_model/configuration.model';
import { ConfigurationService } from '../../configuration/_service/configuration.service';

@Component({
    selector: 'app-core-root',
    templateUrl: './core-root.component.html',
    styleUrls: ['./core-root.component.css']
})
export class CoreRootComponent implements OnInit {

    public configured = false;
    private configuration: ConfigurationModel;

    constructor(private shared: GlobalSharedService, private configService: ConfigurationService) {
    }

    ngOnInit() {
        this.configuration = this.configService.getConfiguration({});
        this.shared.configure(!!this.configuration);
        this.shared.isConfigured().subscribe(v => this.configured = v);
    }

}

import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { GlobalSharedService } from '../app/global-shared.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    alertFormModalId = 'alertFormModalId';
    alertLogoutFormModalId = 'alertLogoutFormModalId';
    isLoading = false;
    constructor(private modalService: NgxSmartModalService, private globalSharedService: GlobalSharedService) { }

    ngOnInit() {
        this.globalSharedService.isLoading.subscribe(res => {
            this.isLoading = res;
        });
    }

    validation() {
        this.modalService.setModalData({ type: 'ok' }, this.alertFormModalId);
    }

    annulation() {
        this.modalService.setModalData({ type: 'cancel' }, this.alertFormModalId);
    }

    validationLogout() {
        this.modalService.setModalData({ type: 'ok' }, this.alertLogoutFormModalId);
    }

    annulationLogout() {
        this.modalService.setModalData({ type: 'cancel' }, this.alertLogoutFormModalId);
    }
}

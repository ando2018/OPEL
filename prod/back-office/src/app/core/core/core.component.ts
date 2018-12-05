import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
    selector: 'app-core',
    templateUrl: './core.component.html',
    styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

    isActive: boolean;
    alertLogoutFormModalId = 'alertLogoutFormModalId';
    constructor(private router: Router, private modalService: NgxSmartModalService, ) { }

    ngOnInit() {
        this.modalService.getModal(this.alertLogoutFormModalId).onDataAdded.subscribe((modal) => {
            const action = this.modalService.getModalData(this.alertLogoutFormModalId);
            if (action && action.type === 'ok') {
                this.logOut();
            } else {
                this.modalService.getModal(this.alertLogoutFormModalId).close();
            }
        });
    }

    getCurrentRout(routName) {
        this.isActive = false;
        if (this.router.url.indexOf(routName) > -1) {
            this.isActive = true;
        }
        return this.isActive;
    }

    openConfirmationLogout() {
        this.modalService.resetModalData(this.alertLogoutFormModalId);
        this.modalService.getModal(this.alertLogoutFormModalId).open();
    }

    logOut() {
        localStorage.clear();
        this.router.navigate(['/authentication']);
        this.modalService.getModal(this.alertLogoutFormModalId).close();
    }
}

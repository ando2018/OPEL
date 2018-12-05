import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Gamme } from '../gamme.model';
import { VehicleSharedService } from '../vehicle-shared.service';

@Component({
    selector: 'app-vehicle-filter',
    templateUrl: './vehicle-filter.component.html',
    styleUrls: ['./vehicle-filter.component.css']
})
export class VehicleFilterComponent implements OnInit {
    private _gammes: Gamme[] = [];
    selected: Gamme;
    currentGamme: Gamme;


    @Output() gammeSelected = new EventEmitter<Gamme>();
    @Output() newGamme = new EventEmitter<string>();
    @Input()
    set gammes(gammes: Gamme[]) {
        this._gammes = gammes;
        if (this._gammes.length > 0) {
            if (this.vehicleShared.getCurrentgamme()) {
                const elementPos = this._gammes.map(function (x) { return x._id; }).indexOf(this.vehicleShared.getCurrentgamme()._id);
                this.selected = gammes[elementPos];
                this.gammeSelected.emit(this.selected);
            } else {
                if (this._gammes.length > 0) {
                    this.selected = gammes[0];
                    this.gammeSelected.emit(this.selected);
                }
            }
        }
    }

    get gammes(): Gamme[] {
        return this._gammes;
    }

    constructor(private vehicleShared: VehicleSharedService) { }

    ngOnInit() {
        this.vehicleShared.getGammeSelected().subscribe(res => {
            if (res) {
                if (this.selected !== undefined) {
                    if (res._id) {
                        setTimeout(() => { this.selected = res; });
                    }
                } else {
                    this.selected = this._gammes[0];
                }
            }
        });
    }

    addGamme() {
        this.newGamme.emit('create');
    }

    onSelect(gamme: Gamme) {
        if (gamme.name === 'TOUS') {
            this.vehicleShared.setGammeSelected(undefined);
            this.gammeSelected.emit(undefined);
        } else {
            this.gammeSelected.emit(gamme);
        }

    }
}

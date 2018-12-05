import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { UserService } from '../../core/_service/user.service';
import { ConfigurationService } from '../_service/configuration.service';
import { GammeModel } from '../_model/gamme.model';
import { ConfigurationModel } from '../_model/configuration.model';
import { VehicleModel } from '../_model/vehicle.model';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

    public steps = [
        { number: 1, title: 'Choix du véhicule présenté', collapsed: true, valid: false },
        { number: 2, title: 'Choix du modèle présenté', collapsed: true, valid: false },
        { number: 3, title: 'Choix des options comprises', collapsed: true, valid: false },
        { number: 4, title: 'Modifier le prix', collapsed: true, valid: false },
    ];

    public loadingVehicle: boolean;
    public loadingModels: boolean;
    public loadingOptions: boolean;

    public configuration: ConfigurationModel;
    public selectedVehicle: VehicleModel;
    public selectedModel: any;
    public options: any[];
    public optionsForm: FormGroup;
    public shownPrice: number;
    public totalPrice = 0;
    public showValidate = false;
    public gammes: GammeModel[];
    public availableModels: string[];
    public selectedOptions: any[];

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService,
        private configurationService: ConfigurationService
    ) {
    }

    ngOnInit() {
        this.initConfiguration();
        this.initGammes();
    }

    public title(stepNumber): string {
        switch (stepNumber) {
            case 1:
                return `Véhicule : ${this.selectedVehicle.name}`;
            case 2:
                return `Modèle : ${this.selectedModel.name}`;
            case 3:
                return `Options: ${this.selectedOptions.map(o => o.name).join(', ')}`;
            case 4:
                return `Prix affiché : ${(this.shownPrice || this.totalPrice)} € TTC`;
            default:
                return 'Default title';
        }
    }

    public saveConfigs() {
        this.configuration = {
            name: this.selectedModel.name,
            borneId: '',
            vehicle: this.selectedVehicle._id,
            model: this.selectedModel,
            options: this.selectedOptions,
            shownPrice: +this.shownPrice,
            totalPrice: this.totalPrice
        };

        this.configurationService.setConfiguration(this.configuration);
        this.logout();
    }

    public toggle(index: number, value: boolean) {
        this.steps.forEach(item => item.collapsed = item.number === index ? value : true);
    }

    public logout() {
        this.userService.setUser(null);
        this.userService.setToken(null);
        this.router.navigate(['/']);
    }

    public selectVehicle(vehicle: VehicleModel, next: number) {
        this.selectedVehicle = { ...vehicle };
        this.enableStep(1);
        this.toggle(next, false);
        this.loadingModels = true;
        this.configurationService.getAvailableModels(this.selectedVehicle._id).subscribe(
            res => {
                this.steps[1].valid = false;
                this.availableModels = res;
                this.loadingModels = false;
            }
        );
    }

    public selectModel(model, next: number) {
        this.selectedModel = model;
        this.totalPrice = +model.price;
        this.enableStep(2);
        this.toggle(next, false);
        this.loadingOptions = true;
        this.configurationService.getOptions({}).subscribe(
            res => {
                this.steps[2].valid = false;
                this.options = res;
                this.initOptionsForm();
                this.loadingOptions = false;
            }
        );
    }

    public selectOptions(next: number) {
        this.selectedOptions = this.optionsForm.value.options.map((val, i) => ({...this.options[i], checked: val})).filter(o => o.checked);
        this.totalPrice += this.selectedOptions.reduce((acc, curr) => acc + curr.price, 0);
        this.enableStep(3);
        this.toggle(next, false);
    }

    public updatePrice() {
        this.enableStep(4);
        this.toggle(4, true);
        this.showValidate = true;
    }

    private enableStep(stepNumber): void {
        this.steps.forEach(step => step.number === stepNumber && (step.valid = true));
    }

    private initConfiguration() {
        this.configuration = this.configurationService.getConfiguration({});
    }

    private initGammes() {
        this.loadingVehicle = true;
        this.configurationService.getVehicles({}).subscribe(
            res => {
                this.gammes = res.reduce((acc, curr) => {
                    const exist = acc.find(item => item.name === curr.serie);
                    exist ? exist.vehicles.push(curr) : acc.push({name: curr.serie, vehicles: [curr]});
                    return acc;
                }, []);

                this.loadingVehicle = false;
            }
        );
    }

    public activeVehicle(vehicle: VehicleModel): boolean {
        return this.selectedVehicle ? this.selectedVehicle.name === vehicle.name : this.configuration ? this.configuration.name === vehicle.name : false;
    }

    private initOptionsForm() {
        const controls = this.options.map(o => new FormControl(o.checked));
        this.optionsForm = this.fb.group({
            options: new FormArray(controls)
        });
    }
}

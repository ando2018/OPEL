import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../core/_service/user.service';
import { ConfigurationService } from '../service/configuration.service';
import { SerieModel } from '../model/serie.model';
import { ConfigurationModel } from '../model/configuration.model';
import { CategoryModel } from '../model/category.model';

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

    public configuration: ConfigurationModel;
    public selectedCategory: CategoryModel;
    public selectedModel: string;
    public options: any;
    public price: number;
    public shownPrice = 12520;
    public showValidate = false;
    public series: SerieModel[];
    public availableModels: string[];

    constructor(
        private router: Router,
        private userService: UserService,
        private configurationService: ConfigurationService
    ) {
    }

    ngOnInit() {
        this.initConfiguration();
        this.initSeries();
    }

    public title(stepNumber): string {
        switch (stepNumber) {
            case 1:
                return `Véhicule : ${this.selectedCategory.name}`;
            case 2:
                return `Modèle : ${this.selectedModel}`;
            case 3:
                return `Options comprises`;
            case 4:
                return `Prix affiché : ${(this.price || this.shownPrice)} € TTC`;
            default:
                return 'Default title';
        }
    }

    public saveConfigs() {
        this.router.navigate(['/stand/car-infos/equipments']);
    }

    public toggle(index: number, value: boolean) {
        this.steps.forEach(item => item.collapsed = item.number === index ? value : true);
    }

    public logout() {
        this.userService.setUser(null);
        this.router.navigate(['/']);
    }

    public selectCategory(category: CategoryModel, next: number) {
        this.selectedCategory = { ...category };
        this.enableStep(1);
        this.toggle(next, false);
        this.configurationService.getAvailableModels({}).subscribe(
            res => this.availableModels = res
        );
    }

    public selectModel(model: string, next: number) {
        this.selectedModel = model;
        this.enableStep(2);
        this.toggle(next, false);
        this.configurationService.getOptions({}).subscribe(
            res => this.options = res
        );
    }

    public selectOptions(next: number) {
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
        this.configurationService.getConfiguration({})
            .subscribe(res => this.configuration = res);
    }
    private initSeries() {
        this.configurationService.getCategories({}).subscribe(
            res => {
                this.series = res.reduce((acc, curr) => {
                    const exist = acc.find(item => item.name === curr.serie);
                    exist ? exist.categories.push(curr) : acc.push({ name: curr.serie, categories: [ curr ]});
                    return acc;
                }, []);
            }
        );
    }
}

import { Component, OnInit } from '@angular/core';
import { Model } from '../model.model';
import { ModelSharedService } from '../model-shared.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-model-detail-home',
    templateUrl: './model-detail-home.component.html',
    styleUrls: ['./model-detail-home.component.css']
})
export class ModelDetailHomeComponent implements OnInit {
    model: Model;
    shown = false;
    selectedSlide = '';
    selectedSlideFilename = '';
    slides: string[];

    constructor(private modelSharedService: ModelSharedService) { }

    ngOnInit() {
        this.modelSharedService.getModel().subscribe(model => {
            if (model) {
                this.model = model;
                this.slides = model.visuals.map(
                    filename =>
                        environment.isMock
                            ? `assets/img/${filename}`
                            : `${environment.mediasBaseUrl}/${environment.imagesFolder}/${filename}`
                );
            }
        });
    }

    show(slide, index) {
        this.shown = true;
        this.selectedSlide = slide;
        this.selectedSlideFilename = this.model.visuals[index];
    }
}

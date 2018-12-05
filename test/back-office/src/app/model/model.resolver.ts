import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { flatMap, first } from 'rxjs/operators';
import { Model } from './model.model';
import { ModelService } from './model.service';
import { ModelSharedService } from './model-shared.service';

@Injectable()
export class ModelResolver implements Resolve<Model> {
    constructor(
        private modelService: ModelService,
        private modelSharedService: ModelSharedService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Model> {
        const modelId = route.params['modelId'];
        const vehicleId = route.parent.parent.params['vehicleId'];
        return modelId
            ? this.modelSharedService.getModel().pipe(
                  first(),
                  flatMap(model => (model ? of(model) : this.modelService.getModelById(modelId)))
              )
            : this.modelService.modelFactory(vehicleId);
    }
}

import { Injectable } from '@angular/core';
import { SlugifierService } from '../../_service/slugifer.service';

@Injectable()
export class GaPageAccessoiresService {
    
    constructor(private slugifier: SlugifierService) {}

    public actionClick = name => `CLIC ${name.toUpperCase()}`;
    public tagClick = name => `CLIC_ACCESSOIRES_${this.slugifier.slugify(name, true).toUpperCase()}`;

    public actionIframeLoad = name => `AFFICHAGE IFRAME VIEW ${name.toUpperCase()}`;
    public tagIframeLoad = name => `PAGE-EXT_ACCESSOIRES_${this.slugifier.slugify(name, true).toUpperCase()}`;
}

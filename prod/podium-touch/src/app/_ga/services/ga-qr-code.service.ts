import { Injectable } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../../_service/google-analytics-events.service';
import { SlugifierService } from '../../_service/slugifer.service';

import { BROCHURE_REQUEST_CATEGORY, SCAN_EVENT } from '../const';

@Injectable()
export class GaQrCodeService {

    constructor(private ga: GoogleAnalyticsEventsService, private slugifier: SlugifierService) {}

    public scanQrCode(name) {
        const e = {
            category: BROCHURE_REQUEST_CATEGORY,
            action: this.actionScanQrCode(name),
            label: this.tagScanQrCode(name),
            event: SCAN_EVENT
        };

        this.ga.emitEvent(e);
    }

    private actionScanQrCode = name => `PODIUM - SCAN QR CODE ${name.toUpperCase()}`;
    private tagScanQrCode = name => `PODIUM_SCAN_QR_CODE_${this.slugifier.slugify(name, true).toUpperCase()}`;
}

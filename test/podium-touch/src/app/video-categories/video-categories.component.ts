import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GaHomePageService, GaPageVideoService } from '../_ga/services';
import * as constants from '../_ga/const';
import { SharedService } from '../_service/shared.service';
import { Vehicle } from '../vehicle.model';

@Component({
    selector: 'app-video-categories',
    templateUrl: './video-categories.component.html',
    styleUrls: ['./video-categories.component.css']
})
export class VideoCategoriesComponent implements OnInit {
    constructor(
        private router: Router,
        private gaService: GaHomePageService,
        private gaVideoService: GaPageVideoService,
        private sharedService: SharedService
    ) {}
    public categories = [];
    ngOnInit() {
        this.sharedService.getVehicles().subscribe((vehicles: Vehicle[]) => {
            this.categories = vehicles.filter(v => v.videos.length).reduce((m, o) => {
                if (!m.find(c => c.name === o.gammeName)) {
                    m.push({ name: o.gammeName, visual: o.visual });
                }
                return m;
            }, []);
        });

        this.gaService.showGamePage(constants.VIDEOS_CATEGORY, 'vidéos');
    }
    goToVideos(category) {
        this.gaVideoService.click(category);
        this.router.navigate(['/pages', 'videos', category]);
    }
}

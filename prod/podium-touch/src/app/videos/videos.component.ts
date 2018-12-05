import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { HttpService } from '../_service/http.service';
import { SharedService } from '../_service/shared.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { RouterWatcherService } from '../_service/router-watcher.service';
import { GaPageVideoService } from '../_ga/services';

@Component({
    selector: 'app-videos',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.css', '../vehicles/vehicles.component.css']
})
export class VideosComponent implements OnInit {
    public autoplay = false;
    public loop = false;
    public controls = false;
    public currentlyPlaying = false;
    public currentIndex = 0;
    public list: Video[] = [];

    swiperConfig: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: 1,
        keyboard: true,
        mousewheel: true,
        height: window.innerHeight,
        width: 1920,
        scrollbar: false,
        navigation: true,
        pagination: false,
        loop: false
    };

    constructor(
        public service: HttpService,
        private sharedService: SharedService,
        private router: Router,
        private route: ActivatedRoute,
        private routerWatcherService: RouterWatcherService,
        private gaVideoService: GaPageVideoService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const gammeName = params.category;
            this.sharedService.getVehicles().subscribe(vehicles => {
                this.list = [].concat(
                    ...vehicles.filter(v => v.gammeName === gammeName).map(v =>
                        v.videos.map(({ title, fileName }) => ({
                            title,
                            src: `${environment.mediasBaseUrl}/${
                                environment.videosFolder
                            }/${fileName}`,
                            gammeName
                        }))
                    )
                );

                this.swiperConfig.navigation = this.list.length > 1;
                this.swiperConfig.allowSlideNext = this.swiperConfig.allowSlidePrev =
                    this.list.length > 1;

                const video = this.list[this.currentIndex];
                video && this.gaVideoService.show(video.gammeName, video.title);
            });
        });
    }

    togglePlay(i: number) {
        const elem = this.getVideoElement(i);
        if (this.currentlyPlaying) {
            elem && elem.pause();
        } else {
            elem && elem.play();
            const video = this.list[this.currentIndex];
            video && this.gaVideoService.play(video.gammeName, video.title);
        }

        this.currentlyPlaying = !this.currentlyPlaying;
        this.routerWatcherService.resetWatcher(null, 'Video control toggle');
    }

    retour() {
        const video = this.list[this.currentIndex];
        video &&
            this.gaVideoService.clickBackButton(
                video.gammeName,
                this.currentIndex + 1,
                video.title
            );
        this.router.navigate(['/pages/videos-categories']);
    }

    indexChange() {
        for (let k = 0; k < this.list.length; k++) {
            const elem = this.getVideoElement(k);
            elem.pause();
            elem.currentTime = 0;
        }
        this.currentlyPlaying = false;
        this.routerWatcherService.resetWatcher(null, 'Video index changes');

        const video = this.list[this.currentIndex];
        video && this.gaVideoService.show(video.gammeName, video.title);
    }

    reachEnd(i: number) {
        const elem = this.getVideoElement(i);
        elem.currentTime = 0;
        this.currentlyPlaying = false;
        this.routerWatcherService.resetWatcher(null, 'Video ended');
    }

    private getVideoElement(i): HTMLVideoElement {
        return <HTMLVideoElement>document.getElementById('video-' + i);
    }
}

interface Video {
    title: string;
    gammeName: string;
    src: string;
}

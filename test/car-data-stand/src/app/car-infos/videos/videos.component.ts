import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { environment } from '../../../environments/environment';
import { SharedService } from '../_service';

@Component({
    selector: 'app-videos',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

    public videos;
    public videoPlayerId = 'video-player';
    public currentVideo;

    constructor(
        private sharedService: SharedService,
        public ngxSmartModalService: NgxSmartModalService
    ) {
    }

    ngOnInit() {
        this.sharedService.getModel().subscribe(infos => {
            if (infos) {
                this.videos = infos['videos'] && infos['videos'].map(
                    group => ({
                        ...group, videos: group['videos'].map(
                            item => ({
                                ...item,
                                src: `${environment.mediasBaseUrl}/${environment.videosFolder}/${item.fileName}`
                            }))
                    })
                );
            }
        });

        setTimeout(() =>
            this.ngxSmartModalService.getModal(this.videoPlayerId).onAnyCloseEvent.subscribe(ev => this.stopVideo()), 500);
    }

    playVideo(video) {
        this.currentVideo = { ...video, src: video.src + '?t=' + Math.random() * 1000 };
        this.ngxSmartModalService.getModal(this.videoPlayerId).open();
    }

    ended(event) {
        const target = event.target || event.srcElement || event.currentElement;
        target.webkitExitFullScreen();
    }

    stopVideo() {
        const elem = <HTMLVideoElement>document.getElementById('videoPlayer');
        try {
            elem.pause();
        } catch (e) {
            console.error(e);
        }
    }
}

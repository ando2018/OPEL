import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SharedService } from '../_service/shared.service';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
    public video: any;

    constructor(private sharedService: SharedService, private location: Location) {}

    ngOnInit() {
        this.sharedService.getCurrentVideo().subscribe(video => (this.video = video));
    }

    back() {
        this.location.back();
    }
}

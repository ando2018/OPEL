import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehicleSharedService } from '../vehicle-shared.service';
import { environment } from '../../../environments/environment';
@Component({
    selector: 'app-vehicle-videos',
    templateUrl: './vehicle-videos.component.html',
    styleUrls: ['./vehicle-videos.component.css']
})
export class VehicleVideosComponent implements OnInit {

    vehicleDetail: Vehicle;
    videos = [];
    isMock = environment.isMock;
    public autoplay = false;
    public loop = false;
    public controls = false;
    constructor(private vehicleSharedService: VehicleSharedService) { }
    ngOnInit() {
        this.vehicleSharedService
            .getVehicle()
            .subscribe(
                vehicle => {
                    this.vehicleDetail = vehicle;
                }
            );
    }

    getVideo(video) {
        return `${environment.mediasBaseUrl}/${environment.videosFolder}/${video.fileName}`;
    }
}

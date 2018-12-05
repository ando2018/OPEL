import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { catchError, flatMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { GlobalSharedService } from '../../global-shared.service';
import { Vehicle } from '../vehicle.model';
import { VehicleSharedService } from '../vehicle-shared.service';
import { VehicleService } from '../vehicle.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-vehicle-videos-form',
    templateUrl: './vehicle-videos-form.component.html',
    styleUrls: ['./vehicle-videos-form.component.css']
})
export class VehicleVideosFormComponent implements OnInit {
    vehicle: Vehicle;
    list: Video[];
    isRequired = false;
    allFormValid = true;

    fileVideoPattern = /\.(MP4|mp4|AVI|avi|MKV|mkv)$/i;

    isMock = environment.isMock;

    constructor(
        private vehicleService: VehicleService,
        private vehicleSharedService: VehicleSharedService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private route: ActivatedRoute,
        private globalSharedService: GlobalSharedService
    ) { }

    ngOnInit() {
        this.vehicleSharedService.getVehicle().subscribe(vehicle => {
            this.vehicle = vehicle;
            this.list = vehicle.videos.map(video => ({
                name: video.fileName,
                title: video.title,
                src: environment.isMock
                    ? video.fileName && `assets/videos/${video.fileName}`
                    : video.fileName &&
                    `${environment.mediasBaseUrl}/${environment.videosFolder}/${video.fileName}`,
                file: null,
                uploadStatus: null,
                isDelete: false
            }));
        });
    }

    handleFileInput(files: FileList) {
        let addedFiles: File[] = Object.values(files);
        addedFiles = addedFiles.filter(
            (o, i) => this.fileVideoPattern.test(o.name));
        addedFiles = addedFiles.filter(
            (o, i) => o.size < 209715200);
        // 209715200 taille 200 mega
        if (files.length !== addedFiles.length) {
            this.globalSharedService
                .toasterWarrning({
                    body: 'l\'enregistrement ne supporte que les types : AVI , MP4, MKV (taille < 200 Mo)'
                })
                .subscribe(() => { });
        }
        const newList = addedFiles.map(file => ({
            name: file.name,
            title: '',
            src: this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file)),
            file,
            uploadStatus: UploadStatus.PENDING,
            isDelete: false
        }));
        this.list = [...this.list, ...newList];
    }

    deleteFromList(index: number) {
        this.list[index].isDelete = true;
    }

    reloadFromList(index: number) {
        this.list[index].isDelete = false;
    }

    get formIsValid(): boolean {
        return this.list.every(video => !!video.title || video.isDelete);
    }

    saveVideos() {
        this.list = this.list.filter((e, i) => !e.isDelete);
        this.uploadVideosIfAny(this.list)
            .pipe(flatMap(() => this.updateVehicle()))
            .subscribe(
                (savedVehicle: Vehicle) => {
                    this.vehicleSharedService.setVehicle(savedVehicle);
                    this.globalSharedService
                        .toasterSuccess({ body: 'Modifications enregistrées' })
                        .subscribe(() =>
                            this.router.navigate(['../iframes'], { relativeTo: this.route })
                        );
                },
                err => {
                    this.globalSharedService
                        .toasterError({ body: err.statusText })
                        .subscribe(() => { });
                }
            );
    }

    private updateVehicle(): Observable<Vehicle> {
        const partial: Partial<Vehicle> = {
            _id: this.vehicle._id,
            videos: this.list
                .filter(video => video.uploadStatus !== UploadStatus.ERROR) // Save only videos that are successfully sent
                .map(video => ({ title: video.title, fileName: video.name }))
        };
        return this.vehicleService.partialUpdate(partial);
    }

    private uploadVideosIfAny(list: Video[]): Observable<boolean> {
        const filesToUpload = list.filter(e => e.file).map(({ file }) => file);
        return filesToUpload.length ? this.sendFilesSequentially(filesToUpload) : of(true);
    }

    private sendFilesSequentially(files: File[]): Observable<boolean> {
        return files.reduce((m, o) => m.pipe(flatMap(f => this.sendFile(o))), of(true));
    }

    private sendFile(file: File): Observable<boolean> {
        this.setUploadStatus(file, UploadStatus.UPLOADING);
        return this.vehicleService.sendVideo(file).pipe(
            tap(() => this.setUploadStatus(file, UploadStatus.UPLOADED)),
            catchError(error => (this.setUploadStatus(file, UploadStatus.ERROR), of(error)))
        );
    }

    private setUploadStatus(file: File, status: UploadStatus) {
        const found = this.list.find(({ name }) => name === file.name);
        found.uploadStatus = status;
    }

    validation() {
        this.isRequired = true;
        return this.isRequired;
    }
    isVideoRequired(title) {
        this.allFormValid = title.length < 50;
        return !this.isRequired ? title.length > 50 : title.length > 50 || !title;
    }
}

enum UploadStatus {
    PENDING = 'PENDING',
    UPLOADING = 'UPLOADING',
    UPLOADED = 'UPLOADED',
    ERROR = 'ERROR'
}

interface Video {
    name: string;
    title: string;
    src: string | SafeResourceUrl;
    file: File;
    uploadStatus: UploadStatus;
    isDelete: boolean;
}

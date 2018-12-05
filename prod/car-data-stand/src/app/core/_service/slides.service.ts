import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SlidesService {

    private slides = new BehaviorSubject<string[]>([]);


    public setSlides(slides: string[]): void {
        this.slides.next(slides);
    }

    public getSlides(): Observable<string[]> {
        return this.slides.asObservable();
    }
}

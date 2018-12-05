import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { SharedService } from '../../car-infos/_service/shared.service';

@Injectable()
export class RouterWatcherService {

    private static TIMEOUT = 300000;
    private subject = new Subject<number>();
    private timeout;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private carService: SharedService) {
        this.subject.asObservable().subscribe(val => {
            this.timeout && clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.router.navigate(['/stand/car-infos/slides']);
                this.carService.setIndex(0);
            }, RouterWatcherService.TIMEOUT);
        });
    }

    public watch() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this.resetWatcher(event, 'Route changed: ' + event.urlAfterRedirects));
    }

    public resetWatcher(event?: NavigationEnd, message?: string) {
        // message && console.log(message);
        this.subject.next(Date.now());
    }
}

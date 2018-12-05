import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class RouterWatcherService {
    private static TIMEOUT = 300000;
    private subject = new Subject<number>();
    private timeout;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.subject.asObservable().subscribe(val => {
            this.timeout && clearTimeout(this.timeout);
            this.timeout = setTimeout(
                () => this.router.navigate(['/']),
                RouterWatcherService.TIMEOUT
            );
        });
    }

    public watch() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) =>
                this.resetWatcher(event, 'Route changed: ' + event.urlAfterRedirects)
            );
    }

    public resetWatcher(event?: NavigationEnd, message?: string) {
        this.subject.next(Date.now());
    }
}

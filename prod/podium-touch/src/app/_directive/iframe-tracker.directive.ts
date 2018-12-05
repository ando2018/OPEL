import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appIframeTracker]'
})
export class IframeTrackerDirective implements OnInit {

    public static RESET_FOCUS_TIMEOUT = 300000;
    private iframeMouseOver: boolean;
    private timeout;

    @Input() debug: boolean;
    @Output() iframeClick = new EventEmitter<ElementRef>();

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.renderer.listen(window, 'blur', () => this.onWindowBlur());
    }

    @HostListener('mouseover')
    private onIframeMouseOver() {
        this.log('Iframe mouse over');
        this.iframeMouseOver = true;
        this.resetFocusOnWindow();
    }

    @HostListener('touchstart')
    private onIframeTouchStart() {
        this.log('Iframe touch start');
        this.iframeMouseOver = true;
        this.resetFocusOnWindow();
    }

    @HostListener('mouseout')
    private onIframeMouseOut() {
        this.log('Iframe mouse out');
        this.iframeMouseOver = false;
        this.resetFocusOnWindow();
    }

    @HostListener('touchend')
    private onIframeTouchEnd() {
        this.log('Iframe touch end');
        this.iframeMouseOver = false;
        this.resetFocusOnWindow();
    }

    @HostListener('touchleave')
    private onIframeTouchLeave() {
        this.log('Iframe touch leave');
        this.iframeMouseOver = false;
        this.resetFocusOnWindow();
    }

    private onWindowBlur() {
        if (this.iframeMouseOver) {
            this.log('WOW! Iframe emit!!!');
            this.resetFocusOnWindow();
            this.iframeClick.emit(this.el);
        }
    }

    private resetFocusOnWindow() {
        this.log('reset focus to window');
        if (this.timeout) {
            clearTimeout(this.timeout);
            window.focus();
        }
        this.timeout = setTimeout(() => window.focus(), IframeTrackerDirective.RESET_FOCUS_TIMEOUT);
    }

    private log(message: string) {
        this.debug && console.log(message);
    }
}
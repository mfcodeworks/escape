import { Directive, HostListener, Input, Renderer2, AfterViewInit } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideToolbar]'
})
export class HideToolbarDirective implements AfterViewInit {
    @Input('header') header: any;
    private lastY = 0;

    constructor(
        private renderer: Renderer2,
        private domCtrl: DomController
    ) { }

    ngAfterViewInit(): void {
        this.header = this.header.el;
        this.domCtrl.write(() => this.renderer.setStyle(this.header, 'transition', 'margin-top 300ms'));
    }

    @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
        if ($event.detail.scrollTop > this.lastY) {
            this.domCtrl.write(() => {
                this.renderer.setStyle(this.header, 'margin-top', `-${ this.header.clientHeight }px`);
            });
        } else {
            this.domCtrl.write(() => {
                this.renderer.setStyle(this.header, 'margin-top', '0');
            });
        }

        this.lastY = $event.detail.scrollTop;
    }
}

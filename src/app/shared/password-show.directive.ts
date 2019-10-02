import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appPasswordShow]'
})
export class PasswordShowDirective {
    constructor(private el: ElementRef) { }

    private toggleClass() {

    }

}

import { element } from 'protractor';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[OnlyNumber]'
})
export class OnlyNumberDirective {

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private element: ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.element.nativeElement.value;

    this.element.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this.element.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

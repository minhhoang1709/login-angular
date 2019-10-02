import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  showPassFlag: number;
  showConfirmPassFlag: number;
  @ViewChild('eyeDiv', { static: true }) eyeDivRef: ElementRef;
  @ViewChild('eyeConfirmDiv', { static: true }) eyeConfirmDivRef: ElementRef;
  @ViewChild('inputPass', { static: true }) inputPassRef: ElementRef;
  @ViewChild('inputConfirmPass', { static: true }) inputConfirmPassRef: ElementRef;
  @ViewChild('input100', { static: true }) input100Ref: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.showPassFlag = 0;
    this.showConfirmPassFlag = 0;
    console.log(this.eyeDivRef);
    console.log(this.inputPassRef);
  }

  onBlur() {
    if (this.input100Ref.nativeElement.value.trim() !== '') {
      this.renderer.addClass(this.input100Ref.nativeElement, 'has-val');
    } else {
      this.renderer.removeClass(this.input100Ref.nativeElement, 'has-val');
    }

    if (this.inputPassRef.nativeElement.value.trim() !== '') {
      this.renderer.addClass(this.inputPassRef.nativeElement, 'has-val');
    } else {
      this.renderer.removeClass(this.inputPassRef.nativeElement, 'has-val');
    }

    if (this.inputConfirmPassRef.nativeElement.value.trim() !== '') {
      this.renderer.addClass(this.inputConfirmPassRef.nativeElement, 'has-val');
    } else {
      this.renderer.removeClass(this.inputConfirmPassRef.nativeElement, 'has-val');
    }

  }

  validate() {
    if (this.input100Ref.nativeElement.value.trim() === '') {
      this.showValidate(this.input100Ref);
    }

    if (this.inputPassRef.nativeElement.value.trim() === '') {
      this.showValidate(this.inputPassRef);
    }

    if (this.inputConfirmPassRef.nativeElement.value.trim() !== this.inputPassRef.nativeElement.value.trim()) {
      this.showValidate(this.inputConfirmPassRef);
    }
  }

  onUsernameFocus() {
    this.hideValidate(this.input100Ref);
  }

  onPasswordFocus() {
    this.hideValidate(this.inputPassRef);
  }

  onConfirmPasswordFocus() {
    this.hideValidate(this.inputConfirmPassRef);
  }

  showValidate(input: ElementRef) {
    const thisAlert = input.nativeElement.parentNode;
    this.renderer.addClass(thisAlert, 'alert-validate');
  }

  hideValidate(input: ElementRef) {
    const thisAlert = input.nativeElement.parentNode;
    this.renderer.removeClass(thisAlert, 'alert-validate');
  }

  showPass() {
    if (this.showPassFlag === 0) {
      this.renderer.setAttribute(this.inputPassRef.nativeElement, 'type', 'text');
      this.renderer.removeClass(this.eyeDivRef.nativeElement, 'zmdi-eye');
      this.renderer.addClass(this.eyeDivRef.nativeElement, 'zmdi-eye-off');
      this.showPassFlag = 1;
    } else {
      this.renderer.setAttribute(this.inputPassRef.nativeElement, 'type', 'password');
      this.renderer.removeClass(this.eyeDivRef.nativeElement, 'zmdi-eye-off');
      this.renderer.addClass(this.eyeDivRef.nativeElement, 'zmdi-eye');
      this.showPassFlag = 0;
    }
  }

  showConfirmPass() {
    if (this.showConfirmPassFlag === 0) {
      this.renderer.setAttribute(this.inputConfirmPassRef.nativeElement, 'type', 'text');
      this.renderer.removeClass(this.eyeConfirmDivRef.nativeElement, 'zmdi-eye');
      this.renderer.addClass(this.eyeConfirmDivRef.nativeElement, 'zmdi-eye-off');
      this.showConfirmPassFlag = 1;
    } else {
      this.renderer.setAttribute(this.inputConfirmPassRef.nativeElement, 'type', 'password');
      this.renderer.removeClass(this.eyeConfirmDivRef.nativeElement, 'zmdi-eye-off');
      this.renderer.addClass(this.eyeConfirmDivRef.nativeElement, 'zmdi-eye');
      this.showConfirmPassFlag = 0;
    }
  }

}

import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  showPassFlag: number;
  showConfirmPassFlag: number;
  usernameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  confirmErrorMessage: string;
  @ViewChild('eyeDiv', { static: true }) eyeDivRef: ElementRef;
  @ViewChild('eyeConfirmDiv', { static: true }) eyeConfirmDivRef: ElementRef;
  @ViewChild('inputPass', { static: true }) inputPassRef: ElementRef;
  @ViewChild('inputConfirmPass', { static: true }) inputConfirmPassRef: ElementRef;
  @ViewChild('input100', { static: true }) input100Ref: ElementRef;
  @ViewChild('inputEmail', { static: true }) inputEmailRef: ElementRef;
  patt = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  constructor(private renderer: Renderer2, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.showPassFlag = 0;
    this.showConfirmPassFlag = 0;
  }

  onBlur() {
    if (this.input100Ref.nativeElement.value.trim() !== '') {
      this.renderer.addClass(this.input100Ref.nativeElement, 'has-val');
    } else {
      this.renderer.removeClass(this.input100Ref.nativeElement, 'has-val');
    }

    if (this.inputEmailRef.nativeElement.value.trim() !== '') {
      this.renderer.addClass(this.inputEmailRef.nativeElement, 'has-val');
    } else {
      this.renderer.removeClass(this.inputEmailRef.nativeElement, 'has-val');
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



  onUsernameFocus() {
    this.hideValidate(this.input100Ref);
  }

  onEmailFocus() {
    this.hideValidate(this.inputEmailRef);
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

  validate() {
    let flag = true;

    if (this.input100Ref.nativeElement.value.trim() === '') {
      this.usernameErrorMessage = 'Enter username !';
      this.showValidate(this.input100Ref);
      flag = false;
    }

    if (!this.patt.test(this.inputEmailRef.nativeElement.value.trim())) {
      this.emailErrorMessage = 'Enter email !';
      this.showValidate(this.inputEmailRef);
      flag = false;
    }

    if (this.inputPassRef.nativeElement.value.trim() === '') {
      this.passwordErrorMessage = 'Enter password !';
      this.showValidate(this.inputPassRef);
      flag = false;
    }

    if (this.inputConfirmPassRef.nativeElement.value.trim() !== this.inputPassRef.nativeElement.value.trim()) {
      this.confirmErrorMessage = 'Not match !';
      this.showValidate(this.inputConfirmPassRef);
      flag = false;
    }
    return flag;
  }

  onSignup(postData: { username: string; password: string; email: string }) {
    if (this.validate()) {
      this.authService.signup(postData.username, postData.password, postData.email).subscribe(
        result => {
          if (result.messageCode === 'MSG01_REGISTERED') {

            Swal.fire({
              title: 'Success!',
              text: 'You successfully registed',
              type: 'success'
            });
            localStorage.setItem('verifiedEmail', postData.email);
            this.router.navigate(['/verification']);
          }
        },
        err => {
          if (err.error.messageCode === 'MSG04_USERNAME_EMAIL_IN_USE') {
            this.usernameErrorMessage = 'Username in use !';
            this.emailErrorMessage = 'Email in use !';
            this.showValidate(this.input100Ref);
            this.showValidate(this.inputEmailRef);
          }

          if (err.error.messageCode === 'MSG02_USERNAME_IN_USE') {
            this.usernameErrorMessage = 'Username in use !';
            this.showValidate(this.input100Ref);
          }

          if (err.error.messageCode === 'MSG03_EMAIL_IN_USE') {
            this.emailErrorMessage = 'Email in use !';
            this.showValidate(this.inputEmailRef);
          }
        }
      );
    }
  }
}

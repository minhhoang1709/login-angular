import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  showPassFlag: number;
  adminMode: boolean;
  @ViewChild('eyeDiv', { static: true }) eyeDivRef: ElementRef;
  @ViewChild('inputPass', { static: true }) inputPassRef: ElementRef;
  @ViewChild('input100', { static: true }) input100Ref: ElementRef;

  ngOnInit() {
    this.showPassFlag = 0;
    this.adminMode = false;
    console.log(this.eyeDivRef);
    console.log(this.inputPassRef);
  }

  constructor(private renderer: Renderer2, private authService: AuthService, private router: Router) {
  }

  onSwitch() {
    this.adminMode = !this.adminMode;
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

  }

  validate() {
    if (this.input100Ref.nativeElement.value.trim() === '') {
      this.showValidate(this.input100Ref);
      return false;
    }

    if (this.inputPassRef.nativeElement.value.trim() === '') {
      this.showValidate(this.inputPassRef);
      return false;
    }
    return true;
  }

  onUsernameFocus() {
    this.hideValidate(this.input100Ref);
  }

  onPasswordFocus() {
    this.hideValidate(this.inputPassRef);
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

  onLogin(postData: { username: string; password: string }) {
    if (this.validate()) {
      if (this.adminMode) {
        this.authService.adminLogin(postData.username, postData.password).subscribe(
          result => this.router.navigate(['/home']),
          err => alert("Wrong username or password")
        );
      } else {
        this.authService.userLogin(postData.username, postData.password).subscribe(
          result => this.router.navigate(['/home']),
          err => alert("Wrong username or password")
        );
      }
    }
  }
}

import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  showPassFlag: number;
  showConfirmPassFlag: number;
  submitCheckFlag: number;
  user;
  @ViewChild('eyeDiv', { static: true }) eyeDivRef: ElementRef;
  @ViewChild('eyeConfirmDiv', { static: true }) eyeConfirmDivRef: ElementRef;
  @ViewChild('inputFullname', { static: true }) inputFullnameRef: ElementRef;
  @ViewChild('inputAge', { static: true }) inputAgeRef: ElementRef;
  @ViewChild('inputBirthday', { static: true }) inputBirthdayRef: ElementRef;
  @ViewChild('inputPass', { static: true }) inputPassRef: ElementRef;
  @ViewChild('inputConfirmPass', { static: true }) inputConfirmPassRef: ElementRef;
  @ViewChild('inputSubmit', { static: true }) inputSubmitRef: ElementRef;
  constructor(private renderer: Renderer2, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.showPassFlag = 0;
    this.showConfirmPassFlag = 0;
    this.submitCheckFlag = 0;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.user.birthday = this.user.birthday.substring(0, 10);
    console.log(this.user);

  }


  validate() {
    if (this.inputConfirmPassRef.nativeElement.value.trim() !== this.inputPassRef.nativeElement.value.trim()) {
      this.showValidate(this.inputConfirmPassRef);
      return false;
    }
    return true;
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

  onProfileChange(postData: { username: string, password: string, fullname: string, birthday: string, gender: string, age: number }) {
    postData.username = this.user.username;
    if (this.validate()) {
      this.http.put('http://localhost:3000/api/user/reset/' + this.user.username, postData, {
        headers: new HttpHeaders().set('Authorization', this.user.jwt),
      }).subscribe((res) => {
        this.user.fullname = postData.fullname;
        this.user.birthday = postData.birthday;
        this.user.gender = postData.gender;
        this.user.age = postData.age;
        localStorage.setItem('currentUser', this.user);
        alert(res);
        this.router.navigate(['/home']);
      });
    }
  }

}

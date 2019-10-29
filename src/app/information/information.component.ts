import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  @ViewChild('inputFullname', { static: true }) inputFullnameRef: ElementRef;
  @ViewChild('inputPhone', { static: true }) inputPhoneRef: ElementRef;
  @ViewChild('inputAddress', { static: true }) inputAddressRef: ElementRef;
  @ViewChild('inputOldPass', { static: true }) inputOldPassRef: ElementRef;
  @ViewChild('inputNewPass', { static: true }) inputNewPassRef: ElementRef;
  @ViewChild('inputConfirm', { static: true }) inputConfirmRef: ElementRef;
  user;
  constructor(private renderer: Renderer2, private profileService: ProfileService) { }

  ngOnInit() {
    this.onGetProfile();
    if (this.user !== null) {
      this.renderer.addClass(this.inputFullnameRef.nativeElement, 'has-val');
      this.renderer.addClass(this.inputPhoneRef.nativeElement, 'has-val');
      this.renderer.addClass(this.inputAddressRef.nativeElement, 'has-val');
    }
  }

  onBlur() {
    if (this.inputFullnameRef.nativeElement.value.trim() !== '') {
      this.renderer.addClass(this.inputFullnameRef.nativeElement, 'has-val');
    } else {
      this.renderer.removeClass(this.inputFullnameRef.nativeElement, 'has-val');
    }

    if (this.inputPhoneRef.nativeElement.value.trim() !== '') {
      this.renderer.addClass(this.inputPhoneRef.nativeElement, 'has-val');
    } else {
      this.renderer.removeClass(this.inputPhoneRef.nativeElement, 'has-val');
    }

    if (this.inputAddressRef.nativeElement.value.trim() !== '') {
      this.renderer.addClass(this.inputAddressRef.nativeElement, 'has-val');
    } else {
      this.renderer.removeClass(this.inputAddressRef.nativeElement, 'has-val');
    }

    if (this.inputOldPassRef.nativeElement.value.trim() !== '') {
      this.renderer.addClass(this.inputOldPassRef.nativeElement, 'has-val');
    } else {
      this.renderer.removeClass(this.inputOldPassRef.nativeElement, 'has-val');
    }

    if (this.inputNewPassRef.nativeElement.value.trim() !== '') {
      this.renderer.addClass(this.inputNewPassRef.nativeElement, 'has-val');
    } else {
      this.renderer.removeClass(this.inputNewPassRef.nativeElement, 'has-val');
    }

    if (this.inputConfirmRef.nativeElement.value.trim() !== '') {
      this.renderer.addClass(this.inputConfirmRef.nativeElement, 'has-val');
    } else {
      this.renderer.removeClass(this.inputConfirmRef.nativeElement, 'has-val');
    }

  }

  validate() {
    let flag = true;

    if (this.inputFullnameRef.nativeElement.value.trim() === '') {
      this.showValidate(this.inputFullnameRef);
      flag = false;
    }

    if (this.inputPhoneRef.nativeElement.value.trim() === '') {
      this.showValidate(this.inputPhoneRef);
      flag = false;
    }

    if (this.inputAddressRef.nativeElement.value.trim() === '') {
      this.showValidate(this.inputAddressRef);
      flag = false;
    }
    return flag;
  }

  changePasswordValidate() {
    let flag = true;
    if (this.inputOldPassRef.nativeElement.value.trim() === '') {
      this.showValidate(this.inputOldPassRef);
      flag = false;
    }

    if (this.inputNewPassRef.nativeElement.value.trim() === '') {
      this.showValidate(this.inputNewPassRef);
      flag = false;
    }

    if (this.inputConfirmRef.nativeElement.value.trim() !== this.inputNewPassRef.nativeElement.value.trim()) {
      this.showValidate(this.inputConfirmRef);
      flag = false;
    }

    return flag;
  }

  onFullnameFocus() {
    this.hideValidate(this.inputFullnameRef);
  }

  onPhoneFocus() {
    this.hideValidate(this.inputPhoneRef);
  }

  onAddressFocus() {
    this.hideValidate(this.inputAddressRef);
  }

  onOldPassFocus() {
    this.hideValidate(this.inputOldPassRef);
  }

  onNewPassFocus() {
    this.hideValidate(this.inputNewPassRef);
  }

  onConfirmFocus() {
    this.hideValidate(this.inputConfirmRef);
  }

  showValidate(input: ElementRef) {
    const thisAlert = input.nativeElement.parentNode;
    this.renderer.addClass(thisAlert, 'alert-validate');
  }

  hideValidate(input: ElementRef) {
    const thisAlert = input.nativeElement.parentNode;
    this.renderer.removeClass(thisAlert, 'alert-validate');
  }


  onSaveProfile() {
    this.validate();
  }

  onGetProfile() {
    this.profileService.getInformation(localStorage.getItem('credential')).subscribe(
      result => {
        this.user = result;
      }
    );
  }

  onUpdateProfile() {
    if (this.validate()) {
      this.profileService.updateProfile(localStorage.getItem('credential'),
        this.user.userFullName, this.user.userGender, this.user.userBirthday, this.user.userPhonenumber, this.user.userAddress).subscribe(
          result => {
            Swal.fire({
              title: 'Success!',
              text: 'You successfully updated',
              type: 'success'
            });
          }
        );
    }
  }

  onChangePassword(postData: { oldPassword: string; newPassword: string }) {
    if (this.changePasswordValidate()) {
      this.profileService.changePassword(localStorage.getItem('credential'), postData.oldPassword, postData.newPassword).subscribe(
        result => {
          Swal.fire({
            title: 'Success!',
            text: result.message,
            type: 'success'
          });
        },
        err => {
          Swal.fire({
            title: 'Wrong password!',
            text: err.error.message,
            type: 'error'
          });
        }
      );
    }
  }
}

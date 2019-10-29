import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  verified = false;
  email: string;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('verifiedEmail'));
    this.email = localStorage.getItem('verifiedEmail');
    this.onGetVerified().subscribe((res) => {
      this.verified = res.success;
    });
  }

  onVerify() {
    this.onGetVerified().subscribe((res) => {
      this.verified = res.success;
    });

    if (this.verified) {
      Swal.fire({
        title: 'Success!',
        text: 'You successfully verify your email. Now you can log in',
        type: 'success'
      });
      this.router.navigate(['/log-in']);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Your email is not verified, please check your email to verify it',
        type: 'error'
      });
    }
  }

  onGetVerified() {
    return this.http.get<any>('http://localhost:8085/api/auth/verification-check?email=' + this.email);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export interface UserElement {
  userId: number;
  userName: string;
  userCreatedDate: string;
  userUpdatedDate: string;
  userEmail: string;
  userFullName: number;
  userGender: string;
  userBirthday: string;
  userPhonenumber: string;
  userAddress: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  USER_DATA: UserElement[] = [];
  assetsList = [];

  chosenUser: UserElement;
  user;
  dtOptions: DataTables.Settings = {};

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private http: HttpClient, private router: Router) {
    this.matIconRegistry.addSvgIcon(
      'basic-datepicker-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/icn_calendar.svg')
    );
  }

  someClickHandler(info: any): void {
    this.chosenUser = info;
  }
  ngOnInit() {
    this.onGetUserList().subscribe(
      result => {
        this.USER_DATA = result;
      },
      err => {
        if (err.error.message !== '') {
          Swal.fire({
            title: 'Permission needed!',
            text: 'You need permission to access this page',
            type: 'error'
          });
          this.router.navigate(['/home/information']);
        }
      }
    );

    this.dtOptions = {
      dom: '<"top"fi>rt<"bottom"p><"clear">',
      pagingType: 'full_numbers',
      serverSide: true,
      searching: false,
      info: false,
      ajax: () => {
        this.http
          .get<any>(
            'http://localhost:8085/api/user/list', {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'))
          }
          ).subscribe(resp => {
            this.USER_DATA = resp;

          });
      },
      columns: [{
        data: 'userFullName'
      }, {
        data: 'userGender'
      }, {
        data: 'userBirthday'
      }, {
        data: 'userPhonenumber'
      }, {
        data: 'userAddress'
      }],
    };
  }

  onGetUserList() {
    return this.http.get<any>('http://localhost:8085/api/user/list', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'))
    });
  }

}

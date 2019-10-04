import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface UserElement {
  username: string;
  fullname: string;
  birthday: string;
  gender: string;
  age: number;
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

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private http: HttpClient) {
    this.matIconRegistry.addSvgIcon(
      'basic-datepicker-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/icn_calendar.svg')
    );
  }

  someClickHandler(info: any): void {
    this.chosenUser = info;
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.onGetUserList().subscribe((res) => {
      this.USER_DATA = res;
    });

    this.assetsList = this.USER_DATA.map(a => a.username);
    this.assetsList = this.assetsList.filter((item, index) => this.assetsList.indexOf(item) === index);

    this.dtOptions = {
      dom: '<"top"i>rt<"bottom"p><"clear">',
      pagingType: 'full_numbers',
      stateSave: true,
      searching: false,
      pageLength: 2,
      serverSide: true,
      processing: true,
      lengthChange: true,
      info: false,
      columns: [{
        title: 'Username',
        data: 'username'
      }, {
        title: 'Fullname',
        data: 'fullname'
      }, {
        title: 'Gender',
        data: 'gender'
      }, {
        title: 'Age',
        data: 'age'
      }, {
        title: 'Birthday',
        data: 'birthday'
      }],
    };
  }

  onGetUserList() {
    return this.http.get<any>('http://localhost:3000/api/admin/list-users', {
      headers: new HttpHeaders().set('Authorization', this.user.jwt)
    });
  }

}

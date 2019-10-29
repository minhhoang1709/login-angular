import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    constructor(private http: HttpClient) {
    }

    getInformation(userEmail: string) {
        return this.http.get<any>('http://localhost:8085/api/profile/information?userNameOrUserEmail=' + userEmail, {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'))
        });
    }

    updateProfile(userCredential: string, userFullName: string, userGender: string, userBirthday: string, userPhonenumber: string, userAddress: string) {
        return this.http.put<any>('http://localhost:8085/api/profile/update', { userCredential, userFullName, userGender, userBirthday, userPhonenumber, userAddress }, {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'))
        });
    }

    changePassword(userNameOrEmail: string, oldPassword: string, newPassword: string) {
        return this.http.put<any>('http://localhost:8085/api/profile/change-password', { userNameOrEmail, oldPassword, newPassword }, {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'))
        })
    }

}

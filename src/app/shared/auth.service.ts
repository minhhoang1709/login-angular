import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http: HttpClient) {
    }

    login(userNameOrUserEmail: string, userPass: string) {
        return this.http.post<any>('http://localhost:8085/api/auth/signin', { userNameOrUserEmail, userPass });
    }

    signup(userName: string, userPass: string, userEmail: string) {
        return this.http.post<any>('http://localhost:8085/api/auth/signup', { userName, userPass, userEmail });
    }

    onLogout() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('credential');
        localStorage.removeItem('verifiedEmail');
    }

    public loggedIn(): boolean {
        return localStorage.getItem('jwtToken') !== null;
    }

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                resolve(this.loggedIn());
            }
        );
        return promise;
    }
}

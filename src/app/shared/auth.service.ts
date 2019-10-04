import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http: HttpClient) {

    }

    adminLogin(username: string, password: string) {
        return this.http.post<any>('http://localhost:3000/api/admin/login', { username, password }).pipe(tap(res => {
            localStorage.setItem('currentUser', JSON.stringify(res));
        }), catchError((errorResponse: HttpErrorResponse) => {
            return throwError(errorResponse);
        })
        );
    }

    userLogin(username: string, password: string) {
        return this.http.post<any>('http://localhost:3000/api/user/login', { username, password }).pipe(tap(res => {
            localStorage.setItem('currentUser', JSON.stringify(res));
        }), catchError((errorResponse: HttpErrorResponse) => {
            return throwError(errorResponse);
        })
        );
    }

    adminSignup(username: string, password: string) {
        return this.http.post<any>('http://localhost:3000/api/admin/signup', { username, password }).pipe(tap(res => {
            this.adminLogin(username, password);
        }), catchError((errorResponse: HttpErrorResponse) => {
            return throwError(errorResponse);
        })
        );
    }

    userSignup(username: string, password: string) {
        return this.http.post<any>('http://localhost:3000/api/user/signup', { username, password }).pipe(tap(res => {
            this.userLogin(username, password);
        }), catchError((errorResponse: HttpErrorResponse) => {
            return throwError(errorResponse);
        })
        );
    }

    onLogout() {
        localStorage.removeItem('currentUser');
    }

    public loggedIn(): boolean {
        return localStorage.getItem('currentUser') !== null;
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

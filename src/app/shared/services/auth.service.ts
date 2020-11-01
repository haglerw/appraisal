import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import Swal from 'sweetalert2';
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _currentUser: any;
    private jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
      private handler: HttpBackend,
      private router: Router,
      private http: HttpClient,
      private apiService: ApiService,
      private globalService: GlobalService,
    ) {
        this.http = new HttpClient(this.handler);
        this.isAuthenticated();
        const token = this.token;
        if (token) { this._currentUser = this.jwtHelper.decodeToken(token); }
    }

    // Auth service method to log in user
    login(model: any): Observable<any> {
        return this.http.post(environment.baseUrl + '/employee/login', model)
            .do(res => this.setSession(res))
            .pipe(map(user => {
                if (user && user['data']['token']) {
                    localStorage.setItem('token', user['data']['token']);
                    this._currentUser = this.jwtHelper.decodeToken(localStorage.getItem('token'));
                    return user;
                } else {
                    return false;
                }
            }));
    }

    private setSession(authResult) {
        localStorage.setItem('token', authResult['data']['token']);
        this._currentUser = authResult['data'];
        return this._currentUser;
    }

    // A method to log out users
    logout(): void {
        localStorage.removeItem('token');
        this._currentUser = null;
    }

    get currentUser(): any {
        return this._currentUser;
    }

    get token(): string {
        return localStorage.getItem('token');
    }

    isAuthenticated(): void {
        const token = this.token;
        if (token) {
            const tokenExpired = this.jwtHelper.isTokenExpired(token);
            if (tokenExpired) { this.logout(); }
        }
    }

    // resetPassword(data: any, request_type: string) {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'You won\'t be able to revert this!',
    //         type: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, change password!'
    //     }).then((result) => {
    //         if (result.value) {
    //             const model = {
    //                 request_type: request_type,
    //                 client_type: this.globalService.deviceInfo,
    //                 session_data: data
    //             };
    //             this.apiService.postRequest(model)
    //                 .subscribe(res => {
    //                     if (res['status'] === 'success') {
    //                         Swal.fire(
    //                             'Successful!',
    //                             'Password changed and sent to user.',
    //                             'success'
    //                         );
    //                         // refreshList();
    //                         return;
    //                     } else {
    //                         Swal.fire(
    //                             'Error!',
    //                             'Password change failed, ' + res['message'],
    //                             'error'
    //                         );
    //                     }
    //                 });
    //         } else {
    //             // refreshList();
    //             return;
    //         }
    //     });
    // }

    // blockUser(data: any, request_type: string, refreshList: any) {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'You won\'t be able to revert this!',
    //         type: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, block!'
    //     }).then((result) => {
    //         if (result.value) {
    //             const model = {
    //                 request_type: request_type,
    //                 client_type: this.globalService.deviceInfo,
    //                 session_data: data
    //             };
    //             this.apiService.postRequest(model)
    //                 .subscribe(res => {
    //                     if (res['status'] === 'success') {
    //                         Swal.fire(
    //                             'Successful!',
    //                             'Block successful.',
    //                             'success'
    //                         );
    //                         refreshList();
    //                     } else {
    //                         Swal.fire(
    //                             'Error!',
    //                             'Block action failed, ' + res['message'],
    //                             'error'
    //                         );
    //                     }
    //                 });
    //         } else {
    //             // refreshList();
    //             return;
    //         }
    //     });
    // }
}

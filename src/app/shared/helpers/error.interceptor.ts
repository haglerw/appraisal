import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, retry, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    static readonly REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string = 'An error occurred, click to refresh';
    static readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private authService: AuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                // retry(1),
                catchError((err: HttpErrorResponse) => {
                    const httpErrorCode = err.status;
                    switch (httpErrorCode) {
                        case 401:
                            Swal.fire({
                                type: 'error',
                                title: 'Oops...',
                                text: 'Session expired, please log in again.'
                            }).then((result) => {
                                if (result.value) {
                                    this.authService.logout();
                                    location.reload();
                                }
                            });
                            break;
                        case 403:
                            Swal.fire({
                                type: 'warning',
                                title: 'Forbidden',
                                text: 'This action is forbidden.'
                            }).then((result) => {
                                if (result.value) {
                                    this.router.navigate(['/']);
                                }
                            });
                            break;
                        case 400:
                            this.showError(err.message);
                            break;
                        default:
                            this.showError(ErrorInterceptor.REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE);
                    }

                    return throwError(err.message);
                })
            );
    }

    private showError(message: string): void {
        this.toastr.error(message, ErrorInterceptor.DEFAULT_ERROR_TITLE)
            .onTap
            .pipe(take(1))
            .subscribe(() => window.location.reload());
    }
}

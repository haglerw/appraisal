import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubSink } from 'subsink';

import { AuthService } from '../../../shared/services';
import { GlobalService } from '../../../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnDestroy, OnInit {
    private subs = new SubSink();

    formTitle  = 'Sign on to your account';
    form: FormGroup;
    returnUrl: string;
    loading = false;
    submitted = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private globalService: GlobalService
    ) {
        // redirect to home if already logged in
        if (authService.currentUser) {
            router.navigate(['/']);
        } else {
            // reset login status
            authService.logout();
        }
    }

    ngOnInit(): void {
        const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        this.form = this.fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            'password': ['', Validators.required]
        });
        // reset login status
        this.authService.logout();

        // get return url from route parameters or default to ''
        this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '';
    }

    get f(): { [p: string]: AbstractControl } {
        return this.form.controls;
    }

    onSubmit(login: any): void {
        this.submitted = true;

        this.loading = true;
        this.subs.sink = this.authService.login(login).subscribe(
                res =>  {
                    this.toastr.success('Login successful');
                    this.router.navigateByUrl(this.returnUrl);
                },
                err => {
                    if (err.status === 401) {
                        this.errorMessage = err.error.message;
                        this.loading = false;
                    }
                });
    }

    ngAfterViewInit(): void {
        document.getElementById('preloader').classList.add('hide');
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

}

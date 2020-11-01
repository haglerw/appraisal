import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    url = environment.baseUrl;
    churchid = 'churchid';
    branchid = 'branchid';
    userid = 'userid';
    requesttypeid = 'requesttypeid';
    categoryid = 'categoryid';
    eventtypeid = 'eventtypeid';
    id = 'id';
    page = 'page';
    size = 'size';
    startdate = 'startdate';
    enddate = 'enddate';
    projectid = 'projectid';
    periodtype = 'periodtype';
    period = 'period';

    public errCodes: any = {
        SUCCESS_CODE: '00',
        FAILED_CODE: '01',
        RECORD_NOT_FOUND: '04',
        RECORD_EXISTS: '05',
        VALIDATION_FAILURE: '11',
        AUTHORIZATION_FAILED_CODE: '55',
        PERMISSION_ERROR_CODE: '56'
    };

    constructor(
       private http: HttpClient
    ) { }

    private static createCompleteRoute(route: string, envAddress: string): string {
        return `${envAddress}/${route}`;
    }

    public generateHeaders() {
        return new HttpHeaders({'Content-Type': 'application/json'});
    }

    public postRequest(route: string, body: any): any {
        return this.http.post<any>(ApiService.createCompleteRoute(route, this.url), body, { headers: this.generateHeaders() })
            .pipe(map(data => {
                return data;
            }));
    }

    public patch(route: string, body: any): any {
        return this.http.patch(ApiService.createCompleteRoute(route, this.url), body, { headers: this.generateHeaders() });
    }

    public put(route: string, body: any): any {
        return this.http.put(ApiService.createCompleteRoute(route, this.url), body, { headers: this.generateHeaders() });
    }

    public getResource(route: string, httpParams?: any): any {
        return this.http.get<any>(ApiService.createCompleteRoute(route, this.url),
            { headers: this.generateHeaders(), params: httpParams })
            .pipe(map(data => {
                return data;
            }));
    }

    public delete(route: string): any {
        return this.http.delete(ApiService.createCompleteRoute(route, this.url), { headers: this.generateHeaders() });
    }

    public handleErrorsFromServer(errorsObj: any) {
        const errorMessages = [];
        Object.entries(errorsObj).forEach(
          ([key, value]) => // console.log(key, value)
            errorMessages.push(value)
        );
        return errorMessages;
    }

    public format(date: NgbDateStruct, format: string): string {
        if (!date) { return ''; }
        const mdt = moment([date.year, date.month - 1, date.day]);
        if (!mdt.isValid()) { return ''; }
        return mdt.format(format);
    }
}

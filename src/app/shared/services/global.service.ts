import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class GlobalService {
    apiHost: string;
    setting: any = {};
    deviceInfo: DeviceInfo;

    constructor(private deviceService: DeviceDetectorService, private datePipe: DatePipe) {
      this.apiHost = environment.baseUrl;
      this.deviceInfo = {
        useragentversion: deviceService.getDeviceInfo().os_version,
        useragent: deviceService.getDeviceInfo().userAgent
      };
    }

    getDismissedReason(reason: any) {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with ${reason}`;
      }
    }

    transformDate(date: NgbDateStruct) {
      const picked_date = new Date(date.year, date.month - 1, date.day);
      return this.datePipe.transform(picked_date, 'yyyy-MM-dd');
    }

    transformDateRange(dateRange: any) {
      const newDate = dateRange.toString().split(' ');
      const month = newDate[1];
      const day = newDate[2];
      const year = newDate[3];
      return this.stringToDate(month + ' ' + day + ', ' + year);
    }

    stringToDate(dateString: string) {
      return {year: new Date(dateString).getFullYear(), month: new Date(dateString).getMonth() + 1, day: new Date(dateString).getDate()};
    }

    stringToTime(timeString: string, seconds?: boolean) {
      const newTime = timeString.split(':');
      if (seconds) {
          return { hour: +newTime[0], minute: +newTime[1], second: +newTime[2] };
      } else {
          return { hour: +newTime[0], minute: +newTime[1] };
      }
    }

    transformTime(time: any, seconds?: boolean): any {
        if (seconds) {
            return time.hour + ':' + time.minute + ':' + time.second;
        } else {
            return time.hour + ':' + time.minute;
        }
    }

    backDate(date) {
      const newDate = new Date(date.year, date.month, date.day);
      return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 365);
    }

    loadGlobalSettingsFromLocalStorage(): void {
      if (localStorage.getItem('backend-setting') != null) {
        this.setting = JSON.parse(localStorage.getItem('backend-setting'));
      }
    }

    handleServerErrors(result: any): any {
     //   let isValidationError = false;
     //   let errorMessage;
    /*    this.message.error('Encountered an error', { nzDuration: 2000 });
        switch (result.response_code) {
          case 400:
            errorMessage = 'Wrong method';
            break;
          case 401:
            errorMessage = 'Session Expired';
            this.message.error('Your session  has expired', { nzDuration: 4000 });
            break;
          case 403:
            errorMessage = 'UnAuthorized';
            break;
          case 422:
            isValidationError = true;
            errorMessage = Array.from(Object.keys(result.error_messages), k => result.error_messages[k]);
            break;
          case 404:
            errorMessage = 'Not Found';
            break;
          case 500:
            errorMessage = 'Internal Server Error';
            break;
        }
        return { errorMessage: errorMessage, isValidationError: isValidationError  };
        **/
      }

      validateOnClientSide(validateForm: any): boolean {
        let hasClientValidationError = false;
        for (const i in validateForm.controls) {
          if (validateForm.controls) {
            validateForm.controls[i].markAsDirty();
            validateForm.controls[i].updateValueAndValidity();
            if (validateForm.controls[i].errors !== null) {
              hasClientValidationError = true;
            }
          }
        }
        return hasClientValidationError;
      }

      // get Unique values in an array
  uniqueBy(arr: any, fn: any): any {
    const unique = {};
    const distinct = [];
    arr.forEach(function (x: any): any {
      const key = fn(x);
      if (!unique[key]) {
        distinct.push(key);
        unique[key] = true;
      }
    });
    return distinct;
  }
  // Returns an array of dates between the two dates
  enumerateDaysBetweenDates(startDate: any, endDate: any): any {
    startDate = moment(startDate);
    endDate = moment(endDate);
    const now = startDate;
    const dates = [];
    while (now.isBefore(endDate) || now.isSame(endDate)) {
      dates.push(now.format('YYYY-MM-DD'));
      now.add(1, 'days');
    }
    return dates;
  }

  /**
   * Shuffles array in place. ES6 version
   */
  shuffle(a: any): any {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getUserInfo(): any {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }
  getUserPermissions(): any {
    const permissions = localStorage.getItem('permission');
    return JSON.parse(permissions);
  }
  getToken(): any {
    return localStorage.getItem('ussd-token');
  }
}

export interface DeviceInfo {
  useragentversion: string;
  useragent: string;
}

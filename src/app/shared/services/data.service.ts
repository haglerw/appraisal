import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Data {

  data$: Observable<any>;
  private dataSubject: ReplaySubject<string>;

  tempDataStorage: any;

  constructor() {
    this.dataSubject = new ReplaySubject<any>(1);
    this.data$ = this.dataSubject.asObservable();
  }

  setData(param: any) {
    this.dataSubject.next(param);
  }
}

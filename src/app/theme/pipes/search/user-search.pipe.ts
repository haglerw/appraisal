import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UserSearchPipe', pure: false })
export class UserSearchPipe implements PipeTransform {
  transform(values, fNameSearch?, lNameSearch?, emailSearch?, phoneSearch?): Array<any> {
    const fSearch = new RegExp(fNameSearch, 'ig');
    const oSearch = new RegExp(lNameSearch, 'ig');
    const eSearch = new RegExp(emailSearch, 'ig');
    const pSearch = new RegExp(phoneSearch, 'ig');
    if (values) {
      return values.filter(user => {
        if (user.firstname.search(fSearch) === -1) {
          return false;
        }
        if (user.othernames.search(oSearch) === -1) {
          return false;
        }
        if (user.email.search(eSearch) === -1) {
          return false;
        }
        if (user.phonenumber.search(pSearch) === -1) {
          return false;
        }
        return true;
      });
    } else {
      return values;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'DepartmentsSearchPipe', pure: false })
export class DepartmentsSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(department => {
        if (department.department_name) {
          return department.department_name.search(searchText) !== -1;
        }
      /*  else {
          return list-member.username.search(searchText) !== -1;
        } **/
      });
    }
  }
}

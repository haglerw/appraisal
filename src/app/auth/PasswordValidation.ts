import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;

    // return password !== confirmPassword ? AC.get('confirmPassword').setErrors({ mismatchedPasswords: true }) : null;
    if (password !== confirmPassword) {
      return AC.get('confirmPassword').setErrors({ mismatchedPasswords: true });
    } else {
      return AC.get('confirmPassword').setErrors(null);
    }
  }

}

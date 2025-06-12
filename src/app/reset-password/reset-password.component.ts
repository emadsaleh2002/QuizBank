import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  toastMessage = '';
  submitted = false;

  showPassword = false;
  showConfirmPassword = false;
  isDarkMode = false;

  passwordConditions = {
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    minLength: false
  };

  constructor(private fb: FormBuilder, private router: Router,private themeService: ThemeService) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, this.passwordStrength.bind(this)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.mustMatch('newPassword', 'confirmPassword')
    });
  }

  get f() { return this.resetForm.controls; }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onPasswordInput(): void {
    const value = this.resetForm.get('newPassword')?.value || '';
    this.passwordConditions = {
      hasLowerCase: /[a-z]/.test(value),
      hasUpperCase: /[A-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      minLength: value.length >= 6
    };
  }

  passwordStrength(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const isStrong = /[a-z]/.test(value) &&
                     /[A-Z]/.test(value) &&
                     /\d/.test(value) &&
                     /[!@#$%^&*(),.?":{}|<>]/.test(value) &&
                     value.length >= 6;
    return isStrong ? null : { passwordStrength: true };
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

  resetPassword() {
    this.submitted = true;

    if (this.resetForm.invalid) return;

    const { newPassword } = this.resetForm.value;
    const email = localStorage.getItem('resetEmail');

    console.log(`Password reset for ${email}: ${newPassword}`);
    this.toastMessage = 'Password changed successfully! Redirecting...';

    setTimeout(() => {
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetOTP');
      this.router.navigate(['/login']);
    }, 2000);
  }
  ngOnInit() {
    this.themeService.darkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });
  }
}

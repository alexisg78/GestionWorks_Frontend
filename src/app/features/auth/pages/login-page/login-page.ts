import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export default class LoginPage {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);

  authService = inject(AuthService);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);

      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);

      return;
    }

    const { email = '', password = '' } = this.loginForm.value;
    this.authService.login(email, password).subscribe((resp) => {
      console.log(resp);
    });
  }
}

import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
})
export default class LoginPage {
  router = inject(Router);
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
      this.handleErrorWithTimeout();
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email, password).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }
      this.hasError.set(true);
      this.handleErrorWithTimeout();
    });
  }

  handleErrorWithTimeout() {
    setTimeout(() => {
      this.hasError.set(false);
    }, 2000);
  }
}

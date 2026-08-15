import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
})
export default class RegisterPage {
  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  private alertService = inject(AlertService);

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.handleError();
      return;
    }

    const { email = '', password = '', fullName = '' } = this.registerForm.value;

    this.authService.register(email, password, fullName).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.alertService.success('¡Cuenta creada correctamente!');
        this.router.navigateByUrl('/');
        return;
      }

      this.handleError();
    });
  }

  handleError() {
    this.alertService.error('Las credenciales ingresadas no son correctas.');
  }
}

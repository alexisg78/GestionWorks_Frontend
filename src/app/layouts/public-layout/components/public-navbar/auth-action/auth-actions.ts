import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../../features/auth/services/auth.service';
import { UserDropdown } from './user-dropdown/user-dropdown';

@Component({
  selector: 'auth-actions',
  imports: [UserDropdown, RouterLink],
  templateUrl: './auth-actions.html',
})
export class AuthActions {
  authService = inject(AuthService);

  readonly user = this.authService.user;
  readonly authStatus = this.authService.authStatus;

  initials = computed(() => {
    const fullName = this.authService.user()?.fullName;

    if (!fullName) return '';

    const parts = fullName.trim().split(/\s+/);

    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  });
}

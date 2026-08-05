import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../../../features/auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mobile-menu',
  imports: [RouterLink],
  templateUrl: './mobile-menu.html',
})
export class MobileMenu {
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

  logout() {
    this.authService.logout();
  }
}

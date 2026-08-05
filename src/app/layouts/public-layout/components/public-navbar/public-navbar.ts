import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggle } from '../../../../shared/components/theme-toggle/theme-toggle';
import { AuthActions } from './auth-action/auth-actions';
import { MobileMenu } from './mobile-menu/mobile-menu';

@Component({
  selector: 'public-navbar',
  imports: [RouterLink, ThemeToggle, AuthActions, MobileMenu],
  templateUrl: './public-navbar.html',
})
export class PublicNavbar {}

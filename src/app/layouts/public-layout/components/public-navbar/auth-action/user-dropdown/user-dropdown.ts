import { Component, input, output } from '@angular/core';
import { User } from '../../../../../../features/auth/interfaces/user.interface';

@Component({
  selector: 'user-dropdown',
  imports: [],
  templateUrl: './user-dropdown.html',
})
export class UserDropdown {
  user = input.required<User>();
  initials = input.required<string>();
  logout = output<void>();
}

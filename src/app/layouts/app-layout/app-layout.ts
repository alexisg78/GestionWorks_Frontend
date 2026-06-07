import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app-layout.html',
})
export class AppLayout {}

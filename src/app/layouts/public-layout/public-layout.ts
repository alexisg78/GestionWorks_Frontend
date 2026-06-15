import { Component } from '@angular/core';
import { PublicNavbar } from './components/public-navbar/public-navbar';
import { Footer } from '../../shared/components/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'public-layout',
  imports: [PublicNavbar, Footer, RouterOutlet],
  templateUrl: './public-layout.html',
})
export class PublicLayout {}

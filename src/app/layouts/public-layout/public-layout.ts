import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'public-layout',
  imports: [Navbar, Footer, RouterOutlet],
  templateUrl: './public-layout.html',
})
export class PublicLayout {}

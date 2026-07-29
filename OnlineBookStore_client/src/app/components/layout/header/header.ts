import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  router = inject(Router);
  //userId: string = '';
  userId = localStorage.getItem('onlineBookStoreUsr');
  onLogout() {
    localStorage.removeItem('onlineBookStoreUsr');
    localStorage.removeItem('onlineBookStoreUsrToken');
    this.router.navigateByUrl('login');
  }
}

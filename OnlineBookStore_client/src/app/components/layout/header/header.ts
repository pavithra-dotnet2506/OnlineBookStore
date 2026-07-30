import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../../service/category';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  constructor(private categorySrvc: Category) {}
  categoryList: any[] = [];

  router = inject(Router);
  //userId: string = '';
  userId = localStorage.getItem('onlineBookStoreUsr');

  ngOnInit(): void {
    //debugger;
    this.categorySrvc.getCategories().subscribe((data) => {
      this.categoryList = data;
      //debugger;
      //console.log('Category list from service :' + this.categoryList);
      //debugger;
    });
  }

  onLogout() {
    localStorage.removeItem('onlineBookStoreUsr');
    localStorage.removeItem('onlineBookStoreUsrToken');
    this.router.navigateByUrl('login');
  }
}

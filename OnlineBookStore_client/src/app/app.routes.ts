import { Routes } from '@angular/router';
import { Book } from './components/book/book';
import { Login } from './components/login/login';
import { Layout } from './components/layout/layout/layout';
import { BookListing } from './components/book-listing/book-listing';
import { BookDetails } from './components/book-details/book-details';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'booklist',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: Layout,
    //canActivate: [authGuard], //add guard at parent level instead of child comp
    children: [
      // {
      //   path: 'admin',
      //   component: Admin,
      //   //canActivate: [authGuard],
      // },
      {
        path: 'booklist',
        component: BookListing,
        //canActivate: [authGuard],
      },
      {
        path: 'bookdetails/:id',
        component: BookDetails,
        //canActivate: [authGuard],
      },
      {
        path: 'book',
        component: Book,
        canActivate: [authGuard],
      },
    ],
  },
];

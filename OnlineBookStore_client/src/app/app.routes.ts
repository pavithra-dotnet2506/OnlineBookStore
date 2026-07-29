import { Routes } from '@angular/router';
import { Book } from './components/book/book';
import { Login } from './components/login/login';
import { Layout } from './components/layout/layout/layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
        path: 'book',
        component: Book,
        //canActivate: [authGuard],
      },
    ],
  },
];

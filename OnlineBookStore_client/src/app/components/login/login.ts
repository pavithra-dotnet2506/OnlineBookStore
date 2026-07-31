import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Footer } from '../layout/footer/footer';

@Component({
  selector: 'app-login',
  imports: [FormsModule, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj = {
    email: '',
    password: '',
  };

  apiUrl = 'https://localhost:7016/api/';
  router = inject(Router);

  constructor(private http: HttpClient) {}

  onLogin() {
    this.http.post(this.apiUrl + 'auth/login', this.loginObj).subscribe(
      //this.http.post('https://projectapi.gerasim.in/api/UserApp/login', this.apiLoginObj).subscribe(
      (res: any) => {
        debugger;
        //console.log('res.user.id -- ' + res.user.id);
        localStorage.setItem('onlineBookStoreUsr', res.user.id);
        localStorage.setItem('onlineBookStoreUsrToken', res.token);
        if (res.user.role == 'Admin') {
          this.router.navigateByUrl('book');
        } else {
          this.router.navigateByUrl('booklist');
        }
      },
      (error) => {
        //debugger;
        alert('Invalid credentials');
      },
    );
  }
}

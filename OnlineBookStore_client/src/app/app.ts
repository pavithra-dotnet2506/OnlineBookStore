import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './components/book/book';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { Herobanner } from './components/home/herobanner/herobanner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Herobanner],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('OnlineBookStore_client');
}

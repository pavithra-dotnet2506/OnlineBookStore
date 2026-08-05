import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Category } from '../../service/category';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-book-listing',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-listing.html',
  styleUrl: './book-listing.css',
})
export class BookListing {
  //apiUrl = 'https://localhost:7016/api/';
  apiUrl = environment.apiUrl;
  imageUrl = environment.imageUrl;
  bookList: any[] = [];
  categoryList: any[] = [];
  categoryMap: { [key: number]: string } = {};

  userId = localStorage.getItem('onlineBookStoreUsr');

  searchText: string = '';

  filteredBookList: any[] = [];

  bookObj: any = {
    id: 0,
    categoryId: 0,
    title: '',
    description: '',
    author: '',
    isbn: '',
    price: '',
    imageUrl: '',
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private categorySrvc: Category,
  ) {
    //this.getBooks();
  }

  ngOnInit(): void {
    console.log('Book Component Loaded');
    this.getCategory();
    this.getBooks();
  }

  getBooks() {
    console.log('getbooks - ' + this.apiUrl + '/book');
    this.http.get<any>(this.apiUrl + '/book').subscribe({
      next: (res) => {
        console.log('Response:', res);
        console.log('Data:', res.data);

        this.bookList = res.data;
        this.filteredBookList = this.bookList;
        //this.bookList = [...res.data];

        //this.cdr.detectChanges();

        this.cdr.markForCheck();

        // Difference:

        // Method	Usage
        // detectChanges()	Immediately refreshes the component
        // markForCheck()	Marks it for the next Angular check cycle

        console.log('Book List:', this.bookList);
      },
      error: (err) => console.error(err),
    });
  }
  // getCategory() {
  //   this.http.get<any>(this.apiUrl + 'category').subscribe({
  //     next: (res) => {
  //       //console.log('Response:', res);
  //       //console.log('Data:', res.data);

  //       this.categoryList = res.data;
  //       //this.bookList = [...res.data];

  //       //this.cdr.detectChanges();

  //       //this.cdr.markForCheck();

  //       // Difference:

  //       // Method	Usage
  //       // detectChanges()	Immediately refreshes the component
  //       // markForCheck()	Marks it for the next Angular check cycle

  //       //console.log('Book List:', this.bookList);
  //     },
  //     error: (err) => console.error(err),
  //   });
  // }

  getCategory() {
    this.categorySrvc.getCategories().subscribe((data) => {
      this.categoryList = data;

      data.forEach((category: any) => {
        this.categoryMap[category.id] = category.name;
      });

      //this.cdr.markForCheck();
      //debugger;
      //console.log('Category list from service :' + this.categoryList);
      //debugger;
    });
  }
  // searchBooks() {
  //   const search = this.searchText.toLowerCase().trim();

  //   if (search === '') {
  //     this.filteredBookList = this.bookList;

  //     return;
  //   }

  //   this.filteredBookList = this.bookList.filter(
  //     (book) =>
  //       book.title?.toLowerCase().includes(search) ||
  //       book.author?.toLowerCase().includes(search) ||
  //       book.categoryName?.toLowerCase().includes(search) ||
  //       book.isbn?.toLowerCase().includes(search),
  //   );
  // }

  searchBooks() {
    const search = this.searchText.toLowerCase().trim();

    if (search === '') {
      this.filteredBookList = this.bookList;

      return;
    }

    this.filteredBookList = this.bookList.filter((book) => {
      const categoryName = this.categoryMap[book.categoryId]?.toLowerCase() || '';

      return (
        book.title?.toLowerCase().includes(search) ||
        book.author?.toLowerCase().includes(search) ||
        categoryName.includes(search) ||
        book.isbn?.toLowerCase().includes(search)
      );
    });
  }
}

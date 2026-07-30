import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-listing',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-listing.html',
  styleUrl: './book-listing.css',
})
export class BookListing {
  apiUrl = 'https://localhost:7016/api/';
  bookList: any[] = [];
  categoryList: any[] = [];

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
  ) {
    //this.getBooks();
  }

  ngOnInit(): void {
    console.log('Book Component Loaded');
    //this.getCategory();
    this.getBooks();
  }

  getBooks() {
    console.log('getbooks - ' + this.apiUrl + 'book');
    this.http.get<any>(this.apiUrl + 'book').subscribe({
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

  searchBooks() {
    const search = this.searchText.toLowerCase().trim();

    if (search === '') {
      this.filteredBookList = this.bookList;

      return;
    }

    this.filteredBookList = this.bookList.filter(
      (book) =>
        book.title?.toLowerCase().includes(search) ||
        book.author?.toLowerCase().includes(search) ||
        //book.categoryName?.toLowerCase().includes(search) ||
        book.isbn?.toLowerCase().includes(search),
    );
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Category } from '../../service/category';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-book',
  standalone: true,

  imports: [CommonModule, FormsModule],
  templateUrl: './book.html',
  styleUrl: './book.css',
})
export class Book implements OnInit {
  //apiUrl = 'https://localhost:5001/api/books';

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  selectedFile!: File | null;

  //apiUrl = 'https://localhost:7016/api/';
  apiUrl = environment.apiUrl;

  bookList: any[] = [];
  categoryList: any[] = [];

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

  //selectedFile!: File;

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private categorySrvc: Category,
    private toastr: ToastrService,
  ) {
    //this.getBooks();
  }

  ngOnInit(): void {
    console.log('Book Component Loaded');
    this.getCategory();
    this.getBooks();
  }

  // getBooks() {
  //   // this.http.get<any>(this.apiUrl).subscribe((res) => {
  //   //   //console.log(res.data);
  //   //   this.bookList = res.data;
  //   // });

  //   this.http.get<any>(this.apiUrl).subscribe({
  //     next: (res) => {
  //       console.log('Success', res);

  //       this.bookList = res.data; // or res if your API returns an array
  //     },
  //     error: (err) => {
  //       console.error('API Error', err);
  //     },
  //   });
  // }

  getBooks() {
    console.log('getbooks - ' + this.apiUrl + '/book');
    this.http.get<any>(this.apiUrl + '/book').subscribe({
      next: (res) => {
        console.log('Response:', res);
        console.log('Data:', res.data);

        this.bookList = res.data;
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
  getCategory1() {
    this.http.get<any>(this.apiUrl + '/category').subscribe({
      next: (res) => {
        console.log('Response:', res);
        console.log('Data:', res.data);

        this.categoryList = res.data;
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
  getCategory() {
    this.categorySrvc.getCategories().subscribe((data) => {
      this.categoryList = data;
      this.cdr.markForCheck();
      //debugger;
      //console.log('Category list from service :' + this.categoryList);
      //debugger;
    });
  }

  saveBook() {
    //alert(this.bookObj.categoryId);

    const formData = new FormData();

    formData.append('categoryId', this.bookObj.categoryId);

    formData.append('title', this.bookObj.title);

    formData.append('description', this.bookObj.description);

    formData.append('author', this.bookObj.author);

    formData.append('isbn', this.bookObj.isbn);

    formData.append('price', this.bookObj.price);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    console.log('formData -- ' + formData);
    //this.http.post(this.apiUrl + 'book', this.bookObj).subscribe(() => {
    this.http.post(this.apiUrl + '/book', formData).subscribe(() => {
      //alert('Book Added');
      this.toastr.success('Book Added Successfully!', 'Success');
      //this.toastr.error('Failed to add book.', 'Error');

      this.resetForm();
      this.getBooks();
    });
  }

  editBook(book: any) {
    console.log('ImageUrl --' + book.imageUrl);
    this.bookObj = { ...book };
  }

  updateBook() {
    this.http.put(`${this.apiUrl + '/book'}/${this.bookObj.id}`, this.bookObj).subscribe(() => {
      //alert('Updated Successfully');
      this.toastr.success('Book Updated Successfully!', 'Success');
      this.resetForm();
      this.getBooks();
    });
  }

  deleteBook(id: number) {
    if (confirm('Delete this book?')) {
      this.http.delete(`${this.apiUrl + '/book'}/${id}`).subscribe(() => {
        //alert('Deleted');
        this.toastr.success('Book Deleted Successfully!', 'Success');

        this.getBooks();
      });
    }
  }

  resetForm() {
    this.bookObj = {
      id: 0,
      categoryId: 0,
      title: '',
      description: '',
      author: '',
      isbn: '',
      price: '',
    };
    this.selectedFile = null;

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}

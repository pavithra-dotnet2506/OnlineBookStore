import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../service/category';

@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails implements OnInit {
  bookId!: number;
  //book: any;
  book: any = {
    id: 0,
    title: '',
    author: '',
    description: '',
    price: 0,
    imageUrl: '',
  };
  categoryName: string = '';
  userId = localStorage.getItem('onlineBookStoreUsr');
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private categorySrvc: Category,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getBookById(id);
  }

  // getBook(id: number) {
  //   //console.log('URL -> https://localhost:7016/api/book/${id}');
  //   this.http.get(`https://localhost:7016/api/book/${id}`).subscribe((res: any) => {
  //     //debugger;
  //     this.book = res.data;
  //     console.log('Title -- ' + this.book.title);
  //     console.log('ImageUrl -- ' + this.book.imageUrl);
  //   });
  // }

  getBookById(id: number) {
    this.http.get(`https://localhost:7016/api/book/${id}`).subscribe({
      next: (res: any) => {
        console.log(res.data);

        this.book = res.data;
        this.categoryName = this.categorySrvc.getCategoryName(this.book.categoryId);
        this.cdr.markForCheck();
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}

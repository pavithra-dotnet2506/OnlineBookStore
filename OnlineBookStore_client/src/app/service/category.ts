import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiEndpoints } from '../core/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class Category {
  //private apiUrl = `${environment.apiUrl}/category`;

  private url = environment.apiUrl + ApiEndpoints.CATEGORY;

  private categoryCache: any[] = [];

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    if (this.categoryCache.length > 0) {
      return of(this.categoryCache);
    }

    return this.http.get<any>(this.url).pipe(
      map((res) => res.data),

      tap((data) => {
        this.categoryCache = data;
      }),
    );
  }

  clearCache() {
    this.categoryCache = [];
  }

  getCategoryName(id: number): string {
    const category = this.categoryCache.find((x) => x.id === id);

    return category ? category.name : '';
  }
}

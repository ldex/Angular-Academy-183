import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, delay, shareReplay, tap, map } from 'rxjs/operators';
import { Product } from './product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.initProducts();
  }

  insertProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  products$: Observable<Product[]>;

  initProducts() {
    let url: string = this.baseUrl + `?$orderby=ModifiedDate%20desc`;
    this.products$ =
      this
        .http
        .get<Product[]>(url)
        .pipe(
          delay(2000),
          tap(console.table),
          shareReplay()
        );
  }



}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';
import { FavouriteService } from '../favourite.service';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = 'Products';
  //products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;
  productsNb = 0;
  errorMessage;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/' + product.id);
  }

  get favourites(): number {
    return this.favouriteService.getFavouritesNb();
  }

  constructor(
    private productService: ProductService,
    private favouriteService: FavouriteService,
    private router: Router,
    private cdRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.products$ = this
      .productService
      .products$
      .pipe(
        tap(products => {
          this.productsNb = products.length;
          this.cdRef.detectChanges();
        }),
        catchError(
          error => {
            this.errorMessage = error.message;
            return EMPTY;
          }
        )
      );

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     results => this.products = results
    //   );
  }

}

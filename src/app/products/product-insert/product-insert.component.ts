import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent implements OnInit {

  insertForm: FormGroup;
  name: FormControl;
  price: FormControl;
  description: FormControl;
  imageUrl: FormControl;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  onSubmit() {
    const newProduct = this.insertForm.value;
    console.log(newProduct);
    this
      .productService
      .insertProduct(newProduct)
      .subscribe(
        product => {
          console.log('Product saved with id: ' + product.id);
          this.productService.initProducts();
          this.router.navigateByUrl('/products');
        },
        error => console.log('Could not save product: ' + error)
      )
  }

  ngOnInit() {
    let validImgUrlRegex: string = '^(https?\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,5}(?:\/\S*)?(?:[-A-Za-z0-9+&@#/%?=~_|!:,.;])+\.(?:jpg|jpeg|gif|png))$';

    this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000000)]);
    this.description = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]);
    this.imageUrl = new FormControl('', [Validators.pattern(validImgUrlRegex)]);

    this.insertForm = this.fb.group(
      {
        'name': this.name,
        'price': this.price,
        'description': this.description,
        'imageUrl': this.imageUrl,
        'discontinued': false,
        'fixedPrice': false
      }
    );
  }

}

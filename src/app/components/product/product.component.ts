import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product!: Product;
  constructor() {}

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  public onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  public onShowDetail() {
    this.showProduct.emit(this.product.id);
  }
}

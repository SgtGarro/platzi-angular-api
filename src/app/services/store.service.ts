import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private myShoppingCart: Product[];
  private myCart: BehaviorSubject<Product[]>;

  public myCart$;

  constructor() {
    this.myShoppingCart = [];
    this.myCart = new BehaviorSubject<Product[]>([]);
    this.myCart$ = this.myCart.asObservable();
  }

  public addProduct(product: Product): void {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  public getShoppingCart(): Product[] {
    return this.myShoppingCart;
  }

  public getTotal(): number {
    return this.myShoppingCart.reduce((sum, product) => sum + product.price, 0);
  }
}

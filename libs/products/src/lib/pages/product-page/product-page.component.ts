import { CartItem, CartService } from '@myapp/orders';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  endSub$: Subject<any> = new Subject();
  quantity = 1;

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.productid){
        this._getProduct(params.productid)
      }
    })
  }

  ngOnDestroy(): void {
      //this.endSub$.next();
      this.endSub$.complete();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }

    this.cartService.setCartItem(cartItem);
  }

  private _getProduct(id: string){
    this.prodService.getProduct(id).pipe(takeUntil(this.endSub$)).subscribe(product => {
      this.product = product;
    })
  }

}

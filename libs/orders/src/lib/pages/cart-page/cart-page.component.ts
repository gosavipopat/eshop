import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CartItemDetailed } from '../../models/cart';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSub$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy(): void {
      //this.endSub$.next();
      this.endSub$.complete();
  }

  private _getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endSub$)).subscribe(resCart => {
      this.cartItemsDetailed = [];
      this.cartCount = resCart?.items?.length ?? 0;
      resCart?.items.forEach(cartItem => {
        this.ordersService.getProduct(cartItem.productId)
        .subscribe(resProducts => {
          this.cartItemsDetailed.push({
            product: resProducts,
            quantity: cartItem.quantity
          })
        })
      })
    })
  }

  backToShop(){
    this.router.navigate(['/products'])
  }

  deleteCartItem(cartItem: CartItemDetailed){
    this.cartService.deleteCartItem(cartItem.product.id)
  }

  updateCartItemQuantity(event, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value
      },
      true
    );
  }

}

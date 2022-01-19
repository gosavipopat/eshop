import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component'
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import {ToastModule} from 'primeng/toast';
import { AuthGuard } from '@myapp/users';

const routes: Routes = [
  {path: 'cart', component: CartPageComponent},
  {path: 'checkout', canActivate: [AuthGuard], component: CheckoutPageComponent},
  {path: 'success', component: ThankYouComponent},
]

@NgModule({
  imports: [
    CommonModule,
    BadgeModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    ToastModule
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
})
export class OrdersModule {
  constructor(cartService: CartService){
    cartService.initCartLocalStorage();
  }
}

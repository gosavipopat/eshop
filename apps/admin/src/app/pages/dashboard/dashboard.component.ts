import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '@myapp/users';
import { ProductsService } from '@myapp/products';
import { OrdersService } from '@myapp/orders';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.ordersService.getTotalSales()
    ])
      /* .pipe(takeUntil(this.endsubs$)) */
      .pipe(takeUntil(this.endsubs$)).subscribe((values) => {
        this.statistics = values;
      });
  }

  ngOnDestroy() {
    //this.endsubs$.next();
    this.endsubs$.complete();
  }

}

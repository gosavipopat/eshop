import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@myapp/products';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products:Product[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }


  ngOnInit(): void {
   this._getProducts();
  }

  ngOnDestroy() {
    //this.endsubs$.next();
    this.endsubs$.complete();
  }

  deleteProduct(productId: string){
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
          this._getProducts();
          this.messageService.add({severity:'success', summary:'Success', detail:'Product is deleted!'});
        },
        () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not deleted!' }));
      }
    });
  }

  updateProduct(productId: string){
    this.router.navigateByUrl(`products/form/${productId}`)
  }

  _getProducts(){
    this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(prods => this.products=prods)
  }

}

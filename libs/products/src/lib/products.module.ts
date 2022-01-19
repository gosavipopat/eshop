import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersModule } from '@myapp/orders';
import { ButtonModule } from 'primeng/button';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import {CheckboxModule} from 'primeng/checkbox';
import {RatingModule} from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { UiModule } from '@myapp/ui';

const routes: Routes =[
  { path:'products', component: ProductsListComponent},
  { path:'category/:categoryid', component: ProductsListComponent},
  { path:'products/:productid', component: ProductPageComponent},
]
@NgModule({
  imports: [
    CommonModule,
    OrdersModule,
    ButtonModule,
    RouterModule.forChild(routes),
    CheckboxModule,
    FormsModule,
    UiModule,
    RatingModule,
    InputNumberModule,
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
    ProductPageComponent
  ]
})
export class ProductsModule {}

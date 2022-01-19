import { CategoriesService } from './../../services/categories.service';
import { Category } from '../../models/category';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[]  =[];
  endsub$: Subject<any> = new Subject();
  constructor(private CategoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.CategoriesService.getCategories().pipe(takeUntil(this.endsub$)).subscribe(categories => {
      this.categories = categories;
    })
  }
  ngOnDestroy(): void {
      //this.endsub$.next();
      this.endsub$.complete();
  }

}

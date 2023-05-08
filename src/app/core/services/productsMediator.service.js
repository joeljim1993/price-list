import { BehaviorSubject, tap, of } from 'rxjs';

import { kanaService } from './kana.service';

class ProductsMediator {

  constructor() {

    this.kanaSrv = kanaService;
    
    this.listProduct = [];
    this.paginationProducts$ = new BehaviorSubject(this.listProduct);

    this.kanaSrv.listProduct.pipe(
        tap(response => this.listProduct = response),
        tap(() => this.pagination(18)),
        tap(() => console.log('Traer lo de kana', this.listProduct))
      )
      .subscribe();

  }

  pagination(limit){
    const productsPaginated = this.listProduct.slice(0,limit)
    this.paginationProducts$.next(productsPaginated);
  }

  filterForName(productName) {
    const products = this.listProduct.filter(product => product.name.toLowerCase().includes(productName.toLowerCase()));
    return products;
  }

}

export const productsMediator = new ProductsMediator();

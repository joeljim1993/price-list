import { BehaviorSubject, map, of, Subject, take, tap } from "rxjs";
import { service } from "./service"
import {kanaService} from './kana.service'
class ShoppingListSandboxService {

  listProductSandBox = [];

  paginationProducts$ = new BehaviorSubject(this.listProductSandBox);

  paginataon(limit){
    const productsPaginated = this.listProductSandBox.slice(0,limit)
    this.paginationProducts$.next(productsPaginated);
  }

// los subject son observables pero permiten emitir valores - Roberto Matute
// con el asObservable el solo lo transforma en observable - Roberto Matute
  _filtered$ = new Subject();
  filtered$ = this._filtered$.asObservable();
  _query$ = new Subject();
  query$ = this._query$.asObservable();
  kanaList = null;


  getListProduct$() {
    if(this.kanaList){
      return of(this.kanaList)
    }
    return kanaService.getListProductFromKana$()
      .pipe(
        tap((response)=> this.listProductSandBox = response),
        tap(()=> console.log("ESTA ES LA VARIABLE",this.listProductSandBox)),
        tap(()=> this.paginataon(18)),
        take(1),
      )
  }

  filter(productName) {
    const products = this.listProductSandBox.filter(product => product.name.toLowerCase().includes(productName.toLowerCase()));
    this.paginationProducts$.next(products)
  }


  changeList$(query ){
    return this.getListProduct$().pipe(
      map(original=> 
          this.filterList(query, original)
      ),
      tap(filtered => {
        this._query$.next(query);
        this._filtered$.next(filtered);
      })
    )

  }

  filterList(query, list){
    const products = list.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    return products;
  }

  


  productCountChange$(shoppingId, productId, quantity, priceProduct, productImage, productName){
    return service.productCountChange$(shoppingId, productId, quantity, priceProduct, productImage, productName);
  }

  filterSearch$(){
    return service.filteredSearch$;
  }

 


  //TRAER LOS PRODUCTOS AGREGADOS PARA MOSTRARLOS EN SHOPPING CART
  getProductsAddedToShoppingList$(){
    return service.getProductsAddedToShoppingList$();
  }

}

export const ShoppingListService = new ShoppingListSandboxService();

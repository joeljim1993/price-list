import { map, of, Subject, take, tap } from "rxjs";
import { service } from "./service"
import {kanaService} from './kana.service'
class ShoppingListSandboxService {

// los subject son observables pero permiten emitir valores - Roberto Matute
// con el asObservable el solo lo transforma en observable - Roberto Matute
  _filtered$ = new Subject();
  filtered$ = this._filtered$.asObservable();
  _query$ = new Subject();
  query$ = this._query$.asObservable();
  kanaList = null;





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

  getListProduct$() {
    if(this.kanaList){
      return of(this.kanaList)
    }
    return kanaService.getListProductFromKana$()
    .pipe(
      take(1),

    )
   
  }

  getShoppingById$(id){
      return service.getShoppingById$(id);
  }

  productCountChange$(shoppingId, productId, quantity, priceProduct, productImage, productName){
    return service.productCountChange$(shoppingId, productId, quantity, priceProduct, productImage, productName);
  }

  filterSearch$(){
    return service.filteredSearch$;
  }

  createShoppingList$(){
    return service.createShoppingList$();
  }

  //DE PRUEBA
  FilterProduct$(){
    return service.FilterProduct$();
  }

  //TRAE LA LISTA DE MERCADO EN CURSO
  getShoppingListAvailables$(){
    return service.getShoppingListAvailable$();
  }

  //LIMPIA LOS PRODUCTOS AGREGADOS EN LA LISTA DE MERCADO
  cleanShopping(){
    return service.cleanShopping();
  }

  //TRAER LOS PRODUCTOS AGREGADOS PARA MOSTRARLOS EN SHOPPING CART
  getProductsAddedToShoppingList$(){
    return service.getProductsAddedToShoppingList$();
  }

}

export const ShoppingListService = new ShoppingListSandboxService();

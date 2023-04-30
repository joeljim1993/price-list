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
    console.log("ejecutando changeList$,query: ",query);
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
    console.log("ejecutando filterList");
    console.log("esto llega en filterList, query,list",query,list);
    const products = list.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    console.log(" products en  filterList ",products);
    return products;
  }

  getListProduct$() {
    if(this.kanaList){
      console.log("kanalist", this.kanaList);
      return of(this.kanaList)
    }
    console.log("ejecutando getListProductOfKana$ ");
    return kanaService.getListProductFromKana$()
    .pipe(
      tap(info => console.log("esto es lo que llega en getListProductFromKana$ ",info)),
      take(1),

    )
   
  }

  getShoppingById$(id){
    console.log("ID DE SANBOX", id);
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

import { timer, map, of, Subject, take, tap } from "rxjs";
import { service } from "../../core/services/service"

class ShoppingListSandboxService {

// los subject son observables pero permiten emitir valores - Roberto Matute
// con el asObservable el solo lo transforma en observable - Roberto Matute
  _filtered$ = new Subject();
  filtered$ = this._filtered$.asObservable();
  _query$ = new Subject();
  query$ = this._query$.asObservable();
  kanaList = null;

  changeList$(query ){
    //1 - verificar que tenga la lista kana 
    //2 - Si no la tengo pedirla
    //3 - filtramos esa lista con el query 
    //4 - emito un valor para filtered$ y query$
    return this.getListProduct$().pipe(
      map(original=> 
          this.filterList(query,original)
      ),
      tap(filtered => {
        this._query$.next(query);
        console.log("query desde getListProduct=>",query);
        this._filtered$.next(filtered);
        // console.log("filtered desde getListProduct=>",filtered);

      })
    )

  }

  filterList(query, list){
    const products = list.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
    return products;
  }

  getListProduct$() {
    if(this.kanaList){
      console.log("kanalist", this.kanaList);
      return of(this.kanaList)
    }
    return service.getListProductOfKana$()
    .pipe(
      take(1),
    )
  }

  getShoppingById$(id){
    console.log("ID DE SANBOX", id);
      return service.getShoppingById$(id);
  }

  productCountChange$(shoppingId,productId, quantity, priceProduct,productImage,productName){
    return service.productCountChange$(shoppingId,productId, quantity, priceProduct,productImage,productName);
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

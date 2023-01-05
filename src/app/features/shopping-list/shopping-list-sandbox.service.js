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
<<<<<<< src/app/features/shopping-list/shopping-list-sandbox.service.js
=======
    // console.log("ESTAMOS LLAMANDO A CHANGELIST");
>>>>>>> src/app/features/shopping-list/shopping-list-sandbox.service.js
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
<<<<<<< src/app/features/shopping-list/shopping-list-sandbox.service.js
=======
    //AQUI IRA UN CONDICIONAL DE FILTRADO
    // console.log("ESTAMOS LLAMANDO A GETLISTPRODUCT");
>>>>>>> src/app/features/shopping-list/shopping-list-sandbox.service.js
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


}

export const ShoppingListService = new ShoppingListSandboxService();

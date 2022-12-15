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
    // console.log("ESTAMOS LLAMANDO A CHANGELIST");
    return this.getListProduct$().pipe(
      tap(info => console.log("DENTRO DEL CHANGE LIST",info)),
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
    //AQUI IRA UN CONDICIONAL DE FILTRADO
    // console.log("ESTAMOS LLAMANDO A GETLISTPRODUCT");
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

  lastSearch$(){
    return service.LastSearch$;
  }

  createShoppingList$(){
    return service.createShoppingList$();
  }

  //DE PRUEBA
  FilterProduct$(){
    return service.FilterProduct$();
  }

  sandBoxaddProductToFavorites$(shoppingId,productId, priceProduct, productName){
    return service.addProductToFavorites$(shoppingId,productId, priceProduct, productName);
  }

  //TRAE LA LISTA DE MERCADO EN CURSO
  getShoppingListAvailables$(){
    return service.getShoppingListAvailable$();
  }


}

export const ShoppingListService = new ShoppingListSandboxService();

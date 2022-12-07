import { timer, map, of } from "rxjs";
import { service } from "../../core/services/service"

class ShoppingListSandboxService {
  
  getListProduct$() {
    //AQUI IRA UN CONDICIONAL DE FILTRADO
    return service.getListProductOfKana$();
  }

  getShoppingById$(id){
    console.log("ID DE SANBOX", id);
      return service.getShoppingById$(id);
  }

  productCountChange$(shoppingId,productId, quantity, priceProduct){
    return service.productCountChange$(shoppingId,productId, quantity, priceProduct);
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

}

export const ShoppingListService = new ShoppingListSandboxService();

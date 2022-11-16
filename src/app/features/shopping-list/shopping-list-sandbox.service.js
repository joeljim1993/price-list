import { timer, map, of } from "rxjs";
import { service } from "../../core/services/service"

class ShoppingListSandboxService {
  
  getListProduct$() {
    return service.getShoppingListFromKana$();
  }

  getShoppingById$(id){
    console.log("ID DE SANBOX", id);
      return service.getShoppingById$(id);
  }

  productCountChange$(shoppingId,productId, quantity, priceProduct){
    return service.productCountChange$(shoppingId,productId, quantity, priceProduct);
  }

}

export const ShoppingListService = new ShoppingListSandboxService();

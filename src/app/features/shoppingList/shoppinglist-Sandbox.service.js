import { timer, map, of } from "rxjs";
import { service } from "../../core/services/service"

class ShoppingListSandboxService {
  //SET ESTATICO DE PRUEBA PARA RECREAR LAS CARDS
  _listProduct = [
    {
      id: 1,
      name: "GALLETA MARIA PUIG",
      images: [
        "https://palospanasfoodmarket.com/wp-content/uploads/2018/04/galletas-maria-1.jpg",
      ],
      price: 10.86
    },
    {
      id: 2,
      name: "PASTA ESPECIAL CORTA PLUMA 1 KG",
      images: [
        "https://bodegonline.net/wp-content/uploads/2021/01/IMG_20210127_103812.jpg",
      ],
      price: 11.50
    },
    {
      id: 3,
      name: "MAYONESA MAVESA 910gr",
      images: [
        "https://labatata.com.ve/1085-large_default/mayonesa-mavesa-910g.jpg",
      ],
      price: 36.00
    },
    {
      id: 4,
      name: "CAFE CORDILLERA 250G",
      images: [
        "https://labatata.com.ve/1085-large_default/mayonesa-mavesa-910g.jpg",
      ],
      price: 20.00
    },
    {
      id: 5,
      name: "MARGARINA MAVESA 500G",
      images: [
        "https://labatata.com.ve/1085-large_default/mayonesa-mavesa-910g.jpg",
      ],
      price: 19.00
    },
  ];

  getListProduct$() {
    const listProduct = this._listProduct;
    return of(listProduct)
  }

  getShoppingById$(id){
    console.log("ID DE SANBOX", id);
      return service.getShoppingById$(id);
  }

  productCountChange$(shoppingId,productId, quantity){
    return service.productCountChange$(shoppingId,productId, quantity);
  }

}

export const ShoppingListService = new ShoppingListSandboxService();

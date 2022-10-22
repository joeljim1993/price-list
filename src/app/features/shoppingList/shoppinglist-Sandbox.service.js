import { timer } from "rxjs";

class ShoppingListSandboxService {
    //SET ESTATICO DE PRUEBA PARA RECREAR LAS CARDS
  _listProduct = [
    {
      id: 1,
      name: "GALLETA MARIA PUIG",
      images: [
        "https://palospanasfoodmarket.com/wp-content/uploads/2018/04/galletas-maria-1.jpg",
      ],
    },
    {
        id: 2,
        name: "PASTA ESPECIAL CORTA PLUMA 1 KG",
        images: [
          "https://bodegonline.net/wp-content/uploads/2021/01/IMG_20210127_103812.jpg",
        ],
      },
      {
        id: 3,
        name: "MAYONESA MAVESA 910gr",
        images: [
          "https://labatata.com.ve/1085-large_default/mayonesa-mavesa-910g.jpg",
        ],
      }
  ];

  getListPickup$(){
    const listProduct = this._listProduct;
    return timer(500).pipe(map(() => listProduct));
  }

}

export const ShoppingListService = ShoppingListSandboxService();
   
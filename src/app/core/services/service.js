import {
  of,
  BehaviorSubject,
  timer,
  map,
  tap,
  mergeMap,
  takeUntil,
  Subject,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { ShoppingList } from "../../shared/models/shopping-list.model";

class CoreService {
  shoppingAvailables = [];

  shoppingCartLength$ = new Subject();
  //SET ESTATICO DE PRUEBA PARA RECREAR LAS CARDS
  _listProduct = [
    {
      id: 1,
      name: "GALLETA MARIA PUIG",
      images: [
        "https://palospanasfoodmarket.com/wp-content/uploads/2018/04/galletas-maria-1.jpg",
      ],
      price: 10.86,
    },
    {
      id: 2,
      name: "PASTA ESPECIAL CORTA PLUMA 1 KG",
      images: [
        "https://bodegonline.net/wp-content/uploads/2021/01/IMG_20210127_103812.jpg",
      ],
      price: 11.5,
    },
    {
      id: 3,
      name: "MAYONESA MAVESA 910gr",
      images: [
        "https://labatata.com.ve/1085-large_default/mayonesa-mavesa-910g.jpg",
      ],
      price: 36.0,
    },
    {
      id: 4,
      name: "CAFE CORDILLERA 250G",
      images: [
        "https://labatata.com.ve/1085-large_default/mayonesa-mavesa-910g.jpg",
      ],
      price: 20.0,
    },
    {
      id: 5,
      name: "MARGARINA MAVESA 500G",
      images: [
        "https://labatata.com.ve/1085-large_default/mayonesa-mavesa-910g.jpg",
      ],
      price: 19.0,
    },
  ];
  // getData() {
  //     const data = {
  //       operationName: null,
  //       variables: {},
  //       query: `
  //       query {
  //           currentPriceList{
  //               products{
  //               edges{
  //                 node{
  //                        product{
  //                     id
  //                     name
  //                     images
  //                   }
  //                 }
  //               }
  //               }
  //             }
  //     }
  //     `,
  //     };

  //     const options = {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: new Headers({ "content-type": "application/json" }),
  //     };
  //     const url = "https://kana.develop.cecosesola.imolko.net/graphql";
  //     const data$ = fromFetch(url, options).pipe(
  //       tap((info) => console.log("data", info)),
  //       mergeMap((response) => {
  //         return response.json();
  //       }),
  //       map((info) => info.data.currentPriceList.products.edges),
  //       tap((info) => console.log("info despues del map", info)),
  //       map((info) =>
  //         info.map((item) => this._listProduct.push(item.node.product))
  //       ),
  //       tap(() => console.log("ESTA es _listProduct", this._listProduct))
  //     );
  //     data$.subscribe();
  //   }

  // este método trae el set estatico desde el servicio.
  getShoppingListFromKana$() {
    const listProducForKana = this._listProduct;
    return of(listProducForKana);
  }

  //crea la lista de mercado
  createShoppingList$(name, amount) {
    const id = this.shoppingAvailables.length;
    const shopping = new ShoppingList(id, name, amount);
    this.shoppingAvailables = this.shoppingAvailables.concat([shopping]);
    // console.log("ESTO TIENE", this.shoppingAvailables);
    return of(shopping);
  }

  //busca las listas de mercado creadas
  getShoppingListAvailable$() {
    return of(this.shoppingAvailables);
  }

  //
  getShoppingById$(id) {
    const result = this.shoppingAvailables.find(
      (shopping) => shopping.id === id
    );
    return of(result);
  }

  productCountChange$(shoppingId, productId, quantity, priceProduct) {
    const shoppingList = this.shoppingAvailables.find(
      (shopping) => shopping.id === shoppingId
    );
    const products = [...shoppingList.products];
    const target = products.find((product) => product.id === productId);
    if (target) {
      target.quantity = quantity;
      const rowTotal = this.calculateRowTotal(quantity, priceProduct);
      target.total = rowTotal;
      const total = this.calculateShoppingListTotal(products);
      shoppingList.total = total;
      if (target.quantity === 0) {
        this.removeItem(products, productId);
      }
    } else {
      const newProduct = this.createNewProduct(productId,quantity,priceProduct)
      const rowTotal = this.calculateRowTotal(quantity, priceProduct);
      shoppingList.total += rowTotal;
      newProduct.total = rowTotal;
      products.push(newProduct);
      console.log(products);
    }

    shoppingList.products = products;
    this.calculateTheQuantityOfProducts(products);

    return of(shoppingList);
  }

  createNewProduct(productId,quantity,priceProduct){
    const newProduct = {
      id: productId,
      quantity: quantity,
      price: priceProduct,
      total: 0,
    }
    return newProduct
  }

  removeItem(list, productId) {
    const target = list.find((product) => product.id === productId);
    const index = list.indexOf(target);
    list.splice(index, 1);
  }

  calculateRowTotal(quantity, price) {
    const rowTotal = quantity * price;
    // console.log("TOTAL RENGLON", rowTotal);
    return rowTotal;
  }

  calculateShoppingListTotal(productList) {
    const result = productList.reduce((counter, item) => {
      return counter + item.total;
    }, 0);
    return result;
  }

  // metodo que calcula la cantidad de productos en el carrito
  calculateTheQuantityOfProducts(list) {
    const quantityProducts = list.reduce((counter, item) => {
      return counter + item.quantity;
    }, 0);
    this.shoppingCartLength$.next(quantityProducts);
  }
}
export const service = new CoreService();

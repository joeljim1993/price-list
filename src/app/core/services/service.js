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
  //CONTIENE LAS LISTAS DE MERCADO GUARDADAS PREVIAMENTE
  shoppingAvailables = [];

  shoppingListTotal$ = new Subject();

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
      name: "PASTA CORTA CAPRI CODITO",
      images: ["https://www.pastascapri.com/img/productos/imagenes/codito.png"],
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
      name: "CAFÉ FLOR DE ARAUCA",
      images: [
        "https://compraenavi.com/web/image/product.template/4800/image/300x300?unique=3fd0aaa",
      ],
      price: 20.0,
    },
    {
      id: 5,
      name: "MARGARINA MAVESA 500G",
      images: [
        "https://cdn.shopify.com/s/files/1/0571/3788/9442/products/mantequilla-mavesa-500g-1.png?v=1660312385",
      ],
      price: 19.0,
    },
  ];

  // SIMULA LA TRAIDA DE LA LISTA DESDE KANA
  getShoppingListFromKana$() {
    const listProducForKana = this._listProduct;
    return of(listProducForKana);
  }

  //CREA UNA LISTA DE MERCADO TEMPORAL
  createShoppingList$() {
    const shopping = new ShoppingList();
    this.shoppingAvailables = this.shoppingAvailables.concat([shopping]);
    return of(shopping);
  }

  //BUSCA LAS LISTAS DE MERCADO CREADAS
  getShoppingListAvailable$() {
    return of(this.shoppingAvailables);
  }

  //FILTRA EL PRODUCTO INGRESADO DESDE LA BARRA DE BUSQUEDA
  FilterProduct$(productName){
    const list = this._listProduct;
    const foundProduct = list.filter((product) => product.name.includes(productName));
    console.log(foundProduct);
    return of(foundProduct)
  }

  //BUSCA LA LISTA DE MERCADO CREADA POR ID
  getShoppingById$(id) {
    const result = this.shoppingAvailables.find(
      (shopping) => shopping.id === id
    );
    return of(result);
  }

  //AGREGA PRODUCTOS A LA LISTA DE MERCADO CREADA
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
      const newProduct = this.createNewProduct(
        productId,
        quantity,
        priceProduct
      );
      const rowTotal = this.calculateRowTotal(quantity, priceProduct);
      shoppingList.total += rowTotal;
      newProduct.total = rowTotal;
      products.push(newProduct);
    }
    this.shoppingListTotal$.next(shoppingList.total)
    shoppingList.products = products;
    this.calculateTheQuantityOfProducts(products);
    return of(shoppingList);
  }

  //CREA UN OBJETO NUEVO SI, EL PRODUCTO NO HA SIDO CREADO
  createNewProduct(productId, quantity, priceProduct) {
    const newProduct = {
      id: productId,
      quantity: quantity,
      price: priceProduct,
      total: 0,
    };
    return newProduct;
  }

  removeItem(list, productId) {
    const target = list.find((product) => product.id === productId);
    const index = list.indexOf(target);
    list.splice(index, 1);
  }

  //CALCULA EL TOTAL DE CADA PRODUCTO POR RENGLON
  calculateRowTotal(quantity, price) {
    const rowTotal = quantity * price;
    return rowTotal;
  }

  //CALCULA EL TOTAL DE LA LISTA DE MERCADO EN CURSO
  calculateShoppingListTotal(productList) {
    const result = productList.reduce((counter, item) => {
      return counter + item.total;
    }, 0);
    return result;
  }

  //CALCULA EL TOTAL DE PRODUCTOS EN LOS CARRITOS
  calculateTheQuantityOfProducts(list) {
    const quantityProducts = list.reduce((counter, item) => {
      return counter + item.quantity;
    }, 0);
    this.shoppingCartLength$.next(quantityProducts);
  }
}
export const service = new CoreService();

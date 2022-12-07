import {
  of,
  BehaviorSubject,
  timer,
  map,
  tap,
  mergeMap,
  takeUntil,
  Subject,
  throwError,
  concatMap,
  filter,
  switchMap,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { ShoppingList } from "../../shared/models/shopping-list.model";

class CoreService {
  //CONTIENE LAS LISTAS DE MERCADO GUARDADAS PREVIAMENTE
  shoppingAvailables = [];

  shoppingListTotal$ = new Subject();
  LastSearch$ = new Subject();
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
    {
      id: 6,
      name: "ARROZ PRIMOR 1KG",
      images: [
        "https://d2j6dbq0eux0bg.cloudfront.net/images/28254021/2715085634.jpg",
      ],
      price: 13.10,
    },
    {
      id: 7,
      name: "HARINA PAN NORMAL",
      images: [
        "https://i1.wp.com/www.vimas.store/wp-content/uploads/2021/11/Harina-pan-P.jpg?fit=1200%2C1200&ssl=1",
      ],
      price: 14.45,
    },
    {
      id: 8,
      name: "JABON EN POLVO LAS LLAVES",
      images: [
        "https://labatata.com.ve/2901-large_default/jabon-las-llaves-polvo-400k.jpg",
      ],
      price: 16.20,
    },
    {
      id: 9,
      name: "GALLETA TIP-TOP MANI",
      images: ["https://gsi-food.com/wp-content/uploads/2017/01/gsi-tip-top-vainilla.jpg"],
      price: 8.50,
    },
    {
      id: 10,
      name: "GALLETA CLUB SOCIAL",
      images: ["https://lh3.googleusercontent.com/3S-IQKdJvPtnTXPL0crHXH_pcpjm7H5hdubpN2skm2gGF1yt83bpCDKmpfmPcrQ4zawBpqo-gbSmjaKt9O2gCvPIBb4xgpOxdsqoYuVnqQrcrMU"],
      price: 16.50,
    },
    {
      id: 11,
      name: "HARINA DOÑA EMILIA",
      images: ["https://inverloan.com/wp-content/uploads/2022/01/7592591000154-Harina-de-Maiz-Blanco-Dona-Emilia-1Kg.jpg"],
      price: 12.50,
    },
    {
      id: 12,
      name: "PASTA ESPECIAL LARGA",
      images: ["https://inversiones-valeria.quosmarket.com/wp-content/uploads/2021/08/10167.jpg"],
      price: 13.50,
    },
    {
      id: 13,
      name: "VINAGRE TIQUIRE",
      images: ["https://sambil.sigo.com.ve/images/thumbs/0004259_vinagre-tiquire-flores-1000-cc_450.jpeg"],
      price: 9.80,
    },
    {
      id: 14,
      name: "MEGA ARO",
      images: ["https://tucentralonline.com/Bello-Campo-43/wp-content/uploads/sites/19/2021/12/100743899.jpg"],
      price: 19.50,
    },
    {
      id: 15,
      name: "FORORO VALLE HONDO",
      images: ["https://cerevenca.com/wp-content/uploads/2020/07/empaque-1024x1024.png"],
      price: 6.50,
    },
    {
      id: 16,
      name: "HUEVOS 1/2 CARTON",
      images: ["https://superfreshmarket.com.ve/wp-content/uploads/2021/02/medio-carton-Fresh.jpg"],
      price: 25.30,
    },
    {
      id: 17,
      name: "CARAOTAS PESADAS 1/2",
      images: ["https://labatata.com.ve/983-large_default/caraotas-arauquita-1k.jpg"],
      price: 8.90,
    },
  ];

  // SIMULA LA TRAIDA DE LA LISTA DESDE KANA
  getListProductOfKana$() {
    const listProducOfKana = this._listProduct;
    return of(listProducOfKana);
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
  FilterProduct$(productName) {
    const result$ = this.getListProductOfKana$().pipe(
        map(products => products.filter(product => product.name.includes(productName))),
    );
     result$.subscribe((response) => {
      if(response.length != 0){
        this.LastSearch$.next(response)
      }else{
        this.LastSearch$.next(this._listProduct)
      }
     });
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
    this.shoppingListTotal$.next(shoppingList.total);
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

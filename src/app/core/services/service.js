import {
  of,
  BehaviorSubject,
  map,
  tap,
  takeUntil,
  Subject,
} from "rxjs";
import { ShoppingList } from "../../features/shopping-cart/models/shopping-list.model";

class CoreService {
  //CONTIENE LAS LISTAS DE MERCADO GUARDADAS PREVIAMENTE
  shoppingAvailables = [];
  //CONTIENE LA LISTA DE PRODUCTOS FAVORITOS
  shoppingListTotal$ = new Subject();
  filteredSearch$ = new Subject();
  shoppingCartLength$ = new Subject();

  // esta funcion debera traer la lista(shopping) actual, param : idList
  getProductsAddedToShoppingList$(){
    let shoppingList = this.shoppingAvailables;
    let shopping = shoppingList.find(item => item.id=="01");
    let products = [... shopping.products];
    return of(products)

  }
  // trae el shopping actual param: idshopping
  getShoppingAvailables(){
    let shoppingAvailables = this.shoppingAvailables;
    let shopping = shoppingAvailables.find(item => item.id=="01");
    return shopping;
  }
  // funcion que limpia el carrito 
  cleanShopping(){
    let shoppingAvailables = this.shoppingAvailables;
    let shopping = shoppingAvailables.find(item => item.id=="01");
    let products = shopping.products;
    products.length = shopping.total =  0;
    console.log("carrito despues de vaciado",products);
    
  }

  // SIMULA LA TRAIDA DE LA LISTA DESDE KANA
  getListProductOfKana$() {
    console.log("trayendo kana desde el servicio");
    const listProducOfKana = this._listProduct;
    return of(listProducOfKana);
  }

  //CREA UNA LISTA DE MERCADO TEMPORAL
  createShoppingList$() {
    // esto va a ser introducido por el usuario o se genera automaticamente. 
    let id= "01";
    let name= "pepito"; 
    let limit ="2000";
    const shopping = new ShoppingList(id,name,limit);
    console.log("shopping=>",shopping);
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
        tap(response => this.filteredSearch$.next(response)),
    );
    result$.subscribe();
  }

  //BUSCA LA LISTA DE MERCADO CREADA POR ID
  getShoppingById$(id) {
    const result = this.shoppingAvailables.find(
      (shopping) => shopping.id === id
    );
    return of(result);
  }

  //AGREGA PRODUCTOS A LA LISTA DE MERCADO CREADA
  productCountChange$(shoppingId, productId, quantity, priceProduct,productImage,productName) {
    //TODO: FALTA PULIR ESTE METODO
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
        priceProduct,
        productImage,
        productName
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
  createNewProduct(productId, quantity, priceProduct,productImage,productName) {
    const newProduct = {
      id: productId,
      name:productName,
      img:productImage,
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

  // funcion sobre set estatico
  getProduct(id) {
    const product = this._listProduct.filter(product => product.id == id);
    return product[0];
}
}
export const service = new CoreService();

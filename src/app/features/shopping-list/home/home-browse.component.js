import { html, css, LitElement } from "lit";
import { switchMap, tap } from "rxjs";

import { ShoppingListService } from "../shopping-list-sandbox.service";
import { favoriteService } from '../../../core/services/favorite.service';

export class HomeBrowse extends LitElement {
  static properties = {
    listproduct: { type: Array },
  };

  constructor() {
    super();
    this.sandboxShoppingList = ShoppingListService;
    this.favoriteSrv = favoriteService;
    this.listproduct = [];
    this.listShopping = null;
    this.lastSearch = [];
  }
   //un solo componente que se llama lista de la linea 25 a la 35
  render() {
    return html`
      <slot></slot>
      <navbar-component></navbar-component>
      <searchbox-component></searchbox-component>
            ${this.listproduct.map((element) => {
              return html`
                <card-component
                  .counter=${this.getCounter(element)}
                  @counterChangeFromButton=${this.productCounterChange}
                  .listProductDetail="${element}"
                  @productFavorite="${this.addProductToFavorites}"
                >
                </card-component>
              `;
            })}
      <shopping-list-info-component></shopping-list-info-component>
    `;
  }
  firstUpdated() {
    //METODO QUE ME CREA LA LISTA DE MERCADO AL ENTRAR A LA APLICACION
    const createShopping$ = this.sandboxShoppingList.createShoppingList$().pipe(
      tap((shopping) => (this.listShopping = shopping)),
      tap(() => this.requestUpdate()),
    );
    createShopping$.subscribe();

    //OBTIENE INICIALMENTE TODOS LOS PRODUCTOS
    const result$ = this.sandboxShoppingList.filtered$.pipe(
      tap((info) => (this.listproduct = info)),
      tap(() => this.requestUpdate())
    );
    result$.subscribe();
    this.sandboxShoppingList.changeList$("").subscribe();
    //FILTRA EL O LOS PRODUCTOS TRAIDOS DESDE EL SERVICIO
    const foundProduct$ = this.sandboxShoppingList.filterSearch$().pipe(
      tap((info) => (this.lastSearch = info)),
      // tap((info) => console.log("ESTO ESTOY RECIBIENDO", info)),
      tap(() => this.requestUpdate())
    );
    foundProduct$.subscribe();
  }

<<<<<<< src/app/features/shopping-list/home/home-browse.component.js
//METODO PARA AGREGAR A FAVORITOS 
  addProductToFavorites(event) {
    const product = event.detail.product;
    this.favoriteSrv.newFavorite$.next(product);
=======

  addProductToFavorites(e){
    // console.log("EVENTO RECIBIDO EN EL ABUELO", e.detail);
    const productId = e.detail.productId;
    const priceProduct = e.detail.priceProduct;
    const productName = e.detail.productName;
    const shoppingId = this.listShopping.id;
    const addProduct$ = this.sandboxShoppingList.sandBoxaddProductToFavorites$(shoppingId, productId, priceProduct, productName)
          .pipe(
              // tap(info => console.log("RETORNA EL PRODUCTO FAVORITO",info)),
              tap(() => this.requestUpdate()),
          )
          addProduct$.subscribe();
>>>>>>> src/app/features/shopping-list/home/home-browse.component.js
  }


  // const location = this.location.params;
  // const shoppingId = parseInt(location.shoppingId);
  // const shopping$ = this.sandboxShoppingList
  //   .getShoppingById$(shoppingId)
  //   .pipe(
  //     tap((info) => (this.listShopping = info)),
  //     tap(() => this.requestUpdate()),
  //     tap((info) => console.log("NOS TRAEMOS EL SHOPPING", info))
  //   );
  // shopping$.subscribe();

  productCounterChange(e) {
    const quantity = e.detail.counterChange;
    const priceProduct = e.detail.price;
    const productId = e.detail.productId;
    const shoppingId = this.listShopping.id;
    const productName=e.detail.productName;
    const productImage=e.detail.productImage;
    console.log("img",productImage);

    const result$ = this.sandboxShoppingList
      .productCountChange$(shoppingId, productId, quantity, priceProduct,productImage,productName)
      .pipe(
        tap((shopping) => (this.listShopping = shopping)),
        tap(() => this.requestUpdate()),
        tap((shopping) => console.log("LLAMAMOS AL NUEVO SHOPPING", shopping))
      );
    result$.subscribe();
  }

  getCounter(element) {
    const id = element.id;
    const products = this.listShopping ? this.listShopping.products : [];
    const product = products.find((item) => item.id == id);
    if (product) {
      return product.quantity;
    }
    return 0;
  }
}
customElements.define("home-browse", HomeBrowse);

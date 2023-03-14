import { html, css, LitElement } from "lit";
import { switchMap, tap } from "rxjs";

import { ShoppingListService } from "../../services/shopping-list.service";
import { favoriteService } from "./../../services/favorite.service";

import { shoppingCartService } from '/src/app/features/shopping-cart/services/shopping-cart.service';
import "./home-browse.style.css";

export class HomeBrowse extends LitElement {

  static properties = {
    listproduct: { type: Array },
  };

  constructor() {
    super();
    this.sandboxShoppingList = ShoppingListService;
    this.favoriteSrv = favoriteService;
    this.shoppingCartSrv = shoppingCartService;
    this.listproduct = [];
    this.listShopping = null;
    this.lastSearch = [];
  }

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
      <div class="container-cards">
        ${this.listproduct.map((element) => {
          return html`
            <product-card
              .counter=${this.getCounter(element)}
              @quantityChange=${this.productToShoppingCart}
              .product=${element}
              @productFavorite=${this.addProductToFavorites}
            >
            </product-card>
          `;
        })}
      </div>
      <shopping-list-info-component></shopping-list-info-component>
    `;
  }
  firstUpdated() {
    //METODO QUE ME CREA LA LISTA DE MERCADO AL ENTRAR A LA APLICACION
    const createShopping$ = this.sandboxShoppingList.createShoppingList$().pipe(
      tap((shopping) => (this.listShopping = shopping)),
      tap(() => this.requestUpdate())
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
      tap(() => this.requestUpdate())
    );
    foundProduct$.subscribe();
  }

  //METODO PARA AGREGAR A FAVORITOS
  addProductToFavorites(event) {
    const product = event.detail.product;
    this.favoriteSrv.newFavorite$.next(product);
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

  productToShoppingCart(event) {
    const product = event.detail.product;
    this.shoppingCartSrv.process(product);
    
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

  createRenderRoot() {
    return this;
  }
}
customElements.define("home-browse", HomeBrowse);

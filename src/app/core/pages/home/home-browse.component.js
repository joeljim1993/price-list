import { html, css, LitElement } from "lit";
import { switchMap, tap } from "rxjs";

import { ShoppingListService } from "../../services/shopping-list.service";
import { favoriteService } from "./../../services/favorite.service";
import { kanaService } from "../../services/kana.service";
import { shoppingCartService } from '/src/app/features/shopping-cart/services/shopping-cart.service';
import "./home-browse.style.css";

export class HomeBrowse extends LitElement {

  static properties = {
    listproduct: { type: Array },
  };

  constructor() {
    super();
    
    this.sandboxShoppingList = ShoppingListService;
    this.kanaSrv = kanaService;
    this.favoriteSrv = favoriteService;
    this.shoppingCartSrv = shoppingCartService;
    this.prueba = [];
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
    `;
  }
  firstUpdated() {
    // const kanaSrv$ = this.kanaSrv.lisProduct
    //   .pipe(
    //     tap(response =>  this.listproduct = response),
    //     tap(response => console.log("response",response))
    //   )
    // kanaSrv$.subscribe();

    const response$ = this.sandboxShoppingList.changeList$(" ").pipe(
      tap(info => console.log("esto llega",info)),
      
    )
    response$.subscribe();

    const filtered$ = this.sandboxShoppingList.filtered$.pipe(
      tap(info => console.log("esto llega en filtered",info)),
      tap(response =>  this.listproduct = response),
      tap(()=>this.requestUpdate()),
      
    )
    filtered$.subscribe();
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

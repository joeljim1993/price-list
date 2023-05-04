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
    this.listProductHomeBrowse = [];
    this.listShopping = null;
    this.lastSearch = [];
  }

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
      <div class="container-cards">
        ${this.listProductHomeBrowse.map((product) => {
          return html`
            <product-card
              counter=${this.getQuantity(product)}
              @quantityChange=${this.productToShoppingCart}
              .product=${product}
              @productFavorite=${this.addProductToFavorites}
            >
            </product-card>
          `;
        })}
      </div>
      <footer-component></footer-component>
    `;
  }
  firstUpdated() {
    const response$ = this.sandboxShoppingList.changeList$(" ").pipe(
      
    )
    response$.subscribe();

    const getProducts$ = this.sandboxShoppingList.paginationProducts$ //.filtered$.pipe(
      .pipe(
        tap(response =>  this.listProductHomeBrowse = response),
        tap(()=>this.requestUpdate()),
      )
      
    getProducts$.subscribe();


  }

  //METODO PARA AGREGAR A FAVORITOS
  addProductToFavorites(event) {
    const product = event.detail.product;
    this.favoriteSrv.newFavorite$.next(product);
  }

  productToShoppingCart(event) {
    const product = event.detail.product;
    this.shoppingCartSrv.process(product);
    
  }

  increment(){
    this.sandboxShoppingList.paginataon(this.listProductHomeBrowse.length+8);
  }

  getQuantity(product) {
    let existsProduct = this.shoppingCartSrv.verifyDoExist(product);
    return existsProduct;
  }

  createRenderRoot() {
    return this;
  }
}
customElements.define("home-browse", HomeBrowse);

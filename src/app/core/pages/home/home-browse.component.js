import { html, LitElement } from "lit";
import { tap } from "rxjs";

import { productsMediator } from "../../services/productsMediator.service";
import { favoriteService } from "./../../services/favorite.service";
import { shoppingCartService } from '/src/app/features/shopping-cart/services/shopping-cart.service';

import "./home-browse.style.css";

export class HomeBrowse extends LitElement {

  constructor() {
    super();
    this.productsMediator = productsMediator;
    this.favoriteSrv = favoriteService;
    this.shoppingCartSrv = shoppingCartService;

    this.listProduct = [];
  }

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
      <div class="container-cards">
        ${this.listProduct.map((product) => {
          product.style = this.favoriteSrv.verifyProduct(product.id)
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
      <div class="container-button">
        <button @click="${this.incrementProducts}"></button>
      </div>
      <footer-component></footer-component>
    `;
  }
  firstUpdated() {
    const getProducts$ = this.productsMediator.paginationProducts$
      .pipe(
        tap(response =>  this.listProduct = response),
        tap(() => this.requestUpdate()),
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

  incrementProducts(){
    this.productsMediator.pagination(this.listProduct.length+8);
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

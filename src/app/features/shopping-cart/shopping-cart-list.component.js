import { LitElement, html, css } from "lit";
import { tap, Subject, takeUntil } from "rxjs";
import { Router } from "@vaadin/router";

import { shoppingCartService } from '/src/app/features/shopping-cart/services/shopping-cart.service';
import './shopping-cart-list.style.css';

export class ShoppingCartList extends LitElement {
  static properties = {
    list: { type: Array },
  };

  constructor() {
    super();
    this.shoppingCartSrv = shoppingCartService;
    this.list = [];

    this.componentDestroyed$ = new Subject();
  }

  firstUpdated() {
    this.shoppingCartSrv.list
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(products => this.list = products),
        tap(list => console.log('en list', list)),
        tap(() => this.requestUpdate()),
      )
      .subscribe();
  }

  render() {
    return html`
      <div class="shopping-cart-header">
        <i class="material-icons" @click=${this.goBack}>arrow_back</i>
        <span>Mi Carrito</span>
      </div>
      <div class='shopping-cart-container'>
        
        <div class='shopping-cart-detail'>
          ${this.list.length > 0
            ? this.list.map(product => {
              return html`
                <shopping-cart-detail 
                  .product=${product} 
                  @removeProduct=${this.removeProduct}
                  @quantityChange=${this.productToShoppingCart}
                >
                </shopping-cart-detail>`;
              })
            : html`<h1 class="shopping-cart-empty">No hay productos en el carrito aún.</h1>`
          }
          ${this.list.length > 0
            ? html`<a @click='${this.cleanList}'>Limpiar Lista</a>`
            : html``
          }
        </div>

        <div class='shopping-cart-summary'>
          <shopping-cart-summary></shopping-cart-summary>
          ${this.list.length > 0
            ? html`
              <div class='shopping-cart-options'>
                <a>Compartir</a>
              </div>
            `
            : html``
          }
        </div>

      </div>
    `;
  }

  removeProduct(event) {
    const product = event.detail;
    this.shoppingCartSrv.cleanProduct(product);
  }

  productToShoppingCart(event) {
    const product = event.detail.product;
    this.shoppingCartSrv.process(product);
  }

  cleanList() {
    this.shoppingCartSrv.clean();
  }

  goBack() {
    Router.go("/browse/");
  }

  createRenderRoot() {
    return this;
  }

  disconnectedCallback() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
customElements.define("shopping-cart-list", ShoppingCartList);

import { LitElement, html, css } from "lit";
import { tap, Subject, takeUntil } from "rxjs";
import { Router } from "@vaadin/router";

import { shoppingCartService } from '/src/app/features/shopping-cart/services/shopping-cart.service';
import { kanaService } from "../../../../core/services/kana.service";
import './shopping-cart-list.style.css';

export class ShoppingCartList extends LitElement {
  static properties = {
    list: { type: Array },
  };

  constructor() {
    super();
    this.shoppingCartSrv = shoppingCartService;
    this.kanaSrv = kanaService;
    this.list = [];
    this.ammount = 0;
    this.dolarValue = 1;
    this.shareUrl = "";

    this.componentDestroyed$ = new Subject();
  }

  firstUpdated() {
    this.shoppingCartSrv.list
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(products => this.list = products),
        tap(list => console.log('en list shopping cart lis', list)),
        tap(() => this.requestUpdate()),
      )
      .subscribe();

    this.shoppingCartSrv.ammount
      .pipe(
          tap(ammount => this.ammount = ammount),
          tap(() => this.requestUpdate()),
      )
      .subscribe();

    this.kanaSrv.dolarValue
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(value => this.dolarValue = this.ammount / value),
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
          <shopping-cart-summary 
            dolarValue=${this.dolarValue}
            ammount=${this.ammount}
          ></shopping-cart-summary>
          ${this.list.length > 0
            ? html`
              <div class='shopping-cart-options'>
                <a 
                  @click=${this.shareList}
                  href="https://api.whatsapp.com/send?text=www.cecomarket.com/shopping-cart/share/${this.shareUrl}"
                  data-action="share/whatsapp/share"
                  target="_blank"
                >
                  Compartir
                </a>
              </div>
            `
            : html``
          }
        </div>

      </div>
      <footer-component></footer-component>
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

  shareList() {
    const url = this.shoppingCartSrv.getShareUrl();
    this.shareUrl = url;
    this.requestUpdate();
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

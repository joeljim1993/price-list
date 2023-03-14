import { Router } from "@vaadin/router";
import { html, css, LitElement } from "lit";
import { tap } from "rxjs";

import { shoppingCartService } from '/src/app/features/shopping-cart/services/shopping-cart.service';
import './icon-shopping-cart.style.css';

export class IconShoppingCart extends LitElement {
  static properties = {};

  constructor() {
    super();
    this.counter = 0;
    this.shoppingCartSrv = shoppingCartService;
  }

  firstUpdated() {
    const result$ = this.shoppingCartSrv.counter
      .pipe(
        tap(counter => this.counter = counter),
        tap(() => this.requestUpdate()),
      );
    result$.subscribe();
  }

  render() {
    return html`
      <div class="shoppint-card-container">
        <div class="counter-car-container">
          <span class="car-counter">${this.counter}</span>
        </div>  

        <a id="btn-shopping-cart" @click=${this.goToShoppingCart}>
          <img class="img-car"  src="/src/assets/images/el_shopping-cart-sign.svg" >
        </a>   
      </div> 
    `;
  }

  goToShoppingCart() {
    Router.go('/shoppinglist/')
  }

  createRenderRoot() {
    return this;
  }
}
customElements.define("shoppingcart-component", IconShoppingCart);

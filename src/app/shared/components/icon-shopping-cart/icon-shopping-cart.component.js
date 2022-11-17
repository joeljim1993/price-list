import { Router } from "@vaadin/router";
import { html, css, LitElement } from "lit";
import {
  of,
  BehaviorSubject,
  timer,
  map,
  tap,
  mergeMap,
  takeUntil,
  Subject,
} from "rxjs";
import { service } from "../../../core/services/service";

export class IconShoppingCart extends LitElement {
  static properties = {};

  static styles = css`
    /* .shopping-cart-counter{
      width:300px;
      height:300px;
    } */
    #img-car {
      width: auto;
      height: auto;
    }
  `;

  constructor() {
    super();
    this.counter = 0;
  }

  firstUpdated() {
    const result$ = service.shoppingCartLength$.pipe(
      tap((info) => (this.counter = info)),
      tap(() => this.requestUpdate())
    );
    result$.subscribe();
  }
  render() {
    return html`
      <div class="shopping-cart-counter">
        <button id="btn-shopping-cart" @click=${this.goToShoppingCart}>
          <img id="img-car"  src="../../../assets/shoppingcart.png " >
        </button>

        <span>${this.counter}</span>
      </div>
    `;
  }
  goToShoppingCart() {
    console.log("ejecutando goToShoppingCart");
    Router.go('/shoppinglist')
  }
}
customElements.define("shoppingcart-component", IconShoppingCart);

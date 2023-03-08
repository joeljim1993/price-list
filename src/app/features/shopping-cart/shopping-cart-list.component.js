import { LitElement, html, css } from "lit";
import { switchMap, tap, map } from "rxjs";
import { ShoppingListService } from "../../core/services/shopping-list.service";
import { Router } from "@vaadin/router";

// import './shopping-cart-list.style.css';

export class ShoppingCartList extends LitElement {
  static properties = {
    list: { type: Array },
  };

  constructor() {
    super();
    this.sandboxShoppingList = ShoppingListService;
    this.list = [];
    const result$ = this.sandboxShoppingList.getProductsAddedToShoppingList$()
    .pipe(
      tap((info) => console.log("ESTO ESTA LLEGANDO",info)),
      tap((products) => (this.list = products)),
      tap(() => this.requestUpdate())
    )
    result$.subscribe();
  }

  render() {
    return html`
      <div class='shopping-card-container'>
        
        <div>
          ${this.list.map((product) => {
            return html`
              <product-shoppinglist .product=${product}></product-shoppinglist>
            `;
          })}
        </div>

        <div class='shopping-card-detail'>

        </div>

      </div>
    `;
  }

  cleanList() {
    this.sandboxShoppingList.cleanShopping.cleanShopping();
    this.requestUpdate();
  }

  goBack() {
    Router.go("/browse/");
  }

  createRenderRoot() {
    return this;
  }
}
customElements.define("shopping-cart-list", ShoppingCartList);

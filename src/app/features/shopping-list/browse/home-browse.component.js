import { html, css, LitElement } from "lit";
import { tap } from "rxjs";

import { ShoppingListService } from "../shopping-list-sandbox.service";

export class HomeBrowse extends LitElement {
  static properties = {
    listproduct: { type: Array },
  };

  constructor() {
    super();
    this.sandboxShoppingList = ShoppingListService;
    this.listproduct = [];
    this.listShopping = null;
  }

  render() {
    return html`
      ${this.listproduct.map((element) => {
        return html`
          <card-component
            .counter=${this.getCounter(element)}
            @counterChangeFromButton=${this.productCounterChange}
            .listProductDetail="${element}"
          >
          </card-component>
        `;
      })}
      <shopping-list-info-component></shopping-list-info-component>
    `;
  }
  firstUpdated() {
    const createShopping$ = this.sandboxShoppingList.createShoppingList$().pipe(
      tap(shopping => this.listShopping = shopping),
      tap(()=> this.requestUpdate()),
      tap((info)=> console.log("SHOPPING CREADO", info))
    )
      createShopping$.subscribe();
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
    const result$ = this.sandboxShoppingList.getListProduct$().pipe(
      tap((info) => (this.listproduct = info)),
      tap(() => this.requestUpdate())
    );
    result$.subscribe();
    console.log("ESTOS SON LOS DATOS", this.listproduct);
  }

  productCounterChange(e) {
    const quantity = e.detail.counterChange;
    const priceProduct = e.detail.price;
    const productId = e.detail.productId;
    const shoppingId = this.listShopping.id;
    const result$ = this.sandboxShoppingList
      .productCountChange$(shoppingId, productId, quantity, priceProduct)
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

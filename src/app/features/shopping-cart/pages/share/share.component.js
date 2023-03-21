import { LitElement, html } from "lit";
import { tap, Subject, takeUntil } from "rxjs";

import { service } from '/src/app/core/services/service';
import { shoppingCartService } from '/src/app/features/shopping-cart/services/shopping-cart.service';
import './share.styles.css';

export class ShareComponent extends LitElement {
  static properties = {
    list: { type: Array },
  };

  constructor() {
    super();
    this.shoppingCartSrv = shoppingCartService;
    this.service = service;
    this.list = [];
    this.params = [];

    this.componentDestroyed$ = new Subject();
  }

  async onBeforeEnter(location) {
    const params = location.params.list.split('-').map(element => element.split('='));
    params.forEach(([key, value]) => {
      this.params.push({
        id: key,
        quantity: Number(value),
      });
    });
  }

  firstUpdated() {
    console.log("Estos son mis parametros", this.params);
    this.params.forEach(param => {
      const product = {
        ...this.service.getProduct(param.id),
        quantity: param.quantity,
        style: false,
      }
      this.list.push(product);
    })
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="share-header">
        <i class="material-icons" @click=${this.goBack}>arrow_back</i>
        <span>Lista Compartida</span>
      </div>
      <div class="shared-container">
        <div class="shared-elements">
          ${this.list.map(product => {
            return html`
              <share-detail 
                .product=${product}
              ></share-detail>
            `
          })}
          <share-summary></share-summary>
        </div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }

  disconnectedCallback() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
customElements.define("share-component", ShareComponent);

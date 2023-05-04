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
    this.totalList = 0;
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
    let totalList = 0;

    this.params.forEach(param => {
      const product = {
        ...this.service.getProduct(param.id),
        quantity: param.quantity,
        style: false,
      }
      this.list.push(product);
      totalList += product.price * product.quantity;
    })

    this.totalList = totalList;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="share-component-container">
        <div class="share-header">
          <i class="material-icons" @click=${this.goBack}>arrow_back</i>
          <span>Lista Compartida</span>
        </div>

        <div class="separator">
          <share-summary ammount=${this.totalList}></share-summary>

          <div class="shared-container">
            <div class="shared-elements">
              ${this.list.map(product => {
                return html`
                  <share-detail 
                    .product=${product}
                  ></share-detail>
                `
              })}
            </div>
          </div>

        </div>
      </div>
      <footer-component></footer-component>
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

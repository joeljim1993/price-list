import { LitElement, html } from "lit";
import { Subject, tap, filter } from "rxjs";

import { productsMediator } from '/src/app/core/services/productsMediator.service'
import './share.styles.css';

export class ShareComponent extends LitElement {
  static properties = {
    list: { type: Array },
  };

  constructor() {
    super();
    this.productsMediator = productsMediator;
    this.list = [];
    this.totalList = 0;
    this.params = [];
    this.loader = false;

    this.componentDestroyed$ = new Subject();

    const getProducts$ = this.productsMediator.paginationProducts$
      .pipe(
        filter(response => response.length > 0),
        tap(() => this.getProductsList()),
        tap(() => this.loader = !this.loader),
        tap(() => this.requestUpdate()),
      )
    getProducts$.subscribe();

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

  getProductsList() {
    let totalList = 0;

    this.params.forEach(param => {
      const product = {
        ...this.productsMediator.getProductById(param.id),
        quantity: param.quantity,
        style: false,
      }
      this.list.push(product);
      totalList += product.price * product.quantity;
    })

    this.totalList = totalList;
  }

  render() {
    return html`
      <div class="share-component-container">
        <div class="share-header">
          <i class="material-icons" @click=${this.goBack}>arrow_back</i>
          <span>Lista Compartida</span>
        </div>

        ${
          (this.loader)
          ? html`
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

            </div>`
          : html`<loader-component></loader-component>`
        }
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

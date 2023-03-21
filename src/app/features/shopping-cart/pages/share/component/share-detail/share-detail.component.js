import { LitElement, html } from "lit";

import './share-detail.styles.css';

export class ShareDetailComponent extends LitElement {
  
  static properties = {
    product: { type: Object },
  };

  constructor() {
    super();
  }

  render() {
    return html`
        <ul class="list-product" @click=${this.checkProduct}>
            <li class="product ${this.product.style ? 'checked' : ''}">
                <span class="checkbox">
                    <i class="material-icons check-icon">done</i>
                </span>
                <span class="product-text">
                    ${this.product.name}
                    -- Cant: ${this.product.quantity}
                    &#215 Precio: ${this.product.price}
                    = ${(this.product.price * this.product.quantity).toFixed(2)} Bs.
                </span>
            </li>
        </ul>
    `;
  }

  checkProduct() {
    this.product.style = !this.product.style;
    this.requestUpdate();
  }

  createRenderRoot() {
    return this;
  }

}

customElements.define("share-detail", ShareDetailComponent);
import { LitElement, html, css } from "lit";

export class ShoppingCartDetail extends LitElement {
  static properties = {
    product: { type: Object },
  };

  static styles = css`
  .card{
    width: 360px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .image {
    width: 70%;
  }

  .delete{
    width: 28px;
    height: 28px;
    left: 327px;
    top: 1px;
  }
  `;

  constructor() {
    super();
    this.product = {};
  }
  render() {
    return html`
      <div class="card">
        <div class="card-content">
          <img  class="delete" src="/src/assets/images/bi_x.png">
          <img class="image" src=${this.product.img} width="200" height="200" />
          <p>${this.product.name}</p>
          <p>${this.product.price}</p>
          <product-card-button-component></product-card-button-component>
        </div>
      </div>
    `;
  }
}
customElements.define("shopping-cart-detail", ShoppingCartDetail);

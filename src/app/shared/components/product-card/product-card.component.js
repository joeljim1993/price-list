import { html, LitElement } from "lit";

import { shoppingCartService } from "../../../features/shopping-cart/services/shopping-cart.service";
import './product-card.style.css';

export class ProductCard extends LitElement {

  static properties = {
    product: { type: Object },
    counter: { type: Number, Reflect: true },
  };

  constructor() {
    super();
    this.counter = 0;
    this.shoppingCartSrv = shoppingCartService;
  }

  render() {
    return html`
      <div class="card-content">
        
        <div class="card-image">
          <img class="image" src="${this.product.images}" />
        </div>
          
        <div class="card-description">
          <p class="title">${this.product.name} ${this.product.presentation}</p>
          <p class="description">Bs. ${this.product.price.toFixed(2)}</p>
          <product-card-favorites-button class="favorite"
            @addProductToFavorites=${this.addProductToFavorites}>
          </product-card-favorites-button>
          
        </div>

        <product-card-button
          class="card-button"
          counter=${this.counter}
          @increment=${this.quantityChange}
          @decrement=${this.quantityChange}         
        ></product-card-button>

      </div>
    `;
  }


  addProductToFavorites(e) {
    const options = {
      detail: { product: this.product },
    };
    this.dispatchEvent(new CustomEvent("productFavorite", options,));
  }


  quantityChange(event) {
    const product = {
      ...this.product,
      quantity: event.detail.quantity,
    }

    const options = {
      detail: {
        product,
      },
    };

    this.dispatchEvent(new CustomEvent("quantityChange", options));
  }

  createRenderRoot() {
    return this;
  }

}

customElements.define('product-card', ProductCard);

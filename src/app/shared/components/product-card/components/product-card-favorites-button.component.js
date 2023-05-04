import { html, LitElement } from "lit";

import './product-card-favorites-button.component.css';
export class ProductCardFavoritesButton extends LitElement {
  static properties = {
    active: { type: Boolean },
  };

  constructor() {
    super();
    this.active = false;
  }

  render() {
    return html`
      <i 
        class='favorite-button material-icons ${this.active ? 'active' : ''}'
        @click=${this.addProductToFavorites}
      >favorite
      </i>
    `;
  }

  addProductToFavorites() {
    this.dispatchEvent(new CustomEvent("addProductToFavorites"));
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('product-card-favorites-button', ProductCardFavoritesButton);

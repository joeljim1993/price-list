import { html, css, LitElement } from "lit";

export class ProductCardFavoritesButton extends LitElement {
  static properties = {};

  static styles = css`
    img {
      width: 20px;
      height: 20px;
      left: 323px;
      top: 10px;
      text-decoration: none;
    }
  `;

  constructor() {
    super();
    this.favoriteEnable = true;
  }

  render() {
    return html`
      <a class="enable" @click=${this.addProductToFavorites} href="#">
        <img src="/src/assets/images/favorite.png"/>
      </a>
    `;
  }

  addProductToFavorites(e) {
    const evento = this.favoriteEnable;
    const options = {
      detail: evento,
    };
    this.dispatchEvent(new CustomEvent("addProductToFavorites", options));
  }
}

customElements.define(
  "product-card-favorites-button",
  ProductCardFavoritesButton
);

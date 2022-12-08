import { html, css, LitElement } from "lit";

export class ProductCardFavoritesButton extends LitElement {
  static properties = {

  };

  static styles = css`
    a {
      position: absolute;
      width: 24px;
      height: 24px;
      left: 323px;
      top: 10px;
      text-decoration: none;
    }
    
  `;

  constructor() {
    super();
    this.enable = false;
  }

  render() {
    return html`<a class="enable" @click=${this.event} href="#">❤️</a>`;
  }

  event(e) {
    const evento = "clickeando..";
    this.enable = true;
    const options = {
      detail: evento,
    };
    this.dispatchEvent(new CustomEvent("favorites", options));
  }
}

customElements.define(
  "product-card-favorites-button",
  ProductCardFavoritesButton
);

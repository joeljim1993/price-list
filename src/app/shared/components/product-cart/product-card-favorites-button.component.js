import { html, css, LitElement } from "lit";

export class ProductCardFavoritesButton extends LitElement {
  static properties = {};

  static styles = css`
    a {
      text-decoration: none;
    }
    .enableOn {
      background: lightblue;
      opacity: 0.2;
    }
  `;

  constructor() {
    super();
    this.enable = false;
  }

  render() {
    return html`<buton class="enable" @click=${this.event} type="checkbox"
      ><a href="#">❤️</a></buton
    >`;
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

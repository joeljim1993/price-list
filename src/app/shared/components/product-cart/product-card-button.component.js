import { html, css, LitElement } from "lit";

export class ProductCardButton extends LitElement {
  static properties = {
    listProductDetail: { type: Object },
    counter: { type: Number, Reflect: true },
  };

  static styles = css`
    .addButton {
      background-color: #f4a534;
      width: 80%;
      height: 41px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
    }

  `;

  constructor() {
    super();
    this.counter = 0;
  }

  render() {
    const validateCounter = this.counter === 0;
    return html`
      <div>
        ${validateCounter
          ? html`
              <button class="addButton" @click=${this.incrementButton}>
                Agregar
              </button>
            `
          : html`
              <button @click=${this.decrementButton}>-</button>
              <input id="quantity" type="number" value="${this.counter}" />
              <button @click=${this.incrementButton}>+</button>
            `}
      </div>
    `;
  }

  incrementButton() {
    const counterChangeB = this.counter + 1;
    this.counter = counterChangeB;
    const options = {
      detail: { counterChangeB },
    };
    this.dispatchEvent(new CustomEvent("counterChangeFromButton", options));
  }

  decrementButton() {
    const counterChangeB = this.counter - 1;
    this.counter = counterChangeB;
    const options = {
      detail: { counterChangeB },
    };
    this.dispatchEvent(new CustomEvent("counterChangeFromButton", options));
  }
}

customElements.define("product-card-button-component", ProductCardButton);

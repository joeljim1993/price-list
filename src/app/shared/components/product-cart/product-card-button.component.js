import { html, css, LitElement } from "lit";

export class ProductCardButton extends LitElement {
  static properties = {
    listProductDetail: { type: Object },
    counter: { type: Number, Reflect: true },
  };

  static styles = css``;

  constructor() {
    super();
    this.counter = 0;
  }

  render() {
    const validateCounter = this.counter === 0;
    return html`
      <div>
        ${validateCounter
          ? html` <button @click=${this.incrementButton}>AGREGAR</button> `
          : html`<button @click=${this.decrementButton}>-</button>
              <input
                id="quantity"
                type="number"
                value="${this.counter}"
                @input="${this.quantity}"
              />
              <button @click=${this.incrementButton}>+</button>`}
      </div>
    `;
  }

  incrementButton() {
    const counterChangeB = this.counter + 1;
    this.counter = counterChangeB;
    this.requestUpdate();
    console.log("EVENTO DESDE EL NIETO", counterChangeB);
    const options = {
      detail: { counterChangeB },
    };
    this.dispatchEvent(new CustomEvent("counterChangeFromButton", options));
  }

  decrementButton() {
    const counterChangeB = this.counter - 1;
    this.counter = counterChangeB;
    console.log("EVENTO DESDE EL NIETO", counterChangeB);
    const options = {
      detail: { counterChangeB },
    };
    this.dispatchEvent(new CustomEvent("counterChangeFromButton", options));
  }
}

customElements.define("product-card-button-component", ProductCardButton);

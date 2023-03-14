import { html, LitElement } from "lit";

import './product-card-button.style.css';

export class ProductCardButton extends LitElement {
  static properties = {
    counter: { 
      type: Number, 
      Reflect: true,
    },
  };

  constructor() {
    super();
    this.counter = 0;
  }

  render() {
    const validateCounter = this.counter === 0;
    return html`
      <div class="card-product-button-container">
        ${validateCounter
          ? html`
              <button 
                class="addButton" 
                @click=${this.increment}
              >
                Agregar
              </button>
            `
          : html`
              <div class="button-container">\
                <button @click=${this.decrement}>-</button>
                <p>${this.counter}</p>
                <button @click=${this.increment}>+</button>
              </div>
            `}
      </div>
    `;
  }

  increment() {
    this.counter++;
    const quantity = this.counter;
    const options = {
      detail: { quantity },
    };

    this.dispatchEvent(new CustomEvent('increment', options));
  }

  decrement() {
    this.counter--;
    const quantity = this.counter;
    const options = {
      detail: { quantity },
    };

    this.dispatchEvent(new CustomEvent('decrement', options));
  }

  createRenderRoot() {
    return this;
  }

}

customElements.define('product-card-button', ProductCardButton);

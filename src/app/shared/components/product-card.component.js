import { html, css, LitElement } from "lit";

export class ProductCard extends LitElement {
  static properties = {
    listProductDetail: { type: Object },
    counter: { type: Number, Reflect: true },
  };

  static styles = css`
    .card {
      background: #ffff;
      border-radius: 2px;
      display: inline-block;
      height: 280px;
      width: 360px;
      margin: 1rem;
      position: relative;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.3s cubic-bezier(0.25 0.8 0.25, 1);
    }
  `;

  constructor() {
    super();
    this.listProductDetail = {};
    this.counter = 0;
  }

  render() {
    const validateCounter = this.counter === 0;
    return html`
      <div class="card">
        <div class="card-content">
          <p>ID:${this.listProductDetail.id}</p>
          <p>${this.listProductDetail.name}</p>
          <p>${this.listProductDetail.images}</p>
          <p>Bs. ${this.listProductDetail.price}</p>
          ${validateCounter
            ? html` <button @click=${this.increment}>AGREGAR</button> `
            : html`<button @click=${this.decrement}>-</button>
                <input id="enteredAmount" type="number" value="${this.counter}">
                <button @click=${this.increment}>+</button>`}
        </div>
      </div>
    `;
  }

  get enteredAmount() {
    return this.renderRoot?.querySelector("#enteredAmount") ?? null;
  }



  increment() {
    const productId = this.listProductDetail.id;
    const price = this.listProductDetail.price;
    const counterChange = this.counter +1;
    const options = {
      detail: {counterChange, 
      productId,
      price}
    }
     this.dispatchEvent(new CustomEvent("counterIncrement", options));
  }
  
    decrement() {
      const productId = this.listProductDetail.id;
      const price = this.listProductDetail.price;
      const counterChange = this.counter -1;
      const options = {
        detail: {counterChange, 
        productId,
        price}
      }
       this.dispatchEvent(new CustomEvent("counterDecrement", options));
  }

}

customElements.define("card-component", ProductCard);

import { html, css, LitElement } from "lit";

export class QuantityProducts extends LitElement {
  static properties = {
    listProductDetail: { type: Object },
  };

  constructor() {
    super();
    
  }

  render() {
    return html`
      <div>
        <h3>Productos: 0</h3>
      </div>
    `;
  }
}
customElements.define("quantityproducts-component", QuantityProducts);

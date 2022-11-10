import { html, css, LitElement } from "lit";

export class QuantityProducts extends LitElement {
  static properties = {

  };

  constructor() {
    super();

  }

  render() {
    return html`
      <div>
        
        <h3>Productos: ${this.counter}</h3>
        <h3></h3>
      </div>
    `;
  }
 

}
customElements.define("quantityproducts-component", QuantityProducts);

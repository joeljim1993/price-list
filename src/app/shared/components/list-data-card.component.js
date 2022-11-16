import { html, css, LitElement } from "lit";
export class ListDataCardComponent extends LitElement {
  static properties = {};
  static styles = css`
    .container {
      width: 100%;
      background: #f28a61;
      height: 130px;
    }
    h3 {
      color: white;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="container">
        <h3>Lista:</h3>
        <h3>Total: 0,00</h3>
        <h3>Disponible: 0,00</h3>
      </div>
    `;
  }
}

customElements.define("listdata-component", ListDataCardComponent);

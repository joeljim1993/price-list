import { html, css, LitElement } from "lit";

export class NavbarComponent extends LitElement {
  static styles = css`
    .container {
      top: 0;
      width: 100%;
      background: #23b48b;
      height: 150px;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="container">
        <searchbox-component></searchbox-component>
        <shoppingcart-component></shoppingcart-component>

      </div>
    `;
  }
}

customElements.define("navbar-component", NavbarComponent);

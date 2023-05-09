import { Router } from "@vaadin/router";
import { html, css, LitElement } from "lit";

// Import de las hojas de estilo para este componente
import './navbar.style.css';

export class NavbarComponent extends LitElement {

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="container-navbar">
        <div class="elements-navbar">
          <searchbox-component class="searchbox"></searchbox-component>
          <navbar-menu-component class="menu"></navbar-menu-component>
          <shoppingcart-component class="shoppingcart"></shoppingcart-component>
          <select-categories></select-categories>
        </div>
      </div>
    `;
  }

  goToFavorites() {
    Router.go('/favorites/')
  }

  createRenderRoot() {
    return this;
  }

}

customElements.define("navbar-component", NavbarComponent);

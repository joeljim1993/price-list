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
          <i class="material-icons" id="menu">menu</i>
          <searchbox-component class="searchbox"></searchbox-component>
          <shoppingcart-component class="favorites"></shoppingcart-component>
        </div>
      </div>
    `;
  }

  goToFavorites(){
    Router.go('/favorites/')
  }

  createRenderRoot() {
    return this;
  }

}

customElements.define("navbar-component", NavbarComponent);

import { html, LitElement } from "lit";
import { Router } from "@vaadin/router";

import './navbar-menu.styles.css';

export class NavBarMenuComponent extends LitElement {

  constructor() {
    super();
    this.menuList = [
        { title: 'Inicio', route: 'browse' },
        { title: 'Categorias', route: 'categories' },
        { title: 'Favoritos', route: 'favorites' },
        { title: 'Carrito', route: 'shopping-cart/list' },
        { title: 'Mis Listas', route: 'noroute' },
    ]
  }

  render() {
    return html`
        <div class="navbar-menu-container">
            ${this.menuList.map(element => {
                return html`
                    <div 
                        @click=${() => Router.go(`/${element.route}/`)}
                        class="element"
                    >
                        ${element.title}
                    </div>
                `
            })}
        </div>
    `;
  }

  goToRoute() {
    Router.go('/shopping-cart/list/');
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("navbar-menu-component", NavBarMenuComponent);
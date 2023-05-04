import { html, css, LitElement } from "lit";
import { Router } from '@vaadin/router';
import { routes } from '../app.routes';

import "./app.style.css";

export class AppComponent extends LitElement {

  constructor() {
    super();
  }

  firstUpdated() {
    const outlet = this.renderRoot.querySelector("#outlet");
    const router = new Router(outlet);
    router.setRoutes(routes);
  }

  render() {
    return html`
      <div class="app-container">
        <navbar-component></navbar-component>
        <div id="outlet"></div>
        <mobile-menu></mobile-menu>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("app-root", AppComponent);
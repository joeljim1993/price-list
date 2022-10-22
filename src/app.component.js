import { html, css, LitElement } from "lit";
import {Router} from '@vaadin/router';
import { routes } from '../routes.js'

export class AppComponent extends LitElement {

  constructor() {
    super();
  }
  static styles = css`
   
  `;

  firstUpdated() {
    const outlet = this.renderRoot.querySelector("#outlet");
    const router = new Router(outlet);
    router.setRoutes(routes);
  }

  render() {
    return html`
     <div id="outlet"></div>
    `;
  }
}


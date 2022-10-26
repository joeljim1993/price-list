import { html, css, LitElement } from "lit";
import {Router} from '@vaadin/router';


export class NavbarComponent extends LitElement {

    static styles = css `
    
    .container {
        background: #6F1BF2
    }
    
    `;

  constructor() {
    super();
  }
  

  render() {
    return html`
    
    <div class="container">
    <searchbox-component></searchbox-component>
         <h1>AQUI ESTARA EL NAVBAR</h1>
    </div>
    `;
  }
}

customElements.define("navbar-component", NavbarComponent);
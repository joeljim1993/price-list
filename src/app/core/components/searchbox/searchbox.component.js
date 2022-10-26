import { html, css, LitElement } from "lit";
import {Router} from '@vaadin/router';


export class SearchboxComponent extends LitElement {

    static styles = css `
    
    
    `;

  constructor() {
    super();
  }
  

  render() {
    return html`
    <div class="container">
        <input id="searchBox">
    </div>
    `;
  }
}

customElements.define("searchbox-component", SearchboxComponent);
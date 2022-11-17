import { html, css, LitElement } from "lit";
import { Router } from "@vaadin/router";

export class SearchBoxComponent extends LitElement {
  static styles = css`
    /* .box-container {
      
    } */
    .search-button{
      width:300px;
      height:25px;
      border-radius:5px;
      background: #FAF9F9;

    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="box-container">
        <input
          type="text"
          placeholder="Buscar Producto"
          class="search-button"
        />
      </div>
    `;
  }
}

customElements.define("searchbox-component", SearchBoxComponent);

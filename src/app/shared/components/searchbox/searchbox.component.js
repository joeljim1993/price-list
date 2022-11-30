import { html, css, LitElement } from "lit";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { map } from "rxjs/internal/operators/map";
import { tap } from "rxjs/internal/operators/tap";
import { filter } from "rxjs/internal/operators/filter";

import { switchMap } from "rxjs/internal/operators/switchMap";
import { service } from "../../../core/services/service";
export class SearchBoxComponent extends LitElement {
  static styles = css`
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

import { html, css, LitElement } from "lit";
import { Router } from "@vaadin/router";
import {
  fromEventPattern,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
  of,
  Subject,
  fromEvent,
  take,
  last,
} from "rxjs";

export class SearchBoxComponent extends LitElement {

  click$ = fromEvent(document, "keyup");

  static styles = css`
    .search-button {
      width: 300px;
      height: 25px;
      border-radius: 5px;
      background: #faf9f9;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="input">
        <input placeholder="introduce el producto " class="search-button" />
      </div>
    `;
  }

  firstUpdated() {
    let query = "";
    const result = this.click$.pipe(
      map((info) => info.key),
      distinctUntilChanged(),
      filter(
        (pressedKey) => pressedKey.match(/[a-z]/i) && pressedKey.length == 1
      ),
      tap((data) => (query = query + data)),
      tap(() => console.log("query desde la consola ", query)),
      tap(() => this.filterData(query)),
      debounceTime(2000),
      tap(() => (query = ""))
    );
    result.subscribe();
  }
 // funcion que debe ser creada en el servicio 
  filterData(data) {
    console.log("estos son los datos introducidos en el filter ", data);
  }
}

customElements.define("searchbox-component", SearchBoxComponent);

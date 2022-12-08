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
  catchError,
  switchMap,
} from "rxjs";
import { service } from "../../../core/services/service";

import { ShoppingListService } from "../../../features/shopping-list/shopping-list-sandbox.service";

export class SearchBoxComponent extends LitElement {
  input$ = fromEvent(document, "keyup");

  get input() {
    // es el equivalente a usar document pero en buenas practicas me encapsula el codigo
    return this.renderRoot?.querySelector(".search-button") ?? null;
  }

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
    this.sandboxShoppingList = ShoppingListService;
  }

  render() {
    return html`
      <div class="input">
        <input placeholder="Busca tú producto" class="search-button" />
      </div>
    `;
  }

  firstUpdated() {
    const result$ = this.input$.pipe(
      debounceTime(300),
      map(() => this.input.value),
      tap((query) => console.log("query desde la consola ", query)),
      switchMap((query) => this.sandboxShoppingList.changeList$(query))
    );
    result$.subscribe();
  }
}

customElements.define("searchbox-component", SearchBoxComponent);

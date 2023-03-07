import { html, css, LitElement } from "lit";
import {
  debounceTime,
  map,
  fromEvent,
  switchMap,
} from "rxjs";

import { ShoppingListService } from "../../../features/shopping-list/shopping-list-sandbox.service";
import './searchbox.style.css';

export class SearchBoxComponent extends LitElement {
  input$ = fromEvent(document, "keyup");

  get input() {
    // es el equivalente a usar document pero en buenas practicas me encapsula el codigo
    return this.renderRoot?.querySelector(".search") ?? null;
  }

  constructor() {
    super();
    this.sandboxShoppingList = ShoppingListService;
  }

  render() {
    return html`
      <div class="boxContainer">
        <table class="elementsContainer">
          <tr>
            <td>
              <input type="text" placeholder="Busca tu producto" class="search" />
            </td>
            <td class="icon-container">
              <i class="material-icons">search</i>
            </td>
          </tr>
        </table>
      </div>

    `;
  }

  firstUpdated() {
    const result$ = this.input$.pipe(
      debounceTime(300),
      map(() => this.input.value),
      // tap((query) => console.log("query desde la consola ", query)),
      switchMap((query) => this.sandboxShoppingList.changeList$(query))
    );
    result$.subscribe();
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("searchbox-component", SearchBoxComponent);

import { html, LitElement } from "lit";
import {
  debounceTime,
  map,
  fromEvent,
  switchMap,
} from "rxjs";

import { ShoppingListService } from "/src/app/core/services/shopping-list.service";
import './searchbox.style.css';

export class SearchBoxComponent extends LitElement {
  input$ = fromEvent(document, "keyup");

  get input() {
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
      switchMap((query) => this.sandboxShoppingList.changeList$(query))
    );
    result$.subscribe();
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("searchbox-component", SearchBoxComponent);

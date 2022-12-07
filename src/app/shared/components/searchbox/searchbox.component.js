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
} from "rxjs";
import { service } from "../../../core/services/service";

export class SearchBoxComponent extends LitElement {

  input$ = fromEvent(document, "keyup");
  
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
        <input  placeholder="Busca tú producto"  class="search-button" />
      </div>
    `;
  }

  firstUpdated() {
    let query = "";
    const result$ = this.input$.pipe(
      map((info) => info.key.toUpperCase()),
      filter(
        (pressedKey) => pressedKey.match(/[a-z]/i) && pressedKey.length == 1
      ),
      tap((data) => (query = query + data)),
      tap(() => console.log("query desde la consola ", query)),
      //ESTO DEBERIA HACERSE DESDE EL SERVICIO Y TRAERSE DIRECTAMENTE DESDE HOME
      tap(() => this.search = service.FilterProduct$(query)),
      debounceTime(3000),
      tap(() => (query = ""))
    );
    result$.subscribe();
  }


}

customElements.define("searchbox-component", SearchBoxComponent);

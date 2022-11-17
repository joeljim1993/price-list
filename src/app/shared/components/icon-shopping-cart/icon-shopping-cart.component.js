import { html, css, LitElement } from "lit";
import {
  of,
  BehaviorSubject,
  timer,
  map,
  tap,
  mergeMap,
  takeUntil,
  Subject,
} from "rxjs";
import { service } from "../../../core/services/service";

export class IconShoppingCart extends LitElement {
  static properties = {};

  constructor() {
    super();
    this.counter = 0;
  }

  firstUpdated() {
    
    const result$ = service.shoppingCartLength$.pipe(
      tap((info) => (this.counter = info)),
      tap(() => this.requestUpdate())
    );
    result$.subscribe();
  }
  render() {
    return html`
      <div>
        <h3>Productos: ${this.counter}</h3>
        <h3></h3>
      </div>
    `;
  }
}
customElements.define("shoppingcart-component", IconShoppingCart);

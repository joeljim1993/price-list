import { html, css, LitElement } from "lit";
import { service } from "../../../core/services/service";
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
export class ShoppingListInfoComponent extends LitElement {
  static properties = {};

  static styles = css`
    .container {
      top: 100px;
      position: relative;
      float: left;
      width: 100%;
      background: #f28a61;
      height: 89px;
    }
    label {
      color: white;
    }
  `;

  constructor() {
    super();
    this.list = 0;
    this.total = 0;
  }

  firstUpdated() {
    const result$ = service.shoppingCartLength$.pipe(
      tap((info) => (this.list = info)),
      tap(() => this.requestUpdate())
    );
    result$.subscribe();

    const total$ = service.shoppingListTotal$.pipe(
      tap((info) => (this.total = info)),
      tap(() => this.requestUpdate())
    );
    total$.subscribe();
  }

  render() {
    const validate = this.list == 0;
    return html`
      ${validate
        ? html`<div class="container">
            <label>MERCADO VACIO<img id="first" src="/src/assets/images/question.png" /></label>
          </div>`
        : html`<div class="container">
            <label>Mi mercado<img src="/src/assets/images/edit-icon.png" /></label>
            <label>Total: ${this.total.toFixed(2)}</label>
            <label>Sin Tope</label>
          </div>`}
    `;
  }
}

customElements.define(
  "shopping-list-info-component",
  ShoppingListInfoComponent
);

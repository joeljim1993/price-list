import { LitElement, html } from "lit";
import { tap, Subject, takeUntil } from "rxjs";
import { Router } from "@vaadin/router";

import { shoppingCartService } from '/src/app/features/shopping-cart/services/shopping-cart.service';
import './share.styles.css';

export class ShareComponent extends LitElement {
  static properties = {
    list: { type: Array },
  };

  constructor() {
    super();
    this.shoppingCartSrv = shoppingCartService;
    this.list = [];

    this.componentDestroyed$ = new Subject();
  }

  firstUpdated() {
    this.shoppingCartSrv.list
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(products => this.list = products),
        tap(list => console.log('en list', list)),
        tap(() => this.requestUpdate()),
      )
      .subscribe();
  }

  render() {
    return html`

    `;
  }

  createRenderRoot() {
    return this;
  }

  disconnectedCallback() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
customElements.define("share-component", ShareComponent);

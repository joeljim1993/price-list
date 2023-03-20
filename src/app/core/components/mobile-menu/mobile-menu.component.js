import { Router } from "@vaadin/router";
import { html, LitElement } from "lit";
import { tap } from "rxjs";

import { shoppingCartService } from '/src/app/features/shopping-cart/services/shopping-cart.service';
// Import de las hojas de estilo para este componente
import './mobile-menu.styles.css';

export class MobileMenu extends LitElement {

    constructor() {
        super();
        this.counter = 0;
        this.shoppingCartSrv = shoppingCartService;
    }

    firstUpdated() {
        const result$ = this.shoppingCartSrv.counter
          .pipe(
            tap(counter => this.counter = counter),
            tap(() => this.requestUpdate()),
          );
        result$.subscribe();
    }

    render() {
        return html`
            <div class="mobile-menu-container">
                <i class="material-icons" @click=${this.goToHome}>home</i>

                <i class="material-icons" @click=${this.goToFavorites}>favorite</i>

                <mobile-menu-shopping counter=${this.counter} @goToShopping=${this.goToShoppingCart}></mobile-menu-shopping>
                
                <i class="material-icons" @click=${this.goToList}>list_alt</i>
            </div>
        `;
    }

    goToHome(){
        Router.go('/browse/');
    }

    goToFavorites(){
        Router.go('/favorites/');
    }

    goToShoppingCart(){
        Router.go('/shoppinglist/');
    }

    goToList(){
        Router.go('/list/');
    }
    
    createRenderRoot() {
        return this;
    }
}

customElements.define("mobile-menu", MobileMenu);
import { html, LitElement } from "lit";

import "./mobile-menu-shopping.styles.css";

export class MobileMenuShopping extends LitElement {

    static properties = {
        counter: { type: Number },
    };

    constructor() {
        super();
        this.counter = 0;
    }

    render() {
        return html`
            <div class="shopping-icon-container">
                <i class="material-icons" @click=${this.goToShoppingCart}>shopping_cart</i>
                <span class="cart-counter">${this.counter}</span>
            </div>
        `;
    }

    goToShoppingCart() {
        this.dispatchEvent(new CustomEvent("goToShopping"));
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define("mobile-menu-shopping", MobileMenuShopping);
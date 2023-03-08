import { LitElement, html } from 'lit';

import './shopping-cart-detail.style.css';
 
export class ShoppingCartDetail extends LitElement {

    static properties = {
        product: { type: Object },
    };

    constructor(){
        super();
    }

    render() {
        return html`
            <div class="product-shopping-container">
                <p>${this.product.name}</p>
                <p>${this.product.price}</p>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
customElements.define('shopping-cart-detail', ShoppingCartDetail);
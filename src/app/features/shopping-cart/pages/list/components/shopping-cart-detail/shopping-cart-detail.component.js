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
            <div class="shopping-cart-detail-container">
                
                <div class="shopping-cart-description">
                    <img src=${this.product.images[0]}>
                    <div>
                        <h2>${this.product.name}</h2>
                        <h1>Bs. ${this.product.price.toFixed(2)}</h1>
                        <h3>$ 0.90</h3>
                    </div>
                </div>

                <div class="shopping-cart-quantity">
                    <h1 target="decrement" @click=${this.decrement}>-</h1>
                    <h1 target="quantity">${this.product.quantity}</h1>
                    <h1 target="increment" @click=${this.increment}>+</h1>
                </div>

                <div class="icon-container">
                    <i class="material-icons shopping-cart-icon" @click=${this.removeProduct}>delete</i>
                </div>

            </div>
        `;
    }

    increment() {
        this.product.quantity++;
        this.quantityChange();
        this.requestUpdate();
    }

    decrement() {
        const quantity = this.product.quantity -= 1;
        if(quantity > 0) this.quantityChange();
        if(quantity === 0) this.removeProduct();
        this.requestUpdate();
    }

    quantityChange() {
        const options = {
            detail: {
                product: this.product,
            },
        };
    
        this.dispatchEvent(new CustomEvent("quantityChange", options));
    }

    removeProduct() {
        const options = {
            detail: {
                ...this.product,
            },
        };
      
        this.dispatchEvent(new CustomEvent("removeProduct", options));
    }

    createRenderRoot() {
        return this;
    }
}
customElements.define('shopping-cart-detail', ShoppingCartDetail);
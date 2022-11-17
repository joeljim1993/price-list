import { LitElement, html, css } from 'lit';

export class ShoppingCartList extends LitElement {
   

    render() {
        return html`
        <h3>aqui se mostrara el carrito</h3>
        `;
    }
}
customElements.define('shopping-cart-list', ShoppingCartList);

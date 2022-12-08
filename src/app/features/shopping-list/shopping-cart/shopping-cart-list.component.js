import { LitElement, html, css } from 'lit';
import { switchMap, tap } from "rxjs";
import { ShoppingListService } from '../shopping-list-sandbox.service';
export class ShoppingCartList extends LitElement {

    static properties = {
        addedProducts: { type: Array }
         };

    constructor(){
        super();
        this.sandboxShoppingList = ShoppingListService;
        this.addedProducts = [];
    }

    render() {
        return html`
        <h1>Churrada</h1>`;
    }


}
customElements.define('shopping-cart-list', ShoppingCartList);

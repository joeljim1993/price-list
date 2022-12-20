import { LitElement, html } from 'lit';
import { ShoppingListService } from '../shopping-list-sandbox.service';

export class FavoritesBrowse extends LitElement {

    static properties = {
        addedProducts: { type: Array }
         };

    constructor(){
        super();
        this.sandboxShoppingList = ShoppingListService;
    }

    render() {
        return html`
        <h1>AQUI MOSTRAREMOS LOS PRODUCTOS FAVORITOS</h1>`;
    }
}
customElements.define('favorites-browse', FavoritesBrowse);

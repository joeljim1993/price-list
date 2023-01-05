import { LitElement, html, css } from 'lit';

import { favoriteService } from '../../core/services/favorite.service';
 
export class FavoritesBrowse extends LitElement {

    static properties = {
         };

    constructor(){
        super();
        this.favoriteSrv = favoriteService;
        this.favoriteList = this.favoriteSrv.getFavorites();
    }

    refresh(event) {
        const product = event.detail.product;
        this.favoriteSrv.newFavorite$.next(product);
        this.favoriteList = this.favoriteList.filter(productFavorite => productFavorite.id !== product.id);
        this.requestUpdate();
    }

    render() {
        return html`
            <h1>AQUI MOSTRAREMOS LOS PRODUCTOS FAVORITOS</h1>
            ${this.favoriteList.map((element) => {
              return html`
                <card-component class='card'
                  @counterChangeFromButton=${this.productCounterChange}
                  .listProductDetail="${element}"
                  @productFavorite="${this.refresh}"
                >
                </card-component>
              `;
            })}
        `;
    }
}
customElements.define('favorites-browse', FavoritesBrowse);

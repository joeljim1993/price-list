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
        <div class="favorite-container">
          ${this.favoriteList.map((element) => {
            console.log(element)
            return html`
            `;
          })}
        </div>
      `;
    }
}
customElements.define('favorites-browse', FavoritesBrowse);

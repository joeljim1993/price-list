import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";

import { favoriteService } from "../../core/services/favorite.service";
import './favorites-browse.styles.css';

export class FavoritesBrowse extends LitElement {
  static properties = {};

  constructor() {
    super();
    this.favoriteSrv = favoriteService;
    this.favoriteList = this.favoriteSrv.getFavorites();
    console.log("this.favoriteList",this.favoriteList);
  }

  refresh(event) {
    const product = event.detail.product;
    this.favoriteSrv.newFavorite$.next(product);
    this.favoriteList = this.favoriteList.filter(
      (productFavorite) => productFavorite.id !== product.id
    );
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="favorite-container">
        
        <div class="options">
          <i class="material-icons" @click=${this.goBack}>arrow_back</i>
          <span>Mis Favoritos</span>
        </div>

        <div class="products">
          ${this.favoriteList.map((product) => {
            return html` <product-card .product="${product}"></product-card> `;
          })}
        </div>

      </div>
    `;
  }

  goBack(){
    Router.go("/browse/")
  }

  createRenderRoot() {
    return this;
  }

}
customElements.define("favorites-browse", FavoritesBrowse);

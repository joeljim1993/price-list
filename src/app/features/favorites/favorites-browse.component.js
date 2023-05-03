import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";

import { favoriteService } from "../../core/services/favorite.service";
import './favorites-browse.styles.css';

export class FavoritesBrowse extends LitElement {

  
  constructor() {
    super();
    this.favoriteSrv = favoriteService;
    this.favoriteList = this.favoriteSrv.getFavorites();
    console.log(" this.favoriteList", this.favoriteList);
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
            return html` <product-card 
             @productFavorite=${this.addProductToFavorites}
            .product="${product}"></product-card> `;
          })}
        </div>

      </div>
    `;
  }

 


  addProductToFavorites(event) {
    let product = event.detail.product;
    this.favoriteSrv.favoriteInteractive(product);
    let list = favoriteService.getFavorites();
    this.favoriteList = list;
    this.requestUpdate();
  }

  goBack(){
    Router.go("/browse/")
  }

  createRenderRoot() {
    return this;
  }

}
customElements.define("favorites-browse", FavoritesBrowse);

import { LitElement, html, css } from "lit";
import { switchMap, tap, map } from "rxjs";
import { ShoppingListService } from "../shopping-list-sandbox.service";
import { service } from "../../../core/services/service";
import { Router } from "@vaadin/router";
export class ShoppingCartList extends LitElement {
  static properties = {
    addedProducts: { type: Array },
  };

  // hacer una funcion que elimine el producto completo
  // resolver que se reste o se sume por el producto presionado
  //3.0 crear un boton y una funcion que vacie el carrito
  static styles = css`
    .title-cars {
      /* position: absolute; */
      width: 100%;
      height: 46px;
      left: 0px;
      top: 0px;
      background: #ea794c;
    }
    .img-cars {
      width: 96px;
      height: 112px;
      top: 49px;
      left: 145px;
      opacity: 70%;
    }
    .btn-save {
      /* position: absolute; */
      width: 153px;
      height: 65px;
      left: 13px;
      top: 299px;

      background: #eb7b7b;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
    }
    .btn-share {
      /* position: absolute; */
      width: 153px;
      height: 65px;
      left: 194px;
      top: 299px;

      background: #f4a534;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
    }
    .btn-continue-search {
      background: #1ce09a;
      border-radius: 15px;
    }
    .btn-clean-list{
        background: #EA794C;
        border-radius: 5px;
    }
    .btn-clean-list img {
      width:20px;
      height:20.5px;
    }
  `;
  
  constructor() {
    super();
    this.list = service.getProductsShoppingAvailables();
    console.log(" this.list", this.list);
    this.currentShopping = service.getShoppingAvailables();
    console.log("shoopping actual",  this.currentShopping);
  }

  render() {
    return html`
      <section>
        <button @click=${this.goBack} class="btn-continue-search">
          <img src="/src/assets/images/icons8-add-list-30.png" />
          Continuar Buscando
        </button>
      </section>
      <section>
        <button class="btn-clean-list" @click=${this.cleanList}>
        <img src="/src/assets/images/biggarbagebin_121980.png">    
        Limpiar Lista</button>
        <hr />

        <div>
          ${this.list.map((product) => {
            return html`
              <shopping-cart-detail .product=${product}></shopping-cart-detail>
            `;
          })}
        </div>

        <hr />
      </section>
      <section>
        <div class="title-cars">
          <h3>total carrito</h3>
        </div>
        <div class="container-img-cars">
          <img
            class="img-cars"
            src="/src/assets/images/compra_carrito_icon_209798.png"
          />
        </div>
        <h3>Total : ${this.currentShopping.total} </h3>
        <h3>disponible :</h3>

        <button class="btn-save">Guardar</button>
        <button class="btn-share">Compartir</button>
      </section>
    `;
  }
  cleanList(){
    service.cleanShopping();
    this.requestUpdate;
    this.list = service.getProductsShoppingAvailables();
    this.requestUpdate();
  }
  goBack() {
    Router.go("/browse/");
  }
}
customElements.define("shopping-cart-list", ShoppingCartList);

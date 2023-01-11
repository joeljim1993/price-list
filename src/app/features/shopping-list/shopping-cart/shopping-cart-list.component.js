import { LitElement, html, css } from "lit";
import { switchMap, tap, map } from "rxjs";
import { ShoppingListService } from "../shopping-list-sandbox.service";
import { Router } from "@vaadin/router";

export class ShoppingCartList extends LitElement {
  static properties = {
    list: { type: Array },
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
    .btn-clean-list {
      background: #ea794c;
      border-radius: 5px;
    }
    .btn-clean-list img {
      width: 20px;
      height: 20.5px;
    }
  `;

  constructor() {
    super();
    this.sandboxShoppingList = ShoppingListService;
    this.list = [];
    const result$ = this.sandboxShoppingList.getProductsAddedToShoppingList$()
    .pipe(
      tap((info) => console.log("ESTO ESTA LLEGANDO",info)),
      tap((products) => (this.list = products)),
      tap(() => this.requestUpdate())
    )
    result$.subscribe();
    console.log("ESTA ES LA LISTA",this.list);
  }

  render() {
    return html`
   
      <div>
          ${this.list.map((product) => {
            return html`
              <shopping-cart-detail .product=${product}></shopping-cart-detail>
            `;
          })}
      </div>

      <!-- TOTAL DEL CARRITO -->
      <section>
        <div class="title-cars">
          <h3>Total Carrito</h3>
        </div>
        <div class="container-img-cars">
          <img class="img-cars" src="/src/assets/images/el_shopping-cart-sign.svg"/>
        </div>
            <h3>Total : $</h3>
            <h3>Disponible :</h3>
            <button class="btn-save">Guardar</button>
            <button class="btn-share">Compartir</button>
      </section>
      <!--  -->
    `;
  }
  firstUpdated() {
   
    
  }

  cleanList() {
    this.sandboxShoppingList.cleanShopping.cleanShopping();
    this.requestUpdate;
  }
  goBack() {
    Router.go("/browse/");
  }
}
customElements.define("shopping-cart-list", ShoppingCartList);

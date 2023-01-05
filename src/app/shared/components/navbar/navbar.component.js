import { Router } from "@vaadin/router";
import { html, css, LitElement } from "lit";
export class NavbarComponent extends LitElement {
  static styles = css`
    .container {
      width: 100%;
      height: 137px;
      background: #5ccda7;
    }
.container .nav li{
  list-style:none;
  
}
 ul {
    display: inline-flex;
    position: absolute;
    top: 50px;
    left: 30%;
} 
 .container .nav .shopping-cart-icon{
  margin-left:100px;
 }   

  `;

  constructor() {
    super();
  }

  render() {
    return html`
    
    <div class="container">
        <ul class="nav">
          <li class="shopping-cart-icon"><shoppingcart-component></shoppingcart-component></li>
         
        </ul>
      <button @click=${this.goToFavorites}>Favorites</button>
       
      </div>
    `;
  }

  goToFavorites(){
    Router.go('/favorites/')
  }

}

customElements.define("navbar-component", NavbarComponent);

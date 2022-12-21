import { LitElement, html, css } from 'lit';

export class ShoppingCartDetail extends LitElement {
  
    static properties = {
        product :{type:Object}
    }

    static styles = css`
    .card{
      background: #ffff;
      border-radius: 2px;
      display: inline-block;
      padding: 20px;
      height: auto;
      width: 260px;
      margin: 1rem;
      position: relative;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.3s cubic-bezier(0.25 0.8 0.25, 1);
    }
    .image {
      width: 70%;
    }
  
    `
    render(){
        return html`
        <section class="card">
        <h6><img  class="image" src=${this.product.img} width="200" height="200"></h6>
         <h6>${this.product.name}</h6>
        <h6>${this.product.price}</h6>
        <product-card-button-component ></product-card-button-component>
        </section>
      
        `;
        
    }
}
customElements.define('shopping-cart-detail', ShoppingCartDetail);

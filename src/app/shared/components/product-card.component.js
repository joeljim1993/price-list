import {
    html,
    css,
    LitElement
} from 'lit';


export class ProductCard extends LitElement {
    static properties = {
      listProductDetail: {type: Object}
    }


    static styles = css`
    .card{
    background: #ffff;
    border-radius: 2px;
    display: inline-block;
    height: 280px;
    width: 360px;
    margin: 1rem;
    position: relative;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25 .8 .25, 1)
  }
  `;

	constructor() {
		super();
    this.listProductDetail = {};
		
	}

	render() {
		return html` 
  
             <div class="card">
                <div class="card-content">
                  <p>${this.listProductDetail.id}</p>
                  <p>${this.listProductDetail.name}</p>
                  <p>${this.listProductDetail.images}</p>
                  <button>AGREGAR</button>
                </div>
             </div>   
		`;
	}
}

customElements.define('card-component', ProductCard);


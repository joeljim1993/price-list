import {
    html,
    css,
    LitElement
} from 'lit';


export class ProductCard extends LitElement {
	
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
		
	}

	render() {
		return html`
      <div class="card">
        <div class="card-content">
            <h3>aqui va la imagen</h3>
            <h2>Galleta Oreo</h2>
            <p>Bs. 10.70</p>
        </div>
      </div>
		
		`;
	}
}




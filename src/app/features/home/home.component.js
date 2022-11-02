import {
    html,
    css,
    LitElement
} from 'lit';
import { service } from "../../core/services/service";
import { tap } from 'rxjs';
import {Router} from '@vaadin/router';

export class Home extends LitElement {

	static styles = css `
    .btn-modal{
		background: #F4A534;
		border-radius: 5px;
		height: 80px;
	}
	a{
		text-decoration: none;
	}
    `;
	
	static properties = {

	}

	constructor() {
		super();
		this.serviceCore = service;
	}

	render() {
		return html`
      <button class="btn-modal"><a href="/browse">Nueva Lista</a></button>
		<div>
			<label>Nombre de la Lista</label>
			<input id="listname" type="text" placeholder="" value="ListaNueva">
			<label>Cantidad disponible para su lista</label>
			<input id="amountavailable" type="text" value="0" >
			<button><a href="#">GUARDAR</a></button>
		</div>
	
		`;
	}

	get listName() {
		return this.renderRoot?.querySelector("#listname") ?? null;
	  }
	get amountAvailable() {
		return this.renderRoot?.querySelector("#amountavailable") ?? null;
	  }
	
	
}
customElements.define('home-features', Home);



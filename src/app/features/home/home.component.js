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
		margin-top: 50px;
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
			<button @click=${this.data}><a href="#">GUARDAR</a></button>
		</div>
	
		`;
	}

	get listName() {
		return this.renderRoot?.querySelector("#listname") ?? null;
	  }
	get amountAvailable() {
		return this.renderRoot?.querySelector("#amountavailable") ?? null;
	  }

	  data(){
		const nombre = this.listName.value;
		const amount = this.amountAvailable.value;
		console.log("NOMBRE INGRESADO:", nombre, "MONTO DISPONIBLE:", amount);
	  }
	
	
}
customElements.define('home-features', Home);



import {
    html,
    css,
    LitElement
} from 'lit';
import { service } from "../../core/services/service";
import { pipe, tap } from 'rxjs';
import {Router} from '@vaadin/router';
import { ShoppingList } from '../../shared/models/shopping-list.model';

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
			<button @click=${this.createShoppingList}><a href="#">AGREGAR</a></button>
		</div>
	
		`;
	}

	get listName() {
		return this.renderRoot?.querySelector("#listname") ?? null;
	  }
	get amountAvailable() {
		return this.renderRoot?.querySelector("#amountavailable") ?? null;
	  }

	  createShoppingList(){
		const name = this.listName.value;
		const amount = this.amountAvailable.value;
		const result$ = this.serviceCore.createShoppingList$(name, amount)
		.pipe(
			tap(shopping => Router.go("/browse/"+shopping.id))
		)
		result$.subscribe();
	  }


	
	
}
customElements.define('home-features', Home);



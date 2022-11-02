import {
    html,
    css,
    LitElement
} from 'lit';
import { tap } from 'rxjs';

import { ShoppingListService } from '../shoppinglist-Sandbox.service';

export class HomeBrowse extends LitElement {
	
	static properties = {
		listproduct: {type: Array}
	}

	constructor() {
		super();
		this.sandboxShoppingList = ShoppingListService;
		this.listproduct = [];
	}

	render() {
		return html`
					${
						this.listproduct.map((element) => {
							return html`
							<card-component .listProductDetail="${element}">
							</card-component>
							`
						})
					}
					<listdata-component></listdata-component>
		`;
	}
	firstUpdated(){
		const result$ = this.sandboxShoppingList.getListProduct$()
		.pipe(
			tap(info => this.listproduct = info),
			tap(()=> this.requestUpdate()),
		)
		result$.subscribe();
		console.log("ESTOS SON LOS DATOS",this.listproduct);
	}

}
customElements.define('home-browse', HomeBrowse);

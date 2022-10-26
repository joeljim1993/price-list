import {
    html,
    css,
    LitElement
} from 'lit';


export class HomeBrowse extends LitElement {
	
	constructor() {
		super();
		
	}

	render() {
		return html`
		<h1>HOME BROWSE</h1>
        <card-component></card-component>
        <card-component></card-component>
        <card-component></card-component>
        <card-component></card-component>
		`;
	}
}
customElements.define('home-browse', HomeBrowse);

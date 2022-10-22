import {
    html,
    css,
    LitElement
} from 'lit';


export class Home extends LitElement {
	static properties = {

	}

	constructor() {
		super();
		
	}

	render() {
		return html`
      <h1>SALUDOS DESDE HOME</h1>


      <a href="">BOTON A BROWSE</a>
      <card-component></card-component>
		`;
	}
}




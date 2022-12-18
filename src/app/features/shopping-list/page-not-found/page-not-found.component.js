import { LitElement, html, css } from 'lit';

export class PageNotFound extends LitElement {

    static properties = {
    }

    constructor(){
        super();
    }

    render() {
        return html`
            <h1>Error 404</h1>
            <h2>Pagina no encontrada</h2>
        `;
    }
}
customElements.define('page-not-found', PageNotFound);
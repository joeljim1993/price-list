import { html, LitElement } from 'lit';

// Import de las hojas de estilo para este componente
import './loader.style.css';

export class LoaderComponent extends LitElement {

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="container-loader"></div>
    `;
  }

  createRenderRoot() {
    return this;
  }

}

customElements.define("loader-component", LoaderComponent);

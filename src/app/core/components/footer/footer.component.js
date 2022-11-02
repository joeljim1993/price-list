import { html, css, LitElement } from "lit";

export class FooterComponent extends LitElement {

    static properties = {
        
    }

    static styles = css `
    .container {
    position: fixed;
      width: 250px;
      background: #F28A61;
      height: 90px;
    }
    h3{
        color: white;
    }
    `;

  constructor() {
    super();
  }
  

  render() {
    return html`
    
    <div class="container">
            <h3>Total</h3>
            <h3>Disponible</h3>
    </div>
    `;
  }
}

customElements.define("footer-component", FooterComponent);
import { html, css, LitElement } from "lit";
import { tap } from "rxjs";
import "./footer.styles.css";
export class FooterComponent extends LitElement {
  constructor() {
    super();
    console.log("ejecutando footer ");
  }

  firstUpdated() {}

  render() {
    return html`
      <div class="footer-container ">
        <div class="group-one">
          <div class="box">
            <figure>
              <a href="https://cecosesola.org/">
              <img  alt="" data-src="https://cecosesola.org/wp-content/uploads/2020/05/logo-cecosesola-blanco-1.png" class="attachment-large size-large ls-is-cached lazyloaded" src="https://cecosesola.org/wp-content/uploads/2020/05/logo-cecosesola-blanco-1.png">
              </a>
            </figure>
          </div>
          <div class="box">
            <h2>SOBRE NOSOTROS</h2>
            <p>Dolore aliqua eu aliquip reprehenderit proident </p>
            <p>Dolore aliqua eu aliquip reprehenderit proident  </p>

          </div>
          <div class="red-social">
            <a href="https://www.facebook.com/RedCecosesola/" class="fa fa-facebook"></a>
            <a href="https://www.instagram.com/redcecosesola/" class="fa fa-instagram"></a>
            <a href="https://twitter.com/redcecosesola" class="fa fa-twitter"></a>
            <a href="https://www.youtube.com/channel/UC4Z6igtx966wHbfeumY9UwA" class="fa fa-youtube"></a>
          </div>
        </div>
        <div class="group-two">
        <small
          >&copy;2021 <b>cecosesola</b>-Todos los Derechos reservados
        </small>
      </div>
      </div>
      
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("footer-component", FooterComponent);

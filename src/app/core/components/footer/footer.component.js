import { html, css, LitElement } from "lit";
import { tap } from "rxjs";
import "./footer.styles.css";
export class FooterComponent extends LitElement {
  constructor() {
    super();
  }

  firstUpdated() {}




  render() {
    return html`
      <div class="footer-container ">
        <div class="group-one">
          <div class="box">
            <figure>
              <a href="https://cecosesola.org/" target="_blank">
                <img
                  class="logo-cecosesola"
                  src="https://cecosesola.org/wp-content/uploads/2020/05/logo-cecosesola-blanco-1.png"
                  alt="logo de cecosesola"
                />
              </a>
            </figure>
          </div>
          <div class="box">
            <h2>SOBRE NOSOTROS</h2>
            <p>Somos Mas de 50 Organizaciones en Red</p>
            <a href="https://cecosesola.org/" target="_blank"
              >¡Visita nuestra pagina y Conocenos!
            </a>
            <p>Contactanos : <br />cecosesolaescuela@hotmail.com</p>
          </div>
          <div class="red-social">
            <h1 class="red-social-title">Siguenos:</h1>
            <div class="red-social-icons">
              <a
                href="https://www.facebook.com/RedCecosesola/"
                class="fa fa-facebook"
              ></a>
              <a
                href="https://www.instagram.com/redcecosesola/"
                class="fa fa-instagram"
              ></a>
              <a
                href="https://twitter.com/redcecosesola"
                class="fa fa-twitter"
              ></a>
              <a
                href="https://www.youtube.com/channel/UC4Z6igtx966wHbfeumY9UwA"
                class="fa fa-youtube"
              ></a>
            </div>
          </div>
        </div>
        <div class="group-two">
          <small
            >&copy;2023 <b>Cecosesola </b>-Todos los Derechos reservados.
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
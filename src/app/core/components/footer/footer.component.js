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
          <div class="box" id="box-img">
            <figure>
              <a href="https://cecosesola.org/" target="_blank">
                <img
                  class="logo-cecosesola"
                  src="https://cecosesola.org/wp-content/uploads/2019/03/logo-cecosesola_1-removebg-preview.png"
                  alt="logo de cecosesola"
                />
              </a>
            </figure>
          </div>
          <div class="box">
            <!-- <h2 class="title-info-cecosesola">SOBRE NOSOTROS</h2> -->
            <p class="text-info-cecosesola">
              Somos una RED DE INTEGRACION con mas de 50 organizaciones
              comunitarias
            </p>
            <a
              class="link-page-cecosesola"
              href="https://cecosesola.org/"
              target="_blank"
              >¡Visita nuestra pagina y Conocenos!
            </a>
          </div>

          <div class="red-social">

            <h6 class="red-social-title" id="red-social-title"> REDES SOCIALES:</h6>
            <div class="red-social-icons">
              <a
                id="social-icons"
                href="https://www.facebook.com/RedCecosesola/"
                target="_blank"
                class="fa fa-facebook"
              ></a>
              <a
                id="social-icons"
                href="https://www.instagram.com/redcecosesola/"
                target="_blank"
                class="fa fa-instagram"
              ></a>
              <a
                id="social-icons"
                href="https://twitter.com/redcecosesola"
                target="_blank"
                class="fa fa-twitter"
              ></a>
              <a
                id="social-icons"
                href="https://www.youtube.com/channel/UC4Z6igtx966wHbfeumY9UwA"
                target="_blank"
                class="fa fa-youtube"
              ></a>

              <figure>
              <a id="form" href="https://forms.gle/APaFDevGbqwiF8ts9" target="_blank"><p>Tu Opinion es importante , Evaluanos </p>
              <i 
                    class="material-icons" 
                    id="icon-form"
                >app_registration</i>
            </figure>
            </div>
           
            
          </div>
          <div class="form">
            
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

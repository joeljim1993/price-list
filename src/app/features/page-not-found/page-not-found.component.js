import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

export class PageNotFound extends LitElement {

    static styles = css`
        * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            font-family: 'Roboto', sans-serif;
        }

        @keyframes rotateIn {
            from {
            transform: rotate( 0deg ) scale(0.2);
            opacity: 0;
            }
            to {
            transform: rotate( 360deg ) scale(1);
            opacity: 1;
            }
        }

        .container {
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        picture {
            animation: rotateIn 0.5s ease-out;
            margin-bottom: 45px;
        }

        h1 {
            font-weight: 700;
            font-size: 48px;
        }

        h2 {
            font-weight: 400;
            font-size: 48px;
        }

        button {
            width: 177px;
            height: 39px;
            background: #F4A534;
            border: none;
            border-radius: 10px;
            line-height: 21px;
            text-align: center;
            font-size: 24px;
            font-weight: 500;
            height: 50px;
            width: 250px;
            cursor: pointer;
            margin-top: 70px;
        }

        button:hover {
            background: #ee9314;
        }
    `

    static properties = {
    }

    constructor(){
        super();
    }

    render() {
        return html`
            <div class="container">
                <picture>
                    <img src='/src/assets/images/zanahoria.svg'>
                </picture>
                <h1>P&aacute;gina no encontrada</h1>
                <button @click="${this.goBack}">Volver</button>
            </div>
        `;
    }

    goBack() {
        Router.go('/browse/');
    }
}
customElements.define('page-not-found', PageNotFound);
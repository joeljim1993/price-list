import { html, css, LitElement } from "lit";

export class ProductCard extends LitElement {
  static properties = {
    listProductDetail: { type: Object },
    counter: { type: Number, Reflect: true },
  };

  static styles = css`

    .card {
      background: #ffff;
      border-radius: 2px;
      display: inline-block;
      padding: 20px;
      height: auto;
      width: 200px;
      position: relative;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.3s cubic-bezier(0.25 0.8 0.25, 1);
    }
  
    .favorite {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .image {
      width: 70%;
    }

    @media (max-width: 570px) {

      .card {
        width: 80vw;
      }

      .image {
        width: 100%;
        object-fit: cover;
      }

      .card-content {
        display: flex;
        height: 150px;
      }

      .card-image {
        display: flex;
        align-items: center;
        width: 30%;
      }

      .card-description {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 70%;
        padding: 5px;
      }

      .title {
        text-align: center;
        font-weight: bold;
        width: 200px;
      }

      .card-button {
        width: 100%;
      }

      p {
        margin: 0;
      }

    }
  `;

  constructor() {
    super();
    this.listProductDetail = {};
    this.counter = 0;
  }

  render() {
    return html`
      <div class="card">
        <div class="card-content">
          
          <div class="card-image">
            <img class="image" src="${this.listProductDetail.images}" />
          </div>
          
          <div class="card-description">
            <p class="title">${this.listProductDetail.name}</p>
            <p>Precio: Bs. ${this.listProductDetail.price}</p>
            <product-card-favorites-button class="favorite"
              @addProductToFavorites=${this.addProductToFavorites}>
            </product-card-favorites-button>
            <product-card-button-component
              class="card-button"
              @counterChangeFromButton=${this.increment}
              @counterChangeFromButton=${this.decrement}         
            ></product-card-button-component>
          </div>

        </div>
      </div>
    `;
  }

  addProductToFavorites(e) {
    const options = {
      detail: { product: this.listProductDetail },
    };
    this.dispatchEvent(new CustomEvent("productFavorite", options));
  }

  increment(e) {
    const productId = this.listProductDetail.id;
    const counterChange = e.detail.counterChangeB;
    const productName = this.listProductDetail.name;
    const price = this.listProductDetail.price;
    const productImage = this.listProductDetail.images;
    console.log("en decrement,img:", productImage);

    const options = {
      detail: {
        counterChange,
        productId,
        price,
        productImage,
        productName,
      },
    };
    this.dispatchEvent(new CustomEvent("counterChangeFromButton", options));
  }

  decrement(e) {
    const productId = this.listProductDetail.id;
    const counterChange = e.detail.counterChangeB;
    const price = this.listProductDetail.price;
    const productImage = this.listProductDetail.images;
    const productName = this.listProductDetail.name;

    const options = {
      detail: {
        counterChange,
        productId,
        price,
        productImage,
        productName,
      },
    };
    this.dispatchEvent(new CustomEvent("counterChangeFromButton", options));
  }
}

customElements.define("card-component", ProductCard);

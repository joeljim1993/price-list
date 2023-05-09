import { html, LitElement } from "lit";

import './category.styles.css';

export class CategoryComponent extends LitElement {
  static properties = {
    category: { type: Object },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <div class='category-container'>
        <li class='option' @click=${this.selectCategory}>
          <i>${this.category.icon}</i>
          <span class='text'>${this.category.name}</span>
        </li>
      </div>
    `;
  }

  selectCategory() {
    const options = {
      detail: {
        name: this.category.name,
        route: this.category.route,
      },
    };
    this.dispatchEvent(new CustomEvent("categoryAction", options));
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("category-component", CategoryComponent);

import { LitElement, html } from "lit";
import { Router } from "@vaadin/router";

import './categories-list.styles.css';

export class CategoriesListComponent extends LitElement {
  static properties = {
    categoriesList: { type: Array },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="categories-list-container">
        <h1>Categorías</h1>
        <ul>
          ${this.categoriesList.map((category) => {
            return html`
            <li @click=${() => Router.go(`/categories/${category.route}/`)}>
              <span>${category.icon}</span>
              ${category.name}
            </li>`;
          })}
        </ul>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }

}
customElements.define("categories-list", CategoriesListComponent);

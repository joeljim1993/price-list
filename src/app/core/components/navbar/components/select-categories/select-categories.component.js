import { html, LitElement } from "lit";
import { Router } from "@vaadin/router";
import { tap } from "rxjs";

import './select-categories.style.css';
import { categoriesBrowseState } from "../../../../../features/categories/services/categorie-browse-state.service";
import { categoriesList } from '/src/app/features/categories/categories.list';

export class SelectCategories extends LitElement {
  static properties = {};

  constructor() {
    super();
    this.categoriesSrv = categoriesBrowseState;
    this.categoriesList = categoriesList;
    this.selectTitle = this.selectTitleDefault = 'Selecciona una Categoría'
    this.active = false;
  }

  firstUpdated() {
    this.categoriesSrv.currentPosition
      .pipe(
        tap(data => {
          if(typeof data === 'string') {
            const title = data[0].toUpperCase() + data.substring(1);
            this.selectTitle = title;
            this.requestUpdate();
            return;
          }
          this.leaveCategorieBrowse();
        })
      )
      .subscribe();
  }

  render() {
    return html`
      <div
        class='icon-categories-container ${this.active ? 'active' : ''}'
        @click=${this.activeToggle}
      >

        <div class='select-btn'>
          <div class=''>${this.selectTitle}</div>
          <i class='material-icons'>expand_more</i>
        </div>

        <ul class='options'>
          ${this.categoriesList.map(category => {
            return html`
              <category-component
                .category=${category}
                @categoryAction=${this.categoryAction}
              ></category-component>
            `
          })}
        </ul>

      </div>
    `;
  }

  activeToggle() {
    this.active = !this.active;
    this.requestUpdate();
  }

  categoryAction(e) {
    const category = e.detail;
    Router.go(`/categorias/${category.route}/`);
  }

  leaveCategorieBrowse() {
    this.selectTitle = this.selectTitleDefault;
    this.requestUpdate();
  }

  createRenderRoot() {
    return this;
  }
}
customElements.define("select-categories", SelectCategories);

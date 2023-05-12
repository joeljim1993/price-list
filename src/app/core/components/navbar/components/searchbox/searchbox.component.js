import { html, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import {
  debounceTime,
  map,
  tap,
  Subject,
} from "rxjs";

import './searchbox.style.css';

export class SearchBoxComponent extends LitElement {
  
  get input() {
    return this.renderRoot?.querySelector('.search') ?? null;
  }

  constructor() {
    super();

    this.filter$ = new Subject('')
      .pipe(
        debounceTime(300),
        map(() => this.input.value),
        tap(query => (query.length > 0) ? this.redirectFilter(query) : this.redirectHome()),
      )
    this.filter$.subscribe();
  }

  firstUpdated() {
    const pathname = window.location.pathname;
    console.log("serachbox-->pathname: ",pathname);
    const route = pathname.substring(1,7);
    console.log("searchbox--> route ",route);
    if(route === 'filter') {
      const param = pathname
        .replace('/filter/', '')
        .replace(/%20/g, ' ');
      this.input.value = param;
      console.log("searchbox->param ",param);
    }
  }

  render() {
    return html`
      <div class="boxContainer">
        <table class="elementsContainer">
          <tr>
            <td>
              <input 
                type="text" 
                placeholder="Busca tu producto" 
                class="search" 
                @keyup=${this.filterForKeyup}/>
            </td>
            <td></td>
            <td class="icon-container">
              <i
                class="material-icons" 
                @click=${this.filterForClick}
              >search</i>
             
            </td>
            <td>
             

            </td>
          </tr>
        </table>
        <button @click=${this.clearInput}>XXX</button>

      </div>

    `;
  }

  clearInput(){
     this.input.value = "";
    this.redirectHome();
    this.requestUpdate;
  
   
  }

  filterForKeyup() {
    this.filter$.next('');
  }

  filterForClick() {
    const input = this.input.value;
    (input.length) ? this.redirectFilter(input) : this.redirectHome();
  }

  redirectFilter(query) {
    Router.go(`/filter/${query}`);
  }

  redirectHome() {
    Router.go(`/browse/`);
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("searchbox-component", SearchBoxComponent);

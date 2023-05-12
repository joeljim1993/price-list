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
  
  showIconClear= false;

  get input() {
    return this.renderRoot?.querySelector('.search') ?? null;
  }

  constructor() {
    super();

    this.filter$ = new Subject('')
      .pipe(
        debounceTime(300),
        map(() => this.input.value),
        tap(input => this.verifyInput(input)),
        tap(query => (query.length > 0) ? this.redirectFilter(query) : this.redirectHome()),
      )
    this.filter$.subscribe();
  }

  firstUpdated() {
    const pathname = window.location.pathname;
    const route = pathname.substring(1,7);
    if(route === 'filter') {
      const param = pathname
        .replace('/filter/', '')
        .replace(/%20/g, ' ');
      this.input.value = param;
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
              <!-- <i
                class="material-icons" 
                @click=${this.filterForClick}
              >search</i> -->
              ${
                this.showIconClear
                ? html `
                 <i 
               class="material-icons"
               class="icon-clear"
               @click=${this.clearInput}
               >
               cancel
               </i>
                `
                : ""
              }



              
            </td>
            <td>
             

            </td>
          </tr>
        </table>

      </div>

    `;
  }

  verifyInput(input){
    if(input != "" ){
      this.showIconClear= true;
      this.requestUpdate();
    }
    if(input == ""){
      this.showIconClear= false;
      this.requestUpdate();
    }
  }

  clearInput(){
     this.input.value = "";
    this.verifyInput("");
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

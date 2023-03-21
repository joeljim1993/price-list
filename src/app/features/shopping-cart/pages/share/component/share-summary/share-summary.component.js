import { LitElement, html } from "lit";

import './share-summary.styles.css';

export class ShareSummaryComponent extends LitElement {

  static properties = {
    ammount: { type: Number },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="share-summary-container">
        <div class="title">Total</div>
        <div class="ammount">Bs. ${this.ammount.toFixed(2)}</div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }

}

customElements.define("share-summary", ShareSummaryComponent);
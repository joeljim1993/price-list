import { LitElement, html } from "lit";

import './share-summary.styles.css';

export class ShareSummaryComponent extends LitElement {

  constructor() {
    super();
  }

  render() {
    return html`

    `;
  }

  createRenderRoot() {
    return this;
  }

}

customElements.define("share-summary", ShareSummaryComponent);
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('u-button')
export class UButton extends LitElement {
  @property()
  name?: string = 'World';

  render() {
    return html`<button><slot /></button>`;
  }
}

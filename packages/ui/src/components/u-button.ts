import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as React from 'react';
import { createComponent } from '@lit/react';

@customElement('u-button')
export class UButton extends LitElement {
  @property()
  name?: string = 'World';

  render() {
    return html`<button><slot /></button>`;
  }
}

export const Button = createComponent({
  tagName: 'u-button',
  elementClass: UButton,
  react: React,
});

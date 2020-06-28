export class BaseCustomElement extends HTMLElement {
  _makeShadowRoot(templateId) {
    let template = document.getElementById(templateId);
    let templateContent = template.content;

    this._shadowRoot = this.attachShadow({mode: 'closed'});
    this._shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}

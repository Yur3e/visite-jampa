export default class Modal {
  constructor(openSelector, closeSelector, containerSelector) {
    this.openButtons = document.querySelectorAll(openSelector);
    this.closeButton = document.querySelector(closeSelector);
    this.container = document.querySelector(containerSelector);
    this.lastFocusedElement = null;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  open(event) {
    event.preventDefault();
    this.lastFocusedElement = event.currentTarget;
    this.container.classList.add('ativo');
    this.container.setAttribute('aria-hidden', 'false');
    this.container.querySelector('input, button, [tabindex]:not([tabindex="-1"])').focus();
  }

  close() {
    this.container.classList.remove('ativo');
    this.container.setAttribute('aria-hidden', 'true');
    if (this.lastFocusedElement) this.lastFocusedElement.focus();
  }

  handleOutsideClick(event) {
    if (event.target === this.container) this.close();
  }

  handleKeydown(event) {
    if (event.key === 'Escape' && this.container.classList.contains('ativo')) this.close();
  }

  init() {
    if (!this.openButtons.length || !this.closeButton || !this.container) return this;

    this.openButtons.forEach(button => button.addEventListener('click', this.open));
    this.closeButton.addEventListener('click', this.close);
    this.container.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleKeydown);
    return this;
  }
}

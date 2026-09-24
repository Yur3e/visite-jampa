const ANIMATION_DURATION = 900;

export default class AnimaNumeros {
  constructor(selector, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(selector);
    this.observerTarget = document.querySelector(observerTarget);
    this.observerClass = observerClass;
    this.formatador = new Intl.NumberFormat('pt-BR');
    this.handleMutation = this.handleMutation.bind(this);
  }

  animarNumero(elemento) {
    const total = Number(elemento.dataset.total);
    if (!Number.isFinite(total)) return;

    const inicio = performance.now();
    const atualizar = (agora) => {
      const progresso = Math.min((agora - inicio) / ANIMATION_DURATION, 1);
      elemento.textContent = this.formatador.format(Math.floor(total * progresso));

      if (progresso < 1) requestAnimationFrame(atualizar);
    };

    requestAnimationFrame(atualizar);
  }

  animarNumeros() {
    this.numeros.forEach(numero => this.animarNumero(numero));
  }

  handleMutation(mutations) {
    if (mutations.some(mutation => mutation.target.classList.contains(this.observerClass))) {
      this.observer.disconnect();
      this.animarNumeros();
    }
  }

  init() {
    if (!this.numeros.length || !this.observerTarget) return this;

    if (this.observerTarget.classList.contains(this.observerClass)) {
      this.animarNumeros();
      return this;
    }

    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
    return this;
  }
}

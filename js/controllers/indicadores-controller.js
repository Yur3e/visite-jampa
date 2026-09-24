import IndicadoresModel from '../models/indicadores-model.js';
import IndicadoresView from '../views/indicadores-view.js';
import NumberAnimationView from '../views/number-animation-view.js';

export default class IndicadoresController {
  constructor({ url, container, observerTarget }) {
    this.model = new IndicadoresModel(url);
    this.view = new IndicadoresView(container);
    this.observerTarget = observerTarget;
  }

  async init() {
    if (!this.view.container) return;

    try {
      const indicadores = await this.model.listar();
      this.view.renderizar(indicadores);
      new NumberAnimationView('[data-numero]', this.observerTarget, 'ativo').init();
    } catch (erro) {
      this.view.renderizarErro();
      console.error(erro);
    }
  }
}

function criarIndicador({ specie, total }) {
  const indicador = document.createElement('article');
  const titulo = document.createElement('h3');
  const numero = document.createElement('span');

  indicador.className = 'indicador';
  titulo.textContent = specie;
  numero.dataset.numero = '';
  numero.dataset.total = total;
  numero.textContent = '0';

  indicador.append(titulo, numero);
  return indicador;
}

export default class IndicadoresView {
  constructor(selector) {
    this.container = document.querySelector(selector);
  }

  renderizar(indicadores) {
    this.container.replaceChildren(...indicadores.map(criarIndicador));
  }

  renderizarErro() {
    this.container.textContent = 'Não foi possível carregar os indicadores agora.';
  }
}

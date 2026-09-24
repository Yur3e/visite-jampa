export default class IndicadoresModel {
  constructor(url) {
    this.url = url;
  }

  static validarIndicador({ specie, total }) {
    return typeof specie === 'string' && Number.isFinite(Number(total));
  }

  async listar() {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error(`Não foi possível carregar os indicadores (${response.status}).`);
    }

    const indicadores = await response.json();
    if (!Array.isArray(indicadores) || !indicadores.every(IndicadoresModel.validarIndicador)) {
      throw new Error('Formato inválido para os indicadores.');
    }

    return indicadores;
  }
}

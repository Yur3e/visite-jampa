import AnimaNumeros from './anima-numeros.js';

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

export default async function fetchIndicadores(url, target) {
  const numerosGrid = document.querySelector(target);
  if (!numerosGrid) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Não foi possível carregar os indicadores (${response.status}).`);

    const indicadores = await response.json();
    if (!Array.isArray(indicadores)) throw new Error('Formato inválido para os indicadores.');

    numerosGrid.replaceChildren(...indicadores.map(criarIndicador));
    new AnimaNumeros('[data-numero]', '.numeros', 'ativo').init();
  } catch (erro) {
    numerosGrid.textContent = 'Não foi possível carregar os indicadores agora.';
    console.error(erro);
  }
}

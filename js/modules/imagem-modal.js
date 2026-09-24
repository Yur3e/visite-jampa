export default function imagemModal() {
  const modal = document.querySelector('[data-imagem-modal]');
  const imagemExibida = document.querySelector('[data-imagem-modal-imagem]');
  const legenda = document.querySelector('[data-imagem-modal-legenda]');
  const fechar = document.querySelector('[data-imagem-modal-fechar]');
  const imagens = document.querySelectorAll('.slide li img');
  let ultimoElementoFocado = null;

  if (!modal || !imagemExibida || !legenda || !fechar || !imagens.length) return;

  function fecharModal() {
    modal.classList.remove('ativo');
    modal.setAttribute('aria-hidden', 'true');
    imagemExibida.src = '';
    if (ultimoElementoFocado instanceof HTMLElement) ultimoElementoFocado.focus();
  }

  function abrirModal(event) {
    const imagem = event.currentTarget;
    ultimoElementoFocado = document.activeElement;
    imagemExibida.src = imagem.currentSrc || imagem.src;
    imagemExibida.alt = imagem.alt;
    legenda.textContent = imagem.alt;
    modal.classList.add('ativo');
    modal.setAttribute('aria-hidden', 'false');
    fechar.focus();
  }

  imagens.forEach(imagem => imagem.addEventListener('dblclick', abrirModal));
  fechar.addEventListener('click', fecharModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) fecharModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('ativo')) fecharModal();
  });
}

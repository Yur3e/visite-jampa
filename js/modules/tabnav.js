export default class TabNav {
  constructor(menu, content) {
    this.tabMenu = document.querySelectorAll(menu);
    this.tabContent = document.querySelectorAll(content);
    this.activeClass = 'ativo';
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  // Ativa a tab de acordo com o index da mesma
  activeTab(index) {
    this.tabContent.forEach((section) => {
      section.classList.remove(this.activeClass);
    });
    const direcao = this.tabContent[index].dataset.anime;
    this.tabContent[index].classList.add(this.activeClass, direcao);
    this.tabMenu.forEach(item => item.setAttribute('aria-pressed', 'false'));
    this.tabMenu[index].setAttribute('aria-pressed', 'true');
  }

  // Adiciona os eventos nas tabs
  addTabNavEvent() {
    this.tabMenu.forEach((itemMenu, index) => {
      itemMenu.addEventListener('click', () => this.activeTab(index));
      itemMenu.addEventListener('keydown', event => this.handleKeydown(event, index));
    });
  }

  handleKeydown(event, index) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    this.activeTab(index);
  }

  init() {
    if (this.tabMenu.length && this.tabContent.length) {
      // ativar primeiro item
      this.activeTab(0);
      this.addTabNavEvent();
    }
    return this;
  }
}

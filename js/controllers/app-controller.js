import AccordionView from '../views/accordion-view.js';
import ImageModalView from '../views/image-modal-view.js';
import MobileMenuView from '../views/mobile-menu-view.js';
import ModalView from '../views/modal-view.js';
import ScrollAnimationView from '../views/scroll-animation-view.js';
import SlideView from '../views/slide-view.js';
import SmoothScrollView from '../views/smooth-scroll-view.js';
import TabNavView from '../views/tab-nav-view.js';
import IndicadoresController from './indicadores-controller.js';

export default class AppController {
  constructor() {
    this.indicadoresController = new IndicadoresController({
      url: './indicadores-jampa.json',
      container: '.numeros-grid',
      observerTarget: '.numeros',
    });
  }

  init() {
    new SmoothScrollView('[data-menu="suave"] a[href^="#"]').init();
    new AccordionView('[data-anime="accordion"] dt').init();
    new TabNavView('[data-tab="menu"] li', '[data-tab="content"] section').init();
    new ModalView('[data-modal="abrir"]', '[data-modal="fechar"]', '[data-modal="container"]').init();
    new ScrollAnimationView('[data-anime="scroll"]').init();
    new MobileMenuView('[data-menu="button"]', '[data-menu="list"]').init();

    this.indicadoresController.init();

    const galeria = new SlideView('.slide', '.slide-wrapper');
    galeria.init();
    galeria.addControl('.custom-controls');

    ImageModalView();
  }
}

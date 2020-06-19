import CardType from './card_type';

export default class profile_medical_carousel extends CardType {
  constructor(type,id) {
    super(type,id);
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {

      if (home.dev) {
        card.carousel.forEach(core => core.image = this.db(core.image));
      } else {
        card.carousel.forEach(core => core.image = this.dd('public/home', core.image));
      }

      super.init(card, container, home)
        .then(status => {
          return this.init_nav(status, card, container, home)
        })
        .then(status => {
          return this.init_carousel(home, status, container);
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      resolve(status);
    })
  }
  init_carousel(home, status, container) {
    return new Promise((resolve, reject) => {
      let ref = this,
        buttons;

      this.scroll = new IScroll(`[data-id=${this.id}] .carousel`, {
        eventPassthrough: true,
        scrollX: true,
        scrollY: false,
        scrollbars: false,
        preventDefault: false,
        snap: true,
        momentum: false,
        tap: 'BOX_TAPPED',
        probeType: 3
      });

      this.scroll.on('scrollEnd', function (el) {
        let slideNum = ref.scroll.currentPage.pageX;

        Array.from(container.querySelectorAll(`[data-id=${ref.id}] .dot`)).forEach(dot => {
          dot.classList.remove('grey_dot');
        });
        if(container.querySelector(`[data-id=${ref.id}] .dot:nth-child(${slideNum + 1})`)) container.querySelector(`[data-id=${ref.id}] .dot:nth-child(${slideNum + 1})`).classList.add('grey_dot');
      });

      this.scroll.on('scroll', function (e) {
        ref.update(home, this);
      });
      this.scroll.goToPage(0, 0, 500, IScroll.utils.ease.circular);

      resolve(status);
    })
  }
  update(home, is) {
    let next = Math.trunc(Math.abs(is.x / is.wrapperWidth)) + 2,
      x = 0;

    TweenMax.to(`[data-id=${this.id}] .layers`, 1, {
      x: (is.x / is.scrollerWidth) * document.querySelector(`[data-id=${this.id}] .layers`).clientWidth + 0*is.wrapperWidth / 2,
      ease: Quint.easeOut
    });
  }
};

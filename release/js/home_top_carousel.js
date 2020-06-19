import CardType from './card_type';

export default class home_top_carousel extends CardType {
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

      //console.log(card);

      super.init(card, container, home)
        .then(status => {
          return this.init_nav(status, card, container, home)
        })
        .then(status => {
          return this.init_carousel(home, status);
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
  init_carousel(home, status) {
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
    TweenMax.to(`[data-id=${this.id}] .static .bg:nth-child(${next})`, 1, {
      opacity: Math.abs(is.x % is.wrapperWidth / is.wrapperWidth),
      ease: Quint.easeOut
    })
    TweenMax.to(`[data-id=${this.id}] .static .description`, 1, {
      opacity: 1 - Math.abs(is.x / is.wrapperWidth),
      ease: Quint.easeOut
    });

    TweenMax.to(`[data-id=${this.id}] .layers`, 1, {
      x: (is.x / is.scrollerWidth) * document.querySelector(`[data-id=${this.id}] .layers`).clientWidth + is.wrapperWidth / 2,
      ease: Quint.easeOut
    });
  }
};

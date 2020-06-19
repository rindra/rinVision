import CardType from './card_type';
export default class daily_activities_web extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
    this.scroll = null;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.carousel = (home.config.skin.persona[`daily_activities_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`daily_activities_${home.config.skin.persona.time}`] : null;
      card.carousel.forEach(core => core.image = this.db(core.image));
      card.carousel.forEach(core => core.avatar = this.db(core.avatar));

      super.init(card, container, home)
        .then(status => {
          return this.init_carousel(status, card, container, home)
        })
        .then(status => {
          return this.init_nav(status, card, container, home)
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  update(home, is) {
    let next = Math.trunc(Math.abs(is.x / is.wrapperWidth)) + 2,
      x = 0;
    if (document.querySelector(`[data-id=${this.id}] .layers`)) {
      TweenMax.to(`[data-id=${this.id}] .layers`, 1, {
        x: (is.x / is.scrollerWidth) * document.querySelector(`[data-id=${this.id}] .layers`).clientWidth,
        ease: Quint.easeOut
      });
    }
    if (document.querySelector(`[data-id=${this.id}] .blue_dot`)) {
      TweenMax.to(`[data-id=${this.id}] .blue_dot`, 1, {
        x: -(is.x / is.scrollerWidth) * document.querySelector(`[data-id=${this.id}] .static .dots`).clientWidth /*+ document.querySelector(`[data-id=${this.id}] .static .dots .grey_dot`).clientWidth/2*/ ,
        ease: Quint.easeOut
      });
    }
  }
  init_carousel(status, card, container, home) {
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

      resolve(status);
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {

      let hotspots = Array.from(container.querySelectorAll(`[data-id=${this.id}] .slide .hotspot`));
      hotspots.forEach((hotspot, i) => {
        hotspot.addEventListener('BOX_TAPPED', e => {
          let slideName = e.currentTarget.getAttribute('data-slide'),
            target = card.carousel.filter(slide => slide.name === slideName)[0].target,
            targetTab = card.carousel.filter(slide => slide.name === slideName)[0].target_tab,
            targetSearch = card.carousel.filter(slide => slide.name === slideName)[0].target_search;

          card.carousel.filter(c => c.name == slideName)[0].status = 'finished';

          if (target) {
            home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.carousel.filter(slide => slide.name === slideName)[0].target];
            this.homepage.init(home, 'bieber').catch(e => console.log(e));
          }
          if (targetTab) {
            this.homepage.init(home, targetTab)
              .catch(e => console.log(e));
          }
          if (targetSearch) {
            home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = home.config.skin.persona.autosuggest.filter(s => s.name === targetSearch)[0].cards;
            this.homepage.init(home, 'sr')
              .catch(e => console.log(e));
          }
        })
      });

      resolve(status);
    })
  }
};

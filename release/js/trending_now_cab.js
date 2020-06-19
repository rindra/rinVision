import CardType from './card_type';
export default class trending_now_cab extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
    this.scroll = null;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.carousel = (home.config.skin.persona[`trending_now_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`trending_now_${home.config.skin.persona.time}`] : null;
      if (home.dev) {
        card.carousel.forEach(slide => slide.image = this.db(slide.image));
      } else {
        card.carousel.forEach(slide => slide.image = this.dd('public/home', slide.image));
      }
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
  update(home, is) {
    let next = Math.trunc(Math.abs(is.x / is.wrapperWidth)) + 2,
      x = 0;
    if (document.querySelector(`[data-id=${this.id}] .layers`)) {
      TweenMax.to(`[data-id=${this.id}] .layers`, 1, {
        x: (is.x / is.scrollerWidth) * document.querySelector(`[data-id=${this.id}] .layers`).clientWidth,
        ease: Quint.easeOut
      });
    }
    if (document.querySelector(`[data-id=${this.id}] .grey_dot`)) {
      TweenMax.to(`[data-id=${this.id}] .grey_dot`, 1, {
        x: -(is.x / is.scrollerWidth) * document.querySelector(`[data-id=${this.id}] .static .dots`).clientWidth /*+ document.querySelector(`[data-id=${this.id}] .static .dots .grey_dot`).clientWidth/2*/ ,
        ease: Quint.easeOut
      });
    }
  }
  flatten(array) {
    for (let i = 0; i < array.length; Array.isArray(array[i]) && array.splice(i, 1, ...array[i]) || i++) {}
    return array;
  }
  removeDuplicates(arr) {
    let unique_array = [];
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) === -1) {
        unique_array.push(arr[i]);
      }
    }
    return unique_array;
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      let hotspots = Array.from(container.querySelectorAll(`[data-id=${this.id}] .slide .hotspot`));
      hotspots.forEach((hotspot, i) => {
        hotspot.addEventListener('BOX_TAPPED', e => {
          let slideName = e.currentTarget.getAttribute('data-slide');
          let target = card.carousel.filter(slide => slide.name === slideName)[0].target;
          let targetTab = card.carousel.filter(slide => slide.name === slideName)[0].target_tab;
          let targetSearch = card.carousel.filter(slide => slide.name === slideName)[0].target_search;
          let targetCard = card.carousel.filter(slide => slide.name === slideName)[0].target_cards;

          // home.config.target_cards = targetCard;

          this.homepage.previous[this.homepage.section.getAttribute('data-homepage-tab')] = $('main').scrollTop();
          if (target) {
            home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.carousel.filter(slide => slide.name === slideName)[0].target];
            this.homepage.init(home, 'bieber').catch(e => console.log(e));
          }
          if (targetTab) {
            this.homepage.init(home, targetTab)
              .catch(e => console.log(e));
          }
          if (targetSearch && home.config.skin.persona.autosuggest.filter(s => s.name === targetSearch)[0]) {
            home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = home.config.skin.persona.autosuggest.filter(s => s.name === targetSearch)[0].cards;
            this.homepage.init(home, 'sr')
              .catch(e => console.log(e));
          }
          if (targetCard) {
            this.removeDuplicates(this.flatten(targetCard));
            let pa = targetCard.filter(t => t.type == 'program_activity');

            if (pa.length > 0) {
              if (home.config.programs[pa[0].category]) {

              } else {
                home.config.programs[pa[0].category] = {
                  points: 0
                };
              }
            }
            home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = targetCard;
            home.config.target_cards = targetCard;
            this.homepage.init(home, 'blog')
              .catch(e => console.log(e));
          }
        })
      });
      resolve(status);
    })
  }
};

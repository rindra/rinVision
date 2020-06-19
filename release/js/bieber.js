import CardType from './card_type';
export default class bieber extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
    this.scroll = null;
    this.index = 0;
  }
  init(card, container, home) {

    return new Promise((resolve, reject) => {

      if (home.dev) {
        card.carousel = card.carousel.map(url => url = this.db(url));
      } else {
        card.carousel = card.carousel.map(url => url = this.dd('public/home', url));
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
  show_target(card, container, home) {
    let previous_tab;
    if (card.target_tab) {
      this.homepage.init(home, `${card.target_tab}`).catch(e => console.log(e));
    } else if (card.target) {
      home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
      this.homepage.init(home, 'bieber').catch(e => console.log(e));
    } else if (card.target_search) {
      home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = home.config.skin.persona.autosuggest.filter(s => s.name === card.target_search)[0].cards;
      this.homepage.init(home, 'sr').catch(e => console.log(e));
    } else if (card.target_cards) {
      home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = card.target_cards;
      this.homepage.init(home, 'blog')
      .catch(e => console.log(e));
    } else {
      // previous_tab = this.homepage.section.getAttribute('data-homepage-previous-tab');
      previous_tab = home.config.pagination[home.config.pagination.length - 2];
      //      this.homepage.previous[this.homepage.section.getAttribute('data-homepage-tab')] = $('main').scrollTop();
      this.homepage.init(home, (previous_tab == '') ? `home` : previous_tab).catch(e => console.log(e));
    }
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      container.querySelector(`[data-id=${this.id}] .right`).onclick = e => {
        if (container.querySelector(`[data-id=${this.id}]`).getAttribute('data-id') === 'bieber_personal_challenges_water_last') {
          this.homepage.init(home, 'home');
        } else {
          this.show_target(card, container, home);
        }
      }
      container.querySelectorAll(`[data-id=${this.id}] .slide`).forEach(s => s.onclick = e => {
        if (this.index + 1 < this.scroll.pages.length) {
          this.scroll.goToPage(++this.index, 0, 0);
        } else {
          this.show_target(card, container, home);
        }
      });
      container.querySelector(`[data-id=${this.id}] .left`).onclick = e => {
        if (this.index - 1 > -1) {
          this.scroll.goToPage(--this.index, 0, 0);
        } else {
          this.show_target(card, container, home);
        }
      }
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

      this.scroll.on('scroll', function (e) {
        //        console.log(container.querySelector(`[data-id=${ref.id}]`), ref.id);
        ref.update(home, this);
      });
      this.scroll.goToPage(0, 0, 500, IScroll.utils.ease.circular);

      this.homepage.section.setAttribute('data-bieber-name', this.id);

      resolve(status);
    })
  }
};

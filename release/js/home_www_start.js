import CardType from './card_type';
export default class home_www_start extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.image = this.db(card.image);
      } else {
        card.image = this.dd('public/home', card.image);
      }

      super.init(card, container, home).then(status => {
          return this.init_nav(status, card, container, home)
        })
        .then(status => {
          return this.init_anim(status, card, container, home);
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  init_anim(status, card, container, home) {
    return new Promise((resolve, reject) => {
      TweenMax.to(container.querySelector(`[data-id=${this.id}] .floating_element`), 1, {
        y: "10",
        repeat: -1,
        yoyo: true,
        ease: Sine.easeInOut
      })
      resolve(status);
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      container.querySelector(`[data-id=${this.id}]`).onclick = e => {
        this.homepage.previous[this.homepage.section.getAttribute('data-homepage-tab')] = $('main').scrollTop();
        if (card.epilogue) {
          home.config.skin.persona[this.homepage.current_tab] = home.config.skin.persona[this.homepage.current_tab].map(c => (c.name == this.id) ? card.epilogue : c);
        }
        home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
        this.homepage.init(home, 'bieber').catch(e => console.log(e));
      }
      resolve(status);
    })
  }
};

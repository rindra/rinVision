import CardType from './card_type';
export default class intro_community extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.image = this.db(card.image);
        card.avatar = this.db(card.avatar);
      } else {
        card.image = this.dd('public/home', card.image);
        card.avatar = this.dd('public/home', card.avatar);
      }
      super.init(card, container, home)
        .then(status => {
          return this.init_nav(status, card, container, home)
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.config.community.first) document.querySelector('[data-homepage-tab="community"]').classList.add('first');
      container.querySelector(`[data-id=${this.id}]`).onclick = e => {
        if (card.target) {
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
          home.config.community.first = false;
          document.querySelector('[data-homepage-tab="community"]').classList.remove('first');
        }
      }
      resolve(status);
    })
  }
};

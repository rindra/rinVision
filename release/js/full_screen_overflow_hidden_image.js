import CardType from './card_type';
export default class full_screen_overflow_hidden_image extends CardType {
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
      container.querySelector(`[data-id=${this.id}] .hotspot_back`).onclick = e => {
        if (card.epilogue) {
          home.config.skin.persona.community_start.filter(p => p.name == card.epilogue.name)[0].status = null;
        }
        this.homepage.init(home, 'community').catch(e => console.log(e));
      }
      container.querySelector(`[data-id=${this.id}] .hotspot_target`).onclick = e => {
        if (card.target) {
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
        }
      }
      resolve(status);
    })
  }
};

import CardType from './card_type';
export default class rewards_top extends CardType {
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
      //      container.querySelector(`[data-id=${this.id}]`).onclick = () => {
      //        home.config.skin.persona['rewards_history_start'] = card.target_cards;
      //        this.homepage.init(home, 'rewards_history');      
      //    }
      resolve(status);
    })
  }
};

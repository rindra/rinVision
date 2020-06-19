import CardType from './card_type';
export default class profile_top extends CardType {
  constructor(type, id) {
    super(type, id);
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.image = this.db(card.image);
        card.label_fsa = this.db(card.label_fsa);
      } else {
        card.image = this.dd('public/home', card.image);
        card.label_fsa = this.dd('public/home', card.label_fsa);
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
      resolve(status);
    })
  }
};

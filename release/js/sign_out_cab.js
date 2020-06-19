import CardType from './card_type';
export default class sign_out_cab extends CardType {
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
      card.sandbox = (home.config.skin.name == 'sandbox');
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
      container.querySelector(`[data-id=${this.id}]`).onclick = el => location.reload();
      resolve(status);
    })
  }
};

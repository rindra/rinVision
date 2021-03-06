import CardType from './card_type';
export default class ios_popup extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    if (home.dev) {
      card.image = this.db(card.image);
    } else {
      card.image = this.dd('public/home', card.image);
    }
    return new Promise((resolve, reject) => {
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
      container.querySelector(`[data-id=${this.id}]`).onclick = e => {
        container.classList.remove('popup_mode');
        home.config.ways_to_earn.first = false;
        home.config.ways_to_earn.home = true;
      }
    })
  }
};

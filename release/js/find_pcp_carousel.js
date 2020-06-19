import CardType from './card_type';

export default class find_pcp_carousel extends CardType {
  constructor(type,id) {
    super(type,id);
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.carousel.forEach(md => md.image = this.db(md.image));
      } else {
        card.carousel.forEach(md => md.image = this.dd('public/home', md.image));
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
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      resolve(status);
    })
  }
};

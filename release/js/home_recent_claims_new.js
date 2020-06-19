import CardType from './card_type';
export default class home_recent_claims_new extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.carousel.forEach(slide => slide.image = this.db(slide.image));
      } else {
        card.carousel.forEach(slide => slide.image = this.dd('public/home', slide.image));
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

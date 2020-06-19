import CardType from './card_type';
export default class challenge_www_start extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {

      card.carousel = ['0.png', '1.png', '2.png', '3.png'];
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
      container.querySelector(`[data-id=${this.id}] .close`).onclick = e => {
        this.homepage.init(home, 'home').catch(e => console.log(e));
      }
      resolve(status);
    })
  }
};

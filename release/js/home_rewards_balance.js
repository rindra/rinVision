import CardType from './card_type';

export default class home_rewards_balance extends CardType {
  constructor(type,id) {
    super(type,id);
  }
  init(card, container, home) {
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
      //console.log(status);
      resolve(status);
    })
  }
};

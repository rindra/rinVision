import CardType from './card_type';
export default class program_calendar extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.today = moment().format('DD');
      card.before_1 = parseInt(card.today) - 1;
      card.before_2 = parseInt(card.today) - 2;
      card.before_3 = parseInt(card.today) - 3;
      card.before_4 = parseInt(card.today) - 4;
      card.after_1 = parseInt(card.today) + 1;
      card.after_2 = parseInt(card.today) + 2;
      card.after_3 = parseInt(card.today) + 3;
      card.after_4 = parseInt(card.today) + 4;
      card.date = moment().format('ll');
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

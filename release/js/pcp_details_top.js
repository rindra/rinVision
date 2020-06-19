import CardType from './card_type';

export default class pcp_details_top extends CardType {
  constructor(type,id,homepage) {
    super(type,id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.image = this.db(card.image);
        // card.label_three_sub_title = this.db(card.label_three_sub_title)
      } else {
        card.image = this.dd('public/home', card.image);
        // card.label_three_sub_title = this.dd('public/home', card.label_three_sub_title);
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
      if (card.target_tab) {
       this.homepage.init(home, `${card.target_tab}`).catch(e => console.log(e));
     }
     if (card.target) {
       home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
       this.homepage.init(home, 'bieber').catch(e => console.log(e));
     }
      resolve(status);
    })
  }
};

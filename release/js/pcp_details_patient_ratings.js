import CardType from './card_type';
export default class pcp_details_patient_ratings extends CardType {
  constructor(type, id) {
    super(type, id);
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.label_one_title = this.db(card.label_one_title);
        card.label_two_sub_title = this.db(card.label_two_sub_title);
      } else {
        card.label_one_title = this.dd('public/pcp_details', card.label_one_title);
        card.label_two_sub_title = this.dd('public/pcp_details', card.label_two_sub_title);
      }
      super.init(card, container, home).then(status => {
        return this.init_nav(status, card, container, home)
      }).then(status => {
        resolve(status);
      }).catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      resolve(status);
    })
  }
};

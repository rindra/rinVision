import CardType from './card_type';
export default class your_care_team_search extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      
      if (card.status) {card.is_livepopup = true};
      
      card.location = home.config.skin.persona.state + " " + home.config.skin.persona.zip;
      // Map network from 'group_number' - use from persona if <network>
      card.network = (card.caption_store_credit == '<network>' ? home.config.skin.persona.occupation : card.caption_store_credit);
      
      if (home.dev) {
        card.image = this.db(card.image);
      } else {
        card.image = this.dd('public/home', card.image); 
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
      this.init_card_click(card, container, home);
      resolve(status);
    })
  }
};

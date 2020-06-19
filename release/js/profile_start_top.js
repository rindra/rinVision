import CardType from './card_type';
export default class profile_start_top extends CardType {
  constructor(type, id) {
    super(type, id);
  }
  init(card, container, home) {
    let email = home.config.skin.persona.email;
    let persona = home.config.skin.username;
    let skin = home.config.skin.persona.skin.toLowerCase();
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.photo = this.db(home.config.skin.persona.photo);
      } else {
        card.photo = this.dd(`${skin}/${persona}`, home.config.skin.persona.photo);
      }
      card.first_name = home.config.skin.persona.name;
      card.last_name = home.config.skin.persona.last_name;
      card.city = home.config.skin.persona.state;
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

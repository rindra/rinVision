import CardType from './card_type';
export default class community_message_live extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.image = this.db(card.image);
        card.photo = (card.avatar) ? this.db(card.avatar) : this.db(home.config.skin.persona.photo);
      } else {
        card.image = this.dd('public/home', card.image);
        card.photo = (card.avatar) ? this.dd('public/home', card.avatar) : this.dd(`${home.config.skin.name.toLowerCase()}/${home.config.skin.persona.name.toLowerCase()}`, home.config.skin.persona.photo);
      }
      card.initials = home.config.skin.persona.name.split("")[0].toUpperCase() + home.config.skin.persona.last_name.split("")[0].toUpperCase();
      card.username = (card.avatar_name) ? card.avatar_name : home.config.skin.persona.name + " " + home.config.skin.persona.last_name;
      card.company = (card.avatar_name) ? card.avatar_name : home.config.skin.persona.company_name;
      card.avatar_override = !(card.avatar == null)

      if (card.image !== null) card.is_image = true;
      if (card.label_one_title === 'company_post') card.is_business = true;
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
      if (card.status === 'hidden') container.querySelector(`[data-id=${this.id}]`).classList.add('hide');
      if (card.title) container.querySelector(`[data-id=${this.id}] .message_info .persona_name span`).innerHTML = 'in ';
      container.querySelector(`[data-id=${this.id}] .see_more`).onclick = e => {
        container.classList.add('popup_mode');
      }
      
      resolve(status);
    })
  }
};

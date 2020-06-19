import CardType from './card_type';
export default class countdown_top extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.photo = this.db(home.config.skin.persona.photo);
      } else {
        card.photo = this.dd(`${home.config.skin.name.toLowerCase()}/${home.config.skin.persona.name.toLowerCase()}`, home.config.skin.persona.photo);
      }
      card.initials = home.config.skin.persona.name.split("")[0].toUpperCase() + home.config.skin.persona.last_name.split("")[0].toUpperCase();
      card.username = home.config.skin.persona.name + " " + home.config.skin.persona.last_name;
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
      container.style.backgroundImage = "url(images/home/spring_countdown_bg.jpg)";
      container.style.backgroundSize = "contain";
      // this.init_card_click(card, container, home);
      container.querySelector(`[data-id=${this.id}]`).onclick = e => {this.homepage.init(home, 'home')};
      resolve(status);
    })
  }
};

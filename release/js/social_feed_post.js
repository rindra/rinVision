import CardType from './card_type';

export default class social_feed_post extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    let email = home.config.skin.persona.email;
    let persona = home.config.skin.username;
    let skin = home.config.skin.persona.skin.toLowerCase();
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.image = this.db(card.image);
        card.avatar = this.db(card.avatar);
        // card.photo = this.db(home.config.skin.persona.photo);
      } else {
        card.image = this.dd('public/home', card.image);
        card.avatar = this.dd('public/home', card.avatar);
        // card.photo = this.dd(`${skin}/${persona}`, home.config.skin.persona.photo);
      }
      // console.log(home)

      // card.first_name = home.config.skin.persona.name;
      // card.last_name = home.config.skin.persona.last_name;

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
      container.querySelector(`[data-id=${this.id}]`).onclick = e => {
        this.homepage.previous[this.homepage.section.getAttribute('data-homepage-tab')] = $('main').scrollTop();
        if (card.target_tab) {
          this.homepage.init(home, `${card.target_tab}`)
            .catch(e => console.log(e));
        }
        if (card.target) {
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
        }
      }
      resolve(status);
    })
  }
};

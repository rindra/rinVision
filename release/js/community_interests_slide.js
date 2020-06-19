import CardType from './card_type';
export default class community_interests_slide extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.photo = this.db(home.config.skin.persona.photo);
        card.avatar = this.db(card.avatar);
      } else {
        card.photo = this.dd(`${home.config.skin.name.toLowerCase()}/${home.config.skin.persona.name.toLowerCase()}`, home.config.skin.persona.photo);
        card.avatar = this.dd('public/home', card.avatar);
      }
      card.company = home.config.skin.persona.company_name;
      card.initials = home.config.skin.persona.name.split("")[0].toUpperCase() + home.config.skin.persona.last_name.split("")[0].toUpperCase();
      card.first_name = home.config.skin.persona.name;
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
        home.config.community.first = false;
        document.querySelector('[data-homepage-tab="blog"]').classList.remove('show_once');
        this.homepage.init(home, 'community').catch(e => console.log(e));
      }
      resolve(status);
    })
  }
};

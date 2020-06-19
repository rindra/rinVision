import CardType from './card_type';
export default class tmp_image_with_left_right_hotspot extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.image = this.db(card.image);
      } else {
        card.image = this.dd('public/home', card.image);
      }

      super.init(card, container, home)
        .then(status => {
          return this.init_nav(status, card, container, home);
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      container.querySelector(`[data-id=${this.id}] .hotspot_right`).onclick = e => {
        if (card.target) {          
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
        }
      }
      container.querySelector(`[data-id=${this.id}] .hotspot_left`).onclick = e => {
        this.homepage.previous[this.homepage.section.getAttribute('data-homepage-tab')] = $('main').scrollTop();
        if (card.target_cards) {
          home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = card.target_cards;
          this.homepage.init(home, 'blog').catch(e => console.log(e));
        }
      }
      resolve(status);
    })
  }
}
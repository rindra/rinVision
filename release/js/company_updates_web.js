import CardType from './card_type';
export default class company_updates_web extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => { 
      card.carousel = (home.config.skin.persona[`company_updates_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`company_updates_${home.config.skin.persona.time}`] : null;
      card.carousel.forEach(slide => slide.image = this.db(slide.image));
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

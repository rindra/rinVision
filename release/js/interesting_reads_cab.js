import CardType from './card_type';
export default class interesting_reads_cab extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.carousel = (home.config.skin.persona[`interesting_reads_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`interesting_reads_${home.config.skin.persona.time}`] : null;
      if (home.dev) {
        card.carousel.forEach(slide => slide.image = this.db(slide.image));
      } else {
        card.carousel.forEach(slide => slide.image = this.dd('public/home', slide.image));
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
      this.init_carousel_card_click(card, container, home, 'layer');
      resolve(status);
    })
  }
};

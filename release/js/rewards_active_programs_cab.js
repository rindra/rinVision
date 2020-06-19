import CardType from './card_type';
export default class rewards_active_programs_cab extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      // card.carousel = (home.config.skin.persona[`rewards_active_programs_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`rewards_active_programs_${home.config.skin.persona.time}`] : null;
      let activePrograms = home.config.skin.persona[`rewards_active_programs_${home.config.skin.persona.time}`];
      if (home.config.language === 'german') {
        card.carousel = activePrograms.filter(c => c.language === 'german');
      }
      if (home.config.language === 'chinese') {
        card.carousel = activePrograms.filter(c => c.language === 'chinese');
      }
      if (home.config.language === 'spanish') {
        card.carousel = activePrograms.filter(c => c.language === 'spanish');
      }
      if (home.config.language === '' || home.config.language === 'english') {
        card.carousel = activePrograms.filter(c => c.language === null) ? activePrograms.filter(c => c.language === null) : null;
      }
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
      resolve(status);
    })
  }
};

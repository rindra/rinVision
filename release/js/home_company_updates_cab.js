import CardType from './card_type';
export default class home_company_updates_cab extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      let companyUpdates = home.config.skin.persona[`company_updates_${home.config.skin.persona.time}`];

      companyUpdates.forEach(c => {
        (c.cta) ? c.is_cta = true : null;
        (c.target) ? c.is_cta = true : null;
        (c.target_benefit) ? c.is_cta = true : null;
        (c.target_cards) ? c.is_cta = true : null;
        (c.target_search) ? c.is_cta = true : null;
        (c.target_tab) ? c.is_cta = true : null;
      });
      // card.carousel = (home.config.skin.persona[`company_updates_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`company_updates_${home.config.skin.persona.time}`] : null;
      if (home.config.language === 'german') {
        card.carousel = companyUpdates.filter(c => c.language === 'german');
      }
      if (home.config.language === 'chinese') {
        card.carousel = companyUpdates.filter(c => c.language === 'chinese');
      }
      if (home.config.language === 'spanish') {
        card.carousel = companyUpdates.filter(c => c.language === 'spanish');
      }
      if (home.config.language === '' || home.config.language === 'english') {
        card.carousel = companyUpdates.filter(c => c.language === null) ? companyUpdates.filter(c => c.language === null) : null;
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
      if (home.app_name !== 'castlight_web') {
        this.init_carousel_card_click(card, container, home, 'box');
        if (card.language === 'german') container.querySelector(`[data-id=${this.id}] .group [data-category='event'] .label`).innerHTML = '75 Plätze';
        if (card.language === 'chinese') container.querySelector(`[data-id=${this.id}] .group [data-category='event'] .label`).innerHTML = '75 点';
        if (card.language === 'spanish') container.querySelector(`[data-id=${this.id}] .group [data-category='event'] .label`).innerHTML = '75 lugares';
      }
      resolve(status);
    })
  }
};

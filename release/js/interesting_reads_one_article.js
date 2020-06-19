import CardType from './card_type';
export default class interesting_reads_one_article extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.carousel = (home.config.skin.persona[`interesting_reads_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`interesting_reads_${home.config.skin.persona.time}`] : null;
      card.carousel_web = (home.config.skin.persona[`interesting_reads_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`interesting_reads_${home.config.skin.persona.time}`].slice(1, 4) : null;
      if (home.dev) {
        card.image = this.db(card.image);
        card.carousel_web.forEach(slide => slide.image = this.db(slide.image));
      } else {
        card.image = this.dd('public/home', card.image);
        card.carousel_web.forEach(slide => slide.image = this.dd('public/home', slide.image));
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
        if (home.config.language === '' || home.config.language === 'english') {
          let previous_tab = home.config.pagination[home.config.pagination.length - 2];
          container.querySelector(`[data-id=${this.id}] .top`).onclick = e => {
            if (card.target_cards) {
              home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = card.target_cards;
              this.homepage.init(home, 'blog').catch(e => console.log(e));
            }
          }
          container.querySelector(`[data-id=${this.id}] .cta_cab`).onclick = e => {
            home.config.skin.persona[`stories_${home.config.skin.persona.time}`] = card.carousel;
            this.homepage.init(home, 'stories').catch(e => console.log(e));
          }
        }
      }
      resolve(status);
    })
  }
};

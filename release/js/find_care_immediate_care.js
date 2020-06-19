import CardType from './card_type';
export default class find_care_immediate_care extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
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
      Array.from(container.querySelectorAll(`[data-id=${this.id}] .box`)).forEach(slide => slide.onclick = e => {
        let slideName = e.currentTarget.getAttribute('data-slide');
        let target = card.carousel.filter(slide => slide.name === slideName)[0].target;
        let targetTab = card.carousel.filter(slide => slide.name === slideName)[0].target_tab;
        let targetSearch = card.carousel.filter(slide => slide.name === slideName)[0].target_search;
        if (target) {
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.carousel.filter(slide => slide.name === slideName)[0].target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
        }
        if (targetTab) {
          this.homepage.init(home, targetTab)
            .catch(e => console.log(e));
        }
        if (targetSearch) {
          let include = home.config.skin.persona.autosuggest.filter(s => s.name === targetSearch);
          if (include.length > 0) {
            home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = home.config.skin.persona.autosuggest.filter(s => s.name === targetSearch)[0].cards;
            this.homepage.init(home, 'sr')
            .catch(e => console.log(e));
          } else {
            console.log('Include your target search to autosuggest in personas table');
          }
        }
      })
      resolve(status);
    })
  }
};

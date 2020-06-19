import CardType from './card_type';
export default class settings_cab extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      // card.carousel = (home.config.skin.persona[`settings_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`settings_${home.config.skin.persona.time}`] : null;
      let settingsList = home.config.skin.persona[`settings_${home.config.skin.persona.time}`];
      if (home.config.language === 'german') {
        card.carousel = settingsList.filter(c => c.language === 'german');
      }
      if (home.config.language === 'chinese') {
        card.carousel = settingsList.filter(c => c.language === 'chinese');
      }
      if (home.config.language === 'spanish') {
        card.carousel = settingsList.filter(c => c.language === 'spanish');
      }
      if (home.config.language === '' || home.config.language === 'english') {
        card.carousel = settingsList.filter(c => c.language === null) ? settingsList.filter(c => c.language === null) : null;
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
      Array.from(container.querySelectorAll(`[data-id=${this.id}] .container`)).forEach(slide => slide.onclick = e => {
        let slideName = e.currentTarget.getAttribute('data-name');
        let target = card.carousel.filter(slide => slide.name === slideName)[0].target;
        let targetTab = card.carousel.filter(slide => slide.name === slideName)[0].target_tab;
        let targetSearch = card.carousel.filter(slide => slide.name === slideName)[0].target_search;
        let targetCard = card.carousel.filter(slide => slide.name === slideName)[0].target_cards;
        if (target) {
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.carousel.filter(slide => slide.name === slideName)[0].target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
        }
        if (targetTab) {
          this.homepage.init(home, targetTab)
            .catch(e => console.log(e));
        }
        if (targetSearch) {
          home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = home.config.skin.persona.autosuggest.filter(s => s.name === targetSearch)[0].cards;
          this.homepage.init(home, 'sr')
          .catch(e => console.log(e));
        }
        if (targetCard) {
          home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = targetCard;
          this.homepage.init(home, 'blog')
          .catch(e => console.log(e));
        }
      })
      resolve(status);
    })
  }
};

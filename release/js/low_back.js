import CardType from './card_type';
export default class low_back extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.image = this.db(card.image);
        card.carousel.forEach(slide => slide.image = this.db(slide.image));
      } else {
        card.image = this.dd('public/home', card.image);
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
      this.homepage.section.setAttribute('data-top', 'top-hidden');
      this.homepage.section.querySelector('header .title').innerHTML = card.title;
      this.homepage.section.querySelector('header .arrow').onclick = () => {
        this.homepage.init(home, 'find_care');
        this.homepage.section.removeAttribute('data-top');
      }
      container.querySelector(`[data-id=${this.id}]`).onclick = e => {
        if (card.target_search) {
          home.config.skin.persona[this.homepage.current_tab] = home.config.skin.persona.autosuggest.filter(s => s.name === card.target_search)[0].cards;
          this.homepage.init(home, `sr`)
          .catch(e => console.log(e));
        }
        if (card.target_tab) {
          this.homepage.init(home, `${card.target_tab}`)
            .catch(e => console.log(e));
        }
        if (card.target) {
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
        }
        this.homepage.section.removeAttribute('data-top');
      }
      resolve(status);
    })
  }
};

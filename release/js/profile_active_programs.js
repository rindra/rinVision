import CardType from './card_type';
export default class profile_active_programs extends CardType {
  constructor(type, id) {
    super(type, id);
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
      Array.from(container.querySelectorAll(`[data-id=${this.id}] [data-name]`)).forEach(slide => slide.onclick = e => {
        let slideName = e.currentTarget.getAttribute('data-name');
        if (card.carousel) {
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.carousel.filter(slide => slide.name === slideName)[0].target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
        }
      })
      resolve(status);
    })
  }
};

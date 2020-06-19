import CardType from './card_type';
export default class tmp_images_web extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.image = this.db(card.image);
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
      document.querySelector('#homepage_web .home').classList.remove('on');
      document.querySelector('[data-homepage-web-tab="sr"] .find_care').classList.add('on');
      document.querySelector('#homepage_web header input').setAttribute('placeholder', home.config.search_result);
      container.querySelector(`[data-id=${this.id}]`).onclick = e => {
        if (card.target_cards) {
          home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = card.target_cards;
          this.homepage.init(home, 'sr')
          .catch(e => console.log(e));
        }
      }
      resolve(status);
    })
  }
};

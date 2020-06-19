import CardType from './card_type';
export default class home_plan_status_cab extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
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
        container.querySelector('[data-type="home_plan_status_cab"]').onclick = e => {
          if (card.target_cards) {
            home.config.skin.persona[`plan_details_${home.config.skin.persona.time}`] = card.target_cards;
            this.homepage.init(home, 'plan_details').catch(e => console.log(e));
          }
        }
      }
      resolve(status);
    })
  }
};

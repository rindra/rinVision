import CardType from './card_type';
export default class plan_status_details extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.config.skin.persona.company_name && card.amount_plan_status) {
        card.company = home.config.skin.persona.company_name.toUpperCase();
        card.amount_plan_status = card.amount_plan_status.replace(/{{company}}/g, card.company);
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
      container.querySelector(`[data-id=${this.id}] .blue_arrow_plan_status`).onclick = e => {
        this.homepage.init(home, 'home').catch(e => console.log(e));
      }
      resolve(status);
    })
  }
};

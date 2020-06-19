import CardType from './card_type';
export default class recent_claim_details extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.username = home.config.skin.persona.name;
      card.company = home.config.skin.persona.company_name;
      card.total = card.list_amounts.map(m => Number(m)).reduce((a, v) => a + v);
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
      if (home.app_name === 'engage_app') container.querySelector(`[data-id=${this.id}] .chat_engage_box`).classList.add('engage');
      container.querySelector('.exit_box').onclick = () => {
        this.homepage.init(home, 'home').catch(e => console.log(e));
      }
      resolve(status);
    })
  }
};

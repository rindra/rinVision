import CardType from './card_type';
export default class how_it_works_incentive extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.image = this.db(card.image);
      } else {
        card.image = this.dd('public/home', card.image);
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
      let previous_tab = home.config.pagination[home.config.pagination.length - 2];
      container.querySelector(`[data-id=${this.id}] .button_box`).onclick = e => {
        container.classList.remove('popup_mode');
        home.config.ways_to_earn.first = false;
        home.config.ways_to_earn.home = true;
      }
      container.querySelector(`[data-id=${this.id}] .blue_exit`).onclick = e => {
        this.homepage.init(home, (previous_tab == '') ? `home` : previous_tab).catch(e => console.log(e));
      }
      resolve(status);
    })
  }
};

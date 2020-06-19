import CardType from './card_type';
export default class top_header extends CardType {
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
      this.homepage.section.querySelector('.blue_left_arrow').onclick = () => {
        let previous_tab = home.config.pagination[home.config.pagination.length - 2];
        this.homepage.init(home, (previous_tab == '') ? `home` : previous_tab).catch(e => console.log(e));
      }
      resolve(status);
    })
  }
};

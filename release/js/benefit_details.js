import CardType from './card_type';
export default class benefit_details extends CardType {
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
      if (!card.label_one_title) card.contact = 'no_phone';
      if (!card.label_two_title) card.contact = 'no_web';
      if (!card.cta) card.contact = 'no_cta';
      if (!card.cta && !card.label_one_title) card.contact = 'web_only';
      if (!card.cta && !card.label_two_title) card.contact = 'phone_only';
      if (card.label_fsa === 'engage') card.icons = 'engage';

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
      container.querySelector('.exit_box').onclick = () => {
        let exit_tab;
        if (home.config.pagination.length < 3) {
          exit_tab = home.config.pagination[home.config.pagination.length - 2];
        } else {
          exit_tab = home.config.pagination[home.config.pagination.length - 3];
        }
        this.homepage.init(home, (exit_tab == '') ? `home` : exit_tab).catch(e => console.log(e));
      }
      this.init_card_click(card, container, home, '.cta_button');
      resolve(status);
    })
  }
};

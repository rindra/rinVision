import CardType from './card_type';
export default class program_top extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.today = moment().format('DD');
      card.before_1 = moment().subtract(1, 'days').format('DD');
      card.before_2 = moment().subtract(2, 'days').format('DD');
      card.before_3 = moment().subtract(3, 'days').format('DD');
      card.before_4 = moment().subtract(4, 'days').format('DD');
      card.after_1 = moment().add(1, 'days').format('DD');
      card.after_2 = moment().add(2, 'days').format('DD');
      card.after_3 = moment().add(3, 'days').format('DD');
      card.after_4 = moment().add(4, 'days').format('DD');
      card.date = moment().format('ll');

      (card.caption_fsa === 'get_active' || card.caption_fsa === 'sleep_well' || card.caption_fsa === 'eat_smart') ? card.is_wellbeing = true : card.is_wellbeing = false;

      if (home.config.target_cards.filter(card => card.type === 'program_activity').length > 0) {
        card.program_points = this.removeDuplicatesObj(home.config.programs[card.category].completed_activities).total_points;
        card.carousel = this.removeDuplicatesObj(home.config.programs[card.category].completed_activities).activities;
      }
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
      container.querySelector('.exit_box').onclick = () => {
        let exit_tab;
        if (home.config.pagination.length < 3) {
          exit_tab = home.config.pagination[home.config.pagination.length - 2];
        } else {
          exit_tab = home.config.pagination[home.config.pagination.length - 3];
        }
        this.homepage.init(home, (exit_tab == '') ? `home` : exit_tab).catch(e => console.log(e));
      }
      if (home.config.programs[card.category]) {
        if (home.config.programs[card.category].no_calendar === 'true') {
          container.querySelector(`[data-id="${this.id}"] .outer_container`).style.display = 'none';
        }
      }
      resolve(status);
    })
  }
};

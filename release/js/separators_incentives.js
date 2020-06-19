import CardType from './card_type';
export default class separators_incentives extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.is_start = (card.title == 'start')
      card.is_progress = (card.title == 'progress')
      card.is_end = (card.title == 'end')
      card.total_currently_earning_items = home.config.ways_to_earn.total_currently_earning_items;
      super.init(card, container, home).then(status => {
        return this.init_nav(status, card, container, home)
      }).then(status => {
        resolve(status);
      }).catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      resolve(status);
      container.querySelector(`[data-id=${this.id}]`).classList.remove('point')
      container.querySelector(`[data-id=${this.id}]`).classList.remove('incentive')
      container.querySelector(`[data-id=${this.id}]`).classList.add(home.config.ways_to_earn.current_tab)
              
      if (home.config.ways_to_earn.incentive_progress.length > 0 && card.title == 'progress') container.querySelector(`[data-id=${this.id}]`).classList.add('visible')
      if (home.config.ways_to_earn.incentive_end.length > 0 && card.title == 'end') container.querySelector(`[data-id=${this.id}]`).classList.add('visible')
      if (home.config.ways_to_earn.incentive_start.length > 0 && card.title == 'start') container.querySelector(`[data-id=${this.id}]`).classList.add('visible')
    })
  }
};

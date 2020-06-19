import CardType from './card_type';
export default class ways_to_earn_top extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.incentive_status = (home.config.ways_to_earn.current_tab == 'incentive');
      card.points = (card.incentive_status) ? home.config.ways_to_earn.total_incentives : home.config.ways_to_earn.total_points;
      if (card.incentive_status) {
        home.config.ways_to_earn.ways_to_earn_incentive.forEach(c => {
          if (c.type === 'tmp_images') card.points = c.points;
        });
      }
      if (card.incentive_status) card.total = home.config.ways_to_earn.ways_to_earn_incentive.filter(c => c.type == 'milestone_reward').map(m => Number(m.points)).reduce((a, v) => a + v);
      if (card.total > 1500) card.total = 1500;
      card.amount_fsa = (home.config.skin.persona[`date_${home.config.skin.persona.time}`]) ? `as of ${home.config.skin.persona['date_'+home.config.skin.persona.time]}` : null

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
      if (!card.incentive_status) {
        container.querySelector(`[data-id=${this.id}] .gift_box`).classList.add('gift_wrap');
        container.querySelector(`[data-id=${this.id}] .redeem_points_box`).onclick = () => {
          if (card.target_cards) {
            home.config.skin.persona[`rewards_${home.config.skin.persona.time}`] = card.target_cards;
            this.homepage.init(home, 'rewards')
              .catch(e => console.log(e));
          } else {
              this.init_card_click(card, container, home);
          }
        }
      }
      resolve(status);
    })
  }
};

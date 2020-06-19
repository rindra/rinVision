import CardType from './card_type';
export default class incentive_category extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      this.init_ways_to_earn(card, container, home)

      home.config.ways_to_earn.ways_to_earn_point = [
          ...home.config.ways_to_earn.ways_to_earn_point.filter(c => c.type == 'incentive_category'), ...home.config.ways_to_earn.ways_to_earn_point.filter(c => c.type == 'ways_to_earn_top'), ...home.config.ways_to_earn.ways_to_earn_point.filter(c => c.title == 'progress'),
          ...home.config.ways_to_earn.incentive_progress,
          ...home.config.ways_to_earn.ways_to_earn_point.filter(c => c.title == 'start'),
          ...home.config.ways_to_earn.incentive_start,
          ...home.config.ways_to_earn.ways_to_earn_point.filter(c => c.title == 'end'),
          ...home.config.ways_to_earn.incentive_end,
          ...home.config.ways_to_earn.ways_to_earn_point.filter(c => c.type == 'ios_popup'),
          ...home.config.ways_to_earn.ways_to_earn_point.filter(c => c.type === 'how_it_works_incentive')
        ]

      home.config.ways_to_earn.total_currently_earning_items = home.config.ways_to_earn.incentive_progress.length

      if (!home.config.ways_to_earn.ready) {
        home.config.skin.persona[`ways_to_earn_${home.config.skin.persona.time}`] = home.config.ways_to_earn[`ways_to_earn_${home.config.ways_to_earn.current_tab}`]
        this.homepage.init(home, `ways_to_earn`).catch(e => console.log(e));
        home.config.ways_to_earn.ready = true
      }

      card.points = home.config.ways_to_earn.total_points;
      card.incentives = home.config.ways_to_earn.total_incentives;
      card.status = home.config.ways_to_earn.current_tab;
      card.total = home.config.ways_to_earn.ways_to_earn_incentive.filter(c => c.type == 'milestone_reward').map(m => Number(m.points)).reduce((a, v) => a + v);

      home.config.ways_to_earn.ways_to_earn_incentive.forEach(c => {
        if (c.type === 'tmp_images') card.incentives = c.points;
      });

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

  init_ways_to_earn(card, container, home) {
    if (home.config.ways_to_earn.ways_to_earn_point.length == 0) {
      home.config.ways_to_earn.ways_to_earn_point = [
          ...home.config.skin.persona[`ways_to_earn_${home.config.skin.persona.time}`], ...(home.config.skin.persona[`points_opportunities_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`points_opportunities_${home.config.skin.persona.time}`] : [],
          ...(home.config.skin.persona[`points_currently_earning_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`points_currently_earning_${home.config.skin.persona.time}`].map(c => {
          c.status = 'progress'
          return c
        }) : [],
          ...(home.config.skin.persona[`points_completed_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`points_completed_${home.config.skin.persona.time}`].map(c => {
          c.status = 'end'
          return c
        }) : []
        ]
    }


    if (home.config.ways_to_earn.ways_to_earn_incentive.length == 0) {
      home.config.ways_to_earn.ways_to_earn_incentive = [...home.config.skin.persona[`ways_to_earn_${home.config.skin.persona.time}`], ...home.config.skin.persona[`incentives_${home.config.skin.persona.time}`]]
    } else {
      if (home.config.ways_to_earn.ways_to_earn_incentive.filter(c => c.epilogue).length > 0) {
        if (home.config.ways_to_earn.ways_to_earn_incentive.filter(c => c.epilogue)[0].status == 'end') {
          if (home.config.ways_to_earn.ways_to_earn_incentive.filter(t => t.name == home.config.ways_to_earn.ways_to_earn_incentive.filter(c => c.epilogue)[0].epilogue.name)[0].status == 'hidden') home.config.ways_to_earn.ways_to_earn_incentive.filter(t => t.name == home.config.ways_to_earn.ways_to_earn_incentive.filter(c => c.epilogue)[0].epilogue.name)[0].status = null
        }
      }
    }


    home.config.ways_to_earn.incentive_start = home.config.ways_to_earn.ways_to_earn_point.filter(c => c.label_plan_status == 'incentive' && c.status == null)
    home.config.ways_to_earn.incentive_progress = home.config.ways_to_earn.ways_to_earn_point.filter(c => c.label_plan_status == 'incentive' && c.status == 'progress')
    home.config.ways_to_earn.incentive_end = home.config.ways_to_earn.ways_to_earn_point.filter(c => c.label_plan_status == 'incentive' && c.status == 'end')

    home.config.ways_to_earn.total_points = ([...this.flatten(home.config.ways_to_earn.incentive_progress.map(c => Number(c.label_store_credit))), ...this.flatten(home.config.ways_to_earn.incentive_end.map(c => Number(c.label_store_credit)))].length > 0) ? [...this.flatten(home.config.ways_to_earn.incentive_progress.map(c => Number(c.label_store_credit))), ...this.flatten(home.config.ways_to_earn.incentive_end.map(c => Number(c.label_store_credit)))].reduce((a, c) => a + c) : 0;

    home.config.ways_to_earn.milestone_end = home.config.ways_to_earn.ways_to_earn_incentive.filter(c => c.caption_fsa == 'incentive' && c.status == 'end')
    if (home.config.ways_to_earn.milestone_end.length > 0) {
      home.config.ways_to_earn.total_incentives = home.config.ways_to_earn.ways_to_earn_incentive.filter(c => c.type == 'milestone_reward').map(m => {
        m.status = m.list.map(l => home.config.ways_to_earn.milestone_end.filter(me => me.category == l)[0]).filter(c => c).length == m.list.length
        return (m.status) ? Number(m.points) : 0
      }).reduce((a, v) => a + v)
    }
  }

  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      container.querySelector(`.${card.status}_box`).classList.add('active')
      if (!home.config.ways_to_earn.home) container.classList.add('popup_mode')

      container.querySelector('.incentive_box').onclick = e => {
        home.config.ways_to_earn.current_tab = 'incentive'
        home.config.skin.persona[`ways_to_earn_${home.config.skin.persona.time}`] = home.config.ways_to_earn.ways_to_earn_incentive
        this.homepage.init(home, `ways_to_earn`).catch(e => console.log(e));
      }
      container.querySelector('.point_box').onclick = e => {
        home.config.ways_to_earn.current_tab = 'point'
        home.config.skin.persona[`ways_to_earn_${home.config.skin.persona.time}`] = home.config.ways_to_earn.ways_to_earn_point
        this.homepage.init(home, `ways_to_earn`).catch(e => console.log(e));
      }

      if (home.config.skin.persona.ways_to_earn_one_tab === 'points_only') container.querySelector(`[data-id=${this.id}]`).classList.add('hide');

      resolve(status);
    })
  }
};

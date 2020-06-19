import CardType from './card_type';
export default class top_nav_pcorp extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {

      if (home.dev) {
        card.photo = this.db(home.config.skin.persona.photo);
      } else {
        card.photo = this.dd(`${home.config.skin.name.toLowerCase()}/${home.config.skin.persona.name.toLowerCase()}`, home.config.skin.persona.photo);
      }

      if (home.config.skin.persona[`notifications_${home.config.skin.persona.time}`]) this.homepage.section.querySelector('header .new_notification .number').innerHTML = home.config.skin.persona[`notifications_${home.config.skin.persona.time}`].filter(n => n.label_plan_status != 'read').length;
      card.current_date = (home.config.skin.persona[`date_${home.config.skin.persona.time}`]) ? `, ${home.config.skin.persona['date_'+home.config.skin.persona.time]}` : null;

      card.username = home.config.skin.persona.name;
      card.header_text_color = home.config.skin.header_text_color;
      card.gradient_color = home.config.skin.gradient_color;
      card.initials = home.config.skin.persona.name.split("")[0].toUpperCase() + home.config.skin.persona.last_name.split("")[0].toUpperCase();

      home.config.ways_to_earn.first = !(home.config.skin.persona[`points_currently_earning_${home.config.skin.persona.time}`] || home.config.skin.persona[`points_completed_${home.config.skin.persona.time}`])


      this.init_ways_to_earn(card, container, home)

      card.date = home.config.skin.persona[`date_${home.config.skin.persona.time}`]
      card.is_incentive = card.is_points = false

      card.value = home.config.ways_to_earn.total_incentives
      card.total = home.config.ways_to_earn.ways_to_earn_incentive.filter(c => c.type == 'milestone_reward').map(m => Number(m.points)).reduce((a, v) => a + v);
      if (card.total > 1500) card.total = 1500;
      card.points = home.config.ways_to_earn.total_points

      card.caption_fsa = (home.config.ways_to_earn.home) ? ((home.config.ways_to_earn.ways_to_earn_point.filter(c => c.status == 'progress' || c.status == 'end').length > 0 || home.config.ways_to_earn.ways_to_earn_incentive.filter(c => c.status == 'progress' || c.status == 'end').length > 0) ? 'points' : 'incentive') : 'incentive'
      if (card.caption_fsa == 'incentive') card.is_incentive = true;
      if (card.caption_fsa == 'points') card.is_points = true;

      if (home.config.skin.persona.ways_to_earn_one_tab === 'points_only') card.is_points_only = true;

      if (home.config.skin.persona[`message_${home.config.skin.persona.time}`] !== null) {
        card.is_message = true;
        card.message = home.config.skin.persona[`message_${home.config.skin.persona.time}`];
      }

      if (card.label_fsa) card.label_fsa = card.label_fsa.replace(/{{total}}/, home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(t => t.type == 'todo_card').map(t => Number(t.points.split('$')[1])).reduce((a, v) => a + v));

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
  flatten(arr) {
    for (let i = 0; i < arr.length; Array.isArray(arr[i]) && arr.splice(i, 1, ...arr[i]) || i++) {}
    return arr
  }
  total_points(obj) {
    let sum = 0;
    for (var key in obj) {
      sum += obj[key].points;
    }
    return sum;
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.app_name !== 'castlight_web') {

        if (home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(t => t.label_store_credit === 'weekly').length > 0) {
          let weeklyPoints = home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(t => t.label_store_credit === 'weekly').map(t => Number(t.points.split('$')[1])).reduce((a, v) => a + v);
          this.homepage.section.querySelector('.incentive .middle .label').innerHTML = `<b>Earn up to $${weeklyPoints} per week</b><br> just by making healthy choices`;
        }

        if (home.config.skin.style === 'pcorp') {
          container.querySelector('.activity_points.incentive').classList.add('stretch');
          if (container.querySelector('.learn_topnav_box')) container.querySelector('.learn_topnav_box').style.display = 'flex';
        }

        container.querySelector(`[data-id=${this.id}] .activity_points`).onclick = e => {
          home.todos_month = card.current_date;
          if (card.target_tab) {
            if (card.target_tab == 'todo') {
              let tc = home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(t => t.type == 'todo_card');
            }
            this.homepage.init(home, `${card.target_tab}`).catch(e => console.log(e));
          } else if (card.target) {
            home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
            this.homepage.init(home, 'bieber').catch(e => console.log(e));
          } else if (card.target_search) {
            home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = home.config.skin.persona.autosuggest.filter(s => s.name === card.target_search)[0].cards;
            this.homepage.init(home, 'sr').catch(e => console.log(e));
          } else if (card.target_cards) {
            home.config.skin.persona[`rewards_${home.config.skin.persona.time}`] = card.target_cards;
            this.homepage.init(home, 'rewards')
              .catch(e => console.log(e));
          }
        }
        this.homepage.section.querySelector('header .new_notification .hotspot').onclick = e => {
          this.homepage.init(home, 'notifications').catch(e => console.log(e));
        }
        this.homepage.section.querySelector('.comm .icon').onclick = e => {
          this.homepage.init(home, 'community').catch(e => console.log(e));
        }
      } else {
        if (home.config.skin.style === 'pcorp') {
          container.querySelector('.activity_points_web.incentive').classList.add('stretch_web');
          if (container.querySelector('.learn_topnav_box')) container.querySelector('.learn_topnav_box').style.display = 'flex';
        }
      }

      resolve(status);
    })
  }
};

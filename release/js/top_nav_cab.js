import CardType from './card_type';
export default class top_nav_cab extends CardType {
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

      if (home.app_name == 'healthyblue_app') {

      }

      card.current_date = (home.config.skin.persona[`date_${home.config.skin.persona.time}`]) ? `, ${home.config.skin.persona['date_'+home.config.skin.persona.time]}` : null;
      card.current_points = home.config.skin.persona[`points_${home.config.skin.persona.time}`];
      // card.current_points = this.total_points(home.config.programs);


      if (home.config.skin.persona[`todo_${home.config.skin.persona.time}`]) card.total = home.config.skin.persona[`todo_${home.config.skin.persona.time}`].length - 1;
      // card.first_letter = home.config.skin.persona.name.charAt(0);
      card.username = home.config.skin.persona.name;
      // card.header_text_color = home.config.skin.header_text_color;
      card.gradient_color = home.config.skin.gradient_color;
      card.initials = home.config.skin.persona.name.split("")[0].toUpperCase() + home.config.skin.persona.last_name.split("")[0].toUpperCase();
      if (card.caption_fsa == 'incentive') card.is_incentive = true;
      if (card.caption_fsa == 'points') card.is_points = true;
      if (card.caption_fsa == null) card.is_default = true;
      if (card.language === 'german') card.is_german = true;
      if (card.language === 'chinese') card.is_chinese = true;
      if (card.language === 'spanish') card.is_spanish = true;

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
        if (home.config.skin.name === 'main_pcorp') {
          container.querySelector('.activity_points.incentive').classList.add('stretch');
          container.querySelector('.learn_topnav_box').style.display = 'flex';
        }
        if (home.config.skin.persona.package === 'care_guidance') {
          container.querySelector(`[data-id=${this.id}] .greetings`).classList.add('bottom');
          container.querySelector(`[data-id=${this.id}] .activity_points`).classList.add('hide');
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
      }
      resolve(status);
    })
  }
};

import CardType from './card_type';
export default class todo_card extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.config.skin.persona.company_name) {
        card.company = home.config.skin.persona.company_name;
        card.description = card.description.replace(/{{company}}/g, card.company);
      }
      if (home.dev) {
        card.image = this.db(card.image);
      } else {
        card.image = this.dd('public/home', card.image);
      }
      if (card.caption_fsa == 'incentive') card.is_incentive = true;
      if (card.list) card.list_length = card.list.length;
      if (card.caption_fsa === 'incentive') {
        (card.list.length > 1) ? card.activities = true: card.activities = false;
      }
      if (card.label_store_credit === 'weekly') card.is_weekly = true;
      if (card.label_three_caption === 'milestone') card.is_milestone = true;
      (!card.target_cards) ? card.is_cta = false : card.is_cta = true;
      if(card.amount_plan_status == 'rewards') card.is_amount_plan_status = true
      if(card.label_plan_status == 'completed') card.is_rewards_complete = true
      super.init(card, container, home)
        .then(status => {
          return this.init_nav(status, card, container, home)
        })
        .then(status => {
          return this.init_progress(status, card, container, home)
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  removeDuplicates(arr) {
    let unique_array = [];
    for (var i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) === -1) {
        unique_array.push(arr[i]);
      }
    }
    return unique_array;
  }
  init_progress(status, card, container, home) {
    return new Promise((resolve, reject) => {
      if (card.caption_fsa == 'incentive') {
//        if (home.config.programs[card.category]) home.config.programs[card.category].total = card.target_cards.filter(c => c.type == 'program_activity').length
        Array.from(container.querySelector(`[data-id=${this.id}]`).querySelectorAll('.item')).forEach(item => {
          if (home.config.programs[card.category] && home.config.programs[card.category].completed_activities) {
            let titlesArr = [];
            home.config.programs[card.category].completed_activities.forEach(a => titlesArr.push(a.title));
            container.querySelector(`[data-id=${this.id}]`).querySelector('.bar').style.width = this.removeDuplicates(titlesArr).length / card.list_length * 100 + '%';
            container.querySelector(`[data-id=${this.id}]`).querySelector('.completed_items').innerHTML = this.removeDuplicates(titlesArr).length;
            home.config.programs[card.category].completed_activities.forEach(activity => {
              if (activity.title.toLowerCase() === item.textContent.toLowerCase()) item.classList.add('completed');
            });
          }
        });
        if (card.label_three_caption === 'milestone') {
          container.querySelectorAll(`[data-id=${this.id}] .label`).forEach(l => l.style.display = 'none');
          if (container.querySelector(`[data-id=${this.id}] .bar`).style.width == '100%') container.querySelector(`[data-id=${this.id}] .bar`).classList.add('bar_completed');
          if (home.config.skin.persona[`incentives_${home.config.skin.persona.time}`] === null) {
            if (container.querySelectorAll('.bar.bar_completed').length === home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(t => t.label_three_caption === "milestone").length) {
              if (container.querySelector('[data-type="top_incentive"] .actual') !== null) container.querySelector('[data-type="top_incentive"] .actual').innerHTML = '$' + Number(home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(t => t.label_three_caption == 'milestone').map(t => Number(t.points.split('$')[1])).reduce((a, v) => a + v));
              document.querySelector(".popup").classList.add('yeah');
              TweenMax.to('.yeah', 1, {
                top: '0vh',
                ease: Quint.easeOut
              });
              setInterval(() => TweenMax.to('.yeah', 1, {
                top: '-10vh',
                ease: Quint.easeIn
              }), 5000);
            }
          }

          if (home.config.skin.persona[`incentives_${home.config.skin.persona.time}`]) {
            if (container.querySelectorAll('.bar.bar_completed').length === home.config.skin.persona[`incentives_${home.config.skin.persona.time}`].filter(t => t.label_three_caption === "milestone").length) {
              document.querySelector(".popup").classList.add('yeah');
              TweenMax.to('.yeah', 1, {
                top: '0vh',
                ease: Quint.easeOut
              });
              setInterval(() => TweenMax.to('.yeah', 1, {
                top: '-10vh',
                ease: Quint.easeIn
              }), 5000);
            }
          }
        } else {
          if (container.querySelector(`[data-id=${this.id}] .bar`).style.width == '100%') {
            container.querySelector('[data-type="top_incentive"] .actual').innerHTML = '$' + Number(Number(container.querySelector('[data-type="top_incentive"] .actual').innerHTML.split('$')[1]) + Number(card.points.split('$')[1]));
            container.querySelector(`[data-id=${this.id}] .dollar`).classList.add('checked');
            document.querySelector(".popup").classList.add('yeah');
            TweenMax.to('.yeah', 1, {
              top: '0vh',
              ease: Quint.easeOut
            });
            setInterval(() => TweenMax.to('.yeah', 1, {
              top: '-10vh',
              ease: Quint.easeIn
            }), 5000);
          }
        }
      }

      resolve(status);
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      if (card.caption_fsa == 'incentive') {
        // container.querySelector(`[data-id=${this.id}] .link`).onclick = e => {
        //   if (e.target.getAttribute('data-status') == '0') {
        //     e.target.innerHTML = 'Hide required activities';
        //     Array.from(e.target.parentNode.querySelectorAll('.item')).forEach(item => item.classList.add('on'));
        //     e.target.setAttribute('data-status', '1');
        //   } else {
        //     e.target.innerHTML = 'See required activities';
        //     Array.from(e.target.parentNode.querySelectorAll('.item')).forEach(item => item.classList.remove('on'));
        //     e.target.setAttribute('data-status', '0');
        //   }
        // }
        container.querySelector(`[data-id=${this.id}] .cta_get_started`).onclick = e => {
          let targetCard = this.removeDuplicates(this.flatten(card.target_cards));
          home.config.target_cards = targetCard;
          if (card.target) {
            if (!card.label_plan_status) card.status = 'complete';
            home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
            this.homepage.init(home, 'bieber').then(s => console.log(s)).catch(e => console.log(e));
          }

          if (targetCard) {
            home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = home.config.target_cards;
            //            home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = this.removeDuplicates(this.flatten(home.config.target_cards));
            let pa = home.config.skin.persona[`blog_${home.config.skin.persona.time}`].filter(t => t.type == 'program_activity');

            if (pa.length > 0) {
              if (home.config.programs[pa[0].category]) {

              } else {
                home.config.programs[pa[0].category] = {
                  points: 0
                };
              }
            }

            this.homepage.init(home, 'blog')
              .catch(e => console.log(e));
          }
        }
      } else {
        container.querySelector(`[data-id=${this.id}]`).onclick = e => {
          let targetCard = card.target_cards;
          home.config.target_cards = targetCard;
          if (card.target) {
            if (!card.label_plan_status) card.status = 'complete';
            home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
            this.homepage.init(home, 'bieber').then(s => console.log(s)).catch(e => console.log(e));
          }

          if (targetCard) {
            home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = this.removeDuplicates(this.flatten(home.config.target_cards));
            let pa = targetCard.filter(t => t.type == 'program_activity');

            if (pa.length > 0) {
              if (home.config.programs[pa[0].category]) {

              } else {
                home.config.programs[pa[0].category] = {
                  points: 0
                };
              }
            }

            this.homepage.init(home, 'blog')
              .catch(e => console.log(e));
          }
        }
      }
      resolve(status);
    })
  }
};

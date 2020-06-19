import CardType from './card_type';
export default class program_action extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.image = this.db(card.image);
        if (card.target_cards) card.target_cards.forEach(slide => slide.image = this.db(slide.image));
      } else {
        card.image = this.dd('public/home', card.image);
      }
      (card.target_cards) ? card.is_activities = true: card.is_activities = false;
      if (card.is_activities) card.activities = card.target_cards;
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
      if (home.app_name !== 'castlight_web') {
        container.querySelector(`[data-id=${this.id}]`).onclick = e => {
          this.homepage.previous[this.homepage.section.getAttribute('data-homepage-tab')] = $('main').scrollTop();
          home.config.ways_to_earn.ready = false;

          if (card.target_search) {
            home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = home.config.skin.persona.autosuggest.filter(s => s.name === card.target_search)[0].cards;
            this.homepage.init(home, `sr`)
              .catch(e => console.log(e));
          }
          if (card.target_tab) {
            this.homepage.init(home, `${card.target_tab}`)
              .catch(e => console.log(e));
          }
          if (card.target) {
            home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
            this.homepage.init(home, 'bieber').catch(e => console.log(e));
          }
          if (card.target_cards) {
            home.config.target_cards = card.target_cards;
            home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = this.removeDuplicates(this.flatten(card.target_cards));
            let pa = card.target_cards.filter(t => t.type == 'program_activity');

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
          if (card.target_benefit) {
            home.config.target_cards = card.target_benefit.actions;
            home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = this.removeDuplicates(this.flatten(card.target_benefit.actions));

            let pa = card.target_benefit.actions.filter(t => t.type == 'program_activity');

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
          if (card.name == 'benefits_cc') {
            let ht = container.parentElement.querySelector('.high_touch'),
              H = window.innerHeight
            ht.classList.add('on')
            ht.querySelector('.title').innerHTML = card.label_one_title
            ht.querySelector('.description').innerHTML = card.label_one_sub_title
            ht.querySelector('.label_fsa').innerHTML = card.label_fsa
            ht.querySelector('.caption_fsa').innerHTML = card.caption_fsa
            new TimelineMax()
              .add(TweenMax.to(ht.querySelector('.blue_box'), 1, {
                startAt: {
                  y: H
                },
                y: 0,
                ease: Quint.easeOut
              }))
          }
        }
      } else {
        if (card.target_cards) {
          if (!home.config.clickthrough) {
            container.querySelector('.card .activities_wrapper').parentNode.classList.add('active');
          } else if (card.name === home.config.clickthrough) {
            container.querySelector(`[data-id=${home.config.clickthrough}]`).classList.add('active');
          }
          container.querySelector(`[data-id=${this.id}] .activities_wrapper [data-type="program_at_a_glance"] .more_details`).onclick = e => {
            container.querySelector(`[data-id=${this.id}] .activities_wrapper [data-type="program_at_a_glance"] .collapse`).classList.add('active');
            container.querySelector(`[data-id=${this.id}] .activities_wrapper [data-type="program_at_a_glance"] .more_details`).classList.add('hide');
          }
          container.querySelector(`[data-id=${this.id}] .activities_wrapper [data-type="program_at_a_glance"] .less_details`).onclick = e => {
            container.querySelector(`[data-id=${this.id}] .activities_wrapper [data-type="program_at_a_glance"] .collapse`).classList.remove('active');
            container.querySelector(`[data-id=${this.id}] .activities_wrapper [data-type="program_at_a_glance"] .more_details`).classList.remove('hide');
          }
          card.activities.filter(a => a.type === "program_activity").filter(pa => (pa.target || pa.cta)).forEach(pa => {
            container.querySelector(`[data-id=${this.id}] .activities_wrapper [data-name=${pa.name}] .cta_button_box`).classList.add('action');
            if (!pa.cta) container.querySelector(`[data-id=${this.id}] .activities_wrapper [data-name=${pa.name}] .cta_button_box .cta_button`).innerHTML = 'GO';
          })
        }
        container.querySelector(`[data-id=${this.id}] .group_benefits`).onclick = e => {
          if (card.target_cards) {
            container.querySelector('.card.active').classList.remove('active');
            container.querySelector(`[data-id=${this.id}]`).classList.add('active');
            document.body.querySelector('.container_web').scrollTop = 0;
          }
        }
      }
      resolve(status);
    })
  }
};

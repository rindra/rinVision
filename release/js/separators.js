import CardType from './card_type';
export default class separators extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.config.skin.persona.company_name) {
        card.company = home.config.skin.persona.company_name.toUpperCase();
        card.title = card.title.replace(/{{company}}/g, card.company);
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
      if (home.app_name !== 'castlight_web') {
        if (card.cta) {
          container.querySelector(`[data-id=${this.id}] .cta`).onclick = e => {
            let targetCard = card.target_cards;
            home.config.target_cards = targetCard;
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

        if (card.label_plan_status === 'info') {
          Array.from(container.querySelectorAll(`[data-id=${this.id}] .info_icon_box`)).forEach(info => info.onclick = e => {
            info.parentNode.parentNode.parentNode.querySelector('.rewards_info_popup').classList.add('show');
            info.parentNode.parentNode.parentNode.querySelector('.rewards_info_popup').addEventListener('touchmove', function (event) {
              event.preventDefault();
              event.stopPropagation();
            })
          });
          let rewardsDetails = container.querySelector(`[data-id=${this.id}] .rewards_details`);
          rewardsDetails.onclick = e => rewardsDetails.parentNode.classList.remove('show');
        }

        if (home.app_name == 'healthyblue_app') {
          container.querySelector(`[data-id=${this.id}] .info_icon_box`).onclick = e => {
            document.querySelector('.homepage_popup').classList.add('on')
          }
          document.querySelector('.homepage_popup .button').onclick = e => {
            document.querySelector('.homepage_popup').classList.remove('on')
          }
        }
      }
      resolve(status);
    })
  }
};

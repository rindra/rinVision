import CardType from './card_type';
export default class find_pcp_providers extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      // Map persona location to results
      card.carousel.map(slide => slide.location = home.config.skin.persona.state + " " + home.config.skin.persona.zip);
      // Map network from 'group_number' - use from persona if <network>
      card.carousel.map(slide => slide.network = (slide.group_number == '<network>') ? home.config.skin.persona.occupation : slide.group_number);

      if (home.dev) {
        card.image = this.db(card.image);
        card.carousel.forEach(md => md.image = this.db(md.image));
      } else {
        card.image = this.dd('public/home', card.image);
        card.carousel.forEach(md => md.image = this.dd('public/home', md.image));
      }

      if (card.carousel.filter(s => s.group_title === 'updated').length > 0) card.carousel.map(slide => slide.is_updated = true);

      card.carousel.map(slide => {if (slide.schedule_appt === 'true') slide.is_schedulable = true});
      
      
      if (card.carousel.filter(s => s.popup_content).length > 0) {
        card.carousel.filter(s => s.popup_content).map(slide => slide.is_livepopup = true);
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
      Array.from(container.querySelectorAll(`[data-id=${this.id}] .doctor, .schedule`)).forEach(slide => slide.onclick = e => {
        let slideName = ( e.currentTarget.getAttribute('data-name') || e.currentTarget.closest('.container_updated').querySelector('.doctor').getAttribute('data-name') );
        let target = card.carousel.filter(slide => slide.name === slideName)[0].target;
        let targetTab = card.carousel.filter(slide => slide.name === slideName)[0].target_tab;
        let targetSearch = card.carousel.filter(slide => slide.name === slideName)[0].target_search;
        if (target) {
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.carousel.filter(slide => slide.name === slideName)[0].target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
        }
        if (targetTab) {
          this.homepage.init(home, targetTab)
            .catch(e => console.log(e));
        }
        if (targetSearch) {
          home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = home.config.skin.persona.autosuggest.filter(s => s.name === targetSearch)[0].cards;
          this.homepage.init(home, 'sr')
          .catch(e => console.log(e));
        }
      })

      if (card.carousel.filter(s => s.popup_content).length > 0) {
        Array.from(container.querySelectorAll(`[data-id=${this.id}] .clinical_quality`)).forEach(info => info.onclick = e => {
          info.parentNode.parentNode.parentNode.querySelector('.hospital_info_popup').classList.add('show');
        });
        Array.from(container.querySelectorAll(`[data-id=${this.id}] .exit_icon_box`)).forEach(exit => exit.onclick = e => {
          exit.parentNode.parentNode.parentNode.querySelector('.hospital_info_popup').classList.remove('show');
        });
      }
      resolve(status);
    })
  }
};

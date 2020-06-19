import CardType from './card_type';
export default class search_results_resources_and_benefits extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.carousel.forEach(slide => slide.image = this.db(slide.image));
      } else {
        card.carousel.forEach(slide => slide.image = this.dd('public/home', slide.image));
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
      Array.from(container.querySelectorAll(`[data-id=${this.id}] [data-name]`)).forEach(slide => slide.onclick = e => {
        let slideName = e.currentTarget.getAttribute('data-name');
        let target = card.carousel.filter(slide => slide.name === slideName)[0].target;
        let targetTab = card.carousel.filter(slide => slide.name === slideName)[0].target_tab;
        let targetSearch = card.carousel.filter(slide => slide.name === slideName)[0].target_search;
        let targetCard = card.carousel.filter(slide => slide.name === slideName)[0].target_cards;
        let targetBenefit = card.carousel.filter(slide => slide.name === slideName)[0].target_benefit;
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
        if (targetCard) {
          home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = targetCard;
          this.homepage.init(home, 'blog')
            .catch(e => console.log(e));
        }
        console.log(targetBenefit)
        if (targetBenefit) {
          console.log('benefit')
          home.config.target_cards = targetBenefit.actions;
          home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = this.removeDuplicates(this.flatten(targetBenefit.actions));

          let pa = targetBenefit.actions.filter(t => t.type == 'program_activity');

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
      })
      resolve(status);
    })
  }
};

import CardType from './card_type';
export default class tmp_images extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.image = this.db(card.image);
      } else {
        card.image = this.dd('public/home', card.image);
      }

      super.init(card, container, home)
        .then(status => {
          return this.init_nav(status, card, container, home);
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      container.querySelector(`[data-id=${this.id}]`).onclick = e => {
        this.homepage.previous[this.homepage.section.getAttribute('data-homepage-tab')] = $('main').scrollTop();
        home.config.target_cards = card.target_cards;
        if (card.epilogue) {
          home.config.skin.persona[this.homepage.current_tab] = home.config.skin.persona[this.homepage.current_tab].map(c => (c.name == this.id) ? card.epilogue : c);
        }
        if (card.target_tab) {
          this.homepage.init(home, `${card.target_tab}`)
            .catch(e => console.log(e));
        }
        if (card.target) {
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
        }
        if (card.target_search) {
          home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = home.config.skin.persona.autosuggest.filter(s => s.name === card.target_search)[0].cards;
          this.homepage.init(home, 'sr').catch(e => console.log(e));
        }
        if (card.target_cards) {
          home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = this.removeDuplicates(this.flatten(home.config.target_cards));
          let pa = card.target_cards.filter(t => t.type == 'program_activity');

          if (pa.length > 0) {
            if (home.config.programs[pa[0].category]) {

            } else {
              home.config.programs[pa[0].category] = {points:0};
            }
          }
          this.homepage.init(home, 'blog')
            .catch(e => console.log(e));
        }
        if (card.target_cards && (card.category === 'rewards_store')) {
          home.config.skin.persona[`rewards_${home.config.skin.persona.time}`] = card.target_cards;
          this.homepage.init(home, 'rewards').catch(e => console.log(e));
        }
      }
      resolve(status);
    })
  }
};

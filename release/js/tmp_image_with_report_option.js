import CardType from './card_type';
export default class tmp_image_with_report_option extends CardType {
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
      if (card.status === 'hidden') container.querySelector(`[data-id=${this.id}]`).classList.add('hide');
      container.querySelector(`[data-id=${this.id}] .hotspot_more`).onclick = e => {
        container.classList.add('popup_mode');
        //        e.stopPropagation();
      }
      container.querySelector(`[data-id=${this.id}]`).onclick = e => {
        this.homepage.previous[this.homepage.section.getAttribute('data-homepage-tab')] = $('main').scrollTop();
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
      }
      resolve(status);
    })
  }
};

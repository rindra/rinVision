import CardType from './card_type';
export default class blog_content extends CardType {
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
      let previous_tab = home.config.pagination[home.config.pagination.length - 2];
      container.querySelector('.exit_box').onclick = () => {
        this.homepage.init(home, (previous_tab == '') ? `home` : previous_tab).catch(e => console.log(e));
      }
      container.querySelector(`[data-id=${this.id}] .bottom_blog .button_box`).onclick = e => {
        if (card.target_search) {
          let include = home.config.skin.persona.autosuggest.filter(s => s.name === card.target_search);
          if (include.length > 0) {
            home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = home.config.skin.persona.autosuggest.filter(s => s.name === card.target_search)[0].cards;
            this.homepage.init(home, `sr`)
            .catch(e => console.log(e));
          } else {
            console.log('Include your target search to autosuggest in personas table');
          }
        }
        if (card.target_tab) {
          this.homepage.init(home, `${card.target_tab}`)
            .catch(e => console.log(e));
        }
        if (card.target) {
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
        }
      }
      resolve(status);
    })
  }
};

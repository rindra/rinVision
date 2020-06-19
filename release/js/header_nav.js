import CardType from './card_type';
export default class header_nav extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      super.init(card, container, home).then(status => {
        return this.init_nav(status, card, container, home)
      }).then(status => {
        resolve(status);
      }).catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      this.homepage.section.querySelector(`header .right`).onclick = e => {
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
      }
      this.homepage.section.querySelector(`header .left`).onclick = e => {
        this.homepage.init(home, `home`)
          .catch(e => console.log(e));
      }
      resolve(status);
    })
  }
};

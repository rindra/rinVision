import CardType from './card_type';
export default class full_screen_hidden_card extends CardType {
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
      container.querySelector(`[data-id=${this.id}] .hotspot`).onclick = e => {
        if (card.epilogue) {
          home.config.target_cards.filter(p => p.name === card.epilogue.name)[0].status = null;
          home.config.target_cards.filter(p => p.type === 'button_only')[0].status = 'hidden';
          home.config.target_cards[0].status = 'completed';
          home.config.programs[card.category].add_bg = 'true';
          home.config.programs[card.category].points = 10;
          home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = home.config.target_cards;
        }
        this.homepage.init(home, 'blog').catch(e => console.log(e));
      }
      resolve(status);
    })
  }
};

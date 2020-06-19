import CardType from './card_type';
export default class profile_care_team extends CardType {
  constructor(type, id) {
    super(type, id);
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.label_one_caption = this.db(card.label_one_caption);
        card.label_two_caption = this.db(card.label_two_caption);
      } else {
        card.label_one_caption = this.dd('public/profile', card.label_one_caption);
        card.label_two_caption = this.dd('public/profile', card.label_two_caption);
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
      container.querySelector(`[data-id=${this.id}]`).onclick = e => {
        this.homepage.previous[this.homepage.section.getAttribute('data-homepage-tab')] = $('main').scrollTop();
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

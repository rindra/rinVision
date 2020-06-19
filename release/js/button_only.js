import CardType from './card_type';
export default class button_only extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.is_setup = (home.config.manual_tracking.first_time && card.title == 'core')

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
      if (card.status === 'hidden') container.querySelector(`[data-id=${this.id}]`).classList.add('hide');
      container.querySelector(`[data-id=${this.id}] .button`).onclick = e => {
        if (this.id == 'save_button') {
          let activities = ['steps', 'food', 'sleep']

          activities.forEach(activity => home.config.manual_tracking.calendar.filter(d => d.time == container.querySelector(`.date`).innerHTML)[0][activity] = (container.querySelector(`[data-activity-category=${activity}] .total`).innerHTML == '') ? 0 : container.querySelector(`[data-activity-category=${activity}] .total`).innerHTML)

          container.classList.add('lightboxed');
          container.querySelector(`[data-type="cta_only" ] .overlay`).classList.add('on');
        } else {
          home.config.target_cards.filter(e => e.type === 'program_activity')[0].status = 'complete';
          if (card.target_search) {
            home.config.skin.persona[this.homepage.current_tab] = home.config.skin.persona.autosuggest.filter(s => s.name === card.target_search)[0].cards;
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
            home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = card.target_cards;
            this.homepage.init(home, 'blog')
              .catch(e => console.log(e));
          }
        }
      }
      resolve(status);
    })
  }
};

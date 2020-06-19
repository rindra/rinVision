import CardType from './card_type';
export default class autosuggest_web extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.autosuggest = card.autosuggest.map(s => s = `<span class=trigger>${card.trigger}</span><span class=copy>${s.toLowerCase().split(card.trigger)[1]}</span>`);

      super.init(card, container, home).then(status => {
        return this.init_nav(status, card, container, home)
      }).then(status => {
        resolve(status);
      }).catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {

      container.querySelector('[data-type="autosuggest_web"]').onclick = () => {
        home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = card.cards.filter(c => c);
        this.homepage.init(home, 'sr')
          .then(status => {
            document.querySelector('#homepage_web header input').setAttribute('placeholder', card.display_text);
            document.querySelector('#homepage_web').setAttribute('data-search-name', card.name);
            document.querySelector('#homepage_web .home').classList.remove('on');
            document.querySelector('[data-homepage-web-tab="sr"] .find_care').classList.add('on');
            home.config.search_result = card.display_text;
          })
          .catch(e => console.log(e))
      }
      resolve(status);
    })
  }
};

import CardType from './card_type';
export default class autosuggest extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {

      if (home.dev) {
        card.recommendations.forEach(c => c.image = this.db(c.image));
      } else {
        card.recommendations.forEach(c => c.image = this.dd('public/home', c.image));
      }
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

      container.querySelector('[data-type="autosuggest"]').onclick = () => {
        home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = card.cards.filter(c => c);
        this.homepage.init(home, 'sr')
          .then(status => {
            document.querySelector('#homepage header input').setAttribute('placeholder', card.display_text);
            document.querySelector('#homepage').setAttribute('data-search-name', card.name);
          })
          .catch(e => console.log(e))
      }
      resolve(status);
    })
  }
};

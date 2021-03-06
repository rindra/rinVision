import CardType from './card_type';
export default class program_multiactions extends CardType {
  constructor(type, id) {
    super(type, id);
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
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
        e.currentTarget.classList.add('hidden');
        if (container.querySelector(`.card:nth-child(${Array.from(container.querySelectorAll('.card')).length})`).getAttribute('data-id') == this.id) this.homepage.init(home, 'home').catch(e => console.log(e));
      }
      resolve(status);
    })
  }
};

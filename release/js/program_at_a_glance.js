import CardType from './card_type';
export default class program_at_a_glance extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
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
      container.querySelector(`[data-id="${this.id}"] .see_more`).onclick = e => {
        container.querySelector('.collapse').classList.add('active');
        container.querySelector('.see_more').innerHTML = '';
      }
      container.querySelector(`[data-id="${this.id}"] .see_less`).onclick = e => {
        container.querySelector('.collapse').classList.remove('active');
        container.querySelector('.see_more').innerHTML = 'See more';
      }
      resolve(status);
    })
  }
};

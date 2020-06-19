import CardType from './card_type';
export default class fixed_header_lang_picker extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.hasDone = (card.cta == 'Done');

      super.init(card, container, home).then(status => {
        return this.init_nav(status, card, container, home)
      }).then(status => {
        resolve(status);
      }).catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      Array.from(container.querySelectorAll(`[data-id=${this.id}] .cancel, [data-id=${this.id}] .done`)).forEach(a => a.onclick = e => {        
        this.homepage.init(home, 'more')
          .catch(e => console.log(e));
      })
      container.querySelectorAll(`[data-id=${this.id}] .answer`).forEach(a => a.onclick = e => {
        container.querySelectorAll(`[data-id=${this.id}] .answer`).forEach(b => b.classList.remove('on'));
        e.currentTarget.classList.add('on');        
      })
      resolve(status);
    })
  }
};

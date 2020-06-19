import CardType from './card_type';
export default class global_chat extends CardType {
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
      container.querySelector(`[data-id=${this.id}]`).classList.add('_sticky')
        //      if (home.app_name !== 'castlight_web') this.init_card_click(card, container, home);
      container.querySelector(`[data-id=${this.id}]`).onclick = e => {
        let ht = container.parentElement.querySelector('.high_touch'),
          H = window.innerHeight
        ht.classList.add('on')
        ht.querySelector('.title').innerHTML = card.title
        ht.querySelector('.description').innerHTML = card.description
        ht.querySelector('.label_fsa').innerHTML = card.label_fsa
        ht.querySelector('.caption_fsa').innerHTML = card.caption_fsa
        new TimelineMax()
          .add(TweenMax.to(ht.querySelector('.blue_box'), 1, {
            startAt: {
              y: H
            },
            y: 0,
            ease: Quint.easeOut
          }))
      }
      resolve(status);
    })
  }
};

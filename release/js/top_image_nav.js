import CardType from './card_type';
export default class top_image_nav extends CardType {
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
      //      card.company = home.config.skin.persona.company_name.toUpperCase();
      super.init(card, container, home).then(status => {
        return this.init_nav(status, card, container, home)
      }).then(status => {
        resolve(status);
      }).catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      let num = 0;

      if (card.status == 'registered') {
        container.querySelector(`[data-id=${this.id}] .rsvp [data-button=yes]`).classList.add('on');
      }

      container.querySelector(`[data-id=${this.id}] [data-button=yes]`).onclick = e => container.querySelector(`[data-id=${this.id}] .lightbox`).classList.add('on');
      container.querySelector(`[data-id=${this.id}] .lightbox .no`).onclick = e => container.querySelector(`[data-id=${this.id}] .lightbox`).classList.remove('on');
      container.querySelector(`[data-id=${this.id}] .lightbox .plus`).onclick = e => container.querySelector(`[data-id=${this.id}] .lightbox .number`).innerText = (num < 2) ? ++num : 2;
      container.querySelector(`[data-id=${this.id}] .lightbox .minus`).onclick = e => container.querySelector(`[data-id=${this.id}] .lightbox .number`).innerText = (num > 0) ? --num : 0;
      container.querySelector(`[data-id=${this.id}] .lightbox .yes`).onclick = e => {
        container.querySelector(`[data-id=${this.id}] .confirmationbox`).classList.add('on');
        container.querySelector(`[data-id=${this.id}] .lightbox`).classList.remove('on');
        container.querySelector(`[data-id=${this.id}] .rsvp .points`).innerText = `${card.points-num} spots`;
        container.querySelector(`[data-id=${this.id}] .rsvp [data-button=yes]`).classList.add('on');
        card.points -= num;
        card.status = 'registered';
      }
      container.querySelector(`[data-id=${this.id}] .confirmationbox .no`).onclick = e => container.querySelector(`[data-id=${this.id}] .confirmationbox`).classList.remove('on');
      container.querySelector(`[data-id=${this.id}] .confirmationbox .yes`).onclick = e => container.querySelector(`[data-id=${this.id}] .confirmationbox`).classList.remove('on');
      container.querySelector(`[data-id=${this.id}] .info .address`).onclick = e => container.querySelector(`[data-id=${this.id}] .iosbox`).classList.add('on');
      container.querySelector(`[data-id=${this.id}] .iosbox .cancel`).onclick = e => container.querySelector(`[data-id=${this.id}] .iosbox`).classList.remove('on');
      container.querySelector(`[data-id=${this.id}] .exit_box`).onclick = e => this.homepage.init(home, `home`).catch(e => console.log(e));
      resolve(status);
    })
  }
};

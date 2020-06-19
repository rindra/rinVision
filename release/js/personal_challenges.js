import CardType from './card_type';
export default class personal_challenges extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.first_name = home.config.skin.persona.name;
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
      container.classList.add('bg_white');
      let previous_tab = home.config.pagination[home.config.pagination.length - 2];
      container.querySelector(`[data-id=${this.id}] .go_back`).onclick = e => {
        let currentSlide = container.querySelector(`[data-id=${this.id}] .show`);
        if (currentSlide.previousElementSibling !== null && currentSlide.previousElementSibling.classList.contains('section')) {
          currentSlide.classList.remove('show');
          currentSlide.previousElementSibling.classList.add('show');
        } else {
          this.homepage.init(home, (previous_tab == '') ? `home` : previous_tab).catch(e => console.log(e));
        }
      }
      container.querySelector(`[data-id=${this.id}] .exit`).onclick = e => {
        this.homepage.init(home, (previous_tab == '') ? `home` : previous_tab).catch(e => console.log(e));
      }
      container.querySelectorAll(`[data-id=${this.id}] .section`).forEach(s => s.onclick = e => {
        if (s.classList.contains('show') && s.nextElementSibling !== null) {
          s.classList.remove('show');
          s.nextElementSibling.classList.add('show');
        } else {
          this.homepage.init(home, (previous_tab == '') ? `home` : previous_tab).catch(e => console.log(e));
        }
      });
      resolve(status);
    })
  }
};

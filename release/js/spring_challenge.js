import CardType from './card_type';
export default class spring_challenge extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        card.logo = this.db(home.config.skin.logo);
        card.logo_alt = this.db(home.config.skin.logo_alt);
        card.photo = this.db(home.config.skin.persona.photo);
      } else {
        card.logo = this.dd(`${home.config.skin.domain}`, home.config.skin.logo);
        card.logo_alt = this.dd(`${home.config.skin.domain}`, home.config.skin.logo_alt);
        card.photo = this.dd(`${home.config.skin.name.toLowerCase()}/${home.config.skin.persona.name.toLowerCase()}`, home.config.skin.persona.photo);
      }
      card.initials = home.config.skin.persona.name.split("")[0].toUpperCase() + home.config.skin.persona.last_name.split("")[0].toUpperCase();
      card.username = home.config.skin.persona.name + " " + home.config.skin.persona.last_name;
      card.state = home.config.skin.persona.state.split(",")[1].trim();
      card.location = home.config.skin.persona.state;

      if (home.config.skin.logo_alt !== null) card.is_logo_alt = true;

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

import CardType from './card_type';
export default class intro_community_live extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        // card.image = this.db(card.image);
        card.photo = this.db(home.config.skin.persona.photo);
        card.avatar = this.db(card.avatar);
      } else {
        // card.image = this.dd('public/home', card.image);
        card.photo = this.dd(`${home.config.skin.name.toLowerCase()}/${home.config.skin.persona.name.toLowerCase()}`, home.config.skin.persona.photo);
        card.avatar = this.dd('public/home', card.avatar);
      }
      card.company = home.config.skin.persona.company_name;
      card.initials = home.config.skin.persona.name.split("")[0].toUpperCase() + home.config.skin.persona.last_name.split("")[0].toUpperCase();
      // card.location = home.config.skin.persona.state;
      // card.occupation = (home.config.skin.persona.occupation) ? home.config.skin.persona.occupation : 'Field Marketing';
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
      if (home.config.community.first) {
        document.querySelector('[data-homepage-tab="community"]').classList.add('show_once');
        // home.config.skin.persona[`community_${home.config.skin.persona.time}`] = home.config.skin.persona[`community_${home.config.skin.persona.time}`].filter(c => c.type !== "community_carousel");
      }
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
          home.config.community.first = false;
          document.querySelector('[data-homepage-tab="community"]').classList.remove('show_once');
          container.classList.remove('bg_white');
        }
      });
      if (card.target_cards) {
        container.querySelector(`[data-id=${this.id}] .section.play_nice`).onclick = e => {
          home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = card.target_cards;
          this.homepage.init(home, 'blog').catch(e => console.log(e));
        }
      }
      resolve(status);
    })
  }
};

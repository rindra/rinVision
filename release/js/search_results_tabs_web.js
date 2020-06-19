import CardType from './card_type';
export default class search_results_tabs_web extends CardType {
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
      this.homepage.section.querySelector('.wrapper').classList.add('on', 'no-hover');
      let toggles = Array.from(this.homepage.section.querySelectorAll('.wrapper'));
      toggles.forEach(toggle => toggle.onclick = el => {
        this.toggle(el.currentTarget);
      })
      resolve(status);
    })
  }
  toggle(target) {
  if (Array.from(target.classList).includes('wrapper')) {
    this.homepage.section.querySelectorAll('.wrapper').forEach(button => {
      button.classList.remove('on','no-hover');
    })
    target.classList.add('on','no-hover');
  }
}
};

import CardType from './card_type';
export default class medication_options extends CardType {
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
      let toggles = Array.from(this.homepage.section.querySelectorAll('.toggle_1, .toggle_2'));
      toggles.forEach(toggle => toggle.onclick = el => {
        this.toggle(el.currentTarget);
      })
      resolve(status);
    })
  }
  toggle(target) {
    if (Array.from(target.classList).includes('toggle_2')) {
      this.homepage.section.querySelector('.toggle_1').classList.remove('on');
      target.classList.add('on');
    } else {
      this.homepage.section.querySelector('.toggle_2').classList.remove('on');
      target.classList.add('on');
    }
  }
};

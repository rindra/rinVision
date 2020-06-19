import CardType from './card_type';
export default class interactive_survey extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.carousel = card.target_cards;
      card.carousel.forEach(slide => slide.progress = Math.round(100 / card.carousel.length) + '%');

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
      let counter = 0;
      let progress = Math.ceil(100 / card.carousel.length);
      let answers = Array.from(container.querySelectorAll('.answer_box'));
      answers.forEach(answer => answer.onclick = el => {
        if (container.querySelector('.group') !== null && container.querySelector('.on') === null) {
          counter += progress;
          container.querySelector('.deductible').style.width = counter + '%';
        }
        this.click_answer(el.currentTarget);
      })
      this.init_carousel_card_click(card, container, home, 'box');
      container.querySelectorAll(`[data-id=${this.id}] .done`).forEach(done => done.onclick = () => this.homepage.init(home, home.config.pagination[home.config.pagination.length - 2]));
      container.querySelectorAll(`[data-id=${this.id}] .button`).forEach(button => button.onclick = () => {
        container.querySelector('.survey_container').removeChild(container.querySelector('.group'));
        if (container.querySelector('.group') !== null) container.querySelector('.deductible').style.width = counter + '%';
        if (container.querySelector('.group') === null) container.querySelector('.completed_message').classList.add('show');
        container.querySelector(`[data-id=${this.id}] .completed_message`).onclick = () => this.homepage.init(home, home.config.pagination[home.config.pagination.length - 2]);
      })
      resolve(status);
    })
  }
  click_answer(target) {
    if (Array.from(target.classList).includes('answer_box')) {
      this.homepage.section.querySelectorAll('.answer_box').forEach(answer => {
        answer.classList.remove('on');
      })
      target.classList.add('on');
    }
  }
};

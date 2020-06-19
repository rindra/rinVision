import CardType from './card_type';
export default class healthy_dos extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.title = (home.config.skin.persona.time == 'start') ? card.label_one_title : (home.config.skin.persona.time == 'progress') ? card.label_two_title : card.label_three_title;
      home.todos_month = card.title;
      if (home.config.skin.persona[`todo_${home.config.skin.persona.time}`]) {
        card.total = home.config.skin.persona[`todo_${home.config.skin.persona.time}`].length - 1;
        card.total_completed = home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(c => c.status == 'complete').length;
        card.tasks_left = card.total - card.total_completed;
        card.cards = home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(c => c.type == 'todo_card');
      } else {
        card.visible = false;
      }

      super.init(card, container, home).then(status => {
        return this.init_nav(status, card, container, home)
      }).then(status => {
        resolve(status);
      }).catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      container.querySelector(`[data-id=${this.id}]`).onclick = e => {
        if (card.target_tab) {
          this.homepage.init(home, `${card.target_tab}`)
            .catch(e => console.log(e));
        }
      }
      resolve(status);
    })
  }
};

import CardType from './card_type';
export default class top_incentive extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.outof = home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(t => t.type == 'todo_card').map(t => Number(t.points.split('$')[1])).reduce((a, v) => a + v);
      card.actual = 0;
      if (home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(t => t.label_three_caption === "milestone").length > 0) card.is_milestone = true;

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
      if (home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(t => t.label_three_caption === "milestone").length > 0) container.querySelector(`[data-id=${this.id}]`).style.marginBottom = '7vh';
      resolve(status);
    })
  }
};

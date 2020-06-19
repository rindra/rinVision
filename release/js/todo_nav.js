import CardType from './card_type';
export default class todo_nav extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {

      //      card.total = home.config.skin.persona[`todo_${home.config.skin.persona.time}`].length-1;
      if (home.config.language === 'german') card.is_german = true;
      if (home.config.language === 'chinese') card.is_chinese = true;
      card.total = home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(c => c.type == 'todo_card').length;
      card.total_completed = home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(c => c.status == 'complete').length;

      super.init(card, container, home).then(status => {
        return this.init_nav(status, card, container, home)
      }).then(status => {
        resolve(status);
      }).catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      this.homepage.section.querySelector('header .title').innerHTML = home.todos_month;
      if (home.config.skin.style == 'cab') this.homepage.section.querySelector('header .title').innerHTML = 'Rewards';
      if (home.config.language === 'german') this.homepage.section.querySelector('header .title').innerHTML = 'Belohnungen';
      if (home.config.language === 'spanish') this.homepage.section.querySelector('header .title').innerHTML = 'Recompensass';
      if (home.config.language === 'chinese') this.homepage.section.querySelector('header .title').innerHTML = '奖励';
      resolve(status);
    })
  }
};

import CardType from './card_type';
export default class cta_only extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {

      card.isReminded = (home.config.manual_tracking.first_reminder);
      card.reminder = home.config.manual_tracking.reminder_time;

      super.init(card, container, home).then(status => {
        return this.init_nav(status, card, container, home)
      }).then(status => {
        resolve(status);
      }).catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      Array.from(container.querySelectorAll(`[data-id=${this.id}] .cta, [data-id=${this.id}] .ok`)).forEach(a => a.onclick = e => {      
        if (card.target_cards) {
          home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = this.removeDuplicates(this.flatten(card.target_cards));
          this.homepage.init(home, 'blog')
            .catch(e => console.log(e));
        }
      })
      Array.from(container.querySelectorAll(`[data-id=${this.id}] .not_now, [data-id=${this.id}] .close`)).forEach(b => b.onclick = e => {
        container.classList.remove('lightboxed');
        container.querySelector(`[data-id=${this.id}] .overlay`).classList.remove('on');
      })
      if (container.querySelector(`[data-id=${this.id}] .sub`)) {
        container.querySelector(`[data-id=${this.id}] .sub`).onclick = e => {
          home.config.manual_tracking.first_reminder = false;
          container.classList.remove('lightboxed');
          container.querySelector(`[data-id=${this.id}] .overlay`).classList.remove('on');
        }
      }
      resolve(status);
    })
  }
};

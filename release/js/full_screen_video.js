import CardType from './card_type';
export default class full_screen_video extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      super.init(card, container, home).then(status => {
        return this.init_nav(status, card, container, home)
      }).then(status => {
        resolve(status);
      }).catch(e => console.log(e));
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      container.querySelector(`[data-id=${this.id}] video`).play()
        //      container.querySelector(`[data-id=${this.id}] video`).pause()
      container.querySelector(`[data-id=${this.id}] video`).webkitExitFullScreen() //trowing an error in ios, deprecated in chrome
      container.querySelector(`[data-id=${this.id}] video`).controls = false
      container.querySelector(`[data-id=${this.id}] .hotspot`).onclick = e => {
        if (card.target) {
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
        }
      }
      resolve(status);
    })
  }
};

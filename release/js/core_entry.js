import CardType from './card_type';
export default class core_entry extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
    this.prc = 0;
    this.today = '0';
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
      let ref = this;

      this.today = String(home.config.manual_tracking.calendar.filter(d => d.time == container.querySelector(`.date `).innerHTML)[0][card.category]);

      container.querySelector(`[data-id=${this.id}] .label`).innerHTML = `${card.label_fsa?card.label_fsa:0} <span class=b>${this.today}</span>`;
      container.querySelector(`[data-id=${this.id}] .total`).innerHTML = this.today;
      container.querySelector(`[data-id=${this.id}] video`).play()
      container.querySelector(`[data-id=${this.id}] video`).pause()
      container.querySelector(`[data-id=${this.id}] video`).webkitExitFullScreen() //trowing an error in ios, deprecated in chrome
      container.querySelector(`[data-id=${this.id}] video`).controls = false
      Draggable.create(container.querySelector(`[data-id=${this.id}] .circle`), {
        lockAxis: true,
        bounds: container.querySelector(`[data-id=${this.id}] .slider`),
        onDrag: function () {
          ref.drag(this.x, this.maxX, card, container, home)
        }
      });
      container.querySelector(`[data-id=${this.id}] .cta`).onclick = () => {
        if (card.target) {
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
          this.homepage.init(home, 'bieber').catch(e => console.log(e));
        }
      }
      resolve(status);
    })
  }
  drag(x, max, card, container, home) {
    this.prc = x / max;
    this.today = String(home.config.manual_tracking.calendar.filter(d => d.time == container.querySelector(`.date `).innerHTML)[0][card.category]);
    container.querySelector(`[data-id=${this.id}] .bar`).style.width = this.prc * 100 + '%';
    container.querySelector(`[data-id=${this.id}] .amount`).innerHTML = `+${Math.floor(this.prc * card.points).toLocaleString('currency')}`;
    container.querySelector(`[data-id=${this.id}] .total`).innerHTML = `${Math.floor(this.prc * card.points + Number(this.today.replace(',',''))).toLocaleString('currency')}`;
    container.querySelector(`[data-id=${this.id}] video`).currentTime = this.prc * container.querySelector(`[data-id=${this.id}] video`).duration;
  }
};

import CardType from './card_type';
export default class top_social extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
    this.tween = null;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {

      if (home.dev) {
        card.image = this.db(card.image);
      } else {
        card.image = this.dd('public/home', card.image);
      }

      let prc = (home.config.skin.persona[`todo_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`todo_${home.config.skin.persona.time}`].filter(c => c.status == 'complete').length / (home.config.skin.persona[`todo_${home.config.skin.persona.time}`].length - 1) : 0;

      prc = .65;


      super.init(card, container, home).then(status => {
          return this.init_nav(status, card, container, home)
        })
        .then(status => {
          this.update_smile(prc);
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  update_smile(prc) {
    return new Promise((resolve, reject) => {
//      let motionPath = MorphSVGPlugin.pathDataToBezier("#motionPath", {
//        align: "#pill"
//      });
//      TweenMax.set("#pill", {
//        xPercent: -50,
//        yPercent: -50
//      });
//
//      let pill = TweenMax.to("#pill", 3, {
//        bezier: {
//          values: motionPath,
//          type: "cubic"
//        },
//        ease: Linear.easeNone
//      });

      let path = TweenMax.to("#mainMotionPath", 3, {
        startAt: {
          drawSVG: '0%'
        },
        drawSVG: '100%',
        ease: Linear.easeNone
      });

      let tl = new TimelineMax();
      tl.add(path, 0);
//      tl.add(pill, 0);
      tl.pause();

      TweenMax.to(tl, 3, {
        progress: prc,
        ease: Quint.easeInOut
      });

      resolve(status);
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      container.querySelector(`[data-id=${this.id}] [data-tab="dashboard"]`).onclick = e => {
        this.homepage.init(home, `home`)
          .catch(e => console.log(e));

      }
      resolve(status);
    })
  }
};

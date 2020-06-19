import Section from './section';

export default class WhyCastlight extends Section {
  constructor(id, autoplay) {
    super(id, autoplay);
    this.scroll = null;
  }
  init_json(home){
    return new Promise((resolve, reject) => {
      $.getJSON((home.dev) ? `https://castlight-db.herokuapp.com/walkthrough.json?_=${Date.now()}` : `${cordova.file.dataDirectory}/walkthrough.json?_=${Date.now()}`)
      .then(data => {
        resolve(data);
      })
    });
  }
  init(home) {
    return new Promise((resolve, reject) => {
      this.init_json(home)
        .then(data => {
          let obj = {
            dev: true,
            config: data
          }
          if (home.dev) {
            obj.config.walkthrough.forEach( slide => {
              slide.image = this.db(slide.image);
            });
          } else {
            obj.config.walkthrough.forEach( slide => {
              slide.image = this.dd('public/walkthrough', slide.image);
            });
          }
          return super.init(obj)
        })
        .then(status => {
          return this.init_carousel(status)
        })
        .then(status => {
          return this.init_nav(status)
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    });
  }

  init_carousel(status) {
    return new Promise((resolve, reject) => {
      let ref = this;
      this.scroll = new IScroll('#why_castlight .carousel', {
        eventPassthrough: true,
        scrollX: true,
        scrollY: false,
        scrollbars: false,
        preventDefault: false,
        snap: true,
        momentum: false,
        tap: 'REWARD_TAPPED'
      });

      this.scroll.goToPage(0, 0, 500, IScroll.utils.ease.circular);
      this.scroll.on('scrollEnd', function (el) {
        let slideNum = ref.scroll.currentPage.pageX;

        Array.from(ref.section.querySelectorAll('.dot')).forEach(dot => {
          dot.classList.remove('blue_dot');
        });
        ref.section.querySelector(`.dot:nth-child(${slideNum + 1})`).classList.add('blue_dot');
      });
      resolve(status);
    })
  }
  init_nav(status) {
    return new Promise((resolve, reject) => {
      this.section.querySelector('[data-name="get_started"]').onclick = () => {
        location.reload();
      };
      resolve(status);
    })
  }
};

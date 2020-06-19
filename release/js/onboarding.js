import Section from './section';
import Tracker from './tracker';
import Homepage from './homepage';

export default class OnBoarding extends Section {
  constructor(id, autoplay, origin) {
    super(id, autoplay);
    this.scroll = null;
    this.front = null;
    this.back = null;
    this.origin = origin;
  }
  init(home) {
    return new Promise((resolve, reject) => {
      if (home.config.language === '' || home.config.language === 'english') {
        home.config.skin.persona.onboarding = home.config.skin.persona.onboarding.filter(slide => slide.language === null);
      }
      if (home.config.language === 'german') {
        home.config.skin.persona.onboarding = home.config.skin.persona.onboarding.filter(slide => slide.language === 'german');
      }
      if (home.config.language === 'chinese') {
        home.config.skin.persona.onboarding = home.config.skin.persona.onboarding.filter(slide => slide.language === 'chinese');
      }
      if (home.config.language === 'spanish') {
        home.config.skin.persona.onboarding = home.config.skin.persona.onboarding.filter(slide => slide.language === 'spanish');
      }

      if (home.dev) {
        home.config.skin.logo = this.db(home.config.skin.logo);
        home.config.skin.onboarding_image = this.db(home.config.skin.onboarding_image);
        if (home.config.skin.persona.onboarding) {
          home.config.skin.persona.onboarding.forEach(slide => slide.image = this.db(slide.image));
          home.config.skin.onboarding = home.config.skin.persona.onboarding;
        } else {
          home.config.skin.onboarding.forEach(slide => slide.image = this.db(slide.image));
        }
      } else {
        home.config.skin.logo = this.dd(`${home.config.skin.domain}`, home.config.skin.logo);
        home.config.skin.onboarding_image = this.dd(`${home.config.skin.domain}`, home.config.skin.onboarding_image);
        if (home.config.skin.persona.onboarding) {
          home.config.skin.persona.onboarding.forEach(slide => slide.image = this.dd('public/home', slide.image));
          home.config.skin.onboarding = home.config.skin.persona.onboarding;
        } else {
          home.config.skin.onboarding.forEach(slide => slide.image = this.dd('public/home', slide.image));
        }
      }

      super.init(home)
        .then(status => {
          return this.init_carousel(home, status)
        })
        .then(status => {
          return this.init_nav(status, home)
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  init_carousel(home, status) {
    return new Promise((resolve, reject) => {
      let ref = this,
        buttons;

      if (home.config.skin.persona.onboarding) {
        Array.from(this.section.querySelectorAll('#onboarding .carousel .slide')).forEach(div => {
          if (home.config.skin.persona.onboarding.filter(slide => div.getAttribute('data-slide') == slide.type).length > 0) {

          } else {
            this.section.querySelector(`[data-slide=${div.getAttribute('data-slide')}]`).parentNode.removeChild(this.section.querySelector(`[data-slide=${div.getAttribute('data-slide')}]`));
          }
        })
      }

      this.front = this.section.querySelector('[data-layer="front"]');
      this.back = this.section.querySelector('[data-layer="back"]');

      this.scroll = new IScroll('#onboarding .carousel', {
        eventPassthrough: true,
        scrollX: true,
        scrollY: false,
        scrollbars: false,
        preventDefault: false,
        snap: true,
        momentum: false,
        tap: 'BOX_TAPPED',
        probeType: 3
      });
      //this.scroll.on('scroll', this.update);
      this.scroll.on('scroll', function (e) {
        ref.update(home, this);
      });

      this.scroll.goToPage(0, 0, 500, IScroll.utils.ease.circular);

      buttons = Array.from(this.section.querySelectorAll('[data-slide="doctors"] .doctor, [data-slide="goals"] .goal'));
      buttons.forEach((button, i) => {
        button.addEventListener('BOX_TAPPED', e => {
          (Array.from(button.classList).includes('active')) ? button.classList.remove('active'): button.classList.add('active');
        })
      });

      this.scroll.on('scrollEnd', function (el) {
        let slideNum = ref.scroll.currentPage.pageX;

        Array.from(ref.section.querySelectorAll('.dots_container .dot')).forEach(dot => {
          dot.classList.remove('blue_dot');
          if (home.config.skin.button_background_color) dot.style.backgroundColor = '#cccccc';
        });
        if (ref.section.querySelector(`.dots_container .dot:nth-child(${slideNum + 1})`)) ref.section.querySelector(`.dots_container .dot:nth-child(${slideNum + 1})`).classList.add('blue_dot');
        if (home.config.skin.button_background_color && ref.section.querySelector(".blue_dot")) ref.section.querySelector(".blue_dot").style.backgroundColor = home.config.skin.button_background_color;
        ref.section.setAttribute('data-onboarding-current-slide', slideNum);
      });

      if (Array.from(this.section.querySelectorAll('.dots_container .dot')).length == 1) this.section.querySelector('.dots_container .dots').classList.add('hidden');
      resolve(status);
    })
  }
  update(home, is) {
    let l = $(window).width() * 4;
    TweenMax.to(this.back, 1, {
      x: -(Math.abs(is.x / l)) * 200,
      ease: Quint.easeOut
    })
    TweenMax.to(this.front, 1, {
      x: -(Math.abs(is.x / l)) * 400,
      ease: Quint.easeOut
    })
  }
  init_nav(status, home) {
    return new Promise((resolve, reject) => {
      if (home.config.language === 'german') {
        Array.from(this.section.querySelectorAll('[data-name="next"]')).forEach((b, i) => {
          (i < (this.section.querySelectorAll('[data-name="next"]').length - 1)) ? b.innerHTML = 'WEITER' : b.innerHTML = 'FERTIG!';
        });
      }
      if (home.config.language === 'chinese') {
        Array.from(this.section.querySelectorAll('[data-name="next"]')).forEach((b, i) => {
          (i < (this.section.querySelectorAll('[data-name="next"]').length - 1)) ? b.innerHTML = '下一步' : b.innerHTML = '全部完成！';
        });
      }
      if (home.config.language === 'spanish') {
        Array.from(this.section.querySelectorAll('[data-name="next"]')).forEach((b, i) => {
          (i < (this.section.querySelectorAll('[data-name="next"]').length - 1)) ? b.innerHTML = 'SIGUIENTE' : b.innerHTML = '¡TODO LISTO!';
        });
      }
      Array.from(this.section.querySelectorAll('[data-name="next"]')).forEach(b => b.onclick = () => {
        let slideNum = this.scroll.currentPage.pageX,
          slides = this.scroll.pages.length;
        if (slideNum + 1 < slides) {
          this.scroll.goToPage(slideNum + 1, 0, 500, IScroll.utils.ease.circular);
        } else {
          let homepage = new Homepage('#homepage', true, home, this.origin);
          homepage.init(home)
            .then(status => {
              return homepage.init_first_interstitial(status, home)
            })
            .then(status => {
              console.log(status)
            })
            .catch(e => console.log(e))
        }
      })

      resolve(status);
    })
  }
}

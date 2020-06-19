import CardType from './card_type';
export default class personalized_for_you_cab extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
    this.scroll = null;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      let personalizedActivities = home.config.skin.persona[`personalized_for_you_${home.config.skin.persona.time}`];
      // card.carousel = (home.config.skin.persona[`personalized_for_you_${home.config.skin.persona.time}`]) ? home.config.skin.persona[`personalized_for_you_${home.config.skin.persona.time}`] : null;
      if (home.config.language === 'german') {
        card.carousel = personalizedActivities.filter(c => c.language === 'german');
      }
      if (home.config.language === 'chinese') {
        card.carousel = personalizedActivities.filter(c => c.language === 'chinese');
      }
      if (home.config.language === 'spanish') {
        card.carousel = personalizedActivities.filter(c => c.language === 'spanish');
      }
      if (home.config.language === '' || home.config.language === 'english') {
        card.carousel = personalizedActivities.filter(c => c.language === null) ? personalizedActivities.filter(c => c.language === null) : null;
      }
      if (home.dev) {
        card.carousel.forEach(slide => slide.image = this.db(slide.image));
        card.carousel.forEach(slide => slide.avatar = this.db(slide.avatar));
      } else {
        card.carousel.forEach(slide => slide.image = this.dd('public/home', slide.image));
        card.carousel.forEach(slide => slide.avatar = this.dd('public/home', slide.avatar));
      }

      card.carousel.forEach(slide => slide.is_tmp_images = (slide.type == 'tmp_images'));
      card.carousel.forEach(slide => slide.is_user_journey = (slide.type == 'user_journey'));
      card.carousel.forEach(slide => slide.caption_store_credit ? slide.show_incentive = true : slide.show_incentive = false);
      card.carousel.forEach(slide => slide.label_store_credit ? slide.label_incentive = true : slide.label_incentive = false);
      card.carousel.forEach(slide => slide.date_updated ? slide.show_new = true : slide.show_new = false);

      super.init(card, container, home)
        .then(status => {
          return this.init_carousel(status, card, container, home)
        })
        .then(status => {
          return this.init_nav(status, card, container, home)
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  update(home, is) {
    let next = Math.trunc(Math.abs(is.x / is.wrapperWidth)) + 2,
      x = 0;
    if (document.querySelector(`[data-id=${this.id}] .layers`)) {
      TweenMax.to(`[data-id=${this.id}] .layers`, 1, {
        x: (is.x / is.scrollerWidth) * document.querySelector(`[data-id=${this.id}] .layers`).clientWidth,
        ease: Quint.easeOut
      });
    }
    if (document.querySelector(`[data-id=${this.id}] .grey_dot`)) {
      TweenMax.to(`[data-id=${this.id}] .grey_dot`, 1, {
        x: -(is.x / is.scrollerWidth) * document.querySelector(`[data-id=${this.id}] .static .dots`).clientWidth /*+ document.querySelector(`[data-id=${this.id}] .static .dots .grey_dot`).clientWidth/2*/ ,
        ease: Quint.easeOut
      });
    }
  }
  init_carousel(status, card, container, home) {
    return new Promise((resolve, reject) => {
      let ref = this,
        buttons;

      this.scroll = new IScroll(`[data-id=${this.id}] .carousel`, {
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

      this.scroll.on('scroll', function (e) {
        ref.update(home, this);
      });

      resolve(status);
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      if (home.app_name !== 'castlight_web') {
      this.homepage.section.removeAttribute('data-activity');
      card.carousel.filter(slide => slide.category).forEach(s => {
        if (home.config.programs[s.category] && home.config.programs[s.category].completed_activities) {
          container.querySelector(`[data-id=${this.id}] [data-user-journey=${s.name}]`).classList.add('show_end');
        }
      });
      let hotspots = Array.from(container.querySelectorAll(`[data-id=${this.id}] .slide .hotspot`));
      hotspots.forEach((hotspot, i) => {
        hotspot.addEventListener('BOX_TAPPED', e => {
          let slideName = e.currentTarget.getAttribute('data-slide');
          let target = card.carousel.filter(slide => slide.name === slideName)[0].target;
          let targetTab = card.carousel.filter(slide => slide.name === slideName)[0].target_tab;
          let targetSearch = card.carousel.filter(slide => slide.name === slideName)[0].target_search;
          let targetCard = card.carousel.filter(slide => slide.name === slideName)[0].target_cards;
          let targetBenefit = card.carousel.filter(slide => slide.name === slideName)[0].target_benefit;

          home.config.target_cards = targetCard;

          this.homepage.previous[this.homepage.section.getAttribute('data-homepage-tab')] = $('main').scrollTop();
          if (target) {
            home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.carousel.filter(slide => slide.name === slideName)[0].target];
            this.homepage.init(home, 'bieber').catch(e => console.log(e));
          }
          if (targetTab) {
            this.homepage.init(home, targetTab)
              .catch(e => console.log(e));
          }
          if (targetSearch) {
            home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = home.config.skin.persona.autosuggest.filter(s => s.name === targetSearch)[0].cards;
            this.homepage.init(home, 'sr')
              .catch(e => console.log(e));
          }
          if (targetCard) {
            home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = this.removeDuplicates(this.flatten(home.config.target_cards));
            let pa = targetCard.filter(t => t.type == 'program_activity');

            if (pa.length > 0) {
              if (home.config.programs[pa[0].category]) {

              } else {
                home.config.programs[pa[0].category] = {points:0};
              }
            }

            this.homepage.init(home, 'blog')
              .catch(e => console.log(e));
          }
          if (targetBenefit) {
            home.config.target_cards = targetBenefit.actions;
            home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = this.removeDuplicates(this.flatten(targetBenefit.actions));

            let pa = targetBenefit.actions.filter(t => t.type == 'program_activity');

            if (pa.length > 0) {
              if (home.config.programs[pa[0].category]) {

              } else {
                home.config.programs[pa[0].category] = {
                  points: 0
                };
              }
            }

            this.homepage.init(home, 'blog')
              .catch(e => console.log(e));
          }
        })
      });
    } else {
      let moveForward = container.querySelector(`[data-id=${this.id}] .carousel .arrow.forward`);
      let moveBack = container.querySelector(`[data-id=${this.id}] .carousel .arrow.back`);
      let hotspots = container.querySelectorAll(`[data-id=${this.id}] .slide .hotspot`);
      moveForward.addEventListener('BOX_TAPPED', e => {
        this.scroll.next();
      })
      moveBack.addEventListener('BOX_TAPPED', e => {
        this.scroll.prev();
      })
      hotspots.forEach(hotspot => {
        hotspot.addEventListener('BOX_TAPPED', e => {
          if (hotspot.getAttribute('data-clickthrough')) {
            home.config.clickthrough = hotspot.getAttribute('data-clickthrough');
            this.homepage.init(home, 'benefits').catch(e => console.log(e));
          }
        })
      })
    }
    resolve(status);
    })
  }
};

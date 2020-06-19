export default class CardType {
  constructor(type, id) {
    this.id = id;
    this.type = type;
    this.source = document.querySelector(`#${type}_template`).innerHTML;
    this.template = Handlebars.compile(this.source);
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      this.add_card(card, container, home)
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  add_card(card, container, home) {
    return new Promise((resolve, reject) => {
      let el = document.createElement('div');
      el.classList.add('card');
      el.setAttribute('data-id', card.name);
      el.setAttribute('data-type', this.type);
      el.innerHTML = this.template(card);
      container.appendChild(el);
      TweenMax.killTweensOf(this.delay);
      TweenMax.delayedCall(.05, this.delay, [resolve]);
    });
  }
  delay(resolve) {
    resolve();
  }
  db(url) {
    return (url) ? ((url.split('https://www.dropbox.com').length > 1) ? `https://dl.dropboxusercontent.com${url.split('https://www.dropbox.com')[1]}` : url) : null;
  }
  dd(folder, url) {
    return (url) ? (cordova.file.dataDirectory + `${folder.replace(/ /g, '')}/` + ((url.split('file:').length > 1) ? url.split('?dl=0')[0].split('/')[url.split('?dl=0')[0].split('/').length - 1].split('?_=')[0] : url.split('?dl=0')[0].split('/')[url.split('?dl=0')[0].split('/').length - 1]) + `?_=${Date.now()}`) : null;
  }
  init_carousel(home, status, container) {
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

      this.scroll.on('scrollEnd', function (el) {
        let slideNum = ref.scroll.currentPage.pageX;

        Array.from(container.querySelectorAll(`[data-id=${ref.id}] .dot`)).forEach(dot => {
          dot.classList.remove('blue_dot');
        });
        if (container.querySelector(`[data-id=${ref.id}] .dot:nth-child(${slideNum + 1})`)) container.querySelector(`[data-id=${ref.id}] .dot:nth-child(${slideNum + 1})`).classList.add('blue_dot');
      });

      this.scroll.on('scroll', function (e) {
        ref.update(home, this);
      });
      this.scroll.goToPage(0, 0, 500, IScroll.utils.ease.circular);

      resolve(status);
    })
  }
  init_card_click(card, container, home, target = null) {
    container.querySelector(`[data-id=${this.id}] ${(target)?target:''}`).onclick = e => {
      //      this.homepage.previous[this.homepage.section.getAttribute('data-homepage-tab')] = $('main').scrollTop();
      if (card.target_tab) {
        this.homepage.init(home, `${card.target_tab}`)
          .catch(e => console.log(e));
      }
      if (card.target) {
        home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
        this.homepage.init(home, 'bieber').catch(e => console.log(e));
      }
      if (card.target_search) {
        let include = home.config.skin.persona.autosuggest.filter(s => s.name === card.target_search);
        if (include.length > 0) {
          home.config.skin.persona[`sr_${home.config.skin.persona.time}`] = home.config.skin.persona.autosuggest.filter(s => s.name === card.target_search)[0].cards;
          this.homepage.init(home, `sr`)
            .catch(e => console.log(e));
        } else {
          console.log('Include your target search to autosuggest in personas table');
        }
      }
      if (card.target_cards) {
        home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = card.target_cards;
        this.homepage.init(home, 'blog')
          .catch(e => console.log(e));
      }
    }
  }
  init_carousel_card_click(card, container, home, class_name) {
    Array.from(container.querySelectorAll(`[data-id=${this.id}] .${class_name}`)).forEach(slide => slide.onclick = e => {
      let slideName = e.currentTarget.getAttribute('data-name');
      let slideObj = card.carousel.filter(slide => slide.name === slideName)[0];
      let target = card.carousel.filter(slide => slide.name === slideName)[0].target;
      let targetTab = card.carousel.filter(slide => slide.name === slideName)[0].target_tab;
      let targetSearch = card.carousel.filter(slide => slide.name === slideName)[0].target_search;
      let targetCard = card.carousel.filter(slide => slide.name === slideName)[0].target_cards;
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
        if (card.type == 'home_company_updates_cab') {
          home.config.events[slideObj.name] = slideObj;
          if (slideObj.category === 'event') {
            slideObj.company = home.config.skin.persona.company_name.toUpperCase();
            slideObj.type = 'top_image_nav';
            home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = [slideObj];
          }
          if (slideObj.category === 'survey') {
            home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = targetCard;
          }
        } else {
          home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = targetCard;
        }
        this.homepage.init(home, 'blog')
          .catch(e => console.log(e));
      }
    })
  }
  flatten(array) {
    for (let i = 0; i < array.length; Array.isArray(array[i]) && array.splice(i, 1, ...array[i]) || i++) {}
    return array;
  }
  removeDuplicates(arr) {
    let unique_array = [];
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) === -1) {
        unique_array.push(arr[i]);
      }
    }
    return unique_array;
  }
  removeDuplicatesObj(objArr) {
    let uniqueObj = {};
    let uniqueArr = [];
    uniqueObj.activities = [];
    uniqueObj.total_points = 0;
    for (let key in objArr) {
      if (uniqueArr.indexOf(objArr[key].title) === -1) {
        uniqueArr.push(objArr[key].title);
        uniqueObj.activities.push({
          title: objArr[key].title,
          points: objArr[key].points
        });
        uniqueObj.total_points += Number(objArr[key].points);
      }
    }
    return uniqueObj;
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
  }
};

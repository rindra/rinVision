import Section from './section';
import tmp_images_web from './tmp_images_web';
import home_plan_status_web from './home_plan_status_web';
import home_fund_balance_web from './home_fund_balance_web';
import your_claims_web from './your_claims_web';
import separators_web from './separators_web';
import daily_activities_web from './daily_activities_web';
import store_credit_web from './store_credit_web';
import your_care_team_web from './your_care_team_web';
import personalized_for_you_web from './personalized_for_you_web';
import company_updates_web from './company_updates_web';
import earn_points_web from './earn_points_web';
import interesting_reads_web from './interesting_reads_web';
import footer_web from './footer_web';
import search_results_tabs_web from './search_results_tabs_web';
import autosuggest_web from './autosuggest_web';
import top_nav_cab from './top_nav_cab';
import separators from './separators';
import store_credit_cab from './store_credit_cab';
import home_plan_status_cab from './home_plan_status_cab';

export default class HomepageWeb extends Section {
  constructor(id, autoplay, home, origin) {
    super(id, autoplay);

    this.origin = origin;

    this.classes = {
      tmp_images_web,
      home_plan_status_web,
      home_fund_balance_web,
      your_claims_web,
      store_credit_web,
      separators_web,
      daily_activities_web,
      your_care_team_web,
      personalized_for_you_web,
      company_updates_web,
      earn_points_web,
      interesting_reads_web,
      footer_web,
      search_results_tabs_web,
      autosuggest_web,
      top_nav_cab,
      separators,
      store_credit_cab,
      home_plan_status_cab,
    };

    this.current_tab = null;
    this.autosuggest = null;
    this.previous = {
      home: 0
    };
  }
  init(home, tab = (home.tab) ? home.tab : 'home') {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        home.config.skin.logo = this.db(home.config.skin.logo);
      } else {
        home.config.skin.logo = this.dd(`${home.config.skin.domain}`, home.config.skin.logo);
      }

      //      home.config.skin.persona.time = 'end'; //for debug only!!!

      this.current_tab = `${tab}_${home.config.skin.persona.time}`;
      this.cardtypes = (home.config.skin.persona[this.current_tab]) ? home.config.skin.persona[this.current_tab].map(card => (this.classes[card.type]) ? new this.classes[card.type](`${card.type}`, `${card.name}`, this) : undefined) /*.filter(el => el != undefined)*/ : reject(`${this.current_tab} is undefined`);
      super.init(home)
        .then(status => {
          return this.init_nav(status, home, tab, reject)
        })
        .then(status => {
          return this.init_autosuggest(status, home)
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  show_autosuggest(home, query) {
    let match = home.config.skin.persona.autosuggest.filter(result => query == result.trigger)[0];
    Array.from(this.section.querySelectorAll('[data-type="autosuggest_web"]')).forEach(card => card.remove());
    if (match) this.autosuggest.init(match, this.section.querySelector('main'), home);
  }
  init_autosuggest(status, home) {
    return new Promise((resolve, reject) => {
      this.section.querySelector('input').oninput = e => this.show_autosuggest(home, e.target.value.toLowerCase());
      this.autosuggest = new autosuggest_web('autosuggest_web', null, this);
      //this.show_autosuggest(home, 'preg'); //to debug searches only!!!
      resolve(status);
    });
  }
  init_nav(status, home, tab, reject) {
    return new Promise((resolve, reject) => {
      let tabs = Array.from(this.section.querySelectorAll('footer .tab'));
      tabs.forEach(tab => tab.onclick = e => this.init(home, (e.currentTarget).getAttribute('data-name')).catch(e => reject(`${this.current_tab} is undefined`)));
      this.show_tab(tabs, (this.section.querySelector(`[data-name="${tab}"]`)) ? (this.section.querySelector(`[data-name="${tab}"]`)) : tab, home);

      // if (home.config.skin.persona.home_progress) this.section.querySelector('.ffw').onclick = e => this.toggleTime(home);
      // this.section.querySelector('.logout').onclick = e => location.reload();
      // console.log(this.section.querySelector('.homee'));
      // console.log(this.section.querySelector('.home'));
      let tabsWeb = this.section.querySelectorAll('.category');
      tabsWeb.forEach(tab => tab.onclick = e => this.init(home, (e.currentTarget).getAttribute('data-name')).catch(e => reject(`${this.current_tab} is undefined`)));

      // let toggles = Array.from(this.section.querySelectorAll('.category'));
      // toggles.forEach(toggle => toggle.onclick = el => {
      //   this.toggle(el.currentTarget);
      // })
      resolve(status);
    })
  }
  // toggle(target) {
  //   if (Array.from(target.classList).includes('category')) {
  //     this.section.querySelectorAll('.category').forEach(button => {
  //       button.classList.remove('on');
  //     })
  //     target.classList.add('on');
  //   }
  // }
  toggleTime(home) {
    this.previous.home = 0;

    if (home.config.skin.persona.time == 'start') {
      home.config.skin.persona.time = 'progress';
    } else if (home.config.skin.persona.time == 'progress') {
      if (home.config.skin.persona.home_end) {
        home.config.skin.persona.time = 'end';
      } else {
        home.config = $.extend(true, {}, this.origin.config);
        home.config.skin.persona.time = 'start';
      }
    } else {
      home.config = $.extend(true, {}, this.origin.config);
      home.config.skin.persona.time = 'start';
    }

    if (home.config.skin.persona[`interstitial_${home.config.skin.persona.time}`]) {
      home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = home.config.skin.persona[`interstitial_${home.config.skin.persona.time}`];
      this.init(home, 'bieber').catch(e => console.log(e));
    } else {
      this.init(home, 'home').catch(e => console.log(e));
    }
  }
  init_cards(status, home) {
    return new Promise((resolve, reject) => {
      this.init_card(0, resolve, home, status);
    })
  }
  init_card(i, resolve, home, status) {
    if (home.config.skin.persona[this.current_tab] != undefined) {
      let category = home.config.skin.persona[this.current_tab][i].category;
      this.cardtypes[i].init(home.config.skin.persona[this.current_tab][i], this.section.querySelector(`${category}`), home)
      .then(status => {
        if (i + 1 < this.cardtypes.length) this.init_card((this.cardtypes[i + 1]) ? i + 1 : i + 2, resolve, home);
        else resolve('#homepage ready');
      })
      .catch(e => console.log(`${home.config.skin.persona[this.current_tab][i+1].type} is undefined`));
    } else {
      resolve(`${this.current_tab} is undefined`)
    }
  }
  show_tab(tabs, tab, home) {
    let name = (tab.classList) ? tab.getAttribute('data-name') : tab;
    tabs.forEach(tab => tab.classList.remove('on'));
    if (tab.classList) tab.classList.add('on');
    this.current_tab = `${name}_${home.config.skin.persona.time}`;
    this.section.setAttribute('data-homepage-web-tab', name);
    this.section.setAttribute('data-bieber-name', null);
    this.section.setAttribute('data-package', home.config.skin.persona.package);
    //    this.section.setAttribute('data-global-time', home.config.skin.persona.time);
    Array.from(this.section.querySelectorAll('main .card')).forEach(card => card.remove());
    // this.section.querySelector('header input').setAttribute('placeholder', 'Search for doctors, services, conditions, or medicines');
    // switch (name) {
    //   default: this.section.querySelector('header .title').innerHTML = name;
    // }
    this.init_cards(status, home)
      .then(status => {
        // console.log(`[${this.current_tab}] ready`);
        // TweenMax.to({}, .25, {
        //   onComplete: () => $('[data-homepage-tab="home"] main').scrollTop(this.previous['home'])
        // });
      })
  }
};

import IntroType from './intro_type';
import OnBoarding from './onboarding';

export default class intro_push_notifications extends IntroType {
  constructor() {
    super('push_notifications');
    this.minAgo = null;
    this.myint = 0;
  }
  init(container, home) {
    return new Promise((resolve, reject) => {
      this.minAgo = parseInt(home.config.skin.persona.intro.time);
      home.config.skin.persona.intro.livetime = moment().format('h:mm');
      home.config.skin.persona.intro.livedate = moment().format('dddd, D MMM');
      home.config.skin.persona.intro.livetime_ago = this.minAgo + 'm ago';
      home.config.skin.persona.intro.article_img = (home.dev) ? this.db(home.config.skin.persona.intro.article_img) : this.dd('public/intro', home.config.skin.persona.intro.article_img);

      super.init(container, home)
        .then(status => {
          return this.init_layout(home);
        })
        .then(status => {
          return this.init_nav(container, home);
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  init_layout(home) {
    return new Promise((resolve, reject) => {
      this.myint = setInterval(() => {
        this.minAgo++;
        home.config.skin.persona.intro.livetime = moment().format('h:mm');
        home.config.skin.persona.intro.livetime_ago = this.minAgo + 'm ago';
        document.querySelector('.livetime').innerHTML = home.config.skin.persona.intro.livetime;
        document.querySelector('.time-ago').innerHTML = home.config.skin.persona.intro.livetime_ago;
      }, 60000);
      resolve('push notifications ready')
    })
  }
  init_nav(container, home) {
    return new Promise((resolve, reject) => {
      container.querySelector('[data-name="connect_onboarding"]').onclick = e => {
        clearInterval(this.myint);
        let onboarding = new OnBoarding('#onboarding');
        onboarding.init(home)
          .then(status => {
            console.log(status);
          })
          .catch(e => console.log(error))
      }
      resolve('push notifications ready')
    })
  }
};

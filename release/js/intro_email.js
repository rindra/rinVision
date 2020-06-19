import IntroType from './intro_type';
import OnBoarding from './onboarding';

export default class intro_email extends IntroType {
  constructor() {
    super('email');
  }
  init(container, home) {
    return new Promise((resolve, reject) => {
      home.config.skin.persona.intro.firstletter = home.config.skin.persona.intro.from_who.slice(0, 1);
      home.config.skin.persona.intro.article_img = (home.dev) ? this.db(home.config.skin.persona.intro.article_img) : this.dd('public/intro', home.config.skin.persona.intro.article_img);
      home.config.skin.persona.intro.is_email = true;

      super.init(container, home)
        .then(status => {
          return this.init_nav(container, home);
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  init_nav(container, home) {
    return new Promise((resolve, reject) => {
      container.querySelector('.article_button button').onclick = e => {
        let onboarding = new OnBoarding('#onboarding');
        onboarding.init(home)
          .then(status => {
            console.log(status);
          })
          .catch(e => console.log(error))
      }
      resolve('email ready');
    })
  }
};

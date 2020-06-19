import Section from './section';
import OnBoardingWeb from './onboarding_web';

export default class Interstitial extends Section {
  constructor(id, autoplay, origin) {
    super(id, autoplay);
    this.origin = origin;
  }
  init(home) {
    return new Promise((resolve, reject) => {

      super.init(home)
        .then(status => {
          resolve(status);
        })
        .then(status => {
          TweenMax.from(this.section, .5, {
            opacity: 0
          });
          return this.init_nav(status, home)
        })
        .catch(e => console.log(e));
    })
  }
  init_nav(status, home) {
    return new Promise((resolve, reject) => {
      let onboarding_web;
      resolve(status);
      TweenMax.delayedCall(2, () => {
        onboarding_web = new OnBoardingWeb('#onboarding_web', true, this.origin);
        onboarding_web.init(home)
          .then(status => {
            console.log(status);
          })
          .catch(e => console.log(e));
      });
    })
  }

};

import Section from './section';
import intro_push_notifications from './intro_push_notifications';
import intro_email from './intro_email';

export default class Intro extends Section {
  constructor(id, autoplay, origin) {
    super(id, autoplay);
    this.origin = origin;
  }
  init(home) {
    return new Promise((resolve, reject) => {
      let intro;
      switch (home.config.skin.persona.intro.type) {
        case 'email':
          intro = new intro_email();
          break;
        case 'push_notifications':
          intro = new intro_push_notifications();
          break;
      }
      super.init(home)
        .then(status => {
          return intro.init(this.section, home);
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
};

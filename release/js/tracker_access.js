import Section from './section';
import Homepage from './homepage';

export default class TrackerAccess extends Section {
  constructor(id, autoplay, origin) {
    super(id, autoplay);
    this.origin = origin;
  }
  init(home) {
    return new Promise((resolve, reject) => {

      if (home.dev) {
        home.config.skin.tracker.image_access = this.db(home.config.skin.tracker.image_access);
      } else {
        home.config.skin.tracker.image_access = this.dd('tracker/access', home.config.skin.tracker.image_access);
      }

      super.init(home)
        .then(status => {
          return this.init_nav(status, home);
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  init_nav(status, home) {
    return new Promise((resolve, reject) => {
      let toggles = Array.from(this.section.querySelectorAll('.toggle'));
      toggles.forEach(toggle => toggle.onclick = el => this.toggle(el.currentTarget));
      this.section.querySelector('.turn_categories_on').onclick = el => this.toggle_all(el.currentTarget);
      this.section.querySelector('.header .allow').onclick = el => {
        let homepage = new Homepage('#homepage', true, home, this.origin);
        homepage.init(home)
          .then(status => console.log(status))
          .catch(e => console.log(error))
      }
      resolve(status);
    });
  }
  toggle(target) {
    if (Array.from(target.classList).includes('on')) {
      target.classList.remove('on');
    } else {
      target.classList.add('on');
      this.section.querySelector('.container').classList.add('is_allowed');
    }
    if (!Array.from(this.section.querySelector('.dietary_energy .toggle').classList).includes('on') && !Array.from(this.section.querySelector('.steps .toggle').classList).includes('on')) {
      this.section.querySelector('.container').classList.remove('is_allowed');
      this.section.querySelector('.turn_categories_on_info').innerHTML = 'Turn All Categories On';
    }

    if (Array.from(this.section.querySelector('.dietary_energy .toggle').classList).includes('on') && Array.from(this.section.querySelector('.steps .toggle').classList).includes('on')) this.section.querySelector('.turn_categories_on_info').innerHTML = 'Turn All Categories Off';
  }
  toggle_all(target) {
    if (Array.from(target.classList).includes('is_off')) {
      target.querySelector('.turn_categories_on_info').innerHTML = 'Turn All Categories Off';
      target.classList.remove('is_off');
      Array.from(this.section.querySelectorAll('.toggle')).forEach(el => el.classList.add('on'));
      this.section.querySelector('.container').classList.add('is_allowed');
    } else {
      target.querySelector('.turn_categories_on_info').innerHTML = 'Turn All Categories On';
      target.classList.add('is_off');
      Array.from(this.section.querySelectorAll('.toggle')).forEach(el => el.classList.remove('on'));
      this.section.querySelector('.container').classList.remove('is_allowed');
    }

  }
};

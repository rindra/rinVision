import Section from './section';
import TrackerAccess from './tracker_access';

export default class Tracker extends Section {
  constructor(id, autoplay, origin) {
    super(id, autoplay);
    this.origin = origin;
  }
  init(home) {
    return new Promise((resolve, reject) => {
      if (home.dev) {
        home.config.skin.tracker.image = this.db(home.config.skin.tracker.image);
      } else {
        home.config.skin.tracker.image = this.dd('tracker/connect', home.config.skin.tracker.image);
      }

      super.init(home)
        .then(status => {
          resolve(status);
        })
        .then(status => {
          return this.init_nav(status, home)
        })
        .catch(e => console.log(e));
    })
  }
  init_nav(status, home) {
    return new Promise((resolve, reject) => {
      let tracker_access;
      this.section.querySelector('[data-name="connect_now"]').onclick = () => {
        tracker_access = new TrackerAccess('#tracker_access', true, this.origin);
        tracker_access.init(home)
          .then(status => {
            console.log(status);
            tracker_access.play();
          })
          .catch(e => console.log(e));
      };
      resolve(status);
    })
  }

};

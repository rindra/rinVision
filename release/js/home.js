import Section from './section';
import Configurator from './configurator';
import Intro from './intro';
import WhyCastlight from './why_castlight';
import OnBoarding from './onboarding';
import Tracker from './tracker';
import TrackerAccess from './tracker_access';
import Homepage from './homepage';
import Interstitial from './interstitial';
import OnBoardingWeb from './onboarding_web';
import HomepageWeb from './homepage_web';

export default class Home extends Section {
  constructor(id, autoplay) {
    super(id, autoplay);
    this.reference = {};
    this.language = '';
    this.origin = {};
    this.previous_tab = null;
    this.previous_scroll_position = null;
    this.downloaded = null;
    this.debug = {
      status: false,
      //email: 'al@healthyblue.com',
      //      email: 'susan@healthyblue.com',
      //      email: 'susan@caremore.com',
      //email: 'alvin@pinnacle.com',
      //      email: 'jennifer@nationalgrid.com',

      //      email: 'alvin@pinnacle.com',
      email: 'susan@aetna.com',
      //      email: 'alvin@abbott.com',
      //      email: 'molly@citi.com',
      // email: 'zoe@pinnacle.com',
      // email: 'tom@pinnacle.com',
      // email: 'noemi@castlighthealth.com',
      //email: 'molly@colgatepalmolive.com',
      //email: 'matt@graphicpkg.com',
      //      email: 'molly@oracle.com',
      //      email: 'al@healthyblue.com',
      // email: 'zoedup@pcorp.com',
      // email: 'jennifer@nationalgrid.com',
      // email: 'alvin@dow.com',
      // email: 'priya@dow.com',
      //      email: 'al@healthyblue.com',      
      //email: 'al@fujifilm.com',      
      // email: 'priya@mastercard.com',
      // email: 'molly@ally.com',
      //      email: 'molly@bloomberg.com',
      //      email: 'eric@bloomberg.com',
      //            email: 'alex@dollargeneral.com',
      // email: 'eric@ally.com',
      // email: 'robert@ally.com',
      // email: 'alvin@meijer.com',
      //      email: 'alvin@pinnacle.com',
      //      email: 'matt@graphicpkg.com',
      // email: 'susan@healthyblue.com',
      // email: 'alvin@progressive.com',
      // email: 'molly@bluecrossma.com',
      // email: 'rebecca@cab.com',
      // email: 'jennifer@pinnacle.com',
      //  email: 'alex@nike.com',
      // email: 'alvin@rexnord.com',
      // email: 'tom@rexnord.com',
      //      email: 'alex@dollargeneral.com',
      //      email: 'alvin@dg.com',
      //      email: 'al@fujifilm.com',
      //      email: 'molly@acme.com',
      // email: 'alvin@ferguson.com',
      // email: 'jan@voya.com',
      // email: 'alvin@nationwide.com',
      // email: 'zoe@nortonhealthcare.com',
      // email: 'alvin@cigna.com',
      // email: 'zoe@firstrepublic.com',
      // email: 'zoecopy@pinnacle.com',
      // email: 'zoe@azblue.com',
      // email: 'alex@azblue.com',
      // email: 'alex@upmc.com',
      // email: 'jan@questdiagnostics.com',
      // email: 'jan@fidelity.com',
      // email: 'alvin@kiewit.com',
      // email: 'molly@elite.com',
      // email: 'molly@charter.com',
      // email: 'molly@amtrust.com',
      // email: 'michelle@jpmorgan.com',
      // email: 'jan@voya.com',
      // email: 'molly@healthyblue.com',
      // email: 'molly@livingwellky.com',
      // email: 'molly@premera.com',
      // email: 'molly@premerahb.com',
      // email: 'molly@flblue.com',
      // email: 'molly@floridablue.com',
      // email: 'molly@allegion.com',
      //  email: 'alvin@wd.com',
      //  email: 'alvin@internationalpaper.com',
      //  email: 'tom@internationalpaper.com',
      //  email: 'alvin@unum.com',
      //  email: 'zoe@unumuk.com',
      //  email: 'zoe@unum.com',
      // email: 'alvin@boeing.com',
      // email: 'zoe@boeing.com',
      // email: 'molly@hcsc.com',
      // email: 'alex@cab.com',
      // email: 'alex@dell.com',
      // email: 'sam@walmart.com',
      // email: 'ivandrago@cab.com',
      // email: 'ivandrago@pinnacle.com',
      // email: 'rebecca@adobe.com',
      // email: 'rebecca@att.com',
      //       email: 'alvin@quickenloans.com',
      //            email: 'alvin@trelleborg.com',
      // email: 'alex@jbhunt.com',
      // email: 'klaraint@dell.com',
      // email: 'zhen@akamai.com',
      // email: 'zhen@danaher.com',
      // email: 'zoe@danaher.com',
      // email: 'greta@pcorp.com',
      // email: 'molly@ups.com',
      //      email: 'molly@papajohns.com',
      // email: 'jennifer@ey.com',
      // email: 'tom@terracon.com',
      // email: 'perry@healthequity.com',
      // email: 'raj@pinnacle.com',
      // email: 'rebecca@pinnacle.com',
      // email: 'alex@healthyblue.com',
      // email: 'jennifer@dell.com',
      // email: 'alex@whitelabel.com',
      // email: 'jennifer@whitelabel.com',
      // email: 'jennifer@washington.com',
      // email: 'alex_web@cab.com',
      // email: 'molly2@acme.com',
      // email: 'molly@genentech.com',
      // email: 'alex@engage.com',
      // email: 'alex@jetblue.com',
      // email: 'jennifer@vandelay.com',
      // email: 'alex@norton.com',
      // email: 'alex@nortonhealthcare.com',
      // email: 'alex@indiana.com',
      // email: 'jennifer@healthyblue.com',
      // email: 'mel@wellsfargo.com',
      // email: 'kevin@wellsfargo.com',
      // email: 'maria@wellsfargo.com',
      // email: 'alex@ascension.com',
      // email: 'tom@ascension.com',
      // email: 'alex@bny.com',
      // email: 'molly@summit-materials.com',
      // email: 'jeff@pse.com',
      // email: 'alex@in.gov',
      // email: 'tyler@cooperative.com',
      // email: 'rebecca@walmart.com',
      // email: 'rebecca@summit.com',
      // email: 'rebecca@verizon.com',
      // email: 'david@trackandcoach.com',
      // email: 'david@newmillenium.com',
      // email: 'jaime@totalwellbeing.com',
      //page: 'home',
      page: 'homepage',
      //      page: 'onboarding',
      // page: 'interstitial',
      //tab: 'ways_to_earn',
      //app_name: 'engage_app',
      app_name: 'castlight_app',
      //            app_name: 'engage_app',
      //      app_name: 'castlight_app',
      //      app_name: 'healthyblue_app',
      // app_name: 'castlight_web',
    }
  }
  init() {
    return new Promise((resolve, reject) => {

      this.init_cordova('#home ready')
        .then(status => {
          if (this.reference.dev) {
            this.debug.app_name = (document.referrer.includes('healthyblue-mobile')) ? 'healthyblue_app' : this.debug.app_name
          } else {
            if (cordova.file.applicationDirectory.split('Healthy').length > 1) this.debug.app_name = 'healthyblue_app'
          }
          return super.init({
            is_healthy_blue: (this.debug.app_name == 'healthyblue_app')
          })
        })
        .then(status => {
          return this.init_nav(status)
        })
        .then(status => {
          return (this.reference.dev) ? new Promise((res, rej) => res(status)) : this.init_activate_local(status);
        })
        .then(status => {
          let ref = this
          if (this.reference.dev) {
            if (location.hostname == 'castlight.surge.sh' || ref.debug.app_name === 'castlight_web') document.querySelector('body > section').setAttribute('data-app-name', 'castlight_web')
            else document.querySelector('body > section').setAttribute('data-app-name', ref.debug.app_name);
            return new Promise((res, rej) => {
              if (location.hostname == 'castlight-iframe.surge.sh') {
                window.addEventListener("message", function (e) {
                  if (e.origin == 'https://castlight-mobile.surge.sh') {
                    document.querySelector('body > section').setAttribute('data-app-name', 'castlight_app');
                    res(status)
                  } else if (e.origin == 'https://engage-mobile.surge.sh') {
                    document.querySelector('body > section').setAttribute('data-app-name', 'engage_app');
                    res(status)
                  } else if (e.origin == 'https://healthyblue-mobile.surge.sh') {
                    document.querySelector('body > section').setAttribute('data-app-name', 'healthyblue_app');
                    res(status)
                  } else {
                    document.querySelector('body').innerHTML = 'Access denied'
                    rej('not authorized')
                  }
                }, false)
                window.parent.postMessage('ping', 'https://castlight-mobile.surge.sh')
                window.parent.postMessage('ping', 'https://engage-mobile.surge.sh')
                window.parent.postMessage('ping', 'https://healthyblue-mobile.surge.sh')
              } else {
                res(status)
              }
            })

          } else {
            if (cordova.file.applicationDirectory) {
              document.querySelector('body > section').setAttribute('data-app-name', (cordova.file.applicationDirectory.split('Castlight.app').length > 1) ? 'castlight_app' : ((cordova.file.applicationDirectory.split('Healthy').length > 1) ? 'healthyblue_app' : 'engage_app'));
              return $.getJSON(`${cordova.file.dataDirectory}log.json?_=${Date.now()}`);
            } else {
              document.querySelector('body > section').setAttribute('data-app-name', 'castlight_web');
              return new Promise((res, rej) => res(status));
            }
          }
        })
        .then(status => {
          this.downloaded = status;
          this.reference.tab = (this.debug.status) ? this.debug.tab : null;
          this.reference.app_name = document.querySelector('body > section').getAttribute('data-app-name');
          if (this.reference.app_name == 'castlight_app') this.section.querySelector('[data-name=email]').value = 'alvin@pinnacle.com';
          if (this.reference.app_name == 'engage_app') this.section.querySelector('[data-name=email]').value = 'molly@acme.com';
          if (this.reference.app_name == 'healthyblue_app') this.section.querySelector('[data-name=email]').value = 'susan@healthyblue.com';
          // if (this.reference.app_name == 'castlight_web') this.section.querySelector('[data-name-web=email]').value = 'ivandrago@att.com';
          if (this.debug.status) {
            return this.init_activate(this.debug.page);
          }
          resolve(status)
        })
        .catch(e => console.log(e));
    })
  }
  check_cordova_file_dataDirectory(resolve, status) {
    console.log('checking...');
    let sto = setTimeout(() => {
      try {
        if (cordova.file.dataDirectory) {
          resolve(status);
          this.reference.dev = false;
          //          StatusBar.show();
          //          StatusBar.styleDefault();
          console.log(cordova.file.dataDirectory);
          console.log('[mobile] mode');
        }
      } catch (Error) {
        console.log(Error);
        this.check_cordova_file_dataDirectory(resolve, status);
      }
    }, 100);
  }
  init_cordova(status) {
    return new Promise((resolve, reject) => {
      try {
        if (cordova) {
          document.addEventListener('deviceready', () => {
            cordova.plugins.backgroundMode.enable();
            console.log(`[backgroundMode] ready`);
            this.check_cordova_file_dataDirectory(resolve, status);
          });
        }
      } catch (Error) {
        console.log('[dev] mode');
        this.reference.dev = true;
        resolve(status);
      }
    })
  }
  init_nav(status) {
    return new Promise((resolve, reject) => {
      let configurator, why_castlight;
      this.section.querySelector('[data-name="configurator"]').onclick = () => {
        configurator = new Configurator('#configurator');
        configurator.init(this.reference)
          .then(status => {
            console.log(status);
          })
      }
      this.section.querySelector('[data-name="register"]').onclick = e => this.section.querySelector('.register_container').classList.add('on');

      if (this.section.querySelector('[data-name="sso_flow"]')) {
        this.section.querySelector('[data-name="sso_flow"]').onclick = e => this.section.querySelector('.homepage_sso_container').classList.add('on');
        this.section.querySelectorAll('.homepage_sso_container .section').forEach(s => s.onclick = e => {
          if (s.classList.contains('show') && s.nextElementSibling !== null) {
            s.classList.remove('show');
            s.nextElementSibling.classList.add('show');
          } else {
            location.reload();
          }
        });
      }

      this.section.querySelector('[data-name="chat_window"]').onclick = e => this.section.querySelector('.chat_window_container').classList.add('on');
      this.section.querySelector('[data-name="register_german"]').onclick = e => {
        this.section.querySelector('.register_german_container').classList.add('on');
        this.section.querySelector('.homepage_german_container').classList.remove('on');
      }
      this.section.querySelector('[data-name="register_chinese"]').onclick = e => {
        this.section.querySelector('.register_chinese_container').classList.add('on');
        this.section.querySelector('.homepage_chinese_container').classList.remove('on');
      }
      this.section.querySelector('[data-name="register_spanish"]').onclick = e => {
        this.section.querySelector('.register_spanish_container').classList.add('on');
        this.section.querySelector('.homepage_spanish_container').classList.remove('on');
      }
      this.section.querySelectorAll('[data-name="language"]').forEach(lang => lang.onclick = e => {
        this.section.querySelector('.languages_container').classList.add('on');
        this.section.querySelector('.languages_container').style.zIndex = 2;
      })



      this.section.querySelector('[data-action="lang_back"]').onclick = e => {
        if (this.language === 'english' || this.language === '') {
          this.section.querySelector('.languages_container').classList.remove('on')
          this.section.querySelector('.homepage_german_container').classList.remove('on');
          this.section.querySelector('.homepage_chinese_container').classList.remove('on');
          this.section.querySelector('.homepage_spanish_container').classList.remove('on');
        } else {
          this.section.querySelector('.homepage_german_container').classList.remove('on');
          this.section.querySelector('.homepage_chinese_container').classList.remove('on');
          this.section.querySelector('.homepage_spanish_container').classList.remove('on');
          this.section.querySelector(`.homepage_${this.language}_container`).classList.add('on')
          this.section.querySelector('.languages_container').classList.remove('on')
        }
      }

      let languages = this.section.querySelectorAll('.lang');
      languages.forEach(lang => lang.onclick = el => {
        let clickedLang = lang.innerHTML.toLowerCase();
        this.language = clickedLang;
        languages.forEach(l => l.classList.remove('active'));
        this.section.querySelector(`[data-name=${clickedLang}]`).classList.add('active');
      })

      this.section.querySelector('.chat_window_container .slide').onclick = e => {
        this.section.querySelector('.chat_window_container').classList.remove('on');
      }

      this.section.querySelector('.blue_left_arrow_register').onclick = e => {
        this.section.querySelector('.register_container').classList.remove('on');
      }

      this.section.querySelector('.blue_left_arrow_register_german').onclick = e => {
        this.section.querySelector('.register_german_container').classList.remove('on');
        this.section.querySelector('.homepage_german_container').classList.add('on');
      }

      this.section.querySelector('.blue_left_arrow_register_chinese').onclick = e => {
        this.section.querySelector('.register_chinese_container').classList.remove('on');
        this.section.querySelector('.homepage_chinese_container').classList.add('on');
      }

      this.section.querySelector('.blue_left_arrow_register_spanish').onclick = e => {
        this.section.querySelector('.register_spanish_container').classList.remove('on');
        this.section.querySelector('.homepage_spanish_container').classList.add('on');
      }

      this.section.querySelector('.blue_left_arrow_tou').onclick = e => {
        this.section.querySelector('.terms_of_use_container').classList.remove('on');
        this.section.querySelector('.register_container').classList.add('on');
      }

      this.section.querySelector('.blue_left_arrow_ps').onclick = e => {
        this.section.querySelector('.privacy_statement_container').classList.remove('on');
        this.section.querySelector('.register_container').classList.add('on');
      }

      this.section.querySelector('.terms_of_use').onclick = e => {
        this.section.querySelector('.register_container').classList.remove('on');
        this.section.querySelector('.terms_of_use_container').classList.add('on');
      }

      this.section.querySelector('.privacy_statement').onclick = e => {
        this.section.querySelector('.register_container').classList.remove('on');
        this.section.querySelector('.privacy_statement_container').classList.add('on');
      }

      this.section.querySelector('.toggle').onclick = e => this.section.querySelector('.toggle').classList.add('on');
      this.section.querySelector('.toggle_german').onclick = e => this.section.querySelector('.toggle_german').classList.add('on');
      this.section.querySelector('.toggle_chinese').onclick = e => this.section.querySelector('.toggle_chinese').classList.add('on');
      this.section.querySelector('.toggle_spanish').onclick = e => this.section.querySelector('.toggle_spanish').classList.add('on');

      this.section.querySelectorAll('[data-name="sign_in"]').forEach(s => s.onclick = () => {
        this.init_activate('intro')
          .then(page => {
            console.log(page);
          })
          .catch(e => console.log(e));
      })
      this.section.querySelectorAll('[data-name="sign_in_register"]').forEach(s => s.onclick = () => {
          this.init_activate('intro')
            .then(page => {
              console.log(page);
            })
            .catch(e => console.log(e));
        })
        // this.section.querySelector('[data-name="sign_in_web"]').onclick = () => {
        //   this.init_activate('homepage_web')
        //     .then(page => {
        //       console.log(page);
        //     })
        //     .catch(e => console.log(e));
        // }
      this.section.querySelector('[data-name="register_web"]').onclick = () => {
        this.init_activate('interstitial')
          .then(page => {
            console.log(page);
          })
          .catch(e => console.log(e));
      }
      this.section.querySelectorAll('[data-name="fingerprint"], .right').forEach(s => s.onclick = () => {
        this.init_activate('homepage')
          .then(page => {
            console.log(page);
          })
          .catch(e => console.log(e));
      })

      //      this.section.querySelector('[data-name="why_castlight"]').onclick = () => {
      //                why_castlight = new WhyCastlight('#why_castlight');
      //                why_castlight.init(this.reference)
      //                  .then(status => {
      //                    console.log(status);
      //                  })
      //                  .catch(e => console.log(e));
      //      }
      this.section.querySelector('.password').onclick = () => {
        if (this.reference.dev) {

        } else {
          //console.log(cordova.file.dataDirectory);
          let res = [];

          /*this.check_skin_folders()
            .then(skins => {
              return this.check_user_folders(skins.filter(skin => skin.name != 'log.json' && skin.name != '.DS_Store' && skin.name != 'public' && skin.name != 'tracker'));
            })
            .then(res => this.show_picker(res))
            .catch(e => alert(e)); */
          this.section.querySelector('.picker').classList.remove('hidden');
          this.show_picker()

        }
      }

      if (this.debug.app_name == 'healthyblue_app') {
        this.section.querySelector('.not_me').onclick = e => {
          if (e.currentTarget.getAttribute('data-show') == 'false') {
            this.section.querySelectorAll('.email, .password, .configurator_box, .language_box').forEach(i => i.classList.remove('off'))
            e.currentTarget.setAttribute('data-show', 'true')
          } else {
            this.section.querySelectorAll('.email, .password, .configurator_box, .language_box').forEach(i => i.classList.add('off'))
            e.currentTarget.setAttribute('data-show', 'false')
          }
        }
      }

      document.querySelector('body').onclick = e => this.show_hotspot(home, e);

      resolve(status);
    })
  }
  cancel() {
    console.log('CANCELING');
  }
  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const genreA = a.email.toUpperCase();
    const genreB = b.email.toUpperCase();

    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }

  show_picker() {
    let hb = {};
    hb.emails = [];
    hb.emails = this.downloaded.sort(this.compare);
    //    if (config.items.length > 0) {
    //      window.plugins.listpicker.showPicker(config,
    //        item => this.section.querySelector('[data-name=email]').value = item, () => {}
    //      );
    //    }
    this.source_picker = document.querySelector('#picker_template').innerHTML;
    this.template_picker = Handlebars.compile(this.source_picker);
    this.section.querySelector('.picker').innerHTML = this.template_picker(hb);
    Array.from(this.section.querySelectorAll('.picker .email')).forEach(email => email.onclick = e => {
      Array.from(this.section.querySelectorAll('.picker .email')).forEach(email => email.classList.remove('on'));
      e.currentTarget.classList.add('on')
    })
    this.section.querySelector('.picker .cancel').onclick = e => {
      this.section.querySelector('.picker .box').remove();
    }
    this.section.querySelector('.picker .done').onclick = e => {
      Array.from(this.section.querySelectorAll('[data-name="email"]')).forEach(email => email.value = this.section.querySelector('.picker .email.on').innerHTML);
      this.section.querySelector('.picker .box').remove();
    }
  }

  check_user_folder(skins, resolve, index, res) {
    if (index < skins.length) {
      resolveLocalFileSystemURL(`${cordova.file.dataDirectory}/${skins[index]}`, (dirEntry) => {
        dirEntry.createReader().readEntries(entries => this.check_user_folder(skins, resolve, index + 1, [...res, ...entries]))
      })
    } else {
      res = res.filter(entry => entry.isDirectory).map((folder, i) => Object.create({
        //        email: `${folder.name}@${skins[i]}`
        email: `${folder.name}@${folder.fullPath.split('/')[1]}`,
        name: `${folder.name}`,
        skin: `${folder.fullPath.split('/')[1]}`
      }))
      resolve(res);
    }
  }

  check_user_folders(skins) {
    return new Promise((resolve, reject) => {
      this.check_user_folder(skins.map(skin => skin.name), resolve, 0, []);
    })
  }

  check_skin_folders() {
    return new Promise((resolve, reject) => {
      resolveLocalFileSystemURL(cordova.file.dataDirectory, (dirEntry) => {
        dirEntry.createReader().readEntries(entries => resolve(entries))
      })
    });
  }

  show_hotspot(home, e) {
    let hotspot = document.querySelector('#hotspot');
    hotspot.classList.remove('hidden');
    TweenMax.set(hotspot, {
      x: e.pageX - 50,
      y: e.pageY - 50
    });
    TweenMax.to(hotspot, .25, {
      scale: .7
    });
    TweenMax.to(hotspot, .25, {
      opacity: .8
    });
    TweenMax.to(hotspot, .25, {
      delay: .25,
      opacity: 0
    });
    TweenMax.to(hotspot, .25, {
      delay: .25,
      scale: 1,
      onComplete: function () {
        hotspot.classList.add('hidden');
      }
    });
  }

  init_activate_local(status) {
    return new Promise((resolve, reject) => {
      let res = [];

      this.check_skin_folders()
        .then(skins => {
          return this.check_user_folders(skins.filter(skin => skin.name != 'version.json' && skin.name != 'log.json' && skin.name != '.DS_Store' && skin.name != 'public' && skin.name != 'tracker'));
        })
        .then(res => {
          resolve(status);
        })
        .catch(e => alert(e));
    });
  }

  init_activate(page) {
    return new Promise((resolve, reject) => {
      let email = (this.debug.status) ? this.debug.email : Array.from(this.section.querySelectorAll('[data-name="email"],[data-name-web="email"]')).filter(i => i.value !== '')[0].value.toLowerCase(),
        //        persona = email.split('@')[0].toLowerCase(),
        //        skin = email.split('@')[1].toLowerCase(),
        persona,
        skin,
        intro,
        onboarding,
        why_castlight,
        tracker,
        tracker_access,
        homepage,
        interstitial,
        onboarding_web,
        homepage_web;

      new Promise((yes, no) => yes())
        .then(data => $.getJSON((this.reference.dev) ? `https://castlight-db.herokuapp.com/config.json?email=${email}&_=${Date.now()}` : `${cordova.file.dataDirectory}${(this.downloaded.length>0)?this.downloaded.filter(d=>d.email==email)[0].path:null}/config.json?_=${Date.now()}`))
        .then(data => {
          console.log(email)
          if (data.skin) {
            this.reference.config = data;
            //            this.origin.config = $.extend(true, {}, data);

            data.skin.username = data.skin.persona.name.toLowerCase();
            data.skin.domain = data.skin.persona.skin.toLowerCase();
            data.skin.persona.first_name = data.skin.persona.name;
            data.skin.persona.last_name = data.skin.persona.last_name;
            data.skin.persona.time = 'start';
            data.events = {};
            data.programs = [];
            data.language = this.language;
            data.clickthrough = '';
            data.community = {
              first: true,
              new_post: {
                id: 'new_message_sushi',
                visible: false
              }
            }
            data.any = null;
            data.moment = {
              now: moment()
            }
            data.luxon = {
              now: luxon.DateTime.local()
            }
            data.manual_tracking = {
              first_time: true,
              first_reminder: true,
              reminder_time: 'Set a reminder',
              calendar: Array.from({
                length: 7
              }, (v, i) => Object.create({
                time: moment().subtract(i, 'days').format("MMM Do, YYYY"),
                steps: 0,
                food: 0,
                sleep: 0
              }))
            };
            data.ways_to_earn = {
              first: true,
              ready: false,
              home: false,
              current_tab: data.skin.persona.ways_to_earn_default_tab,
              total_incentives: 0,
              total_points: 0,
              current_points: 0,
              total_currently_earning: 0,
              total_currently_earning_items: 0,
              ways_to_earn_origin: [],
              ways_to_earn_incentive: [],
              ways_to_earn_point: [],
              incentive_start: [],
              incentive_progress: [],
              incentive_end: [],
              milestone_end: []
            }
            data.pagination = []


            this.origin.config = $.extend(true, {}, data);

            document.querySelector('[data-app="castlight"] .skin').setAttribute('data-skin', data.skin.persona.skin);
            document.querySelector('[data-app="castlight"] .skin').setAttribute('data-style', data.skin.style);
            document.querySelector('[data-app="castlight"] .skin').setAttribute('data-persona', `${data.skin.persona.first_name} ${data.skin.persona.last_name}`);

            switch (page) {
              case 'intro':
                if (this.reference.config.skin.persona.intro) {
                  intro = new Intro('#intro', true, this.origin);
                  intro.init(this.reference)
                    .then(status => {
                      console.log(status);
                    })
                    .catch(e => {
                      console.log(e);
                    })
                } else {
                  onboarding = new OnBoarding('#onboarding', true, this.origin);
                  onboarding.init(this.reference)
                    .then(status => {
                      console.log(status);
                    })
                    .catch(e => {
                      console.log(error);
                    })
                }
                break;

              case 'onboarding':
                onboarding = new OnBoarding('#onboarding', true, this.origin);
                onboarding.init(this.reference)
                  .then(status => {
                    console.log(status);
                  })
                  .catch(e => {
                    console.log(error);
                  })
                break;

              case 'interstitial':
                interstitial = new Interstitial('#interstitial', true, this.origin);
                interstitial.init(this.reference)
                  .then(status => {
                    console.log(status);
                  })
                  .catch(e => {
                    console.log(error);
                  })
                break;

              case 'homepage_web':
                homepage_web = new HomepageWeb('#homepage_web', true, this.origin);
                homepage_web.init(this.reference)
                  .then(status => {
                    console.log(status);
                  })
                  .catch(e => {
                    console.log(error);
                  })
                break;

              case 'onboarding_web':
                onboarding_web = new OnBoardingWeb('#onboarding_web', true, this.origin);
                onboarding_web.init(this.reference)
                  .then(status => {
                    console.log(status);
                  })
                  .catch(e => {
                    console.log(error);
                  })
                break;

              case 'tracker':
                tracker = new Tracker('#tracker', true, this.origin);
                tracker.init(this.reference)
                  .then(status => {
                    console.log(status);
                  })
                  .catch(e => {
                    console.log(error);
                  })
                break;

              case 'tracker_access':
                tracker_access = new TrackerAccess('#tracker_access', true, this.origin);
                tracker_access.init(this.reference, this.origin)
                  .then(status => {
                    console.log(status);
                  })
                  .catch(e => {
                    console.log(error);
                  })
                break;

              case 'why_castlight':
                why_castlight = new WhyCastlight('#why_castlight');
                why_castlight.init(this.reference)
                  .then(status => {
                    console.log(status);
                  })
                  .catch(e => {
                    console.log(error);
                  })
                break;

              case 'homepage':
                homepage = new Homepage('#homepage', true, this.reference, this.origin);
                homepage.init(this.reference)
                  .then(status => {
                    return homepage.init_first_interstitial(status, this.reference)
                  })
                  .then(status => {
                    console.log(status)
                  })
                  .catch(e => console.log(e))
                break;

              case 'home':
                break;

              default:
                reject(`page ${page} is undefined`);
            }
            resolve(page);
          } else {
            reject('persona is undefined');
          }
        })
        .catch(e => console.log('config is undefined'))
    })
  }
};

import Section from './section';
export default class Configurator extends Section {
  constructor(id, autoplay) {
    super(id, autoplay);
    this.downloaded = [];
    this.personas = [];
    this.version = null;
    this.remote_version = null;
  }

  init(home) {
    return new Promise((resolve, reject) => {
      this.init_json(home)
        .then(data => {
          this.personas = data;
          return super.init(data);
        })
        .then(status => {
          return this.init_nav(status, home)
        })
        .then(status => $.getJSON(`${cordova.file.dataDirectory}log.json?_=${Date.now()}`))
        .then(data => new Promise((res, rej) => {
          this.downloaded = data;
          Array.from(this.section.querySelectorAll('.i_dot')).forEach(b => b.setAttribute('data-i-dot-color', 'blank'));
          Array.from(this.section.querySelectorAll('.persona')).filter(persona => this.downloaded.filter(d => d.email == persona.getAttribute('data-email')).length > 0).map(p => p.querySelector('.i_dot').setAttribute('data-i-dot-color', 'green'));
          res(data);
        }))
        .then(status => $.getJSON(`${cordova.file.applicationDirectory}www/v.json?_=${Date.now()}`))
        .then(data => this.version = (home.app_name == 'castlight_app') ? data.complete : ((home.app_name == 'healthyblue_app') ? data.healthyblue : data.engage))
        .then(data => $.getJSON(`https://castlight-db.herokuapp.com/version?_=${Date.now()}`))
        .then(data => this.remote_version = (home.app_name == 'castlight_app') ? data.complete : ((home.app_name == 'healthyblue_app') ? data.healthyblue : data.engage))
        .then(status => {
          console.log(this.version, this.remote_version, this.version == this.remote_version)
          this.section.querySelector('.version').innerHTML = (this.version == this.remote_version) ? `v${this.version}` : `v${this.version} <a href="javascript: window.open('${(home.app_name=='castlight_app')?'https://castlight-sko.surge.sh/':((home.app_name=='healthyblue_app')?'https://castlight-healthyblue.surge.sh':'https://engage-demo.surge.sh/')}', '_system');">(${this.remote_version} available!)</a>`
          this.section.querySelector('.label_version').innerHTML = `v${this.remote_version}`
          this.section.querySelector(`.version_box`).classList.add((this.version == this.remote_version) ? '' : 'on');
          resolve(status);
        })
        .catch(e => {
          console.log('log is undefined')
            //          $.getJSON(`https://castlight-db.herokuapp.com/version?_=${Date.now()}`)
            //            .then(data => this.save_version(data))
        });
    })
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
  init_json(home) {
    return new Promise((resolve, reject) => {
      $.getJSON(`https://castlight-db.herokuapp.com/config/personas?_=${Date.now()}`)
        .then(data => {
          let o = {};
          o.personas = data.sort(this.compare);
          if (document.querySelector('[data-app="castlight"]').getAttribute('data-app-name') == 'engage_app') o.personas = o.personas.filter(p => (p.package == 'engage_elite_buy_up' || p.package === 'engage_no_community' || p.package === 'wellbeing_engage'))
          else o.personas = o.personas.filter(p => (p.package != 'engage_elite_buy_up' || p.package !== 'engage_no_community' || p.package !== 'wellbeing_engage'));
          //          o.personas.unshift({
          //            email: "Why Castlight?"
          //          });
          resolve(o);
        })
    })
  }
  create_dir(path) {
    return new Promise((resolve, reject) => {
      this.create_dir_api(path, resolve, path.split('/'), 0, '');
    })
  }
  create_dir_api(path, resolve, folders, id, tmp) {
    try {
      resolveLocalFileSystemURL(cordova.file.dataDirectory + tmp, (dirEntry) => {
        dirEntry.getDirectory(folders[id], {
          create: true
        }, () => {
          tmp += '/' + folders[id];
          if (id + 1 < folders.length) this.create_dir_api(path, resolve, folders, id + 1, tmp)
          else resolve(path);
        }, () => {})
      });
    } catch (ReferenceError) {
      console.log('cordova is not defined');
    };
  }
  download_file(loc, path) {
    return new Promise((resolve, reject) => {
      try {
        //make sure to install cordova plugin add cordova-plugin-file-transfer
        let fileTransfer = new FileTransfer();
        fileTransfer.download(
          loc,
          encodeURI(cordova.file.dataDirectory + path + ((loc.split('/')[loc.split('/').length - 1] == 'config') ? '' : '/') + loc.split('/')[loc.split('/').length - 1]), (entry) => {
            resolve(loc.split('/')[loc.split('/').length - 1] + ' complete');
          }, (error) => {
            this.section.querySelector('.error_box').classList.add('on')
            this.section.querySelector('.error_box .description').innerHTML = 'Missing file: ' + error.source + '<br>Code: 404'
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("download error code" + error.code);
          },
          true
        );
      } catch (ReferenceError) {
        TweenMax.killAll(true);
        console.log('cordova is not defined');
      };
    })
  }

  update(home) {
    this.download_file('https://castlight-db.herokuapp.com/config.json', '')
      .then(status => {
        console.log(status);
        //return $.getJSON(`${cordova.file.dataDirectory}config.json`);
      })
      .then(data => {
        //home.config = data;
        /*this.section.querySelector('.container .config-box .title').text('Configuration file downloaded')*/
      })
  }
  download_one_image(index, arrLength, table, resolve, path, step) {

    if (table[index].image) {
      //            console.log(`${this.db(table[index].image)}`);
      //console.log(`${index}/${arrLength}`);
      this.section.querySelector(`[data-status="${step}"] .status`).innerHTML = `${index+1}/${arrLength}`;
      this.download_file(this.db(table[index].image), path)
        .then(() => {
          if (index + 1 < arrLength) {
            this.download_one_image(index + 1, arrLength, table, resolve, path, step)
          } else {
            resolve('Images done!')
          }
        })
    } else {
      //      console.log(`${table[index]}`);
      //      console.log(`${table[index].image}`);
      //      console.log(`bieber: ${this.db(table[index])}`);
      this.download_file(this.db(table[index]), path)
        .then(() => {
          if (index + 1 < arrLength) {
            this.download_one_image(index + 1, arrLength, table, resolve, path, step)
          } else {
            resolve('Images done!')
          }
        })
    }
  }

  download_images(index, arrLength, table, path, step) {
    return new Promise((resolve, reject) => {
      this.download_one_image(0, arrLength, table, resolve, path, step)
    });
  }

  flatten(arr) {
    for (let i = 0; i < arr.length; Array.isArray(arr[i]) && arr.splice(i, 1, ...arr[i]) || i++) {}
    return arr
  }

  download(email) {
    let allImages = [];
    console.log(email);
    this.section.querySelector('.progress').classList.add('on');
    this.section.querySelector('.progress').classList.remove('complete');
    this.section.querySelector('.progress').classList.remove('clean');
    this.section.querySelector('.progress').classList.remove('why');
    this.section.querySelector(`[data-status="why"] .status`).innerHTML = '';
    this.section.querySelector(`[data-status="core"] .status`).innerHTML = '';
    this.section.querySelector(`[data-status="stream"] .status`).innerHTML = '';
    this.section.querySelector(`[data-status="search"] .status`).innerHTML = '';
    this.section.querySelector(`[data-status="epilogue"] .status`).innerHTML = '';
    this.section.querySelector(`[data-status="carousel"] .status`).innerHTML = '';
    this.section.querySelector(`[data-status="flow"] .status`).innerHTML = '';

    if (email == 'Why Castlight?') {
      //      TweenMax.to(`[data-email="${email}"] [data-action="download"]`, 1, {
      //        startAt: {
      //          backgroundColor: '#ffffff'
      //        },
      //        backgroundColor: '#c3dad2',
      //        repeat: -1,
      //        yoyo: true
      //      });
      this.section.querySelector('.progress').classList.add('why');
      let config = {},
        index = 0,
        arrLength;
      this.download_file(`https://castlight-db.herokuapp.com/walkthrough.json?_=${Date.now()}`, '')
        .then(status => {
          console.log(status);
          return $.getJSON(`${cordova.file.dataDirectory}/walkthrough.json?_=${Date.now()}`);
        })
        .then(data => {
          config = data;
          arrLength = config.walkthrough.length;
          return this.download_images(index, arrLength, config.walkthrough, 'public/walkthrough', 'why');
        })
        .then(data => {
          TweenMax.killAll(true);
          console.log('All images have been downloaded!');
          this.section.querySelector('.progress').classList.add('complete');
        })
        .catch(e => console.log(e));

    } else {
      //      TweenMax.to(`[data-email="${email}"] [data-action="download"]`, 1, {
      //        startAt: {
      //          backgroundColor: '#ffffff'
      //        },
      //        backgroundColor: '#00f7fc',
      //        repeat: -1,
      //        yoyo: true
      //      })
      let persona = email.split('@')[0].toLowerCase(),
        //        skin = email.split('@')[1].toLowerCase(),
        skin = email.split('@')[1].toLowerCase(),
        config = {},
        ts = null;

      new Promise((res, rej) => res())
        .then(() => $.getJSON(`https://castlight-db.herokuapp.com/config.json?email=${email}&_=${Date.now()}`))
        .then(data => {
          config = data;
          persona = data.skin.persona.name.toLowerCase();
          skin = data.skin.name.replace(/ /g, '').toLowerCase();
          ts = data.skin.persona.ts;

          this.downloaded.forEach(d => (d.email == email) ? d.ts = ts : d);
          if (this.downloaded.filter(d => d.ts == ts).length == 0) this.downloaded.push({
            email: email,
            path: `${skin}/${persona}`,
            skin: skin,
            persona: persona,
            ts: data.skin.persona.ts
          })

          console.log(this.downloaded);
          return this.download_file(`https://castlight-db.herokuapp.com/config.json?email=${email}&_=${Date.now()}`, `${skin}/${persona}`);
        })
        .then(status => {
          return $.getJSON(`${cordova.file.dataDirectory}${skin}/${persona}/config.json?_=${Date.now()}`)
        })
        .then(data => {
          return this.download_file(this.db(config.skin.logo), `${skin}`)
        })
        .then(data => {
          return (config.skin.logo_alt) ? this.download_file(this.db(config.skin.logo_alt), `${skin}`) : new Promise((resolve, reject) => resolve());
        })
        .then(data => {
          return (config.skin.onboarding_image) ? this.download_file(this.db(config.skin.onboarding_image), `${skin}`) : new Promise((resolve, reject) => resolve());
        })
        .then(status => {
          return (config.skin.persona.photo) ? this.download_file(this.db(config.skin.persona.photo), `${skin}/${persona}`) : new Promise((resolve, reject) => resolve());
        })
        .then(status => {
          return (config.skin.persona.program) ? this.download_file(this.db(config.skin.persona.program), 'public/home') : new Promise((resolve, reject) => resolve());
        })
        .then(status => {
          return (config.skin.persona.intro) ? this.download_file(this.db(config.skin.persona.intro.article_img), 'public/intro') : new Promise((resolve, reject) => resolve());
        })
        .then(status => {
          return (config.skin.tracker) ? this.download_file(this.db(config.skin.tracker.image), 'tracker/connect') : new Promise((resolve, reject) => resolve());
        })
        .then(status => {
          return (config.skin.tracker) ? ((config.skin.tracker.image_access) ? this.download_file(this.db(config.skin.tracker.image_access), 'tracker/access') : new Promise((resolve, reject) => resolve())) : new Promise((resolve, reject) => resolve());
        })
        .then(data => {
          console.log('downloading...core');
          let allcards = [];
          for (let k in config.skin.persona) {
            if (Array.isArray(config.skin.persona[k]) && k != 'pregnancy') allcards = [...allcards, ...config.skin.persona[k]]
          }

          if (config.skin.onboarding) allcards = [...allcards, ...config.skin.onboarding];

          let card_type = allcards.filter(card => (card) ? card.image : null);
          card_type = [...card_type, ...allcards.filter(card => (card) ? card.avatar : null).map(card => card.avatar).map(url => Object.create({
            image: url
          }))]

          card_type = [...new Set(card_type.map(card => card.image))].map(url => Object.create({
            image: url
          }));
          console.log(allcards);

          allImages = [...allImages, ...card_type];

          return new Promise((resolve, reject) => resolve());
        })
        .then(data => {
          console.log('downloading...tmp_images');
          let allcards = [];
          for (let k in config.skin.persona) {
            if (Array.isArray(config.skin.persona[k]) && k != 'pregnancy') allcards = [...allcards, ...config.skin.persona[k]]
          }
          let card_type = allcards.filter(card => (card) ? card.type == 'tmp_images' : null);

          card_type = [...new Set(card_type.map(card => card.image))].map(url => Object.create({
            image: url
          }));
          console.log(card_type)

          allImages = [...allImages, ...card_type];

          return new Promise((resolve, reject) => resolve());
        })
        .then(data => {
          console.log('downloading...target_cards');
          let allcards = [],
            allurls = [],
            alltargets = [],
            alltarget_cards = []

          for (let k in config.skin.persona) {
            if (Array.isArray(config.skin.persona[k]) && k != 'pregnancy') allcards = [...allcards, ...config.skin.persona[k]];
          }
        
        allcards = allcards.filter(c=>c)
        

          allurls = this.flatten(allcards.map(card => card.target_cards)).filter(c => (c) ? c.image : null);
          allurls = [...allurls.map(c => (c.image) ? Object.create({
              image: c.image
            }) : null), ...this.flatten(allurls.map(card => {
              if (card.target) {
                return card.target.carousel.map(url => Object.create({
                  image: url
                }));
              }
            }))
           ]

          alltargets = this.flatten(allcards.map(card => card.target_cards)).filter(c => (c) ? c.target : null);
          alltargets = [...this.flatten(alltargets.map(card => {
            if (card.target) {
              return card.target.carousel.map(url => Object.create({
                image: url
              }));
            }
          }))]

          alltarget_cards = this.flatten(allcards.map(card => card.target_cards)).filter(c => (c) ? c.target_cards : null);
          alltarget_cards = [...this.flatten(alltarget_cards.map(c => c.target_cards)).map(c => (c.image) ? Object.create({
              image: c.image
            }) : null)]
            //          alltarget_cards = [...this.flatten(alltarget_cards.map(c => (c.image) ? Object.create({
            //            image: c.image
            //          }) : null))]

          //          console.log('alltarget_cards', alltarget_cards);


          //          console.log(this.flatten(this.flatten(allcards.map(card => card.target_cards)).filter(c => c).map(c => c.target).filter(c => c).map(c => c.target_cards)).filter(c => c).map(t => t.epilogue).filter(c => c).map(t => t.image).map(url => Object.create({
          //            image: url
          //          })))

          allurls = [...allurls, ...this.flatten(this.flatten(allcards.map(card => card.target_cards)).filter(c => c).map(c => c.target).filter(c => c).map(c => c.target_cards)).filter(c => c).map(t => t.epilogue).filter(c => c).map(t => t.image).filter(c => c).map(url => Object.create({
            image: url
          }))]

          //                    console.log(this.flatten(this.flatten(allcards.map(card => card.target_cards)).filter(c => c).map(c => c.target).filter(c => c).map(c => c.target_cards)).filter(c => c).map(t => t.image).map(url => Object.create({
          //                      image: url
          //                    })))

          allurls = [...allurls, ...this.flatten(this.flatten(allcards.map(card => card.target_cards)).filter(c => c).map(c => c.target).filter(c => c).map(c => c.target_cards)).filter(c => c).map(t => t.image).map(url => Object.create({
            image: url
          }))]

          allcards = [...allurls.filter(c => c), ...alltargets.filter(c => c)]

          allcards = [...allcards, ...alltarget_cards.filter(c => c)]

          console.log(allcards);


          allImages = [...allImages, ...allcards.filter(c => c)];
          return new Promise((resolve, reject) => resolve());
        })
        .then(data => {
          console.log('downloading...target_benefits');
          let allcards = [],
            allurls = [],
            alltargets = [],
            allactions = [],
            allimgs = [],
            allbiebers = [];

          for (let k in config.skin.persona) {
            if (Array.isArray(config.skin.persona[k]) && k != 'pregnancy') allcards = [...allcards, ...config.skin.persona[k]];
          }
        
        allcards = allcards.filter(c=>c)

          allactions = this.flatten(this.flatten(allcards.map(card => card.target_benefit)).filter(c => (c) ? c.actions : null).map(a => a.actions));
          allimgs = allactions.filter(a => a).filter(a => a.image).map(a => Object.create({
            image: a.image
          }))
          allbiebers = this.flatten(allactions.filter(a => a).filter(a => a.target).map(a => a.target.carousel)).filter(c => c).map(url => Object.create({
            image: url
          }))

          allcards = [...allimgs.filter(c => c), ...allbiebers.filter(c => c)]
          console.log(allcards);


          allImages = [...allImages, ...allcards.filter(c => c)];
          return new Promise((resolve, reject) => resolve());
          //        return new Promise((resolve, reject) => reject());
        })
        .then(data => {
          console.log('downloading...searches');
          let allcards = [],
            allurls = []
          if (config.skin.persona.autosuggest) {
            allcards = this.flatten(config.skin.persona.autosuggest.map(search => search.cards)).filter(card => (card) ? card.type == 'tmp_images' : null);

            allcards = [...allcards, ...this.flatten(config.skin.persona.autosuggest.map(search => search.recommendations)).filter(rec => (rec) ? rec.image : null)]

            allcards = [...allcards, ...this.flatten(config.skin.persona.autosuggest.map(search => search.cards)).filter(card => (card) ? card.image : null)]

            allcards = [...allcards, ...this.flatten(this.flatten(config.skin.persona.autosuggest.map(search => search.cards)).filter(card => (card.target) ? card.target : null).map(card => card.target.carousel)).map(url => Object.create({
              image: url
            }))];

            allcards = [...allcards, ...this.flatten(this.flatten(config.skin.persona.autosuggest.map(search => search.cards)).filter(c => (c.carousel) ? c.carousel : null).map(c => c.carousel)).filter(c => c.image)]

            allcards = [...allcards, ...this.flatten(this.flatten(this.flatten(config.skin.persona.autosuggest.map(search => search.cards)).filter(c => (c.carousel) ? c.carousel : null).map(c => c.carousel)).filter(c => c.target).map(c => c.target.carousel)).map(url => Object.create({
              image: url
            }))]


            allcards = [...new Set(allcards.map(card => card.image))].map(url => Object.create({
              image: url
            }));
            console.log(allcards)

            allImages = [...allImages, ...allcards];

            return new Promise((resolve, reject) => resolve());
          } else {
            return new Promise((resolve, reject) => resolve());
          }
        })
        .then(data => {
          console.log('downloading...epilogue');
          let allcards = [];
          for (let k in config.skin.persona) {
            if (Array.isArray(config.skin.persona[k]) && k != 'pregnancy') allcards = [...allcards, ...config.skin.persona[k]]
          }
        allcards = allcards.filter(c=>c)
          let card_type = allcards.filter(card => (card) ? card.epilogue : null).map(card => card.epilogue);

          card_type = [...new Set(card_type.map(card => card.image))].map(url => Object.create({
            image: url
          }));
          console.log(card_type)

          allImages = [...allImages, ...card_type];

          return new Promise((resolve, reject) => resolve());
        })
        .then(data => {
          console.log('downloading...carousel');
          let allcards = [],
            allurls = [];
          for (let k in config.skin.persona) {
            if (Array.isArray(config.skin.persona[k]) && k != 'pregnancy') allcards = [...allcards, ...config.skin.persona[k]]
          }
        allcards = allcards.filter(c=>c)
          allurls = this.flatten(allcards.filter(card => (card) ? ((card.carousel) ? card.carousel : null) : null).map(card => card.carousel)).map(slide => (slide.type != 'program_screen' && slide.type != 'program_details' && slide.type != 'program_multiactions') ? slide.image : null).filter(url => url).map(url => Object.create({
            image: url
          }));

          allurls = [...allurls, ...this.flatten(this.flatten(allcards.filter(card => (card) ? ((card.carousel) ? card.carousel : null) : null).map(card => card.carousel)).map(slide => (slide.target) ? slide.target.carousel : null)).filter(url => url).map(url => Object.create({
            image: url
          }))]

          allurls = [...new Set(allurls.map(card => card.image))].filter(url => url).map(url => Object.create({
            image: url
          }));
          console.log(allurls)

          allImages = [...allImages, ...allurls];
          allImages = [...new Set(allImages.map(card => card.image))].map(url => Object.create({
            image: url
          }));

          return new Promise((resolve, reject) => resolve());
        })
        .then(data => {
          console.log('downloading...bieber');
          let allcards = [],
            allurls = [];

          for (let k in config.skin.persona) {
            if (Array.isArray(config.skin.persona[k]) && k != 'pregnancy') allcards = [...allcards, ...config.skin.persona[k]]
          }
        allcards = allcards.filter(c=>c)
          let card_type = allcards.filter(card => (card) ? ((card.target) ? card.target.type == 'bieber' : null) : null);

          //          console.log('ok', this.flatten(card_type.map(card => card.target.target_cards).filter(c=>c)).map(t => Object.create({
          //            image: t.image
          //          })))

          allurls = [...this.flatten(card_type.map(card => card.target.carousel)).map(url => Object.create({
            image: url
          })), ...this.flatten(card_type.filter(card => card.type == 'bieber').map(card => card.carousel)).map(url => Object.create({
            image: url
          }))];



          allurls = [...allurls, ...this.flatten(card_type.filter(card => card.target.target).map(card => (card.target.target.carousel) ? card.target.target.carousel : null).filter(card => card)).map(url => Object.create({
            image: url
          }))]

          allurls = [...allurls, ...this.flatten(card_type.filter(card => card.type == 'tmp_images').map(card => (card.target.target) ? card.target.target.carousel : null).filter(card => card)).map(url => Object.create({
            image: url
          }))]

          allurls = [...allurls, ...this.flatten(allcards.filter(card => card.type == 'bieber').map(card => card.carousel)).map(url => Object.create({
            image: url
          }))]


          //          console.log(this.flatten(card_type.map(card => card.target.target_cards).filter(c => (c) ? c.target : null)))
          //          console.log(this.flatten(card_type.map(card => card.target.target_cards).filter(c => c)))
          //          console.log(this.flatten(this.flatten(card_type.map(card => card.target.target_cards).filter(c => c)).filter(t => t.target).map(b => b.target.target_cards)).filter(t=>t).map(t=>t.image).map(url => Object.create({
          //            image: url
          //          })))

          allurls = [...allurls, ...this.flatten(card_type.map(card => card.target.target_cards).filter(c => c)).map(t => Object.create({
            image: t.image
          })).filter(t => t.image)]
          allurls = [...allurls, ...this.flatten(this.flatten(card_type.map(card => card.target.target_cards).filter(c => c)).filter(t => t.target).map(b => b.target.carousel)).map(url => Object.create({
            image: url
          }))]
          allurls = [...allurls, ...this.flatten(this.flatten(card_type.map(card => card.target.target_cards).filter(c => c)).filter(t => t.target).map(b => b.target.target_cards)).filter(t => t).map(t => t.image).map(url => Object.create({
            image: url
          }))]


          allurls = [...new Set(allurls.map(card => card.image))].map(url => Object.create({
            image: url
          }));

          console.log(allurls)

          allImages = [...allImages, ...allurls];



          return (allImages.length > 0) ? this.download_images(0, allImages.length, allImages, 'public/home', 'core') : new Promise((resolve, reject) => resolve());
        })
        .then(data => {
          return this.init_activate_local(data);
        })
        .then(data => {
          return this.save_logs();
        })
        .then(() => new Promise((res, rej) => {
          Array.from(this.section.querySelectorAll('.i_dot')).forEach(b => b.setAttribute('data-i-dot-color', 'blank'));
          Array.from(this.section.querySelectorAll('.persona')).filter(persona => this.downloaded.filter(d => d.email == persona.getAttribute('data-email')).length > 0).map(p => p.querySelector('.i_dot').setAttribute('data-i-dot-color', 'green'));
          res();
        }))
        .then(data => {
          TweenMax.killAll(true);
          console.log('All downloads complete');
          this.section.querySelector('.progress').classList.add('complete');
        })
        .catch(e => alert(e));
    }
  }
  init_activate_local(status) {
    return new Promise((resolve, reject) => {
      let res = [];

      this.check_skin_folders()
        .then(skins => {
          return this.check_user_folders(skins.filter(skin => skin.name != 'version.json' && skin.name != 'log.json' && skin.name != '.DS_Store' && skin.name != 'public' && skin.name != 'tracker'));
        })
        .then(res => {
          resolve();
        })
        .catch(e => console.log(e));
    });
  }
  check_user_folder(skins, resolve, index, res) {
    if (index < skins.length) {
      resolveLocalFileSystemURL(`${cordova.file.dataDirectory}/${skins[index]}`, (dirEntry) => {
        dirEntry.createReader().readEntries(entries => this.check_user_folder(skins, resolve, index + 1, [...res, ...entries]))
      })
    } else {
      /*res = res.filter(entry => entry.isDirectory).map((folder, i) => Object.create({
        //        email: `${folder.name}@${skins[i]}`
        //        email: `${folder.name}@${folder.fullPath.split('/')[1]}`,
        //        name: `${folder.name}`,
        path: `${folder.fullPath.split('/')[1]}/${folder.name}`
      }))*/
      resolve();
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

  save_version(data) {
    return new Promise((resolve, reject) => {
      resolveLocalFileSystemURL(cordova.file.dataDirectory, dirEntry => {

        dirEntry.getFile("version.json", {
          create: true,
          exclusive: false
        }, fileEntry => {

          fileEntry.createWriter(fileWriter => {

            fileWriter.onwriteend = () => {
              console.log("Successful file write...");
              //              readFile(fileEntry);
            };

            fileWriter.onerror = e => {
              console.log("Failed file write: " + e.toString());
            };


            let dataObj = new Blob(['[' + `{"version":"${data.version}"}` + ']'], {
              type: 'text/json'
            });

            fileWriter.write(dataObj);
          });

        }, () => {});
      }, () => {})
      resolve();
    })
  }

  save_logs() {
    return new Promise((resolve, reject) => {
      resolveLocalFileSystemURL(cordova.file.dataDirectory, dirEntry => {

        dirEntry.getFile("log.json", {
          create: true,
          exclusive: false
        }, fileEntry => {

          fileEntry.createWriter(fileWriter => {

            fileWriter.onwriteend = () => {
              console.log("Successful file write...");
              //              readFile(fileEntry);
            };

            fileWriter.onerror = e => {
              console.log("Failed file write: " + e.toString());
            };


            let dataObj = new Blob(['[' + Array.from(this.downloaded).map(o => `{"email":"${o.email}", "path":"${o.path}", "skin":"${o.skin}", "persona":"${o.persona}", "ts":"${o.ts}"}`) + ']'], {
              type: 'text/json'
            });

            fileWriter.write(dataObj);
          });

        }, () => {});
      }, () => {})
      resolve();
    })
  }
  launch(e) {
    //location.href = cordova.file.dataDirectory + 'rv/index.html';
    location.reload();
  }
  delete(email) {
    console.log('deleting...');
    let progress = this.section.querySelector('.progress');

    console.log('this downloaded')
    console.log(this.downloaded)

    /*resolveLocalFileSystemURL(cordova.file.dataDirectory, (dirEntry) => {
      dirEntry.getDirectory("public", {
        create: true,
        exclusive: false
      }, entry => {
        entry.removeRecursively(() => {
          resolveLocalFileSystemURL(cordova.file.dataDirectory, (dirEntry) => {
            dirEntry.getDirectory("tracker", {
              create: true,
              exclusive: false
            }, entry => {
              entry.removeRecursively(() => {
                if (this.downloaded.filter(d => d.email == email).length > 0) {
                  resolveLocalFileSystemURL(cordova.file.dataDirectory, (dirEntry) => {
                    dirEntry.getDirectory(`${this.downloaded.filter(d=>d.email==email)[0].skin}/${this.downloaded.filter(d=>d.email==email)[0].persona}`, {
                      create: true,
                      exclusive: false
                    }, entry => {
                      entry.removeRecursively(() => {
                        resolveLocalFileSystemURL(cordova.file.dataDirectory, (dirEntry) => {
                          dirEntry.getDirectory("walkthrough.json", {
                            create: true,
                            exclusive: false
                          }, entry => {
                            entry.removeRecursively(() => {
                              this.downloaded.splice(this.downloaded.findIndex(d => d.email == email), 1);
                              this.save_logs()
                                .then(data => {
                                  console.log("Remove Recursively Succeeded");
                                  console.log(this.downloaded);
                                  progress.classList.add('on');
                                  progress.classList.add('clean');
                                  progress.classList.add('complete');
                                })
                            }, () => {});
                          }, () => {})
                        });
                      }, () => {});
                    }, () => {})
                  });
                }
              }, () => {});
            }, e => console.log(e))
          });
        }, () => {});
      }, () => {})
    });*/



    if (this.downloaded.filter(d => d.email == email).length > 0) {
      resolveLocalFileSystemURL(cordova.file.dataDirectory, (dirEntry) => {
        dirEntry.getDirectory(`${this.downloaded.filter(d=>d.email==email)[0].skin}/${this.downloaded.filter(d=>d.email==email)[0].persona}`, {
          create: true,
          exclusive: false
        }, entry => {
          entry.removeRecursively(() => {
            this.downloaded.splice(this.downloaded.findIndex(d => d.email == email), 1);
            this.save_logs()
              .then(() => new Promise((res, rej) => {
                Array.from(this.section.querySelectorAll('.i_dot')).forEach(b => b.setAttribute('data-i-dot-color', 'blank'));
                Array.from(this.section.querySelectorAll('.persona')).filter(persona => this.downloaded.filter(d => d.email == persona.getAttribute('data-email')).length > 0).map(p => p.querySelector('.i_dot').setAttribute('data-i-dot-color', 'green'));
                res();
              }))
              .then(data => {
                console.log("Remove Recursively Succeeded");
                console.log(this.downloaded);
                progress.classList.add('on');
                progress.classList.add('clean');
                progress.classList.add('complete');
              })
          }, () => {});
        }, () => {})
      }, () => {});
    }
  }
  info(product, description) {
    console.log(product, description)
    this.section.querySelector(`.info_box .product`).innerHTML = product;
    this.section.querySelector(`.info_box .description`).innerHTML = description;
    this.section.querySelector(`.info_box`).classList.add('on');
  }
  init_nav(status, home) {
    return new Promise((resolve, reject) => {
      //      document.addEventListener("mousewheel", this.mousewheel.bind(this), { passive: false });      

      this.section.querySelector(`[data-action=error_ok]`).onclick = () => this.section.querySelector(`.error_box`).classList.remove('on')
      this.section.querySelector(`[data-action=not_now]`).onclick = () => this.section.querySelector(`.version_box`).classList.remove('on')
      this.section.querySelector(`[data-action=update_now]`).onclick = () => window.open(`${(home.app_name=='castlight_app')?'https://castlight-sko.surge.sh/':((home.app_name=='healthyblue_app')?'https://castlight-healthyblue.surge.sh':'https://engage-demo.surge.sh/')}`, '_system')

      Array.from(this.section.querySelectorAll('[data-action=download]')).forEach(button => button.onclick = e => this.download(e.target.closest('.persona').getAttribute('data-email')));

      this.section.querySelector('[data-action=back]').onclick = () => {
        this.launch();
      }

      Array.from(this.section.querySelectorAll('[data-action=delete]')).forEach(button => button.onclick = e => this.delete(e.target.closest('.persona').getAttribute('data-email')));
      Array.from(this.section.querySelectorAll('[data-action=info]')).forEach(button => button.onclick = e => this.info(e.target.closest('.persona').getAttribute('data-info-product'), e.target.closest('.persona').getAttribute('data-info-description')));

      this.section.querySelector('[data-action=complete]').onclick = () => {
        this.section.querySelector('.progress').classList.remove('on');
        this.section.querySelector('.progress').classList.remove('complete');
      }
      this.section.querySelector('[data-action=info_complete]').onclick = () => {
        this.section.querySelector('.info_box').classList.remove('on');
      }
      resolve(status);
    })
  }
};

export default class Section {
  constructor(id, autoplay = true) {
    this.autoplay = autoplay;
    this.id = id;
    this.section = document.querySelector(`${id}`);
    this.source = document.querySelector(`${id}_template`).innerHTML;
    this.template = Handlebars.compile(this.source);
  }
  init(hb) {
    return new Promise((resolve, reject) => {
      this.init_layout(hb)
        .then(status => {
          resolve(status);
          if (this.autoplay) this.play();
        })
        .catch(e => console.log(e));
    })
  }
  init_layout(hb = {}) {
    return new Promise((resolve, reject) => {      
      document.querySelector(this.id).innerHTML = this.template(hb);
      resolve(`${this.id} ready`);
    });
  }
  db(url) {
    return (url) ? ((url.split('https://www.dropbox.com').length > 1) ? `https://dl.dropboxusercontent.com${url.split('https://www.dropbox.com')[1]}` : url) : null;
  }
  dd(folder, url) {
    return (url) ? (cordova.file.dataDirectory + `${folder.replace(/ /g, '')}/` + ((url.split('file:').length > 1) ? url.split('?dl=0')[0].split('/')[url.split('?dl=0')[0].split('/').length - 1].split('?_=')[0] : url.split('?dl=0')[0].split('/')[url.split('?dl=0')[0].split('/').length - 1]) + `?_=${Date.now()}`) : null;
  }
  play() {
    Array.from(document.querySelectorAll('.main')).forEach((el, i) => {
      el.classList.add('hidden')
    });
    document.querySelector(this.id).classList.remove('hidden');
  }
};

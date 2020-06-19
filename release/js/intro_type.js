export default class IntroType {
  constructor(type) {
    this.id = null;
    this.type = type;
    this.source = document.querySelector(`#intro_${type}_template`).innerHTML;
    this.template = Handlebars.compile(this.source);
  }
  init(container, home) {
    return new Promise((resolve, reject) => {

      this.add_intro(container, home)
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  add_intro(container, home) {
    return new Promise((resolve, reject) => {
      let el = document.createElement('main');
      el.setAttribute('data-type', this.type);
      el.innerHTML = this.template(home);
      container.appendChild(el);
      resolve(`${intro.name} added to #${container.parentNode.getAttribute('id')}`);
    });
  }
  db(url) {
    return (url.split('https://www.dropbox.com').length > 1) ? `https://dl.dropboxusercontent.com${url.split('https://www.dropbox.com')[1]}` : url;
  }
  dd(folder, url) {
    return cordova.file.dataDirectory + `${folder.replace(/ /g, '')}/` + url.split('?dl=0')[0].split('/')[url.split('?dl=0')[0].split('/').length - 1] + `?_=${Date.now()}`;
  }
};

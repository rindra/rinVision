import Home from './home';

Handlebars.registerHelper("equal", (context, value, identity, output) => {
  if (value == identity) return output.fn(context);
});

class App {
  constructor() {

  }
  init(data) {
    let home = new Home('#home');
    home.init()
      .then(status => {
        console.log(status);
      })
      .catch(e => console.log(e));
  }
  debug() {
    console.log(this.config);
  }
}

$(() => {
  FastClick.attach(document.body);
  let app = new App();
  app.init();
})

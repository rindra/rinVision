require.config({
  baseUrl: "js/lib",
  paths: {
    app: '../app',
    FastClick: 'fastclick.min',
    jquery: 'jquery-latest.min',
    lodash: 'lodash.min',
    Handlebars: 'handlebars.min',
    inobounce: 'inobounce.min',
    hideseek:'jquery.hideseek.min'
  }
});
require(["app/main"], function (main) {
  main.init();
});

define(['jquery', 'lodash', 'Handlebars', 'hideseek'], function ($, _, Handlebars, hideseek) {
  return {
    section: $('[data-section="home"]'),
    source: null,
    template: null,
    slide_source: null,
    slide_template: null,
    folders: [],
    init: function (main) {
      var ref = this,
        dfd = $.Deferred();

      this.source = $('#home-template').html();
      this.template = Handlebars.compile(this.source);
      this.slide_source = $('#slide-template').html();
      this.slide_template = Handlebars.compile(this.slide_source);
      Handlebars.registerHelper("plusone", function (v, o) {
        return v + 1;
      });

      main.home = this;

      $.getJSON('../images/flows.json')
        .then(function (data) {
          ref.folders = data;
          return ref.init_layout(main);
        })
        .then(function (status) {
          return ref.init_nav();
        })
        .then(function (status) {
          dfd.resolve(status);
        })

      return dfd.promise();
    },
    init_nav: function () {
      var dfd = $.Deferred(),
        ref = this;
      this.section.on('click', '.list .link', function (e) {
        ref.show($(this).attr('data-folder'));
      })
      this.section.on('click', '.box-input .cancel', function (e) {
        var kp = jQuery.Event("keyup");
        kp.which = kp.keyCode = 8;
        jQuery('#search').val('').trigger(kp);
        ref.section.find('.link').removeClass('on');
        ref.section.find('.slides').empty();
      })
      
      $('#search').hideseek();
      dfd.resolve('[home] ready');
      return dfd.promise();
    },
    init_layout: function (main, data) {
      var dfd = $.Deferred(),
        ref = this,
        hb = {};
      hb.folders = this.folders;
      this.section.html(this.template(hb));

      dfd.resolve();
      return dfd.promise();
    },
    show: function (folder) {
      var ref = this,
        hb = {};
      hb.folder = folder;
      hb.slides = _.filter(this.folders, {
        folder: folder
      })[0].slides;
      this.section.find('.slides').html(this.slide_template(hb));
      this.section.find('.link').removeClass('on');
      this.section.find('[data-folder=' + folder + ']').addClass('on');
    }
  };
});

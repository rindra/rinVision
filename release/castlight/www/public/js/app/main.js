define(['jquery', 'FastClick'], function ($, FastClick) {
  return {
    home: null,
    init: function () {
      FastClick.attach(document.body);
      var ref = this;

      this.module_init('app/home')
        .then(function (status) {
          console.log(status);
        })
    },
    module_init: function (lib) {
      var dfd = $.Deferred();
      this.require_lib(lib, dfd);
      return dfd.promise();
    },
    require_lib: function (section, dfd) {
      var ref = this;
      require([section], function (module) {
        module.init(ref)
          .then(function (status) {
            dfd.resolve(status);
          });
      });
    }
  };
});

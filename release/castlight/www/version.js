const request = require('request')

function _get(loc) {
  return new Promise((resolve, reject) => {
    request(loc, function (e, r, b) {
      resolve(JSON.parse(b));
    })
  })
}

function init() {
  _get('https://castlight-db.herokuapp.com/version')
    .then(data => console.log(data))
}

init()

const request = require('request-promise');

export default request.defaults({
  resolvedWithFullResponse: true,
  json: true
});
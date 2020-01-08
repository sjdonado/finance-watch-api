const { IEXCloud } = require('../config');
const fetch = require('../library/fetch');

const { baseUrl, token } = IEXCloud;

class IEXCloudAPI {
  constructor(endPoint) {
    this.url = `${baseUrl}${endPoint}`;
  }

  quote(symbol) {
    return fetch(`${this.url}/${symbol}/quote?token=${token}`);
  }

  logo(symbol) {
    return fetch(`${this.url}/${symbol}/logo?token=${token}`);
  }

  news(symbol) {
    return fetch(`${this.url}/${symbol}/news/last?token=${token}`);
  }
}

module.exports = IEXCloudAPI;

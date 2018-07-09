import ChatApiResponse from './ChatApiResponse';
import axios from 'axios';
//config
import {
  Config
}
from '../../config/api';
/*Api call class which uses axios to make http requests
should be inherited by other classes*/
class ChatApiCall {
  constructor() {
    this.http = axios.create({
      baseURL: Config.url,
      maxContentLength: 50000,
      timeout: 15000,
      responseType: 'json',
      headers: Config.keys,
    });
    this.type = 'get'; //default type
    this.url = Config.url;
    this.keys = Config.keys;
    this.response = new ChatApiResponse();
  }

  setConfig(config) {
    this.config = config;
  }

  getApiUrl(method) {
    return this.type + '/' + method;
  }
}

export default ChatApiCall;

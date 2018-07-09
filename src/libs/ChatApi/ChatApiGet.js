import ChatApiCall from './ChatApiCall';

class ChatApiGet extends ChatApiCall {
  constructor() {
    super();
    this.type = 'get';
  }
  call(method, props = {}, success, fail) {
    this.http.get(this.getApiUrl(method), props, {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      })
      .then(
        response => success(this.response.getResponse(response))
      )
      .catch(
        error => fail(this.response.getError(error))
      );
  }
}

export default ChatApiGet;

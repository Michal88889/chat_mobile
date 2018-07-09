import ChatApiCall from './ChatApiCall';

class ChatApiPost extends ChatApiCall {
  constructor() {
    super();
    this.type = 'post';
  }
  call(method, props = {}, success, fail) {
    this.http.post(this.getApiUrl(method), this.getAsFormData(props), {
        'Content-Type': 'multipart/form-data'
      })
      .then(
        response => success(this.response.getResponse(response))
      )
      .catch(
        error => fail(this.response.getError(error))
      );
  }

  getAsFormData(props) {
    let data = new FormData();

    Object.keys(props)
      .map((index) => (
        data.append(index, props[index])
      ));

    return data;
  }
}

export default ChatApiPost;

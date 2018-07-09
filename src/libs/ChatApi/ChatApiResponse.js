class ChatApiResponse {
  getResponse(response) {
    return response.data;
  }

  getError(response) {
    return response;
  }
}

export default ChatApiResponse;

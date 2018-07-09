import {
  StyleSheet
}
from 'react-native';

export default StyleSheet.create({
  messages: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F7FFFD',
  },
  row: {
    width: '100%',
    flexDirection: 'column',
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  message_header: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header_text: {
    fontSize: 13,
    color: '#2F4F4F',
  },
  message_text: {
    flex: 1,
    paddingTop: 3,
  },
  even: {
    backgroundColor: '#E4F4F8',
  },
  odd: {

  }
});

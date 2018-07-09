import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  keyboard_view: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderTopWidth: 2,
    borderColor: 'white',
    elevation: 1
  },
  upload_icon: {
    height: 25,
    width: 25,
    marginTop: 7,
    marginRight: 10,
    flexDirection: 'row',
  },
  inputbar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    fontSize: 13,
  },
  send_button: {
    fontSize: 15,
    fontFamily: 'sans-serif-light',
    borderRadius: 1,
    color: 'white',
    backgroundColor: '#0384CA',
    paddingHorizontal: 6,
    paddingVertical: 5,
    marginTop: 4,
    marginBottom: 4,
    height: 32,
  }
});

import {
  StyleSheet
}
from 'react-native';

export default StyleSheet.create({
  navbar: {
    flexDirection: 'column',
    backgroundColor: '#01ACDD',
    borderBottomWidth: 2,
    borderColor: 'white',
    elevation: 1
  },
  blackspace: {
    backgroundColor: 'black',
    height: 24,
    width: '100%',
  },
  navbar_elements: {
    flexDirection: 'row',
    width: '100%',
  },
  chat_logo: {},
  users: {},
  logout: {
    flex: 1,
    alignItems: 'flex-end'
  },
  navbar_button: {
    fontSize: 15,
    fontFamily: 'sans-serif-light',
    color: 'white',
    backgroundColor: '#0384CA',
    paddingHorizontal: 20,
    paddingVertical: 8
  },
  active_button: {
    backgroundColor: 'white',
    color: '#01ACDD'
  },
  logout_button: {
    fontSize: 13,
    backgroundColor: '#01ACEA',
    color: 'white',
    paddingHorizontal: 5,
    marginRight: 3,
    marginTop: 2
  }
});

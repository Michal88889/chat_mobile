import {
  StyleSheet
}
from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_container: {
    backgroundColor: '#DEE3E7',
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '75%',
    //border
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#ddd',
  },
  input: {
    color: '#000',
    fontFamily: 'sans-serif-light',
    fontSize: 22,
    width: '100%',
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  button: {
    fontSize: 20,
    fontFamily: 'sans-serif-light',
    color: 'white',
    backgroundColor: '#01ACDD',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#3DC7EE',
    borderRadius: 1
  }
});

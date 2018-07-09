import React from 'react';
import { AsyncStorage, View, AppRegistry, } from 'react-native';
import { Provider } from 'react-redux';
//css
import Style from './src/css/root';
//components
import Root from './src/components/Root';
//store
import configureStore from './src/store/configureStore';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={Style.container}>
          <Root />
        </View>
      </Provider>
      );
  }
}

AppRegistry.registerComponent('chat4', () => App);

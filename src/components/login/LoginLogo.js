import React from 'react';
import {
  Text, View
}
from 'react-native';
import {
  Config
}
from '../../config/app';
//css
import Style from '../../css/login/logo'

export default class LoginLogo extends React.Component {
  render() {
    return(
      <View style={Style.login_logo}>
        <Text style={Style.text}>{Config.app_name}</Text>
      </View>
    );
  }
}

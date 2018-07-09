import React from 'react';
import {
  TextInput, Alert, View, Text, StyleSheet
}
from 'react-native';
import Button from 'react-native-button';

//css
import Style from '../../../css/chat/users'

export default class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 0,
      userName: '',
    }

  }

  constructUser(user) {
    this.setState(user);
  }

  componentDidMount() {
    this.constructUser(this.props.user);
  }

  render() {
    let additionalStyle = this.props.even ? Style.even : Style.odd;
    return(
      <View style={StyleSheet.flatten([Style.row, additionalStyle])}>
        <Text>{this.state.userName}</Text>
      </View>
    );
  }
}

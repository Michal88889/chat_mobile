import React from 'react';
import { TextInput, Alert, View, Text } from 'react-native';
import Button from 'react-native-button';
import axios from 'axios';
//redux
import { connect } from 'react-redux';
//actions

//css
import Style from '../../css/chat/root';
//components
import Navbar from './Navbar';
import MessageGrid from './messages/MessageGrid';
import UserGrid from './users/UserGrid';
import Inputbar from './Inputbar';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: 'Chat',
    };
  }

  //select proper component
  getChatContent() {
    switch (this.props.nav) {
      case 'Chat':
        return <MessageGrid />;
      case 'Users':
        return <UserGrid />;;
      default:
        return <MessageGrid />;
    }
  }

  //get input bar if chat is loaded
  getInputbar() {
    return this.props.nav === 'Chat' ? <Inputbar /> : null;
  }

  render() {
    return (
      <View style={Style.chat}>
        <Navbar />
        { this.getChatContent() }
        { this.getInputbar() }
      </View>

      );
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.nav
    nav: state.nav.view
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {

  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Chat);

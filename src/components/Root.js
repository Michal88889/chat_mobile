import React from 'react';
import {
  TextInput, Alert, View
}
from 'react-native';
import Button from 'react-native-button';
import axios from 'axios';
//redux
import {
  connect
}
from 'react-redux';
//actions

//config
import {
  Config
}
from '../config/api';
//components
import Login from './login/Login';
import Chat from './chat/Chat';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  //get content to render
  getRenderContent() {
    let content = null;

    if(this.props.isLoggedIn) {
      content = <Chat />;
    } else {
      content = <Login />;
    }
    return content;
  }

  render() {
    return(
      this.getRenderContent()
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.http
    ...state,
    isLoggedIn: state.login.isLoggedIn
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    // You can now say this.props.setHttp
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Root);

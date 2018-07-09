import React from 'react';
import {
  TextInput, Alert, View
}
from 'react-native';
import Button from 'react-native-button';
//redux
import {
  connect
}
from 'react-redux';
import {
  bindActionCreators
}
from 'redux';
//actions
import {
  setLoginStatus, setLoginData
}
from '../../actions/loginActions';
//call
import ChatApiPost from '../../libs/ChatApi/ChatApiPost';
//css
import Style from '../../css/login/root'
  //LoginLogin
import LoginLogo from './LoginLogo'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: new ChatApiPost(),
      username: '',
      password: ''
    }
  }

  loginUser() {
    this.state.api.call('login', {
      username: this.state.username,
      password: this.state.password
    }, response => {
      if(response.status) {
        this.props.setLoginData(response.result);
        this.props.setLoginStatus(true);
      } else {
        Alert.alert(response.message);
      }
    }, error => {
      console.error(error);
      Alert.alert('Undefined error');
    });
  }

  render() {
    return(
      <View style={Style.container}>
      <LoginLogo />
      <View style={Style.login_container}>
        <TextInput ref={(ref) => this.state.usernameInput = ref} onChangeText={(value) => this.setState({username: value})} style={Style.input} placeholder="Login" underlineColorAndroid='transparent' />
        <TextInput ref={(ref) => this.state.passwordInput = ref} onChangeText={(value) => this.setState({password: value})} style={Style.input} secureTextEntry={true} maxLength={40} underlineColorAndroid='transparent' placeholder="Password" />
        <Button style={Style.button} onPress={() => { this.loginUser() }} >LOGIN</Button>
      </View>
      </View>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.isLoggedIn
    isLoggedIn: state.login.isLoggedIn,
    loginData: state.login.loginData
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus: bindActionCreators(setLoginStatus, dispatch),
    setLoginData: bindActionCreators(setLoginData, dispatch),
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Login);

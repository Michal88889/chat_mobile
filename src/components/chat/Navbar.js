import React from 'react';
import { TextInput, Alert, View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//actions
import { setLoginStatus } from '../../actions/loginActions';
import { changeNav } from '../../actions/navActions';
//css
import Style from '../../css/chat/navbar'

class Navbar extends React.Component {
  //logout method
  //reduc state change
  logout() {
    this.props.setLoggedIn(false);
  }

  /*Get nav button style according to active status*/
  getNavButtonStyle(nav = 'Chat') {
    if (this.isNavButtonActive(nav)) {
      return StyleSheet.flatten([Style.navbar_button, Style.active_button]);
    } else {
      return Style.navbar_button;
    }
  }

  /*  Check if nav button with given name is active
    if true than given view is loaded*/
  isNavButtonActive(nav) {
    return this.props.nav === nav;
  }

  /*  Switch chat content view
    it rerender main chat component*/
  switchView(nav = 'Chat') {
    if (!this.isNavButtonActive(nav)) {
      this.props.changeNav(nav);
    }
  }

  render() {
    return (
      <View style={Style.navbar}>
        <View style={Style.navbar_elements}>
          <View style={Style.chat_logo}>
            <Button style={this.getNavButtonStyle('Chat')} onPress={() => {
        this.switchView('Chat')
      }} >Chat</Button>
          </View>
          <View style={Style.users}>
            <Button style={this.getNavButtonStyle('Users')} onPress={() => {
        this.switchView('Users')
      }} >Users</Button>
          </View>
          <View style={Style.logout}>
            <Button style={StyleSheet.flatten([Style.navbar_button, Style.logout_button])} onPress={() => {
        this.logout()
      }} >Logout</Button>
          </View>
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
    nav: state.nav.view
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: bindActionCreators(setLoginStatus, dispatch),
    changeNav: bindActionCreators(changeNav, dispatch)
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

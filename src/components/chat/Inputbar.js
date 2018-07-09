import React from 'react';
import { TextInput, Alert, View, Image, Text, KeyboardAvoidingView } from 'react-native';
import Button from 'react-native-button';
import ChatApiPost from '../../libs/ChatApi/ChatApiPost';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//actions
import * as scrollViewActions from '../../actions/scrollViewActions';
import { noteMessage } from '../../actions/httpActions';
//css
import Style from '../../css/chat/inputbar'

class Inputbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: new ChatApiPost(),
      messageText: '',
      inputField: null
    }
  }

  //send message to api
  sendMessage() {
    if (this.state.messageText.length > 0) {
      //prepare post request
      let postVars = this.props.loginData;
      postVars.text = this.state.messageText;
      //call api function
      this.state.api.call('addPost', postVars, response => {
        if (response.status) {
          this.props.noteMessage();
        } else {
          Alert.alert(response.message);
        }
        this.state.inputField.clear();
      }, error => {
        Alert.alert('Error occurred');
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={Style.keyboard_view}>
        <View style={Style.inputbar}>
        { /*image upload*/ }
        <Image source={require('../../imgs/photo.png')} style={Style.upload_icon} />
          { /*text input*/ }
          <TextInput
      ref={(ref) => this.state.inputField = ref}
      onFocus={() => {
        setTimeout(() => this.props.scrollView.scrollToEnd({
          animated: true
        }), 150)
      }}
      onChangeText={(value) => {
        this.props.scrollView.scrollToEnd({
          animated: true
        });
        this.setState({
          messageText: value
        });
      }}
      style={Style.input} disableFullscreenUI={true} placeholder="Message" underlineColorAndroid='transparent' />
      { /*button send*/ }
      <Button style={Style.send_button} onPress={() => {
        this.sendMessage()
      }}>Send</Button>
        </View>
      </KeyboardAvoidingView>
      );
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.http
    scrollView: state.scroll.scrollView,
    loginData: state.login.loginData,
    sentMsgCount: state.http.messageCount
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    noteMessage: bindActionCreators(noteMessage, dispatch),
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Inputbar);

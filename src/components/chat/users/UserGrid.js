import React from 'react';
import {
  TextInput, Alert, ScrollView, Text
}
from 'react-native';
import Button from 'react-native-button';
//row
import UserRow from './UserRow';
//call
import ChatApiGet from '../../../libs/ChatApi/ChatApiGet';
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
//css
import style from '../../../css/chat/users';

class UserGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: new ChatApiGet(),
      users: {},
      tickInterval: null
    }
  }
  componentDidMount() {
    this.startTick();
  }

  startTick() {
    this.tick();
    let tickInterval = setInterval(() => {
      this.tick();
    }, 1000);
    this.setState({
      tickInterval: tickInterval
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.tickInterval);
  }

  //Update only if last message id is different
  shouldComponentUpdate(nextProps, nextState) {
    return this.getLastId(nextState.users) !== this.getLastId(this.state.users);
  }

  //Get last message id from messages json
  getLastId(users) {
    var resultId = 0;
    if(users !== undefined && users[users.length - 1] !== undefined) {
      resultId = users[users.length - 1].userID;
    }
    return resultId;
  }

  tick() {
    this.getUsers(() => {});
  }

  //Get users from rest api using axios http
  getUsers(callback) {
    this.state.api.call('getOnlineUsers', {}, response => {
      if(response.status) {
        //set new users on valid call
        this.setState({
          users: response.result
        });
        callback();
      }
    }, error => {
      callback();
    });
  }

  render() {
    return(
      <ScrollView ref={(ref) => this.state.scrollView = ref}
      style={style.users}>
        {Object.keys(this.state.users).map((index) => (
	        <UserRow user={this.state.users[index]} even={(parseInt(index) + 1) % 2 ? 1 : 0} key={this.state.users[index].userID} />
	    ))}
      </ScrollView>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {}
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(UserGrid);

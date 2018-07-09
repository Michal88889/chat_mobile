import React from 'react';
import { TextInput, Alert, ScrollView, Text, Dimensions } from 'react-native';
import Button from 'react-native-button';
import EscapeBBCode from '../../../libs/EscapeBBCode';
//row
import MessageRow from './MessageRow';
//call
import ChatApiGet from '../../../libs/ChatApi/ChatApiGet';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//actions
import { setScrollView } from '../../../actions/scrollViewActions';
import { saveMessages } from '../../../actions/httpActions';
//css
import style from '../../../css/chat/messages';

class MessageGrid extends React.Component {
  constructor(props) {
    super(props);
    this.bbCodeParser = new EscapeBBCode();
    this.localOffset = 2000;
    this.state = {
      api: new ChatApiGet(),
      tickFreq: 1000,
      scrollTickFreq: 10000,
      messageDisplay: 50,
      messages: {},
      tickInterval: null,
      scrollTickInterval: null,
      isLoading: true,
    }
  }
  componentDidMount() {
    //scroll to bottom
    this.props.setScroll(this.state.scrollView);
    setTimeout(() => {
      this.state.scrollView.scrollToEnd({
        animated: true
      });
    }, 150);
    //turn off loading
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 500);

    this.startTick();
  }

  startTick() {
    this.tick();
    let tickInterval = setInterval(() => {
      this.tick();
    }, this.state.tickFreq);
    this.setState({
      tickInterval: tickInterval
    });
  }

  startScrollTick() {
    if (this.state.scrollTickInterval === null) {
      this.scrollTick();
      let scrollTickInterval = setInterval(() => {
        this.scrollTick();
      }, this.state.scrollTickFreq);
      this.setState({
        scrollTickInterval: scrollTickInterval
      });
    }
  }

  componentWillUnmount() {
    this.clearTick();
    this.clearScrollTick();
  }

  clearTick() {
    if (this.state.tickInterval !== null) {
      clearInterval(this.state.tickInterval);
      this.setState({
        tickInterval: null
      })
    }
  }

  clearScrollTick() {
    if (this.state.scrollTickInterval !== null) {
      clearInterval(this.state.scrollTickInterval);
      this.setState({
        scrollTickInterval: null
      });
    }
  }

  //Update only if last message id is different
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.messages.length !== this.state.messages.length
      || this.getLastId(nextState.messages) !== this.getLastId(this.state.messages);
  }

  //Get last message id from messages json
  getLastId(messages) {
    var resultId = 0;
    if (messages !== undefined && messages[messages.length - 1] !== undefined) {
      resultId = messages[messages.length - 1].id;
    }
    return resultId;
  }

  tick() {
    this.getLastPosts(this.state.messageDisplay, () => {
    });
  }

  scrollTick() {
    this.increaseDisplay();
  }


  getLastPosts(num, callback) {
    this.state.api.call('lastPosts/' + num.toString(), {}, response => {
      if (response.status) {
        /*Dismiss loading state if is set as loading*/
        this.dismissLoading(response.result.length);
        /*Set new messages on valid call*/
        this.setState({
          messages: response.result
        });
        callback();
      }
    }, error => {
      callback();
    });
  }

  dismissLoading(length) {
    if (this.state.isLoading && length !== this.state.messages.length) {
      this.setState({
        isLoading: false
      });
    }
  }

  handleScroll(event: Object) {
    this.localOffset = event.nativeEvent.contentOffset.y;
    if (this.localOffset < 10) {
      this.startScrollTick();
    } else {
      this.clearScrollTick();
    }
  }

  increaseDisplay(num = 10) {
    if (!this.state.isLoading && this.localOffset < 10) {
      this.setState({
        isLoading: true,
        messageDisplay: this.state.messageDisplay + num,
      });
    }
  }

  render() {
    return (
      <ScrollView ref={(ref) => this.state.scrollView = ref}
      onScroll={(event) => {
        this.handleScroll(event)
      }}
      style={style.messages}>
        {Object.keys(this.state.messages).map((index) => (
        <MessageRow codeParser={this.bbCodeParser} message={this.state.messages[index]} even={(parseInt(index) + 1) % 2 ? 1 : 0} key={this.state.messages[index].id} />
      ))}
      </ScrollView>
      );
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.http
    scrollView: state.scroll.scrollView,
    isLoggedIn: state.login.isLoggedIn,
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    setScroll: bindActionCreators(setScrollView, dispatch),
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(MessageGrid);

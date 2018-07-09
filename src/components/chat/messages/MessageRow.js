import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import HTMLView from 'react-native-htmlview';
//helper functions
import { deconstructDate } from '../../../libs/functions/dateFunctions';
import { renderImage } from '../../../libs/functions/htmlRenderFunctions';
//css
import Style from '../../../css/chat/messages'
import HtmlStyle from '../../../css/html'

/**
 * This component is responsible for rendering single chat message
 * Each message in component MessageGrid is represented by this component
 * MessageRow component handles message date, username and text format
 */
export default class MessageRow extends React.Component {
  constructor(props) {
    super(props);
    //set default message elements
    this.state = {
      time: '',
      nick: '',
      message: ''
    };
  }

  /**
   * Create ready to display message text
   * @method renderPostText
   * @param  {String} text non formated message text
   * @return {String}      formated message text
   */
  renderPostText(text) {
    return this.urlify(this.props.codeParser.bbcodeToHtml(text.replace("\n", "</BR>")));
  }

  /**
   * Wrap plain text urls with html hyperlink tag
   * @method urlify
   * @param  {String} text message text
   * @return {String}      message text with html urls
   */
  urlify(text) {
    let urlRegex = /(?:^|[^"'])((ftp|http|https|file):\/\/[\S]+(\b|$))/gim;
    return text.replace(urlRegex, '<a href="$1">$1</a>');
  }

  /**
   * Set message row elements when component is ready
   * @method componentDidMount
   */
  componentDidMount() {
    let date = deconstructDate(this.props.message.dateTime);
    this.setState({
      time: '(' + date.hour + ':' + date.minute + ':' + date.second + ')',
      nick: this.props.message.userName,
      message: this.renderPostText(this.props.message.text)
    });
  }

  /**
   * Render component
   * @method render
   * @return {Object}
   */
  render() {
    let additionalStyle = this.props.even ? Style.even : Style.odd;
    return (
      <View style={StyleSheet.flatten([Style.row, additionalStyle])}>
        { /*Render message time and username*/ }
        <View style={Style.message_header}>
          <Text style={Style.header_text}>{this.state.time + ' ' + this.state.nick + ': '}</Text>
        </View>
        { /*Render message text*/ }
        <View style={Style.message_text}>
          { /*Transform HTML tags to react native components*/ }
          <HTMLView value={this.state.message} renderNode={renderImage} stylesheet={HtmlStyle} />
        </View>
      </View>
      );
  }
}

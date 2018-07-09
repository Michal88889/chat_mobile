/* Escape php BB code and translate it to react-native elements
escaped bbcode is in HTML format  */
class EscapeBBCode {
  constructor() {
    this.token_match = /{[A-Z_]+[0-9]*}/ig;
    // regular expressions for the different bbcode this.tokens
    this.tokens = {
      'URL': '((?:(?:[a-z][a-z\\d+\\-.]*:\\/{2}(?:(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+|[0-9.]+|\\[[a-z0-9.]+:[a-z0-9.]+:[a-z0-9.:]+\\])(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)|(?:www\\.(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)))',
      'LINK': '([a-z0-9\-\./]+[^"\' ]*)',
      'EMAIL': '((?:[\\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*(?:[\\w\!\#$\%\'\*\+\-\/\=\?\^\`{\|\}\~]|&)+@(?:(?:(?:(?:(?:[a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(?:\\d{1,3}\.){3}\\d{1,3}(?:\:\\d{1,5})?))',
      'TEXT': '(.*?)',
      'SIMPLETEXT': '([a-zA-Z0-9-+.,_ ]+)',
      'INTTEXT': '([a-zA-Z0-9-+,_. ]+)',
      'IDENTIFIER': '([a-zA-Z0-9-_]+)',
      'COLOR': '([a-z]+|#[0-9abcdef]+)',
      'NUMBER': '([0-9]+)'
    };
    this.bbcode_matches = []; // matches for bbcode to html
    this.html_tpls = []; // html templates for html to bbcode
    this.html_matches = []; // matches for html to bbcode
    this.bbcode_tpls = []; // bbcode templates for bbcode to html
    this.addHTMLpatterns();
  }

  /**
   * Turns a bbcode into a regular rexpression by changing the this.tokens into
   * their regex form
   */
  _getRegEx(str) {
    var matches = str.match(this.token_match);
    var nrmatches = matches.length;
    var i = 0;
    var replacement = '';

    if(nrmatches <= 0) {
      return new RegExp(this.preg_quote(str), 'g'); // no this.tokens so return the escaped string
    }

    for(; i < nrmatches; i += 1) {
      // Remove {, } and numbers from the token so it can match the
      // keys in this.tokens
      var token = matches[i].replace(/[{}0-9]/g, '');

      if(this.tokens[token]) {
        // Escape everything before the token
        replacement += this.preg_quote(str.substr(0, str.indexOf(matches[i]))) +
          this.tokens[token];

        // Remove everything before the end of the token so it can be used
        // with the next token. Doing this so that parts can be escaped
        str = str.substr(str.indexOf(matches[i]) + matches[i].length);
      }
    }

    replacement += this.preg_quote(str); // add whatever is left to the string

    return new RegExp(replacement, 'gi');
  };

  /**
   * Turns a bbcode template into the replacement form used in regular expressions
   * by turning the this.tokens in $1, $2, etc.
   */
  _getTpls(str) {
    var matches = str.match(this.token_match);
    var nrmatches = matches.length;
    var i = 0;
    var replacement = '';
    var positions = {};
    var next_position = 0;

    if(nrmatches <= 0) {
      return str; // no this.tokens so return the string
    }

    for(; i < nrmatches; i += 1) {
      // Remove {, } and numbers from the token so it can match the
      // keys in this.tokens
      var token = matches[i].replace(/[{}0-9]/g, '');
      var position;

      // figure out what $# to use ($1, $2)
      if(positions[matches[i]]) {
        position = positions[matches[i]]; // if the token already has a position then use that
      } else {
        // token doesn't have a position so increment the next position
        // and record this token's position
        next_position += 1;
        position = next_position;
        positions[matches[i]] = position;
      }

      if(this.tokens[token]) {
        replacement += str.substr(0, str.indexOf(matches[i])) + '$' +
          position;
        str = str.substr(str.indexOf(matches[i]) + matches[i].length);
      }
    }

    replacement += str;

    return replacement;
  };

  /**
   * Adds a bbcode to the list
   */
  addBBCode(bbcode_match, bbcode_tpl) {
    // add the regular expressions and templates for bbcode to html
    this.bbcode_matches.push(this._getRegEx(bbcode_match));
    this.html_tpls.push(this._getTpls(bbcode_tpl));

    // add the regular expressions and templates for html to bbcode
    this.html_matches.push(this._getRegEx(bbcode_tpl));
    this.bbcode_tpls.push(this._getTpls(bbcode_match));
  };

  /**
   * Turns all of the added bbcodes into html
   */
  bbcodeToHtml(str) {
    var nrbbcmatches = this.bbcode_matches.length;
    var i = 0;

    for(; i < nrbbcmatches; i += 1) {
      str = str.replace(this.bbcode_matches[i], this.html_tpls[i]);
    }

    return str;
  };

  /**
   * Turns html into bbcode
   */
  htmlToBBCode(str) {
    var nrhtmlmatches = this.html_matches.length;
    var i = 0;

    for(; i < nrhtmlmatches; i += 1) {
      str = str.replace(this.html_matches[i], this.bbcode_tpls[i]);
    }

    return str;
  }

  /**
   * Quote regular expression characters plus an optional character
   * taken from phpjs.org
   */
  preg_quote(str, delimiter) {
    return(str + '')
      .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter ||
        '') + '-]', 'g'), '\\$&');
  }

  // JS function to convert BBCode and HTML code - http;//coursesweb.net/javascript/
  addHTMLpatterns() {
    // adds BBCodes and their HTML
    this.addBBCode('[b]{TEXT}[/b]', '<strong>{TEXT}</strong>');
    this.addBBCode('[code]{TEXT}[/code]', '{TEXT}');
    this.addBBCode('[i]{TEXT}[/i]', '<em>{TEXT}</em>');
    this.addBBCode('[u]{TEXT}[/u]',
      '<span style="text-decoration:underline;">{TEXT}</span>');
    this.addBBCode('[s]{TEXT}[/s]',
      '<span style="text-decoration:line-through;">{TEXT}</span>');
    this.addBBCode('[url={URL}]{TEXT}[/url]',
      '<a href="{URL}" title="link" target="_blank">{TEXT}</a>');
    this.addBBCode('[url]{URL}[/url]',
      '<a href="{URL}" title="link" target="_blank">{URL}</a>');
    this.addBBCode('[url={LINK}]{TEXT}[/url]',
      '<a href="{LINK}" title="link" target="_blank">{TEXT}</a>');
    this.addBBCode('[url]{LINK}[/url]',
      '<a href="{LINK}" title="link" target="_blank">{LINK}</a>');
    this.addBBCode('[img={URL} width={NUMBER1} height={NUMBER2}]{TEXT}[/img]',
      '<img src="{URL}" width="{NUMBER1}" height="{NUMBER2}" alt="{TEXT}" />'
    );
    this.addBBCode('[img]{URL}[/img]', '<img src="{URL}" />');
    this.addBBCode(
      '[img={LINK} width={NUMBER1} height={NUMBER2}]{TEXT}[/img]',
      '<img src="{LINK}" width="{NUMBER1}" height="{NUMBER2}" alt="{TEXT}" />'
    );
    this.addBBCode('[img]{LINK}[/img]', '<img src="{LINK}" />');
    this.addBBCode('[color=COLOR]{TEXT}[/color]',
      '<span style="{COLOR}">{TEXT}</span>');
    this.addBBCode('[highlight={COLOR}]{TEXT}[/highlight]',
      '<span style="background-color:{COLOR}">{TEXT}</span>');
    this.addBBCode('[quote="{TEXT1}"]{TEXT2}[/quote]',
      '<div class="quote"><cite>{TEXT1}</cite><p>{TEXT2}</p></div>');
    this.addBBCode('[quote]{TEXT}[/quote]', '<cite>{TEXT}</cite>');
    this.addBBCode('[blockquote]{TEXT}[/blockquote]',
      '<blockquote>{TEXT}</blockquote>');
  }
}

export default EscapeBBCode;

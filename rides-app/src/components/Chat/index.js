import React from 'react';

import {Form, MessageList} from './styled-components';

class Chat extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MessageList id="messages"></MessageList>
        <Form action="">
          <input id="m" autoComplete="off" /><button>Send</button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Chat;
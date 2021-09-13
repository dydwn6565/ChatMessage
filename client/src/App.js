import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Chat} from 'stream-chat-react';
import {StreamChat} from 'stream-chat';
import Cookies from 'universal-cookie';

// import ChannelContainer from './components/ChannelContainer';
// import ChannelListContainer from './components/ChannelListContainer';

import {ChannelListContainer ,ChannelContainer} from './components'
const apiKey = 'b3pk79w4sec5';

const client = StreamChat.getInstance(apiKey);

function App() {
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
      <ChannelListContainer />
      <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;

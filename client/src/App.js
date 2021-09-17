import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Chat} from 'stream-chat-react';
import {StreamChat} from 'stream-chat';
import Cookies from 'universal-cookie';

// import ChannelContainer from './components/ChannelContainer';
// import ChannelListContainer from './components/ChannelListContainer';

import {ChannelListContainer ,ChannelContainer, Auth} from './components'
const apiKey = 'b3pk79w4sec5';

const client = StreamChat.getInstance(apiKey);

const authToken = false;
function App() {

  if(!authToken) return <Auth />
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

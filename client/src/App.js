import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import {Chat} from 'stream-chat-react';
import {StreamChat} from 'stream-chat';
import Cookies from 'universal-cookie';

import 'stream-chat-react/dist/css/index.css'

// import ChannelContainer from './components/ChannelContainer';
// import ChannelListContainer from './components/ChannelListContainer';

import {ChannelListContainer ,ChannelContainer, Auth} from './components'

const cookies = new Cookies();

console.log(cookies.get("token"))
const apiKey = 'b3pk79w4sec5';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken){
  client.connectUser({
    id : cookies.get('userId'),
    name : cookies.get('username'),
    fullName : cookies.get('fullName'),
    image : cookies.get('avatarURL'),
    hashedPassword : cookies.get('hashedPassword'),
    phoneNumber : cookies.get('phoneNumber'),
    
  },authToken)
}

function App() {

  const [createType,setCreateType] = useState('');
  const [isCreating,setIsCreating] = useState(false);
  const [isEditing,setIsEditing] = useState(false);

  if(!authToken) return <Auth />
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
      <ChannelListContainer
      isCreating={isCreating}
      setIsCreating={setIsCreating}
      setCreateType={setCreateType}
      setIsEditing={setIsEditing} />
      <ChannelContainer 
       isCreating={isCreating}
       setIsCreating={setIsCreating}
       isEditing={isEditing}
       setIsEditing={setIsEditing}
       createType={createType} />
      </Chat>
    </div>
  );
}

export default App;

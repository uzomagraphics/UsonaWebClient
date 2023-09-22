import React, { useEffect, useState } from 'react';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import useWebSocket from 'react-use-websocket';

import './App.css';

const WS_URL = 'ws://127.0.0.1:8000';

function App() {
  const { } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true
  });

  return (
    <>
      <Navbar color="light" light>
        <NavbarBrand href="/">Usona web control </NavbarBrand>
      </Navbar>
      <div className="container-fluid">
             <LoginSection/> 
      </div>
    </>
  );
}

function LoginSection() {
  const { sendMessage, lastJsonMessage, lastMessage } = useWebSocket(WS_URL, {
    share: true,
  });
  const [username, setUsername] = useState('');
  
  useWebSocket(WS_URL, {
    share: true,
    filter: () => false
  });
 
  var [slider1, setSlider1] = useState('');
  const changeSlider1 = (event) => {
    setSlider1(event.target.value);
    sendMessage(JSON.stringify(
      { "slider1" : slider1 / 100 }
    ));
  };

  //const activities = lastJsonMessage?.data.userActivity || [];
  
  useEffect(() => {
    if (lastJsonMessage !== null) {
      console.log(lastJsonMessage);
      if (lastJsonMessage.slider1) {
        setSlider1(lastJsonMessage.slider1 * 100);
      }
    }
  });

  return (
    <div>
      <input name="slider1_r" type="range" onChange={changeSlider1} value={slider1}></input>
    </div>
    
  );
}


export default App;

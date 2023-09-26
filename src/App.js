import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import './App.css';

// import required modules
import { Pagination } from "swiper/modules";



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

  const { sendMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
  });



  useWebSocket(WS_URL, {
    share: true,
    filter: () => false
  });
 
  var [slider1, setSlider1] = useState('');
  const changeSlider1 = () => {
    sendMessage(JSON.stringify({ 
      "slider1" : slider1 / 100,
      "type" : "public_c"} 
    ));
  };

  var experience = 0;
  const changeExperience = (num) => {
    console.log(num)
    experience = num;
    sendMessage(JSON.stringify({ 
      "experience" : experience,
      "type" : "public_c"} 
    ));
  };

  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.slider1){
        setSlider1(lastJsonMessage.slider1 * 100);
        console.log("slider1 =" + lastJsonMessage.slider1);
      }
      else if (lastJsonMessage.experience) {
        experience = lastJsonMessage.experience;
        console.log("exp = " + experience);
      }
    }
  }, [lastJsonMessage]);

  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          <div class="swiper-slide slide1">
            <div class="frame">
              <div className="GALAXY">
      <div className="div">
        <div className="ellipse" />
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="text-wrapper">EXPERIENCE</div>
          <div className="experience-rec">
              <button className="rectangle-2" onClick={e => {changeExperience(1)}}></button>;
              <button className="rectangle-3" onClick={e => {changeExperience(2)}}></button>;
              <button className="rectangle-4" onClick={e => {changeExperience(3)}}></button>;
              <button className="rectangle-5" onClick={e => {changeExperience(4)}}></button>;
              <button className="rectangle-6" onClick={e => {changeExperience(5)}}></button>;
              <button className="rectangle-7" onClick={e => {changeExperience(6)}}></button>;
            
          </div>
          <img className="vector-tree" alt="Vector tree" src={require('./assets/Vector\ tree.png')} />
          <img className="img" alt="Vector tree" src={require('./assets/Vector\ tree.png')} />
          <img className="group" alt="Group" src={require('./assets/Group\ 1.png')}  />
          <img className="vector" alt="Vector" src={require('./assets/Vector.png')}  />
          <div className="ellipse-2" />
          <div className="ellipse-3" />
          <div className="ellipse-4" />
          <div className="ellipse-5" />
          <img className="vector-2" alt="Vector" src="vector-2.svg" />
          <div className="ellipse-6" />

    <div>
      <input value={slider1} type="range" onChange={e => {setSlider1(e.target.value); changeSlider1() }} ></input>
    </div>
        </div>
      </div>
    </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div class="swiper-slide slide2">
            <h1>AUDIO</h1>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div class="swiper-slide slide3">
            <h1>EMOTION</h1>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div class="swiper-slide slide4">
            <h1>CONTROLS</h1>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}



export default App;

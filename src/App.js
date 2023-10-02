import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import './App.css';

// import required modules
import { Pagination } from "swiper/modules";

//FONTS
import "./fonts/RooneySans-Bold.ttf";
import "./fonts/RooneySans-Regular.ttf";


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

  var [experience, setExperience] = useState('');
  const changeExperience = (exp) => {
    console.log("Send experience = " + exp)
    sendMessage(JSON.stringify({ 
      "experience" : exp} 
    ));
  };

    ////////TEST
    const sendBrightness = (num) => {
      console.log("sendBrightness = " + num)
      sendMessage(JSON.stringify({ 
        "brightness" : num} 
      ));
    };

    const sendStop = (num) => {
      console.log("sendstop= " + num)
      sendMessage(JSON.stringify({ 
        "stop" : 'stop'} 
      ));
    };

    const sendEnergy = (num) => {
      console.log("sendSnergy = " + num)
      sendMessage(JSON.stringify({ 
        "energy" : num} 
      ));
    };

    const sendPositivity = (num) => {
      console.log("sendPositivity = " + num)
      sendMessage(JSON.stringify({ 
        "positivity" : num} 
      ));
    };
  
///////////MODBUS///////////////
  const sendModbus = (num) => {
    console.log("sendModbus = " + num)
    sendMessage(JSON.stringify({ 
      "modbusButton" : num,
      "type" : "public_c"} 
    ));
  };
  const sendModbusSlider = (num, id) => {
    console.log("sendModbusSlider = " + id + " val = " + num)
    sendMessage(JSON.stringify({ 
      "modbusSlider" : num,
      "type" : "modbusSlider" + id} 
    ));
  };

///////////BACNET///////////////
const sendBacnet = (num) => {
  console.log("sendBacnet = " + num)
  sendMessage(JSON.stringify({ 
    "bacnetButton" : num,
    "type" : "public_c"} 
  ));
};
const sendBacnetSlider = (num, id) => {
  console.log("sendBacnetSlider = " + id + " val = " + num)
  sendMessage(JSON.stringify({ 
    "bacnetSlider" : num,
    "type" : "bacnetSlider" + id} 
  ));
};


  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.slider1){
        setSlider1(lastJsonMessage.slider1 * 100);
        console.log("slider1 =" + lastJsonMessage.slider1);
      }
      else if (lastJsonMessage.experience) {
        setExperience(lastJsonMessage.experience);
        console.log("exp = " + experience);
      }
    }
  }, [lastJsonMessage]);

  //MOUSE POSITION
  const [mouseLocalCoordinates, setMouseLocalCoordinates] = useState({x:0, y:0});

  const mouseMoveHandler = (event) => {
    setMouseLocalCoordinates({
      x:event.clientX - event.target.offsetLeft - 47.96,
      y:event.clientY - event.target.offsetTop - 75.61
    });
  }


  useEffect(()=>{
    window.addEventListener('mousemove', mouseMoveHandler);
    return(()=>{
      window.removeEventListener('mousemove', mouseMoveHandler);
    })
  }, [])



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
              <button className="rectangle-2" ></button>
              <button className="rectangle-3" ></button>
              <button className="rectangle-4" ></button>
              <button className="rectangle-5" ></button>
              <button className="rectangle-6" ></button>
              <button className="rectangle-7" ></button>
            
          </div>
          <img className="vector-tree" alt="Vector tree" src={require('./assets/Vector\ tree.png')} />
          <img className="img" alt="Vector tree" src={require('./assets/Vector\ tree.png')} />
          <img className="group" alt="Group" src={require('./assets/Group\ 1.png')}  />
          <img className="vector" alt="Vector" src={require('./assets/Vector.png')}  />
          <div className="ellipse-2" />
          <div className="ellipse-3" />
          <div className="ellipse-4" />

          <div className="ellipse-5" />
          <img className="vector-2" alt="Vector" src={require('./assets/Vector2.png')} />
          {experience==1?  <img className="ellipse-6"/>: null}
          {experience==2?  <img className="ellipse-7"/>: null}
          {experience==3?  <img className="ellipse-8"/>: null}
          {experience==4?  <img className="ellipse-9"/>: null}
          {experience==5?  <img className="ellipse-10"/>: null}
          {experience==6?  <img className="ellipse-11"/>: null}
       
          

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
      
      <div className="GALAXY2">
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="rectangle" />
              <div className="EMOTIONAL-STATE">
              EMOTIONAL <br />
              STATE
              </div>
              <img className="group" alt="Group" src={require('./assets/Group\ 2.png')} />
              <div className="emotion">
                <div className="overlap-group swiper-no-swiping">
                <>
      Mouse Local Coordinates: x = {mouseLocalCoordinates.x}, y={mouseLocalCoordinates.y}
    </>
                  <div className="div">
                    <div className="overlap-2">
                      <div className="group-2">
                        <img className="arrow" alt="Arrow" src={require('./assets/Arrow\ 1.png')} />
                        <img className="line" alt="Line" src={require('./assets/Line\ 2.png')} />
                      </div>
                      <div className="group-3">
                        <img className="img" alt="Arrow" src={require('./assets/Arrow\ 2.png')} />
                        <img className="line-2" alt="Line" src={require('./assets/Line\ 1.png')} />
                      </div>
                      <div className="text-wrapper" style={{opacity:mouseLocalCoordinates.x/1000}}>sad</div>
                      <div className="text-wrapper-2">upset</div>
                      <div className="text-wrapper-3">calm</div>
                      <div className="text-wrapper-4">serene</div>
                      <div className="text-wrapper-5">alert</div>
                      <div className="text-wrapper-6">depressed</div>
                      <div className="text-wrapper-7">excited</div>
                      <div className="text-wrapper-8">fatigued</div>
                      <div className="text-wrapper-9">happy</div>
                      <div className="text-wrapper-10">valence+</div>
                      <div className="text-wrapper-11">arousal+</div>
                      
                    </div>
                    <div className="text-wrapper-12">nervous</div>
                  </div>
                  <div className="text-wrapper-13">stressed</div>
                  <div className="text-wrapper-14">relaxed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      
  </SwiperSlide>

        <SwiperSlide>
          <div class="swiper-slide slide3">
          <h1>TEST</h1>
            <div style={{position:"absolute", top:"200px"}}>
              <h2 style={{color:"white"}}> EXPERIENCE</h2>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {changeExperience('forest')}}>FOREST</button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {changeExperience('ocean')}}>OCEAN</button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {changeExperience('meditation')}}>MEDITATION</button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {changeExperience('space')}}>SPACE</button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {changeExperience('spiral')}}>SPIRAL</button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {changeExperience('reactive2')}}>REACTIVE2</button>
            </div>

            <div style={{position:"absolute", top:"350px"}}>
              <h2 style={{color:"white"}}>EMOTIONAL VALENCE</h2>
              <div>
                <input style={{width:"350px", height:"50px", marginRight:"20px"}} type="range" onChange={e => {sendBrightness(e.target.value /100)}} ></input>            
                <input style={{width:"350px", height:"50px", marginRight:"20px"}} type="range" onChange={e => {sendEnergy(e.target.value /100)}} ></input>            
              </div>
              <div style={{position:"relative"}}>
                <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {sendStop('reactive2')}}>STOP</button>
                <input style={{width:"350px", height:"50px", marginRight:"20px", marginLeft:"206px"}} type="range" onChange={e => {sendPositivity(e.target.value /100)}} ></input>            

              </div>
            </div>


            <div style={{position:"absolute", top:"550px"}}>
              <h2 style={{color:"white"}}>AUDIO</h2>
              <div>
                <input style={{width:"350px", height:"50px", marginRight:"20px"}} type="range" onChange={e => {sendBrightness(e.target.value /100)}} ></input>            
                <input style={{width:"350px", height:"50px", marginRight:"20px"}} type="range" onChange={e => {sendEnergy(e.target.value /100)}} ></input>            
              </div>
              
            </div>

          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div class="swiper-slide slide4">
          <h1>CONTROL</h1>
            <div style={{position:"absolute", top:"300px"}}>
              <h2 style={{color:"white"}}>MODBUS</h2>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {sendModbus(1)}}></button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {sendModbus(2)}}></button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {sendModbus(3)}}></button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {sendModbus(4)}}></button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {sendModbus(5)}}></button>
              <div style={{position:"relative", top:"50px"}}>
                <input style={{width:"350px", height:"50px", marginRight:"20px"}} type="range" onChange={e => {sendModbusSlider(e.target.value /100, 1)}} ></input>
                <input style={{width:"350px", height:"50px", marginRight:"20px"}} type="range" onChange={e => {sendModbusSlider(e.target.value /100, 2)}} ></input>             
              </div>
            </div>

            <div style={{position:"absolute", top:"600px"}}>
              <h2 style={{color:"white"}}>BACnet</h2>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {sendBacnet(1)}}></button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {sendBacnet(2)}}></button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {sendBacnet(3)}}></button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {sendBacnet(4)}}></button>
              <button style={{width:"150px", height:"50px", marginRight:"20px"}} onClick={e => {sendBacnet(5)}}></button>
              <div style={{position:"relative", top:"50px"}}>
                <input style={{width:"350px", height:"50px", marginRight:"20px"}} type="range" onChange={e => {sendBacnetSlider(e.target.value /100, 1)}} ></input>
                <input style={{width:"350px", height:"50px", marginRight:"20px"}} type="range" onChange={e => {sendBacnetSlider(e.target.value /100, 2)}} ></input>            
              </div>
            </div>
            
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}



export default App;

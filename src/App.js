import React, { useEffect, useState  } from 'react';
import useWebSocket from 'react-use-websocket';
import RangeSlider from 'react-range-slider-input';
import "react-range-slider-input/dist/style.css";


import { Swiper, SwiperClass, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import './App.css';

// import required modules
import { Pagination } from "swiper/modules";

//FONTS
import "./fonts/RooneySans-Bold.ttf";
import "./fonts/RooneySans-Regular.ttf";


const WS_URL = 'ws://192.168.1.66:8000';

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
/////////EXPERIENCE////////////////
  var [experience, setExperience] = useState('');
  const changeExperience = (exp) => {
    console.log("Send experience = " + exp)
    sendMessage(JSON.stringify({ 
      "experience" : exp} 
    ));
  };

/////////EMOTIONAL VALENCE////////
var [play_pause, setPlay_pause] = useState(true);
const changePlay_pause = () => {
  console.log("Send play_pause = " + play_pause)
  sendMessage(JSON.stringify({ 
    "stop" : play_pause} 
  ));
};

var [brightness, setBrightness] = useState('');
  const changeBrightness = (e) => {
    console.log("Send brightness = " + brightness)
    sendMessage(JSON.stringify({ 
      "brightness" : brightness[1]/100} 
    ));
  };

var [speed, setSpeed] = useState('');
  const changeSpeed = (e) => {
    console.log("Send speed = " + speed)
    sendMessage(JSON.stringify({ 
      "speed" : speed[1]/100} 
    ));
  };

/////////AUDIO////////
var [volume, setVolume] = useState('');
  const changeVolume = (e) => {
    console.log("Send volume = " + volume)
    sendMessage(JSON.stringify({ 
      "volume" : volume[1]/100} 
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
      
      if (lastJsonMessage.experience) {
        setExperience(lastJsonMessage.experience);
        console.log("exp = " + experience);
      }
      if (lastJsonMessage.stop){
        setPlay_pause(lastJsonMessage.stop == 'play'? 'pause' : 'play');
        console.log("play_pause = " + lastJsonMessage.stop);
      }
      if (lastJsonMessage.brightness){
        setBrightness([0, lastJsonMessage.brightness * 100]);
        console.log("brightness = " + lastJsonMessage.brightness);
      }
      if (lastJsonMessage.speed){
        setSpeed([0, lastJsonMessage.speed * 100]);
        console.log("speed = " + lastJsonMessage.speed);
      }
      if (lastJsonMessage.volume){
        setVolume([0, lastJsonMessage.volume * 100]);
        console.log("volume = " + lastJsonMessage.volume);
      }
    }
  }, [lastJsonMessage]);


  //MOUSE POSITION  FLOWER OF LIFE
  const handleMouseMove = (event) => {
    // 👇 Get mouse position relative to element
    const localX = event.clientX - event.target.offsetLeft;
    const localY = event.clientY - event.target.offsetTop;
  };
  useEffect(() => {
    const handleMouseMove = (event) => {
      if(true){
        if(Math.pow(Math.abs(670.5 - event.clientX), 2) + Math.pow(Math.abs(574.5 - event.clientY), 2) < Math.pow(412.5, 2)){
          sendMessage(JSON.stringify({ 
            "energy" : (event.clientX - 258) / 825,
            "positivity" : 1-(event.clientY -162) / 825}
          ));
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);




  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper" onSlideChange={() => console.log("change")} >
        <SwiperSlide>
          <div className="element-EXPERIENCES">
            <div className="overlap-wrapper">
              <div className="overlap">
                <div className="rectangle" />
                  <img className="promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/PromoUSONA.png')} />
                  <header className="HEADER">
                <div className="overlap-group">
              <div className="div" />
              <img
                className="element-USONA-logo-high"
                alt="Element USONA logo high"
                src={require('./assets/Logo.png')}
              />
              <div className="text-wrapper">EXPERIENCES</div>
            </div>
            </header>

              <div className="element-RAIN-FOREST">
                <div className="overlap-2">
                  {experience=='forest'?  <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse7.png')} />: null}
                  <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse7.png')} />
                  <button className="btnimg" onClick={e => {changeExperience('forest'); setExperience('forest')}}>
                    <img className="img" alt="Element RAIN FOREST" src={require('./assets/RAINFOREST.png')} />
                  </button>
                </div>
              </div>
              
              <div className="element-OCEAN">
                <div className="overlap-2">
                  {experience=='ocean'?  <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse8.png')} />: null}
                  <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse8.png')} />
                  <button className="btnimg" onClick={e => {changeExperience('ocean'); setExperience('ocean')}}>
                    <img className="img-2" alt="Element OCEAN" src={require('./assets/OCEAN.png')} />
                  </button>
                </div>
              </div>

              <div className="element-MEDITATION">
                <div className="overlap-2">
                  {experience=='meditation'?  <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse10.png')} />: null}
                  <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse10.png')} />
                  <button className="btnimg" onClick={e => {changeExperience('meditation'); setExperience('meditation')}}>
                    <img className="element-MEDITATION-2" alt="Element MEDITATION" src={require('./assets/MEDITATION.png')} />
                  </button>
                </div>
              </div>

              <div className="element-GALAXY">
                <div className="overlap-2">
                  {experience=='galaxy'?  <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse9.png')} />: null}
                  <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse9.png')} />
                  <button className="btnimg" onClick={e => {changeExperience('galaxy'); setExperience('galaxy')}}>
                    <img className="img" alt="Element GALAXY" src={require('./assets/GALAXY.png')} />
                  </button>
                </div>
              </div>

                <div className="element-SPIRAL-RS">
                  <div className="overlap-2">
                    {experience=='spiral'?  <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse11.png')} />: null}
                    <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse11.png')} />
                    <button className="btnimg" onClick={e => {changeExperience('spiral'); setExperience('spiral')}}>
                      <img className="img-2" alt="Element SPIRAL REACTIVE" src={require('./assets/SPIRAL.png')} />
                    </button>
                  </div>
                </div>

                <div className="element-REACTIVE-SCENE">
                  <div className="overlap-2">
                    {experience=='reactive2'?  <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse14.png')} />: null}
                    <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse14.png')} />
                    <button className="btnimg" onClick={e => {changeExperience('reactive2'); setExperience('reactive2')}}>
                      <img className="img-2" alt="Element REACTIVE SCENE" src={require('./assets/REACTIVESCENE.png')} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </SwiperSlide>

  <SwiperSlide>
  
    <div className="element-EMOTIONAL-VALENCE">
      <div className="overlap-wrapper">
        <div className="overlap">

          <header className="HEADER">
            <div className="overlap-group">
              <img className="promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/PromoUSONA.png')} />
              <div className="rectangle" />
              <img
                className="element-USONA-logo-high"
                alt="Element USONA logo high"
                src={require('./assets/Logo.png')}
              />
              <div className="text-wrapper">EMOTIONAL VALENCE</div>
            </div>
          </header>

          <div className="SETTINGS swiper-no-swiping">
          
            <div className="div">
              <div className="rectangle-2" />
              <button className="btnimg" onClick={e => { setPlay_pause(play_pause == 'play' ? 'pause' : 'play'); changePlay_pause()}}>
              <div className="PLAY-STOP">
              {play_pause == 'play' ?  <img className="img" alt="Play STOP" src={require('./assets/Play.png')}/>: <img className="img" alt="Play STOP" src={require('./assets/Pause.png')}/>}
              
              
              </div>
              </button>

              <div className="BRIGHTNESS">
                <img className="BRIGHTNESS-ICON" alt="Brightness ICON" src={require('./assets/BRIGHTNESSICON.png')} />
                <div className="SLIDER">
                  <div className="overlap-group-2">
                    <RangeSlider
                      className="b_slider"
                      defaultValue={[0, 1]}
                      thumbsDisabled={[true, false]}
                      rangeSlideDisabled={true}
                      value = {brightness}
                      onInput={e => {setBrightness(e); changeBrightness()}}
                    />
                  </div>
                </div>
              </div>

              <div className="SPEED">
                <div className="overlap-group-wrapper">
                  <div className="overlap-group-2">
                    <RangeSlider
                      className="s_slider"
                      defaultValue={[0, 1]}
                      thumbsDisabled={[true, false]}
                      rangeSlideDisabled={true}
                      value = {speed}
                      onInput={e => {setSpeed(e); changeSpeed()}}
                    />
                  </div>
                </div>
                <img className="SPEED-ICON" alt="Speed ICON" src={require('./assets/SPEEDICON.png')} />
              </div>
              <img className="line" alt="Line" src={require('./assets/Line1.png')} />
              <img className="line-2" alt="Line" src={require('./assets/Line1.png')} />
            </div>
          </div>

          <div className="EMOTIONAL-CIRCLE swiper-no-swiping" draggable="false" onMouseEnter={handleMouseMove}>
          
          
            <div className="overlap-2">
              <img className="FLOWER-OF-LIFE" alt="Flower OF LIFE" src={require('./assets/FLOWEROFLIFE.png')} draggable="false"/>
              <img className="line-3" alt="Line" src={require('./assets/Line2.png')} draggable="false"/>
              <img className="line-4" alt="Line" src={require('./assets/Line3.png')} draggable="false"/>
              <div className="text-wrapper-2" draggable="false">stressed</div>
              <div className="text-wrapper-3" draggable="false">relaxed</div>
              <div className="text-wrapper-4" draggable="false">nervous</div>
              <div className="text-wrapper-5" draggable="false">depressed</div>
              <div className="text-wrapper-6" draggable="false">sad</div>
              <div className="text-wrapper-7" draggable="false">alert</div>
              <div className="text-wrapper-8" draggable="false">arrousal +</div>
              <div className="text-wrapper-9" draggable="false">valence +</div>
              <div className="text-wrapper-10" draggable="false">fatigued</div>
              <div className="text-wrapper-11" draggable="false">happy</div>
              <div className="text-wrapper-12" draggable="false">excited</div>
              <div className="text-wrapper-13" draggable="false">serene</div>
              <div className="text-wrapper-14" draggable="false">upset</div>
              <div className="text-wrapper-15" draggable="false">calm</div>
            </div>
          </div>

        </div>
      </div>
    </div>
      
  </SwiperSlide>

  <SwiperSlide>

    <div className="element-AUDIO-STEP">
      <div className="overlap-wrapper">
        <div className="overlap">
          <img className="promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/PromoUSONA.png')} />
          <img className="img" alt="Rectangle" src={require('./assets/Rectangle21.png')} />
          <div className="rectangle" />
          <header className="HEADER">
            <div className="overlap-group">
              <div className="div" />
              <img
                className="element-USONA-logo-high"
                alt="Element USONA logo high"
                src={require('./assets/Logo.png')}
              />
              <div className="text-wrapper">AUDIO</div>
            </div>
          </header>
          <div className="SETTINGS swiper-no-swiping">
            <div className="overlap-2">
              <div className="rectangle-2" />
              <div className="PLAY-STOP">
                <img className="PLAY-STOP-2" alt="Play STOP" src={require('./assets/Pause.png')} />
              </div>
              <div className="VOLUME">
                <img className="VOLUME-ICON" alt="Volume ICON" src={require('./assets/VOLUMEICON.png')} />
                <div className="SLIDER">
                  <div className="overlap-group-2">
                  <RangeSlider
                      className="s_slider"
                      defaultValue={[0, 1]}
                      thumbsDisabled={[true, false]}
                      rangeSlideDisabled={true}
                      value = {volume}
                      onInput={e => {setVolume(e); changeVolume()}}
                    />
                    
                  </div>
                </div>
              </div>
              <img className="line" alt="Line" src={require('./assets/LineAudio1.png')} />
              <img className="line-2" alt="Line" src={require('./assets/LineAudio2.png')} />
              <img className="SONG-ICON" alt="Song ICON" src={require('./assets/SONGICON.png')} />
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

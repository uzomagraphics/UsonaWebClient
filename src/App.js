import React, { useEffect, useState  } from 'react';
import useWebSocket from 'react-use-websocket';

import autoAnimate from '@formkit/auto-animate'

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



const WS_URL = 'ws://localhost:8000';

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

  ///////////ANIMATE
  const [open, setOpen] = useState(false);
  const parentRef = React.useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  const showMore = () => setOpen(!open);
  //////////////////////
 
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
var [play_pause, setPlay_pause] = useState('play');
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

 var [Audioplay_pause, setAudioPlay_pause] = useState('play');
const changeAudioPlay_pause = () => {
  console.log("Send Audioplay_pause = " + Audioplay_pause)
  sendMessage(JSON.stringify({ 
    "AudioPlay_pause" : Audioplay_pause} 
  ));
};

var [source, setSource] = useState(1);
  const changeSource = (a) => {
    console.log("Send source = " + a)
    sendMessage(JSON.stringify({ 
      "source" : a} 
    ));
  };



  //////////////BLINDS//////////////
  var [blinds, setBlinds] = useState('');
  const changeBlinds = (e) => {
    console.log("Send blinds = " + e)
    sendMessage(JSON.stringify({ 
      "blinds" : e} 
    ));
  };
  //////////////LIGHT//////////////
  var [lightBrightness, setLightBrightness] = useState('');
  const changeLightBrightness = (e) => {
    console.log("Send light brightness = " + lightBrightness)
    sendMessage(JSON.stringify({ 
      "lightBrightness" : lightBrightness[1]/100} 
    ));
  };

  var [onOff, setOnOff] = useState('ON');
  const changeOnOff = () => {
    console.log("Send light onOff = " + onOff)
    sendMessage(JSON.stringify({ 
      "onOff" : onOff} 
    ));
  };

    //////////////MOTOR//////////////
    var [motor, setMotor] = useState('');
    const changeMotor = (e) => {
      console.log("Send motor = " + e)
      sendMessage(JSON.stringify({ 
        "motor" : e} 
      ));
    };

    const sendEmergencyStop = () => {
      console.log("sendEmergencyStop")
      sendMessage(JSON.stringify({ 
        "EmergencyStop" : "STOP",} 
      ));
    };
 //////////////SYSTEM//////////////
const [td, setTd] = useState('DOWN');

    const sendReboot = () => {
      console.log("sendReboot")
      sendMessage(JSON.stringify({ 
        "Reboot" : "Reboot",} 
      ));
    };

    ////////PASSWORD//////
    var [login, setLogin] = useState('incorrect');
    var [userName, setUserName] = useState('');
    var [password, setPassword] = useState('');
    const handleSubmit = (event) => {
      // Prevent page reload
      event.preventDefault();

      sendMessage(JSON.stringify({ 
        "userName" : userName} 
      ));
      sendMessage(JSON.stringify({ 
        "password" : password} 
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
      if (lastJsonMessage.AudioPlay_pause){
        setAudioPlay_pause(lastJsonMessage.Audioplay_pause == 'play'? 'pause' : 'play');
        console.log("AudioPlay_pause = " + lastJsonMessage.AudioPlay_pause);
      }
      if (lastJsonMessage.source){
        setSource(lastJsonMessage.source);
        console.log("source = " + lastJsonMessage.source);
      }
      if (lastJsonMessage.blinds){
        setBlinds(lastJsonMessage.blinds);
        console.log("blinds = " + lastJsonMessage.blinds);
      }
      if (lastJsonMessage.lightBrightness){
        setLightBrightness([0, lastJsonMessage.lightBrightness * 100]);
        console.log("light brightness = " + lastJsonMessage.lightBrightness);
      }
      if (lastJsonMessage.onOff){
        setOnOff(lastJsonMessage.onOff == 'ON'? 'OFF' : 'ON');
        console.log("light onOff = " + onOff);
      }
      if (lastJsonMessage.motor){
        setBlinds(lastJsonMessage.motor);
        console.log("motor = " + lastJsonMessage.motor);
      }
      if (lastJsonMessage.TD){
        setTd(lastJsonMessage.TD);
        console.log("TD = " + td);
      }

      if (lastJsonMessage.login == 'correct'){
        setLogin('correct')
        console.log(login)
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
            "energy" : (event.clientX - 258) / 825}
          ));
          sendMessage(JSON.stringify({ 
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
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper" onSlideChange={() => setLogin('incorrect')} >
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
              <button  className="btnimg2" onClick={e => { setAudioPlay_pause(Audioplay_pause == 'play' ? 'pause' : 'play'); changeAudioPlay_pause()}}>
              {Audioplay_pause == 'play' ?  <img className="img2" alt="Play STOP" src={require('./assets/Play.png')}/>: <img className="img2" alt="Play STOP" src={require('./assets/Pause.png')}/>}
                </button>
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
              <div ref={parentRef}>
              {!open && (
              <img className="SONG-ICON" alt="Song ICON" src={require('./assets/SONGICON.png')} onClick={showMore}/>
              )}
              </div>
            </div>

            {open && (
          <div className="INPUT-SOURCE">
            <img className="SONG-ICON2" alt="Song ICON" src={require('./assets/SONGICON.png')} />
            <img className="BACK" alt="Back" src={require('./assets/BACK.png')} onClick={showMore}/>
            {source == 1 ? <div className="rectangle-4" /> : null}
            <div className="rectangle-4btn" onClick={e => {setSource((prevSource) =>1); changeSource(1)}}>
            <div className="text-wrapper-2">Source 01 - Title</div>
            </div>
            {source == 2 ? <div className="rectangle-5" /> : null}
            <div className="rectangle-5btn" onClick={e => {setSource((prevSource) =>2); changeSource(2)}}>
            <div className="text-wrapper-3">Source 02 - Title</div>
            </div>
            {source == 3 ? <div className="rectangle-6" /> : null}
            <div className="rectangle-6btn" onClick={e => {setSource((prevSource) =>3); changeSource(3)}}>
            <div className="text-wrapper-4">Source 03 - Title</div>
            </div>
            {source == 4 ? <div className="rectangle-7" /> : null}
            <div className="rectangle-7btn" onClick={e => {setSource((prevSource) =>4); changeSource(4)}}>
            <div className="text-wrapper-5">Source 04 - Title</div>
            </div>
            <img className="line-3" alt="Line" src={require('./assets/Line4.png')} />
            <img className="line-4" alt="Line" src={require('./assets/Line4.png')} />
            <img className="line-5" alt="Line" src={require('./assets/Line4.png')} />
            <img className="line-6" alt="Line" src={require('./assets/Line4.png')} />
          </div>
        )}

          </div>
        </div>
      </div>
    </div>

  </SwiperSlide>

  <SwiperSlide>

<div className="element-LIGHTNING">
  <div className="overlap-wrapper">
    <div className="overlap">
      <img className="promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/USONABKG.png')}/>
        <div className="rectangle" />
        <header className="HEADER">
          <div className="overlap-group">
            <div className="div" >
            <img
               className="element-USONA-logo-high"
              alt="Element USONA logo high"
              src={require('./assets/Logo.png')}
            />
            <div className='textLight'>LIGHTNING</div>
            </div>
          </div>
        </header>

        <div className="SETTINGS swiper-no-swiping">
          <div className="overlap-2">
            <div className="rectangle-2" />
             <img className="line" alt="Line" src={require('./assets/Line1Light.png')}/>
             <img className="line2" alt="Line" src={require('./assets/Line1Light.png')} />
           </div>
         </div>

        <div className="BRIGHTNESS swiper-no-swiping">
           <img className="BRIGHTNESS-ICON" alt="Brightness ICON" src={require('./assets/BRIGHTNESSICONLight.png')} />
            <div className="SLIDER">
            
              <div className="overlap-group-2">
              <RangeSlider
                      className="b_slider"
                      defaultValue={[0, 1]}
                      thumbsDisabled={[true, false]}
                      rangeSlideDisabled={true}
                      value = {lightBrightness}
                      onInput={e => {setLightBrightness(e); changeLightBrightness()}}
                    />
              </div>
             </div>
           </div>

           <div className="MOTOR-CONTROL swiper-no-swiping">
            <div className="ON-OFF" onClick={e => {setOnOff(onOff == 'ON' ? 'OFF' : 'ON'); changeOnOff()}}>
              <div className="overlap-group">
                {onOff == 'ON' ? <img className="CURSEUR" alt="Curseur" src={require('./assets/CURSEUR.png')} /> : <img className="CURSEUR2" alt="Curseur" src={require('./assets/CURSEUR.png')} />}

              </div>
            <div className="text-wrapper">ON/OFF</div>
          </div>

             <div className="UP-DOWN">
                <div className='UP-DOWN2' onClick={e => {setBlinds(blinds <= 0.9 ? blinds + 0.1 : 1); changeBlinds(blinds <= 0.9 ? blinds + 0.1 : 1)}}>
                  <img className="UP" alt="Up" src={require('./assets/UP.png')}/>
                </div>
                <div className='UP-DOWN1' onClick={e => {setBlinds(blinds => 0.1 ? blinds - 0.1 : 0); changeBlinds(blinds >= 0.1 ? blinds - 0.1 : 0)}}>
                  <img className="DOWN" alt="Down" src={require('./assets/DOWN.png')}/>
                </div>
               <img className="line-2" alt="Line" src={require('./assets/Line8Light.png')} />
              </div>

              <img className="OPEN" onClick={e => {setBlinds(0); changeBlinds(0)}} src={require('./assets/OPEN.png')}/>
              
              <img className="HALF-OPEN" onClick={e => {setBlinds(0.5); changeBlinds(0.5)}}  src={require('./assets/HALFOPEN.png')}/>
                  
              <img className="CLOSE" onClick={e => {setBlinds(1); changeBlinds(1)}} src={require('./assets/CLOSE.png')}/>
              
                
            
              
            </div>
          </div>
        </div>
      </div>
    

</SwiperSlide>

<SwiperSlide>



  <div className="element-MOTOR-CONTROL">
    <div className="overlap-wrapper">
      <div className="overlap">
        <img className="promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/USONABKG.png')} />
        <div className="rectangle" />

        <header className="HEADER">
          <div className="overlap-group">
            <div className="div" />
            <img
              className="element-USONA-logo-high"
              alt="Element USONA logo high"
              src={require('./assets/Logo.png')}
            />
            <div className="text-wrapper">ADVANCE SETTINGS</div>
          </div>
        </header>

        <div className="SETTINGS">
          <div className="overlap-2">
            <div className="overlap-group-2">
              <img className="line" alt="Line" src={require('./assets/Line2Motor.png')} />
              <img className="img" alt="Line" src={require('./assets/Line3Motor.png')} />
            </div>
            <div className="text-wrapper-2">MOTOR CONTROL</div>
            <div className="text-wrapper-3">SYSTEM</div>

            <div className="MOTOR-CONTROL">

            <div className="UP-DOWN">
                <div className='UP-DOWN2' onClick={e => {setMotor(motor <= 0.9 ? motor + 0.1 : 1); changeMotor(motor <= 0.9 ? motor + 0.1 : 1)}}>
                  <img className="UP" alt="Up" src={require('./assets/UP.png')}/>
                </div>
                <div className='UP-DOWN1' onClick={e => {setMotor(motor => 0.1 ? motor - 0.1 : 0); changeMotor(motor >= 0.1 ? motor - 0.1 : 0)}}>
                  <img className="DOWN" alt="Down" src={require('./assets/DOWN.png')}/>
                </div>
              <img className="line-2" alt="Line" src={require('./assets/Line8Light.png')} />
            </div>

              <button className="POSITION" onClick={e => {setMotor(0); changeMotor(0)}}>
                <img className="POSITIONbtn" alt="Rectangle" src={require('./assets/POSITION01.png')} />
              </button>

              <button className="POSITION-2" onClick={e => {setMotor(0.5); changeMotor(0.5)}}>
                <img className="POSITIONbtn" alt="Rectangle" src={require('./assets/POSITION02.png')} />
              </button>

              <button className="POSITION-3" onClick={e => {setMotor(1); changeMotor(1)}}>
                <img className="POSITIONbtn" alt="Rectangle" src={require('./assets/POSITION03.png')} />
              </button>

              <button className="EMERGENCY-STOP" onClick={e => {sendEmergencyStop()}}>
                <div className="rectangle-8" />
              </button>

            </div>

            <div className="SYSTEM">
              <div className="REBOOT" onClick={e => {sendReboot()}}>
                <img className="POWER" alt="Power" src={require('./assets/POWER.png')} />
              </div>
              <div className="TD-STATUS">
                <p className="touch-designer">
                  <span className="span">Touch Designer :</span>
                  <span className="text-wrapper-4"> Active</span>
                </p>
                {td == 'UP' ? <div className="ellipse" /> : <div className="ellipse2" />}
              </div>
            </div>

          </div>
        </div>

        {login =='correct' ? null :
         <div className="element-LOGIN">
   
      <div className="overlap-wrapper">
        <div className="overlap">

          <div className="rectangleW" />
          <div className="rectangle" />
          <div className="overlap" />
          <div className="div" />

        <form onSubmit={handleSubmit}>
          <div className="PASSWORD">
            <div >
            <input className="overlap-group" value={password} type="password" name="pass" required onChange={e => {setPassword(e.target.value)}}/>
              <img className="PASSWORD-EYE" alt="Password EYE" src={require('./assets/PASSWORDEYE.png')} />
            </div>
            <div className="text-wrapper">Password</div>
          </div>
          <div className="LOGIN">
            <div className="text-wrapper-2">Login</div>
            <input className="rectangle-2" value={userName} type="text" name="uname" required onChange={e => {setUserName(e.target.value)}}/>
          </div>
          <div className="ENTER">
            <div className="div-wrapper" >
              <button className='submitbtn' type="submit">
              <div className="text-wrapper-3">ENTER</div>
              </button>
            </div>
          </div>
        </form>

          <img className="element-USONA-logo-high" alt="Element USONA logo high" src={require('./assets/Logo.png')} />
        </div>
      </div>
    </div>
    }

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

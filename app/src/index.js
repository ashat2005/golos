import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import "./scss/style.scss"
const root = ReactDOM.createRoot(document.getElementById('root'));

const useSpeechSynthesis = () => {
const [voices, setVoices] = useState([]);
const synth = useRef();

const updateVoices = () => {
  setVoices(synth.current.getVoices())
}
const speak = (text, voice, pitch = 1, rate = 1) => {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.voice = voice
  utterance.pitch = pitch
  utterance.rate = rate
  synth.current.speak(utterance);
};
useEffect(() => {
  if(typeof window !== "object" || !window.speechSynthesis){
    return;
  }
  
  synth.current = window.speechSynthesis;
  synth.current.onvoicechanged = updateVoices;
  updateVoices();

  return () => {
    synth.current.onvoicechanged = null;
  };
}, []);

return[voices, speak];

};

const Brother = (props) => {
const [voices, speak] = useSpeechSynthesis()
const [currentVoice, setCurrentVoice] = useState();
const [text, setText] = useState("hello world");
useEffect(() => {
  if(!currentVoice){
    setCurrentVoice(voices.filter((v) => v.default)[0] || voices[0]);
  }
  
}, [voices]);

const handleVoiceChange = (e) => {
  setCurrentVoice(voices.filter((v) => v.name === e.target.value)[0]);
};

const handleTextChange = (e) => {
  setText(e.target.value);
};

const handleSpeak = (e) => {
  e.preventDefault();
  speak(text, currentVoice);
};


return(
  <form className="contain" onSubmit={handleSpeak}>
    <div className="select">
      <select value={currentVoice ? currentVoice.name : ""} onChange={handleVoiceChange}>
        {
        voices.map((v) => ( 
          <option value={v.name} key={text}>{`${v.name}`}</option>
        ))
        }
      </select>
    </div>
      <input type="text" value={text} onChange={handleTextChange}/>
      <button type="submit">Speak</button>
  </form>
)

};

root.render(<Brother/>);









































// class ClickButton extends Component {
//   constructor(props){
//     super(props)
//     this.state = {counter: 0 };
//     this.press = this.press.bind(this);
//   }
//   incrementCounter(prevState, props){
//     return{
//       counter: prevState.counter + props.increment,
//     };
//   }
//   press(){
//     this.setState(this.incrementCounter);
//   }
//   render(){
//     return( 
//     <div>
//       <button onClick={this.press}>Count</button>
//         <div>
//             Counter: {this.state.counter}<br/>
//             Increment {this.props.increment}
//         </div>
//     </div>
//     );
//   }
// }
// function ClickButton(props){
//   const [count, setCount] = useState(0);
//   const press = function(){
//     setCount(count + props.increment);
//   };
//   return(
//     <div>
//            <button onClick={press}>Count</button>
//              <div>
//                  Counter: {count}<br/>
//                  Increment {props.increment}
//             </div>
//         </div>
//   );
// }










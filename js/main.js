// Initiate SpeechSynth API
const synth = window.speechSynthesis;

// Dom Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');
// Initialize the voices array
let voices = [];
const getVoices = () => {
    voices =synth.getVoices();
    console.log (voices);
    voices.forEach (voice =>  {
        // creating option element
        const option = document.createElement('option');
        // Fill option with voice and lang
        option.textContent = voice.name + '('+voice.lang+')';

        //Set needed option attribute
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });

};
getVoices();
    
if (synth.onvoiceschanged!== undefined){
    synth.onvoiceschanged = getVoices;
    
} 

// Speak function
const speak = () => {

   
    // check if speaking
    if(synth.speaking){
        console.error('Already speaking...');
        return;
    }
     if(textInput.value !== ''){
          //Background gif
    body.style.background = '#0d0c22 url(https://cdn.dribbble.com/users/1373613/screenshots/5442947/___3.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style,backgroundSize= '100% 100%';

         // get speak text
         const speakText = new SpeechSynthesisUtterance(textInput.value)
         ;
         // Speak end
         speakText.onend = e => {
             console.log('Done speaking....');
             body.style.background ='#0c0b1c'
         }

         // Speak error
         speakText.onerror = e=> {
             console.error('Something  went wrong');
         }

         // Selected voice
         const selectedVoice = voiceSelect.selectedOptions[0]
         .getAttribute('data-name');
         
         // Loop through voices 
         voices.forEach(voice =>{
             if(voice.name === selectedVoice){
                 speakText.voice = voice;
             }
         });

         // set pitch & rate
         speakText.rate = rate.value;
         speakText.pitch=pitch.value;
         //speak
         synth.speak(speakText);
     }
    };

    // Events
    // Text form submit
    textForm.addEventListener('submit', e =>{
        e.preventDefault();
        speak();
        textInput.blur();
    });
  
    // Rate value change
    rate.addEventListener('change', e => (rateValue.textContent = rate.value));

    //Pitch valve change
     pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));
  
     // Voice select change
     voiceSelect.addEventListener('change', e => speak());
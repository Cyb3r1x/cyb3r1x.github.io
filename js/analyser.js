

//Audio Analyser
const audio_ = document.querySelector(".audio");

let audioCtx;
let analyser;
let bufferLength;
let dataArray;

let canvas = document.querySelector('.freqMonitor');
let ctx = canvas.getContext("2d");
let barWidth;
let barHeight;

function setAnalyser(){
  audioCtx = new AudioContext();
  audioSrc = audioCtx.createMediaElementSource(audio_);
  analyser = audioCtx.createAnalyser();
  audioSrc.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 128;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
};



function updateFrequencys(){
  if(!audio_.paused){
    barWidth = canvas.width/bufferLength;
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = 'gray';
    for(let i = 0; i < dataArray.length; i++){
      x = i *5
      barWidth = 1;
      barHeight = -(dataArray[i] * 0.5);
      ctx.fillRect(x, canvas.height, barWidth, barHeight);
      x += barWidth;
    }
  }
}


function update() {
	requestAnimationFrame( update);
  if(!audio_.paused){
    updateFrequencys();
  }
};

update();

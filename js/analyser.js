

//Audio Analyser
const audio_ = document.querySelector(".audio");

let audioCtx;
let analyser;
let bufferLength;
let dataArray;

let canvas = document.getElementById('freqMonitor');
let ctx = canvas.getContext("2d");
let barWidth;
let barHeight;

const set = document.querySelector('.load_page');
const image = document.querySelector('.image_banner');

const load = document.querySelector('.load_page');
const load_audio = document.querySelector('.load_page_audio');
const load_audio2 = document.querySelector('.onloadpage');

const button_menu = document.querySelector(".toggle_tracklist");
const button_menu_mobile = document.querySelector(".tracklist_button");
const track_menu = document.querySelector(".tracklist");

function setAnalyser(){
  audioCtx = new AudioContext();
  audioSrc = audioCtx.createMediaElementSource(audio_);
  analyser = audioCtx.createAnalyser();
  audioSrc.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 256;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
};


function updateFrequencys(){
  if(!audio_.paused){
    barWidth = canvas.width/bufferLength;
    analyser.getByteFrequencyData(dataArray);

    function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    let x_ = canvas.width;
    let y_ = canvas.height;
    var spectrum = dataArray;
    var rt = 0.1;
    ctx.clearRect(0,0, x_, y_);
    for(let i = 0; i < spectrum.length-1; i++){
      var amp = spectrum[i];
      var sx = i * 4;
      var y = map_range(amp, 0, 128, y_-10 * 0.1, 75);
      var y_n = map_range(amp, 0, 128, 0, y_/2);
      ctx.beginPath();
      ctx.moveTo(sx, y_n);
      ctx.lineTo(sx, y);
      ctx.strokeStyle = "green";
      ctx.stroke();
    }
  }
}


function update() {
	requestAnimationFrame( update);
  if(!audio_.paused){
    updateFrequencys();
  }
};

set.addEventListener('click', setAnalyser);

button_menu.onclick = function() {
  track_menu.classList.toggle("active");
};

button_menu_mobile.onclick = function() {
  track_menu.classList.toggle("active");
};

load.addEventListener('click', function(){
  load.classList.toggle('active');
  image.classList.toggle('active');
  load_audio.play();
});

update();

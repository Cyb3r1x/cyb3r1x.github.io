
/////////////////////////////////////////////////////
//////////////////HYDRA/////////////////////////////
//


let hydraCanvas2 = document.getElementById("hydra_canvas_2");
let cam_switch = document.querySelector(".toggle_cam");
let background_src = document.querySelector(".toggle_back");
let cam_audio = document.querySelector(".camera_audio");


let hydraCanvas = document.getElementById("hydra_canvas");




background_src.addEventListener('click', ()=>{
  hydraCanvas.width = window.innerWidth;
  hydraCanvas.height = window.innerHeight;

  const hydra = new Hydra({
    canvas: hydraCanvas,
    detectAudio: false,
  });

  s1.initScreen();

  src(s1)
  .modulate(noise(3,0.1),0.5).diff(noise(2).contrast(0.5))
  .blend(o0,0.5).rotate([0.1,0.5,0.7,0.12].fast(5))
  .modulateScale(noise(0.1,-0.1,0).scale(0.2),20,0)
  .out()
});


//////

cam_switch.addEventListener('click', ()=>{

cam_audio.play();

hydraCanvas2.width = window.innerWidth;
hydraCanvas2.height = window.innerHeight;

const hydras = new Hydra({
  canvas: hydraCanvas2,
  detectAudio: false,
  enableStreamCapture: true
});

s0.initCam();

src(s0)
.modulate(o0,0.1)
.modulate(noise(2,0.1),0.1)
.blend(o0,0.2)
.colorama(0.05)
.out();

});

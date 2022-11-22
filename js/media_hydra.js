
//////////////////HYDRA/////////////////////////////

let cam_switch = document.querySelector(".toggle_cam");
let background_src = document.querySelector(".toggle_back");
let cam_audio = document.querySelector(".camera_audio");


let hydraCanvas = document.getElementById("hydra_canvas");
let hydraCanvas2 = document.getElementById("hydra_canvas_2");

hydraCanvas.width = window.innerWidth;
hydraCanvas.height = window.innerHeight;


/////////////////////////////////////////////////////

hydraCanvas2.width = window.innerWidth;
hydraCanvas2.height = window.innerHeight;

const cam_instance = new Hydra({
  makeGlobal: false,
  detectAudio: false,
  canvas: hydraCanvas2,
  width: window.innerWidth,
  height: window.innerHeight
}).synth

cam_switch.addEventListener('click', ()=>{
  cam_audio.play();
  cam_instance.s1.initCam();
  const s1 = cam_instance.s1;

  cam_instance.shape(100,0.4,0.8)
  .blend(cam_instance.o0,0.5)
  .modulate(cam_instance.noise(2,0.2))
  .diff(cam_instance.s1,0.5)
  .out();
});

/////////////////////////////////////////////////////

const back_instance = new Hydra({
  makeGlobal: false,
  detectAudio: false,
  canvas: hydraCanvas
}).synth

background_src.addEventListener('click', ()=>{
  back_instance.s1.initScreen();
});

back_instance.noise(0.5,0.5)
.modulate(back_instance.noise(3,0.1),0.5).diff(back_instance.noise(2).contrast(0.5))
.blend(back_instance.s1,0.5).rotate([0.1,0.5,0.7,0.12].fast(5))
.modulateScale(back_instance.noise(0.1,-0.1,0).scale(0.2),20,0)
.diff(cam_instance.s1,0.1)
.out()

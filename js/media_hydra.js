
//////////////////HYDRA/////////////////////////////

let cam_switch = document.querySelector(".toggle_cam");
let background_src = document.querySelector(".toggle_back");
let cam_audio = document.querySelector(".camera_audio");


let hydraCanvas = document.getElementById("hydra_canvas");
let hydraCanvas2 = document.getElementById("hydra_canvas_2");

hydraCanvas.width = window.innerWidth;
hydraCanvas.height = window.innerHeight;


/////////////////////////////////////////////////////

let code = null;

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
  if(code == null){
    cam_audio.play();
    cam_instance.s1.initCam();
  }
  
  code += 1;

  if(code >= 5){
    code = 1;
  }

  if(code == 1){
    cam_instance.shape(100,0.4,0.8)
    .blend(cam_instance.o0,0.5)
    .modulate(cam_instance.noise(2,0.2))
    .diff(cam_instance.s1,0.5)
    .out();
  } else if (code == 2) {
    cam_instance.noise(2,0.5)
    .modulateScale(cam_instance.s1,1)
    .modulate(cam_instance.o0,0.8)
    .diff(cam_instance.s1,[0.5,0.2,0.4,0.7,0.9,1.2].fast(5))
    .out()
  } else if (code == 3) {
    cam_instance.voronoi()
    .modulateRotate(cam_instance.s1,2)
    .diff(cam_instance.o0,0.2)
    .add(cam_instance.s1,0.5)
    .colorama(0.05)
    .out()
  } else if (code == 4) {
    cam_instance.shape(100,0.4,1)
    .mult(cam_instance.s1,0.5)
    .contrast(1.5)
    .modulate(cam_instance.osc(10,0.1))
    .rotate(2,0.1)
    .out()
  }
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
.diff(back_instance.s1,0.1)
.out()

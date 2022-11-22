

const can = document.getElementById("three_canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var mouseX;
var mouseY;

const renderer = new THREE.WebGLRenderer({ canvas: can, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0);
document.body.appendChild( renderer.domElement );

// //
// const controls = new THREE.OrbitControls (camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 30);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 10);
scene.add(pointLight);

pointLight.position.z = 10;
pointLight.position.y = 1;
camera.position.z = 3;

window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio( window.devicePixelRatio );
  // console.log(window.innerHeight);
  load.width = window.innerWidth;
  load.height = window.innerHeight;
});

var clock = new THREE.Clock();


function timer(n){
  if(clock.getElapsedTime() >= n){
    clock.start();
  }

  return(n);
}

function rnd(max) {
  return Math.random() * max;
}

function rndCam(n){
  if(clock.getElapsedTime() >= 0 && clock.getElapsedTime() <= 0.1 ){
    return rnd(n);
  }
}

let angle = 1;
var x, y, z;


function animate() {
  requestAnimationFrame( animate );
  timer(2);


  camera.position.x = Math.cos(angle) * 0.1;
  camera.rotation.z = Math.sin(angle) * 0.1;

  renderer.render( scene, camera );

  angle += 0.03;
};

animate();

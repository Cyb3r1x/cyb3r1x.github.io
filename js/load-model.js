
const substance = new THREE.Group();

const cubeTextureLoader = new THREE.CubeTextureLoader();
const env = cubeTextureLoader.load([
  'img/Modelos de prueba/envMap/px.jpg',
  'img/Modelos de prueba/envMap/nx.jpg',
  'img/Modelos de prueba/envMap/py.jpg',
  'img/Modelos de prueba/envMap/ny.jpg',
  'img/Modelos de prueba/envMap/pz.jpg',
  'img/Modelos de prueba/envMap/nz.jpg'
]);


const dracoLoader = new THREE.DRACOLoader;
dracoLoader.setDecoderPath('thrjs/draco/');

const loader = new THREE.GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load('Models/threejsTest3.glb', (glb) => {
    glb.scene.children.forEach((element) => {
      substance.add(element);
    });

    substance.children.forEach((m) => {
    m.material = materialx;
    // console.log(m.userData);
    });
});


scene.add(substance);

substance.position.x = 1;

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function mouseMovement(){
  document.onmousemove = function(e){
      cursorX = e.pageX;
      cursorY = e.pageY;
      substance.rotation.y = map_range(cursorX, 0, window.innerWidth, -0.3, 0.3);
      substance.rotation.x = map_range(cursorY, 0, window.innerHeight, -0.3, 0.3);
  }
};

mouseMovement();



const texture = new THREE.CanvasTexture( generateTexture() );
    texture.magFilter = THREE.NearestFilter;
    texture.wrapT = THREE.RepeatWrapping;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set( 1, 3.5 );

function generateTexture() {
    const canvas = document.createElement( 'canvas' );
    canvas.width = 2;
    canvas.height = 2;
    const context = canvas.getContext( '2d' );
    context.fillStyle = 'white';
    context.fillRect( 0, 1, 2, 1 );
    return canvas;
}


const materialx = new THREE.MeshPhysicalMaterial( {
    color: 0xffffff,
    metalness: 1,
    roughness: 0,
    ior: 5,
    alphaMap: texture,
    envMap: env,
    envMapIntensity: 0.3,
    transmission: 0.5, // use material.transmission for glass materials
    specularIntensity: 1,
    specularColor: 0xffffff,
    opacity: 0.7,
    side: THREE.DoubleSide,
    transparent: true
});

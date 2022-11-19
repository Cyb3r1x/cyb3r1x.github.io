
//raycast click
let raycaster;
let mouse;


raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();


window.addEventListener('click', onClick, false);
function onClick() {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	let intersects = raycaster.intersectObject(scene, true);
	if (intersects.length > 0) {
	  object = intersects[0].object;
		object.material.color.set( Math.random() * 0xffffff );
    // camera.position.set(object.position.x, object.position.y, object.position.z + 2);
    // camera.lookAt( object.position);
    // controls.target = object.position;
		// console.log(object.position);
    // console.log(camera.position);

	}
}

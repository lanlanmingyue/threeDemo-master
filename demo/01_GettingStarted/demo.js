var scene, camera, renderer, mesh;


function init(){
	// 创建场景
	scene = new THREE.Scene();

	// 相机
	camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
	// Move the camera to 0,0,-5 (the Y axis is "up")
	camera.position.set(0,0,-5);
	
	// Point the camera to look at 0,0,0
	camera.lookAt(new THREE.Vector3(0,0,0));
	// Alternatively, this also works:
	// camera.lookAt(mesh.position);
	
	 // 渲染器 size 1280x720
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);
	//显示在窗体
	// Puts the "canvas" into our HTML page.
	document.body.appendChild(renderer.domElement);
	
		// A Mesh is made up of a geometry and a material.
	// Materials affect how the geometry looks, especially under lights.
	var geometry=new THREE.BoxGeometry(1,1,1);// width, height, depth
	var Materials=new THREE.MeshBasicMaterial({color:0xff4444, wireframe:true});
	 // Color is given in hexadecimal RGB
	// 0xff0000 is pure red, 0x00ff00 is pure green, and 0x0000ff is pure blue.
	// white would be 0xffffff and black would be 0x000000.
	mesh = new THREE.Mesh(geometry,Materials);
	
	// Add the mesh to the scene.
	scene.add(mesh);


	// Begin animation
	animate();
}

function animate(){
	requestAnimationFrame(animate); // requestAnimationFrame这个函数，它用来替代 setInterval
	//Tells the browser to smoothly render at 60Hz
	
	// Rotate our mesh.
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
	
	// Draw the scene from the perspective of the camera.
	renderer.render(scene, camera);
}

// When the page has loaded, run init();
window.onload = init;

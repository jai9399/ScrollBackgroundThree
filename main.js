
var texture1 = new THREE.TextureLoader().load( '11.jpg' );
var texture2 = new THREE.TextureLoader().load( '21.jpg' );
var texture3 = new THREE.TextureLoader().load( '7.jpg' );
var texture4 = new THREE.TextureLoader().load( '24.jpg' );
texture1.magFilter = THREE.LinearFilter;
texture1.minFilter = THREE.LinearMipMapLinearFilter;
texture2.magFilter = THREE.LinearFilter;
texture2.minFilter = THREE.LinearMipMapLinearFilter;
texture3.magFilter = THREE.LinearFilter;
texture3.minFilter = THREE.LinearMipMapLinearFilter;
texture4.magFilter = THREE.LinearFilter;
texture4.minFilter = THREE.LinearMipMapLinearFilter;
let gallery = [
  texture1,
  texture2,
  texture3,
  texture4
];
var scene,container = document.getElementById('container'),frustumSize=container.offsetWidth,aspectRatio,camera,width=container.offsetWidth,height = container.offsetHeight,renderer,time=0,resolution = new THREE.Vector2();  
function init(){
    var aspect = container.offsetWidth / container.offsetHeight;
    console.log(width,height)
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
    70,
    container.offsetWidth / container.offsetHeight,
    1, 100);
    scene.add(camera);
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth,container.offsetHeight);
    renderer.setClearColor(0x9eefff,1.0);
    document.getElementById('container').appendChild(renderer.domElement);
    var planeGeo = new THREE.PlaneBufferGeometry(1,1,1,1);
    var planeMat2 = new THREE.MeshLambertMaterial(0x000000);
    var planeMat = new THREE.ShaderMaterial( {
        side:THREE.DoubleSide,
        uniforms : {
            u_time: { type: "f", value: 0.0 },
            u_resolution: { type: "v2", value: new THREE.Vector2() },
            u_mouse: { type: "v2", value: new THREE.Vector2() },
            texture1: { type: "t", value: new THREE.TextureLoader().load( "1.jpg" ) },
            texture2: { type: "t", value: new THREE.TextureLoader().load( "2.jpg" ) },
            texture3: { type: "t", value: new THREE.TextureLoader().load( "3.jpg" ) },
            texture4: { type: "t", value: new THREE.TextureLoader().load( "4.jpg" ) },
            texture5: { type: "t", value: new THREE.TextureLoader().load( "5.png" ) },
            progress:{ type: "f", value: 0.0 },
            display:{ type: "f", value: 0.0 }
        },
        
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent

    } );
    camera.position.z=1;
    camera.position.y=0;
    camera.position.x=0;
    camera.lookAt(0,0,0);
    plane = new THREE.Mesh(planeGeo,planeMat);
    scene.add(plane);
    plane.position.x= 0;
    plane.position.y=0;
    plane.position.z=0;

    scene.add(new THREE.AmbientLight(0xffffff,1));
    oncontainerResize();
    animate();
}
init();
container.addEventListener('click',function(e){
    console.log(e)
    plane.material.uniforms.progress.value += 1.0;
    plane.material.uniforms.progress.value %= 4.0; 
});
container.addEventListener('mouseover',function(e){

    plane.material.uniforms.display.value = 0.01; 
});
container.addEventListener('mouseout',function(e){
    plane.material.uniforms.display.value = 0; 
});
window.addEventListener( 'resize', oncontainerResize);
function oncontainerResize(){
    var w = container.offsetWidth;
    var h = container.offsetHeight;
    renderer.setSize( w, h );
    camera.aspect = w / h;
    plane.material.uniforms.u_resolution.x = w;
    plane.material.uniforms.u_resolution.y = h;
  //  plane.material.uniforms.uvRate1.value.y = h / w;
  
    // calculate scene
    let dist  = camera.position.z - plane.position.z;
    let height = 1;
    camera.fov = 2*(180/Math.PI)*Math.atan(height/(2*dist));
  
    // if(w/h>1) {
    plane.scale.x = w/h;
    // }

    camera.updateProjectionMatrix();
    
}
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1 ;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	plane.material.uniforms.u_mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    plane.material.uniforms.u_mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );


}
window.addEventListener( 'mousemove', onMouseMove, false );
  function animate() {
    requestAnimationFrame( animate );
    plane.material.uniforms.u_time.value += 0.05; 
    renderer.render(scene,camera);
    
}







let speed = 0;
let position = 0;
let override = false;
document.addEventListener('wheel',function(event) {
  speed += event.deltaY*0.0004;
});
// document.addEventListener('touchmove',function(event){
//    console.log(event)
// });
console.log(navigator.userAgent)
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  var hammertime = new Hammer(window);
hammertime.on('panright panleft', function(ev) {
  if(ev.direction==4)
  speed += 125*3*0.0004;
  else
  speed += -125*3*0.0004;
});
 }

// hammertime.on('panleft',function(ev){
//   speed+=-125*0.0004;
// })

function raf() {

  if(!override) {
    position += speed;
    speed *=0.7;


    let i = Math.round(position);
    let dif = i - position;
    document.getElementById('text').style.transform = "translateX("+dif*3000+"px)";
    position += dif*0.035;
    if(i%4==0){
      document.getElementById('value').innerHTML = "Work is Worship." ;
    }
    else if(i%4==1){
      document.getElementById('value').innerHTML = "Nothing is Impossible." ;
    }
    else if(i%4 ==2){
      document.getElementById('value').innerHTML = "Believe in Yourself." ;
    }
    else if(i%4 ==3){
      document.getElementById('value').innerHTML = "Be Honest." ;
    }
    if(Math.abs(i - position)<0.001) {
    speed=0;
      position = i;
    }
   plane.material.uniforms.progress.value = position;

  } 

  let curslide = (Math.floor(position) - 1 + 4)%4;
  let nextslide = (((Math.floor(position) + 1)%4-1) + 4)%4;

  plane.material.uniforms.texture1.value = gallery[Math.abs(curslide)];
  plane.material.uniforms.texture2.value = gallery[Math.abs(nextslide)];
  // console.log(speed,position);
  window.requestAnimationFrame(raf);
}

raf();
var cam;
var cube;
const rotationSpeed = 0.05;

function setup() {
    createCanvas(800, 800, WEBGL);

    cam = createCamera();
    cam.setPosition(0, 0, 800);
    ortho();

    cube = new Cube(3, 100); //dimantion, cubieSize
    cube.initFaces();

    cube.rotateCube(-45, 45, -35);
}
  


function draw() {
    // set background color
    background(200);


    cube.render();

    // push();
    // stroke('purple');
    // strokeWeight(10);

    // // Bottom-right.
    // point(0, 0, 250);
    // pop();
}

function mousePressed(){
    cube.cubeRotate = !cube.faceClicked(mouseX - (width * 0.5), mouseY - (width * 0.5));
}

function mouseReleased(){
    cube.cubeRotate = false;
}

function mouseDragged() {
    let y = (pmouseX - mouseX) * -rotationSpeed;
    let x = (pmouseY - mouseY) * rotationSpeed;

    if(cube.cubeRotate){
        cube.rotateCube(x, y, 0);
    }
}
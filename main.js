var cam;
var cube;


function setup() {
    createCanvas(800, 800, WEBGL);

    cam = createCamera();
    cam.setPosition(0, 0, 800);

    cube = new Cube(3, 100); //dimantion, cubieSize
    cube.initFaces();

    cube.rotateCube(45, 45, -35);
  }
  


  function draw() {
    // set background color
    background(200);
    
    
    cube.render();

    push();
    stroke('purple');
    strokeWeight(10);

    // Bottom-right.
    point(0, 0, 150);
    pop();
  }

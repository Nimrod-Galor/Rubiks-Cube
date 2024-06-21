var cam;
var cube;


function setup() {
    createCanvas(800, 800, WEBGL);

    cam = createCamera();
    cam.setPosition(0, 0, 800);

    cube = new Cube();

  }
  


  function draw() {
    // set background color
    background(200);
    
    


  }

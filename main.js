var cam;
var cube;

let cutPlaneAxis;
let cutPlaneAngle;
let cutPlaneDirection;
const cutPlaneSpeed = 0.05;
let cutPlaneRotateFlag = false;

function setup() {
    createCanvas(800, 800, WEBGL);

    cam = createCamera();
    cam.setPosition(0, 0, 750);

    cube = new Cube();

  }
  
  function cutPlane(plane, deepth, dir){
    // update plane cut flag
    cube.cubies.map(qb=> {
        qb.isCut = qb[plane] === deepth;
    });

    switch(plane){
        case 'x':
            cutPlaneAxis = createVector(1, 0, 0);
        break;
        case 'y':
            cutPlaneAxis = createVector(0, 1, 0);
        break;
        case 'z':
            cutPlaneAxis = createVector(0, 0, 1);
        break;
    }

    cutPlaneAngle = 0;
    cutPlaneRotateFlag = true;
    cutPlaneDirection = dir;
  }
  
  function rotatePlane(){
    push();
    // translate rotation
    cutPlaneAngle += cutPlaneSpeed * cutPlaneDirection;
    rotate(cutPlaneAngle, cutPlaneAxis);

    for(let i = 0; i<cube.cubies.length; i++){
        if(cube.cubies[i].isCut){
            // render only cut plane
            cube.cubies[i].render();
        }
    }

    // update colors position
    if(abs(cutPlaneAngle) > HALF_PI){
        cutPlaneRotateFlag = false;
        let planeCut = cube.cubies.filter(qb => qb.isCut);
        let planeMatrix = [];

        let index = 0;
        //convert plain array to matrix
        for(let r = 0; r <= 2; r++){
            planeMatrix[r] = [];
            for(let c = 0; c <= 2; c++){
                planeMatrix[r][c] = planeCut[index].faces;
                index++;
            }
        }

        // rotate matrix
        planeMatrix = cutPlaneDirection === -1 && cutPlaneAxis.y === 0 ? planeMatrix[0].map((val, index) => planeMatrix.map(row => row[index]).reverse()) : planeMatrix[0].map((val, index) => planeMatrix.map(row => row[row.length-1-index]));

        // update cube object
        index = 0;
        for(let r = 0; r <= 2; r++){
            for(let c = 0; c <= 2; c++){
                // update cubie colors
                planeCut[index].faces = planeMatrix[r][c];

                // faces rotation
                planeCut[index].faceRotation();

                //clear cut flag
                planeCut[index].isCut = false;

                index++;
            }
        }
    }
    pop();
  }

  function draw() {
    // set background color
    background(200);
    
    // Enable orbiting with the mouse.
   // orbitControl();

    // render cube
    push();
    // rotate cube
    angleMode(DEGREES);
    rotateX(cube.xAngle);
    rotateY(cube.yAngle);
   // rotateZ(cube.zAngle);
    angleMode(RADIANS);
    
    for(let i = 0; i<cube.cubies.length; i++){
        if(!cube.cubies[i].isCut){
            cube.cubies[i].render();
        }
    }
    
    if(cutPlaneRotateFlag){
        // rotate cut plane
        rotatePlane();
    }

    pop();


  }

  function mouseDragged(){
    cube.yAngle += (mouseX - pmouseX) * 0.05;
    cube.xAngle += (pmouseY - mouseY) * 0.05;
  }

  function mousePressed(){
    console.log(`x:${mouseX} y:${mouseY}`)
    for(let i = 0; i < cube.cubies.length; i++){
        cube.cubies[i].clicked();
    }
  }
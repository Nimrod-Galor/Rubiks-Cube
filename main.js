const cubieSize = 100;
const cube = [];
//let planeArr = [];
let axis;
let angle;
let direction;
const speed = 0.05;
let rotateFlag = false;
// let rotateX = false;
// let rotateY = false;
// let rotateZ = false;
// let rotationDeepth = 1;
// const rotationSpeed = 0.01;
// let rotationDir = 1;

function setup() {
    createCanvas(800, 800, WEBGL);

    //initiate cube
    let index = 0;
    for(let x = -1; x<=1; x++){
        for(let y = -1; y<=1; y++){
            for(let z = -1; z<=1; z++){
                cube[index] = new Cubie(x, y, z, index);
                index++;
            }
        }
    }

    //angle = QUARTER_PI;

  }
  
  function cutPlane(plane, deepth, dir){
    // update plane cut flag
    cube.map(qb=> {
        qb.isCut = qb[plane] === deepth;
    });

    switch(plane){
        case 'x':
            axis = createVector(1, 0, 0);
        break;
        case 'y':
            axis = createVector(0, 1, 0);
        break;
        case 'z':
            axis = createVector(0, 0, 1);
        break;
    }

    angle = 0;
    rotateFlag = true;
    direction = dir;
  }
  
  function rotatePlane(){
    push();
    // translate rotation
    angle += speed * direction;
    rotate(angle, axis);

    for(let i = 0; i<cube.length; i++){
        if(cube[i].isCut){
            // render only cut plane
            cube[i].render();
        }
    }

    // update colors position
    if(abs(angle) > HALF_PI){
        rotateFlag = false;
        let planeCut = cube.filter(qb => qb.isCut);
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
        planeMatrix = direction === -1 && axis.y === 0 ? planeMatrix[0].map((val, index) => planeMatrix.map(row => row[index]).reverse()) : planeMatrix[0].map((val, index) => planeMatrix.map(row => row[row.length-1-index]));

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
    orbitControl();

    // render cube
    for(let i = 0; i<cube.length; i++){
        if(!cube[i].isCut){
            cube[i].render();
        }
    }
    
    if(rotateFlag){
        // rotate cut plane
        rotatePlane();
    }
  }
const cubieSize = 100;
const cube = [];

let rotateX = false;
let rotateY = false;
let rotateZ = false;
let rotationDeepth = 1;
const rotationSpeed = 0.01;
let rotationDir = 1;

function setup() {
    createCanvas(800, 800, WEBGL);

    //initiate cube
    let index = 0;
    for(let x = -1; x<=1; x++){
        for(let y = -1; y<=1; y++){
            for(let z = -1; z<=1; z++){
                cube[index] = new Cubie(x, y, z);
                index++;
            }
        }
    }
  }
  
  function planeXRotation(){
    let planeArr = cube.filter(item => item.x === rotationDeepth);

    for(let i = 0; i < planeArr.length; i++){
        planeArr[i].turnX(rotationSpeed * rotationDir);
    }
  }

  function planeYRotation(){
    let planeArr = cube.filter(item => item.y === rotationDeepth);

    for(let i = 0; i < planeArr.length; i++){
        planeArr[i].turnY(rotationSpeed * rotationDir);
    }
  }

  function planeZRotation(){
    let planeArr = cube.filter(item => item.z === rotationDeepth);

    for(let i = 0; i < planeArr.length; i++){
        planeArr[i].turnZ(rotationSpeed * rotationDir);
    }
  }

  function draw() {
    background(200);
    
    // Enable orbiting with the mouse.
    orbitControl(3,3,3);

    if(rotateX){
        planeXRotation();
    }

    if(rotateY){
        planeYRotation();
    }

    if(rotateZ){
        planeZRotation();
    }

    // render cube
    for(let i = 0; i<cube.length; i++){
        cube[i].render();
    }

  }
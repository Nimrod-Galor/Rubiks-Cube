const cubieSize = 100;
const cube = [];
//let planeArr = [];
let axis;
let angle;
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
                cube[index] = new Cubie(x, y, z);
                index++;
            }
        }
    }

    angle = QUARTER_PI;
  }
  
  function cutPlane(plane, deepth){
    //planeArr = cube.filter(item => item[plane] === deepth);

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
  }
  
//   function planeXRotation(){
//     planeArr = cube.filter(item => item.x === rotationDeepth);

//     // for(let i = 0; i < planeArr.length; i++){
//     //     planeArr[i].turnX(rotationSpeed * rotationDir);
//     // }
//   }

//   function planeYRotation(){
//     planeArr = cube.filter(item => item.y === rotationDeepth);

//     // for(let i = 0; i < planeArr.length; i++){
//     //     planeArr[i].turnY(rotationSpeed * rotationDir);
//     // }
//   }

//   function planeZRotation(){
//     planeArr = cube.filter(item => item.z === rotationDeepth);

//     // for(let i = 0; i < planeArr.length; i++){
//     //     planeArr[i].turnZ(rotationSpeed * rotationDir);
//     // }
//   }

  function draw() {
    
    background(200);
    
    // Enable orbiting with the mouse.
    orbitControl();

    // render cube
    for(let i = 0; i<cube.length; i++){
        if(!cube[i].isCut){
            cube[i].render();
        }
    }

    push();
    
    angle += 0.01;
    rotate(angle, axis);

    for(let i = 0; i<cube.length; i++){
        if(cube[i].isCut){
            cube[i].render();
        }
    }

    if(angle > HALF_PI){
        let planeCut = cube.filter(qb => qb.isCut);
        let planeMatrix = [];

        let index = 0;
        //convert plain array to matrix
        for(let r = 0; r <= 2; r++){
            planeMatrix[r] = [];
            for(let c = 0; c <= 2; c++){
                planeMatrix[r][c] = {x:planeCut[index].x, y:planeCut[index].y, z:planeCut[index].z};
                index++;
            }
        }

        // rotate matrix
        planeMatrix = dir === 1 ? planeMatrix[0].map((val, index) => planeMatrix.map(row => row[index]).reverse()) : planeMatrix[0].map((val, index) => planeMatrix.map(row => row[row.length-1-index]));

        planeCut.map(cubie=> {
            // update matrix
            

            // clear cut
            cubie.isCut = false;
        });
    }
    pop();
  }
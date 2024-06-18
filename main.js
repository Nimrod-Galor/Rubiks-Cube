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
                cube[index] = new Cubie(x, y, z);
                index++;
            }
        }
    }

    angle = QUARTER_PI;
  }
  
  function cutPlane(plane, deepth, dir){
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
    rotateFlag = true;
    direction = dir;
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

    if(rotateFlag){
        push();
        
        angle += speed * direction;
        rotate(angle, axis);

        for(let i = 0; i<cube.length; i++){
            if(cube[i].isCut){
                cube[i].render();
            }
        }

        if(abs(angle) > HALF_PI){
            rotateFlag = false;
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
            planeMatrix = direction === 1 ? planeMatrix[0].map((val, index) => planeMatrix.map(row => row[index]).reverse()) : planeMatrix[0].map((val, index) => planeMatrix.map(row => row[row.length-1-index]));
            //planeMatrix = planeMatrix[0].map((val, index) => planeMatrix.map(row => row[index]).reverse());

            // update cube object
            index = 0;
            for(let r = 0; r <= 2; r++){
                for(let c = 0; c <= 2; c++){
                    planeCut[index].x = planeMatrix[r][c].x;
                    planeCut[index].y = planeMatrix[r][c].y;
                    planeCut[index].z = planeMatrix[r][c].z;
                    planeCut[index].updateMatrix();

                    // // face rotation
                    planeCut[index].faceRotation();

                    //clear cut
                    planeCut[index].isCut = false;
                    index++;
                }
            }
        }
        pop();
    }
  }
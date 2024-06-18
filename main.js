const cube = [];

function setup() {
    createCanvas(800, 800, WEBGL);

    let index = 0;
    for(let x = -1; x<=1; x++){
        for(let y = -1; y<=1; y++){
            for(let z = -1; z<=1; z++){
                //var matrix = [10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 100 * x, 100 * y, 100 * z, 1];
                //cube[index] = new Cubie(matrix, x, y, z);
                cube[index] = new Cubie(x, y, z);
                cube[index].updateMatrix();
                index++;
            }
        }
    }

    cube[2].height = true;

  }
  
  function plainRotation(plain, depth, dir){
        let plainMatrix = [];
        let plainArr = cube.filter(item => item[plain] === depth);

        let index = 0;
        //convert plain array to matrix
        for(let r = 0; r <= 2; r++){
            plainMatrix[r] = [];
            for(let c = 0; c <= 2; c++){
                plainMatrix[r][c] = {x:plainArr[index].x, y:plainArr[index].y, z:plainArr[index].z};
                index++;
            }
        }

        // rotate matriz
        plainMatrix = dir === 1 ? plainMatrix[0].map((val, index) => plainMatrix.map(row => row[index]).reverse()) : plainMatrix[0].map((val, index) => plainMatrix.map(row => row[row.length-1-index]));

        // update cube object
        index = 0;
        for(let r = 0; r <= 2; r++){
            for(let c = 0; c <= 2; c++){
                plainArr[index].x = plainMatrix[r][c].x;
                plainArr[index].y = plainMatrix[r][c].y;
                plainArr[index].z = plainMatrix[r][c].z;
                plainArr[index].updateMatrix();

                index++;
            }
        }
  }

  function draw() {
    background(200);
    
    // Enable orbiting with the mouse.
    orbitControl();

    for(let i = 0; i<cube.length; i++){
        cube[i].render();
    }

  }
const cube = [];

function setup() {
    createCanvas(800, 800, WEBGL);

    let index = 0;
    for(let x = -1; x<=1; x++){
        for(let y = -1; y<=1; y++){
            for(let z = -1; z<=1; z++){
                var matrix = [10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 100 * x, 100 * y, 100 * z, 1];
                cube[index] = new Cubie(matrix);
                index++;
            }
        }
    }
  }
  
  function draw() {
    background(200);
    
    // Enable orbiting with the mouse.
    orbitControl();

    for(let i = 0; i<cube.length; i++){
        cube[i].show();
    }

  }
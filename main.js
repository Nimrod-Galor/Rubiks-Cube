var cam;
var cube;
var cameraPosition;
const rotationSpeed = 0.05;

var mouseStartX = 0;
var mouseStartY = 0;

const cutPlaneRotationSpeed = 0.02;

function setup() {
    createCanvas(800, 800, WEBGL);

    cam = createCamera();
    cam.setPosition(0, 0, 800);
    ortho();
    cameraPosition = createVector(0, 0, -1);

    cube = new Cube(3, 100); //dimantion, cubieSize
    cube.initFaces();

    cube.rotateCube(-45, 45, -35);
}
  


function draw() {
    // set background color
    background(200);

    cube.render();
}

function mousePressed(){
    mouseStartX = mouseX;
    mouseStartY = mouseY;
    cube.cubeRotate = !cube.faceClicked(fixPosition(mouseX), fixPosition(mouseY));
}

function mouseReleased(){
    cube.cubeRotate = false;
  //  cube.selectedFaceId = -1;
    //cube.planeCut = [];
    mouseStartX = 0;
    mouseStartY = 0;
}


function fixPosition(num){
    return (num - (width * 0.5));
}

function mouseDragged() {
    let y = (pmouseX - mouseX);
    let x = (pmouseY - mouseY);

    if(cube.cubeRotate){// rotate the cube
        test = [];
        cube.rotateCube(x * rotationSpeed, y * -rotationSpeed, 0);
    }else{// rotate plane
        if(cube.planeCut.length === 0){
            let x = mouseStartX -  mouseX;
            let y = mouseStartY - mouseY;

            // dont start rotation befor mouse movement min 10px
            if(Math.abs(x) > 10 || Math.abs(y) > 10){
                // mouse start
                let p1 = {x : fixPosition(mouseStartX), y : fixPosition(mouseStartY), z : 0};
                // mouse end
                let p2 = {x : fixPosition(mouseX), y : fixPosition(mouseY), z : 0};
                // extend mouse end
                const extendedP2 = extendVector(p1, p2);

                // for every line in face check if mouse vector intersects it.
                let selectedFace = cube.faces[cube.selectedFaceId];
                let vertices = cube.faces[cube.selectedFaceId].vertices;
                let faceHierarchy = cube.faces[cube.selectedFaceId].hierarchy;
                for(let i = 0 ; i < vertices.length; i++){
                    // set face line points
                    l1 = pointToVector(vertices[i]);
                    l2 = pointToVector(vertices[(i + 1) % vertices.length]);
                    // check if mouse vector intersect face line
                    if(doLinesIntersect(p1, extendedP2, l1, l2)){
                        switch(selectedFace.type){
                            case 'front': // rotation on Y and X
                            case 'back':
                                if(i === 0){// top
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.x === faceHierarchy.x);

                                    cube.planeCutRotationAxis.x = cube.orientation[5].normal[0] * - cutPlaneRotationSpeed;
                                    cube.planeCutRotationAxis.y = cube.orientation[5].normal[1] * - cutPlaneRotationSpeed;
                                    cube.planeCutRotationAxis.z = cube.orientation[5].normal[2] * - cutPlaneRotationSpeed;
                                    console.log("top");
                                }else if(i === 1){//right
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.y === faceHierarchy.y);
                                    console.log("right");
                                }else if(i === 2){// bottom
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.x === faceHierarchy.x);
                                    console.log("bottom");
                                }else{// left
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.y === faceHierarchy.y);
                                    console.log("left");
                                }
                            break;
                            case 'top': // rotation on X and Z
                            case 'bottom':
                                if(i === 0){// top
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.x === faceHierarchy.x);
                                    console.log("top");
                                }else if(i === 1){//left
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.z === faceHierarchy.z);
                                    console.log("left");
                                }else if(i === 2){// bottom
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.x === faceHierarchy.x);
                                    console.log("bottom");
                                }else{// right
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.z === faceHierarchy.z);
                                    console.log("right");
                                }
                            break;
                            case 'left':// rotation on Z and Y
                            case 'right':
                                if(i === 0){// top
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.z === faceHierarchy.z);
                                    console.log("top");
                                }else if(i === 1){//left
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.y === faceHierarchy.y);
                                    console.log("left");
                                }else if(i === 2){// bottom
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.z === faceHierarchy.z);
                                    console.log("bottom");
                                }else{// right
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.y === faceHierarchy.y);
                                    console.log("right");
                                }
                            break;
                        }
                        break;
                    }
                }


                for(let i = 0; i < cube.planeCut.length; i++){
                    cube.planeCut[i].isVisible = true;
                }
            }
        }
    }
}

function pointToVector(point){
    return createVector(point[0], point[1], point[2]);
}

function getVectorOfPOints(p1, p2){
    let vecX = p1[0] - p2[0];
    let vecY = p1[1] - p2[1];
    let vecZ = p1[2] - p2[2];

    return createVector(vecX, vecY, vecZ);
}

// Function to check if two lines intersect
function doLinesIntersect(p1, p2, l1, l2) {
    // Calculate the direction of the lines
    let d1 = direction(l1, l2, p1);
    let d2 = direction(l1, l2, p2);
    let d3 = direction(p1, p2, l1);
    let d4 = direction(p1, p2, l2);

    // Check if the lines intersect
    if (d1 != d2 && d3 != d4) {
        return true;
    }

    // Check if the points are collinear and on the segment
    if (d1 == 0 && onSegment(l1, l2, p1)) return true;
    if (d2 == 0 && onSegment(l1, l2, p2)) return true;
    if (d3 == 0 && onSegment(p1, p2, l1)) return true;
    if (d4 == 0 && onSegment(p1, p2, l2)) return true;

    return false;
}

// Function to calculate the direction
function direction(a, b, c) {
    let val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
    if (val == 0) return 0; // Collinear
    return val > 0 ? 1 : 2; // Clock or counterclockwise
}

// Function to check if point c is on segment ab
function onSegment(a, b, c) {
    if (c.x <= Math.max(a.x, b.x) && c.x >= Math.min(a.x, b.x) && c.y <= Math.max(a.y, b.y) && c.y >= Math.min(a.y, b.y)) {
        return true;
    }
    return false;
}

// Function to extend the vector into an infinite line
function extendVector(p1, p2) {
    // Assume the vector is extended to a very large distance
    const largeValue = 1000000;
    const directionX = p2.x - p1.x;
    const directionY = p2.y - p1.y;

    return {
        x: p1.x + directionX * largeValue,
        y: p1.y + directionY * largeValue
    };
}
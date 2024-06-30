var cam;
var cube;
var cameraPosition;
var camFov = 800;
var cubeDimantion = 3;
//var cubieSize = 100;
const rotationSpeed = 0.05;

var mouseStartX = 0;
var mouseStartY = 0;

const cutPlaneRotationSpeed = 0.02;

function setup() {
    createCanvas(800, 800, WEBGL);

    cam = createCamera();
    cam.setPosition(0, 0, camFov);
    // let left = width * -0.5;
    // let right = width * 0.5;
    // let top = height * -0.5;
    // let bottom = height * 0.5
    // let near = 0;
    // let far = max(width, height) + 8000;
    // ortho(left, right, bottom, top, near, far);
    ortho();
    
    cameraPosition = createVector(0, 0, -1);

    let cubieSize = 300 / cubeDimantion 

    cube = new Cube(cubeDimantion, cubieSize); //cubeDimantion, cubieSize
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
    cube.detectFaceClicked(fixPosition(mouseX), fixPosition(mouseY));
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
        cube.cutRotate = true;
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
                    l1 = vertices[i];
                    l2 = vertices[(i + 1) % vertices.length];
                    // check if mouse vector intersect face line
                    if(doLinesIntersect(p1, extendedP2, l1, l2)){
                        switch(selectedFace.type){
                            case 'front': // rotation on Y and X
                                if(i === 0){// top
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.x === faceHierarchy.x);
                                    cube.planeCutRotaionMagnitude *= cube.planeCutRotaionMagnitude > 0 ? 1 : -1;
                                    cube.planeCutRotationAxis = cube.orientation[5].normal;
                                    cube.faceCutType = 'left';
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
                            case 'back':
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


                // for(let i = 0; i < cube.planeCut.length; i++){
                //     cube.planeCut[i].isVisible = true;
                // }
            }
        }
    }
}

// function pointToVector(point){
//     return createVector(point[0], point[1], point[2]);
// }

// function getVectorOfPOints(p1, p2){
//     let vecX = p1[0] - p2[0];
//     let vecY = p1[1] - p2[1];
//     let vecZ = p1[2] - p2[2];

//     return createVector(vecX, vecY, vecZ);
// }

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

// Function to calculate the angle between two vectors
// function angleBetweenVectors(v1, v2) {
//     // v1.normalize();
//     // v2.normalize();
//     // Calculate the dot product of v1 and v2
//     const dotProduct = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;

//     // Calculate the magnitudes of v1 and v2
//     const magnitudeV1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
//     const magnitudeV2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);

//     // Calculate the cosine of the angle
//     const cosTheta = dotProduct / (magnitudeV1 * magnitudeV2);

//     // Use Math.acos to get the angle in radians
//     const angleInRadians = Math.acos(cosTheta);

//     // Convert the angle from radians to degrees
//     const angleInDegrees = angleInRadians * (180 / Math.PI);

//     return angleInDegrees;
// }


// Function to rotate a point around a given axis
p5.Vector.prototype.rotatePointAroundVector = function(axis, theta) {
        // Normalize the axis vector
    // let axisLength = Math.sqrt(axis.x * axis.x + axis.y * axis.y + axis.z * axis.z);
    //let axisLength = axis.magSq();
    // let k = [axis.x / axisLength, axis.y / axisLength, axis.z / axisLength];
    axis.normalize();

    // Calculate the dot product of k and point
    //let dotProduct = k[0] * this.x + k[1] * this.y + k[2] * this.z;
    let dotProduct = this.dot(axis);

    // Calculate the cross product of k and point
    // let crossProduct = [
    //     k[1] * this.z - k[2] * this.y,
    //     k[2] * this.x - k[0] * this.z,
    //     k[0] * this.y - k[1] * this.x
    // ];
    let crossProduct = this.cross(axis);


    // Calculate the rotated point
    let cosTheta = Math.cos(theta);
    let sinTheta = Math.sin(theta);
    
    // this.x = this.x * cosTheta + crossProduct[0] * sinTheta + k[0] * dotProduct * (1 - cosTheta);
    // this.y = this.y * cosTheta + crossProduct[1] * sinTheta + k[1] * dotProduct * (1 - cosTheta);
    // this.z = this.z * cosTheta + crossProduct[2] * sinTheta + k[2] * dotProduct * (1 - cosTheta);

    this.x = this.x * cosTheta + crossProduct.x * sinTheta + axis.x * dotProduct * (1 - cosTheta);
    this.y = this.y * cosTheta + crossProduct.y * sinTheta + axis.y * dotProduct * (1 - cosTheta);
    this.z = this.z * cosTheta + crossProduct.z * sinTheta + axis.z * dotProduct * (1 - cosTheta);
    
}

p5.Vector.prototype.vectorToPerspective = function(){
    const scale = camFov / (camFov - this.z);
    const x = this.x * scale;
    const y = this.y * scale;
    const res = {x: x, y: y, z: this.z};
    return res;
}

// Function to rotate a point using a rotation matrix
p5.Vector.prototype.pointRotate = function(rotationMatrix) {
    let point = [this.x, this.y, this.z];
    let result = [];
    for (let i = 0; i < rotationMatrix.length; i++) {
        result[i] = 0;
        for (let j = 0; j < point.length; j++) {
            result[i] += rotationMatrix[i][j] * point[j];
        }
    }
    
    this.x = result[0];
    this.y = result[1];
    this.z = result[2];
}

// Function to create a rotation matrix for the x-axis
function rotationMatrixX(theta) {
    return [
        [1, 0, 0],
        [0, Math.cos(theta), -Math.sin(theta)],
        [0, Math.sin(theta), Math.cos(theta)]
    ];
}

// Function to create a rotation matrix for the y-axis
function rotationMatrixY(theta) {
    return [
        [Math.cos(theta), 0, Math.sin(theta)],
        [0, 1, 0],
        [-Math.sin(theta), 0, Math.cos(theta)]
    ];
}

// Function to create a rotation matrix for the z-axis
function rotationMatrixZ(theta) {
    return [
        [Math.cos(theta), -Math.sin(theta), 0],
        [Math.sin(theta), Math.cos(theta), 0],
        [0, 0, 1]
    ];
}


// create rotation matrix
function getRotationMatrix(xAngle, yAngle, zAngle){
    let thetaX = radians(xAngle);
    let thetaY = radians(yAngle);
    let thetaZ = radians(zAngle);

    // Rotation matrices
    let Rx = rotationMatrixX(thetaX);
    let Ry = rotationMatrixY(thetaY);
    let Rz = rotationMatrixZ(thetaZ);
    // Combined rotation matrix Rz * Ry * Rx
    let R = multiplyMatrices(multiplyMatrices(Rz, Ry), Rx);
    return R;
}

// Function to multiply two matrices
function multiplyMatrices(a, b) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result[i] = [];
        for (let j = 0; j < b[0].length; j++) {
            result[i][j] = 0;
            for (let k = 0; k < a[0].length; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return result;
}

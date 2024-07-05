var cube;
var cubeDimension = 3;
const rotationSpeed = 0.05;
var cam;
var cameraPosition;
var camFov = 800;
var mouseStartX = 0;
var mouseStartY = 0;

function preload() {
    // Load a font to use.
    font = loadFont('/Inconsolata_SemiExpanded-Light.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    // set camera
    cam = createCamera();
    cam.setPosition(0, 0, camFov);
    ortho();
    cameraPosition = createVector(0, 0, -1);
    // initiate cube
    initCube();
    // start auto shuffle
    setTimeout(()=>cube.randomShuffle(), 1000);
}
  
function initCube(){
    let cubieSize = Math.ceil(300 / cubeDimension);
    cube = new Cube(cubeDimension, cubieSize); //cubeDimension, cubieSize
    cube.initFaces();
    cube.rotateCube(-45, 45, -35);
}

function draw() {
    // set background color
    background(200);
    printCubeOrientation();
    printWebglVersion();
    cube.render();
}

function mousePressed(){
    mouseStartX = mouseX;
    mouseStartY = mouseY;
    cube.detectFaceClicked(fixPositionWidth(mouseX), fixPositionHeight(mouseY));
    // console.log('mouseX', mouseX, 'fix x', fixPositionWidth(mouseX), 'mouseY', mouseY, 'fix y', fixPositionHeight(mouseY));
}

function mouseReleased(){
    cube.cubeRotate = false;
    mouseStartX = 0;
    mouseStartY = 0;
}

function mouseDragged() {
    if(cube.cubeRotate){// rotate the cube
        let y = (pmouseX - mouseX);
        let x = (pmouseY - mouseY);
        test = [];
        cube.rotateCube(x * rotationSpeed, y * -rotationSpeed, 0);
    }else{// rotate plane
        // cube.cutRotate = true;
        if(cube.planeCut.length === 0){
            let x = mouseStartX -  mouseX;
            let y = mouseStartY - mouseY;

            // dont start rotation befor mouse movement min 10px
            if(Math.abs(x) > 10 || Math.abs(y) > 10){
                // mouse start point
                let msp = {x : fixPositionWidth(mouseStartX), y : fixPositionHeight(mouseStartY), z : 0};
                // mouse end point
                let mep = {x : fixPositionWidth(mouseX), y : fixPositionHeight(mouseY), z : 0};
                // extend mouse end
                const extendedP2 = extendVector(msp, mep, 1000000);
                // const selectedFace = cube.faces[cube.selectedFaceId];
                const vertices = cube.faces[cube.selectedFaceId].vertices;
                // for every line in face check if mouse vector intersects it.
                for(let i = 0 ; i < vertices.length; i++){
                    // set face line points
                    let flsp = vertices[i].pointToPerspective();
                    let flep = vertices[(i + 1) % vertices.length].pointToPerspective();
                    // check if mouse vector intersect face line
                    if(doLinesIntersect(msp, extendedP2, flsp, flep)){
                        let intersectVec = p5.Vector.sub(flsp, flep);
                        let intersectAngleX = Math.abs(roundBase(degrees(cube.normalX.angleBetween(intersectVec)), 45));
                        let intersectAngleY = Math.abs(roundBase(degrees(cube.normalY.angleBetween(intersectVec)), 45));
                        let intersectAngleZ = Math.abs(roundBase(degrees(cube.normalZ.angleBetween(intersectVec)), 45));

                        if(intersectAngleX === 180 || intersectAngleX === 0){
                            // x axis
                            let dir = intersectAngleX <= 0 ? cube.planeCutRotaionMagnitude < 0 ? -1 : 1 : cube.planeCutRotaionMagnitude < 0 ? 1 : -1;
                            cube.createPlaneCut('x', dir);
                        }

                        if(intersectAngleY === 180 || intersectAngleY === 0){
                            // y axis
                            let dir = intersectAngleY <= 0 ? cube.planeCutRotaionMagnitude < 0 ? -1 : 1 : cube.planeCutRotaionMagnitude < 0 ? 1 : -1;
                            cube.createPlaneCut('y', dir);
                        }

                        if(intersectAngleZ === 180 || intersectAngleZ === 0){
                            // z axis
                            let dir = intersectAngleZ <= 0 ? cube.planeCutRotaionMagnitude < 0 ? -1 : 1 : cube.planeCutRotaionMagnitude < 0 ? 1 : -1;
                            cube.createPlaneCut('z', dir);
                        }

                        return;
                    }
                }
            }
        }
    }
}

// Function to check if two lines intersect
function doLinesIntersect(p1, p2, l1, l2) {
    // Calculate the direction of the lines
    const d1 = direction(l1, l2, p1);
    const d2 = direction(l1, l2, p2);
    const d3 = direction(p1, p2, l1);
    const d4 = direction(p1, p2, l2);

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
    const val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
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
function extendVector(p1, p2, magnitude) {
    // Assume the vector is extended to a very large distance
    // const magnitude = 1000000;
    const directionX = p2.x - p1.x;
    const directionY = p2.y - p1.y;

    return {
        x: p1.x + directionX * magnitude,
        y: p1.y + directionY * magnitude
    };
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
function getRotationMatrix(xintersectAngle, yintersectAngle, zintersectAngle){
    const thetaX = radians(xintersectAngle);
    const thetaY = radians(yintersectAngle);
    const thetaZ = radians(zintersectAngle);

    // Rotation matrices
    const Rx = rotationMatrixX(thetaX);
    const Ry = rotationMatrixY(thetaY);
    const Rz = rotationMatrixZ(thetaZ);
    // Combined rotation matrix Rz * Ry * Rx
    return multiplyMatrices(multiplyMatrices(Rz, Ry), Rx);
}

// Function to multiply two matrices
function multiplyMatrices(a, b) {
    const result = [];
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

// Function to rotate a point around a given axis
p5.Vector.prototype.rotatePointAroundVector = function(axis, theta) {
    // Normalize the axis vector
    axis.normalize();

    // Calculate the dot product of k and point
    let dotProduct = this.dot(axis);
    let crossProduct = this.cross(axis);

    // Calculate the rotated point
    let cosTheta = Math.cos(theta);
    let sinTheta = Math.sin(theta);

    this.x = this.x * cosTheta + crossProduct.x * sinTheta + axis.x * dotProduct * (1 - cosTheta);
    this.y = this.y * cosTheta + crossProduct.y * sinTheta + axis.y * dotProduct * (1 - cosTheta);
    this.z = this.z * cosTheta + crossProduct.z * sinTheta + axis.z * dotProduct * (1 - cosTheta);    
}

// Function to rotate a point using a rotation matrix
p5.Vector.prototype.pointRotate = function(rotationMatrix) {
    const point = [this.x, this.y, this.z];
    const result = [];
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

p5.Vector.prototype.pointToPerspective = function(){
    const scale = camFov / (camFov - this.z);
    let res = createVector(this.x * scale, this.y * scale, this.z);
    return res;
}

function roundBase(num, base){
    const p = Math.round(num / base) * base;
    return p;
    const b = num % base > base * 0.5 ? base : 0;
    return p + b;
}

// Resize the canvas when the browser's size changes.
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function fixPositionWidth(num){
    return (num - (width * 0.5));
}

function fixPositionHeight(num){
    return (num - (height * 0.5));
}

// Draws an arrow between two vectors.
function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

function printWebglVersion(){
    // Display the current WebGL version.
    fill(0);
    textFont(font);
    text(webglVersion, width * 0.5 - 75, height * 0.5 - 15);
}

function printCubeOrientation(){
    let originVec = createVector(width * 0.5 - 100, height * 0.5 - 100, 0);
    // vec X
    let vecX = extendVector({x:0,y:0}, cube.normalX, 50);
    drawArrow(originVec, createVector(vecX.x, vecX.y, 0), 'blue');

    // vec Y
    let vecY = extendVector({x:0,y:0}, cube.normalY, 50);
    drawArrow(originVec, createVector(vecY.x, vecY.y, 0), 'white');


    // vec Z
    let vecZ = extendVector({x:0,y:0}, cube.normalZ, 50);
    drawArrow(originVec, createVector(vecZ.x, vecZ.y, 0), 'red');
}

function stopProp(event){
    event.stopPropagation();
}
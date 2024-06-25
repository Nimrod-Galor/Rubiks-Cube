var cam;
var cube;
const rotationSpeed = 0.05;

function setup() {
    createCanvas(800, 800, WEBGL);

    cam = createCamera();
    cam.setPosition(0, 0, 800);
    ortho();

    cube = new Cube(3, 100); //dimantion, cubieSize
    cube.initFaces();

    cube.rotateCube(-45, 45, -35);
}
  


function draw() {
    // set background color
    background(200);


    cube.render();

    if(test.length > 0){

        push();
        //translate(-200, 100, 0);
        stroke('purple');
        strokeWeight(5);
        for(let i = 0; i < test.length; i = i+2){
            line(test[i][0], test[i][1], test[i+1][0], test[i+1][1]);
        }
        // // Bottom-right.
        // point(0, 0, 250);
        pop();
    }
}

var mouseStartX = 0;
var mouseStartY = 0;
function mousePressed(){
    mouseStartX = mouseX;
    mouseStartY = mouseY;
    cube.cubeRotate = !cube.faceClicked(fixPosition(mouseX), fixPosition(mouseY));
    

    // test
    if(!cube.cubeRotate){
        console.log(cube.faces[cube.selectedFaceId].type, cube.faces[cube.selectedFaceId].hierarchy);
    }
}

function mouseReleased(){
    cube.cubeRotate = false;
  //  cube.selectedFaceId = -1;
    cube.planeCut = [];
    mouseStartX = 0;
    mouseStartY = 0;
}

var test = [];

function fixPosition(num){
    return (num - (width * 0.5));
}

function mouseDragged() {
    let y = (pmouseX - mouseX);
    let x = (pmouseY - mouseY);


    //console.log("moved:", pmouseX - mouseX, pmouseY - mouseY);


    if(cube.cubeRotate){
        test = [];
        cube.rotateCube(x * rotationSpeed, y * -rotationSpeed, 0);
    }else{
        if(cube.planeCut.length === 0){
           // console.log("x: ", Math.abs(mouseStartX - mouseX), " y: ", Math.abs(mouseStartY - mouseY));
            // let x = mouseX - width * 0.5;
            // let y = mouseY - height * 0.5;
            
            let x = mouseStartX -  mouseX;
            let y = mouseStartY - mouseY;

            
            if(Math.abs(x) > 10 || Math.abs(y) > 10){
                // let mouseVector = getVectorOfPOints([fixPosition(mouseStartX), fixPosition(mouseStartY), 0], [fixPosition(mouseX), fixPosition(mouseY), 0]);
                // test.push([fixPosition(mouseStartX), fixPosition(mouseStartY), 0], [fixPosition(mouseX), fixPosition(mouseY), 0]);

                // let p1 = pointToPerspective(cube.faces[cube.selectedFaceId].vertices[0]);
                // let p2 = pointToPerspective(cube.faces[cube.selectedFaceId].vertices[1]);
                // let p3 = pointToPerspective(cube.faces[cube.selectedFaceId].vertices[2]);
                // //let p4 = pointToPerspective(cube.faces[cube.selectedFaceId].vertices[3]);

                // // test.push(p1, p2);
                // // test.push(p2, p3);

                // let vectorX = getVectorOfPOints(p1, p2);
                // vectorX.z = 0;
                // let vectorY = getVectorOfPOints(p2, p3);
                // vectorY.z = 0;



                
                //test.push(p2, p3);
                
                // let vectorX = getMidLineVector(cube.faces[cube.selectedFaceId].vertices[0], cube.faces[cube.selectedFaceId].vertices[1], cube.faces[cube.selectedFaceId].vertices[2], cube.faces[cube.selectedFaceId].vertices[3]);
                // let vectorY = getMidLineVector(cube.faces[cube.selectedFaceId].vertices[0], cube.faces[cube.selectedFaceId].vertices[3], cube.faces[cube.selectedFaceId].vertices[1], cube.faces[cube.selectedFaceId].vertices[2]);

                // console.log("mouseX: ", mouseX, "mouseY: ", mouseY, "mouseStartX: ", mouseStartX, "mouseStartY: ", mouseStartY, "x: ", x, "y: ", y);
                //let mouseVector = getVectorOfPOints([fixPosition(mouseX), fixPosition(mouseY), 0], [fixPosition(pmouseX), fixPosition(pmouseY), 0]);
                

                // create base vector
                //let vectorX = pointToVector(pointToPerspective(cube.orientation[4].normal));
                //mouseVector = getVectorOfPOints([fixPosition(mouseX), fixPosition(mouseY), vectorX.z], [fixPosition(pmouseX), fixPosition(pmouseY), vectorX.z]);
                // let angleX = getAngleOfVectors(vectorX, mouseVector);

                //let vectorY = pointToVector(pointToPerspective(cube.orientation[3].normal));
                //console.log(vectorY);
                //mouseVector.z = vectorX.z;
                // let angleY = getAngleOfVectors(vectorY, mouseVector);
                //console.log(vectorY);
                //test.push([vectorY.x * -10, vectorY.y * -10, vectorY.z * -10], [vectorY.x, vectorY.y, vectorY.z]);
                // test.push([0, -150, 0], cube.orientation[3].normal);
                //test.push([vectorY.x * -1, vectorY.y * -1, vectorY.z * -1], [vectorY.x, vectorY.y, vectorY.z]);

                // let vectorZ = pointToVector(pointToPerspective(cube.orientation[1].normal));
                // mouseVector = getVectorOfPOints([fixPosition(mouseX), fixPosition(mouseY), vectorZ.z], [fixPosition(pmouseX), fixPosition(pmouseY), vectorZ.z]);
                // let angleZ = getAngleOfVectors(vectorZ, mouseVector);

                // console.log('angleX', angleX, 'angleY', angleY, 'dev', angleX / angleY);

                // //vectorX.mult(10);
                // vectorX.normalize();
                // test.push([p1[0], p1[1], p1[2]], [p1[0] - vectorX.x, p1[1] - vectorX.y, p1[2] - vectorX.z]);

                // console.log("vectorX", vectorX);

                // switch(cube.faces[cube.selectedFaceId].type){
                //     case 'front': // rotation on Y and X
                //     case 'back':
                //         if(angleY >= angleX){// rotate on X
                //             cube.planeCut = cube.faces.filter(f => f.hierarchy.x === cube.faces[cube.selectedFaceId].hierarchy.x);
                //         }else{
                //             cube.planeCut = cube.faces.filter(f => f.hierarchy.y === cube.faces[cube.selectedFaceId].hierarchy.y);
                //         }
                //     break;
                //     case 'top':
                //     case 'bottom':

                //     break;
                //     case 'left':
                //     case 'right':

                //     break;
                // }

                // //if(angleY >= angleX){// rotate on X
                // if(angleX <= 45 || angleX >= 135){// rotate on X
                // //if(angleX <= 90){// rotate on Y
                //     cube.planeCut = cube.faces.filter(f => f.hierarchy.y === cube.faces[cube.selectedFaceId].hierarchy.y);
                // }else{
                //     //cube.planeCut = cube.faces.filter(f => f.hierarchy.x === cube.faces[cube.selectedFaceId].hierarchy.x);
                // }

    // console.log(angleInDegrees);

    //             if(angleInDegrees >= 135){ //psitive X
    //                 //rotate on Y axis
    //                 cube.planeCut = cube.faces.filter(f => f.hierarchy.y === cube.faces[cube.selectedFaceId].hierarchy.y);
                    
    //             }else if(angleInDegrees < 135 && angleInDegrees >= 45){ // Y
    //                 //rotate on X axis
    //                 cube.planeCut = cube.faces.filter(f => f.hierarchy.x === cube.faces[cube.selectedFaceId].hierarchy.x);
    //             }else if(angleInDegrees < 45){ // negative x
    //                 //rotate on Y axis
    //                 cube.planeCut = cube.faces.filter(f => f.hierarchy.y === cube.faces[cube.selectedFaceId].hierarchy.y);
    //             }


                let p1 = {x : fixPosition(mouseStartX), y : fixPosition(mouseStartY), z : 0};
                let p2 = {x : fixPosition(mouseX), y : fixPosition(mouseY), z : 0};
                const extendedP2 = extendVector(p1, p2);

                for(let i = 0 ; i < cube.faces[cube.selectedFaceId].vertices.length; i++){
                    l1 = pointToVector(cube.faces[cube.selectedFaceId].vertices[i]);
                    l2 = pointToVector(cube.faces[cube.selectedFaceId].vertices[(i + 1) % cube.faces[cube.selectedFaceId].vertices.length]);
                    if(doLinesIntersect(p1, extendedP2, l1, l2)){
                        switch(cube.faces[cube.selectedFaceId].type){
                            case 'front': // rotation on Y and X
                            case 'back':
                                if(i === 0){// top
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.x === cube.faces[cube.selectedFaceId].hierarchy.x);
                                    console.log("top");
                                }else if(i === 1){//right
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.y === cube.faces[cube.selectedFaceId].hierarchy.y);
                                    console.log("right");
                                }else if(i === 2){// bottom
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.x === cube.faces[cube.selectedFaceId].hierarchy.x);
                                    console.log("bottom");
                                }else{// left
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.y === cube.faces[cube.selectedFaceId].hierarchy.y);
                                    console.log("left");
                                }
                            break;
                            case 'top':
                            case 'bottom':

                            break;
                            case 'left':
                            case 'right':
                                if(i === 0){// top
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.z === cube.faces[cube.selectedFaceId].hierarchy.z);
                                    console.log("top");
                                }else if(i === 1){//right
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.y === cube.faces[cube.selectedFaceId].hierarchy.y);
                                    console.log("right");
                                }else if(i === 2){// bottom
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.z === cube.faces[cube.selectedFaceId].hierarchy.z);
                                    console.log("bottom");
                                }else{// left
                                    cube.planeCut = cube.faces.filter(f => f.hierarchy.y === cube.faces[cube.selectedFaceId].hierarchy.y);
                                    console.log("left");
                                }
                            break;
                        }
                        break;
                    }
                }


                for(let i = 0; i < cube.planeCut.length; i++){
                    cube.planeCut[i].colorIndex = 6;
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

// function getMidLineVector(pointA, pointB, pointC, pointD){
//     // calc firs mid poinr
//     let pointAx = (pointA[0] + pointB[0]) * 0.5;
//     let pointAy = (pointA[1] + pointB[1]) * 0.5;
//     let pointAz = (pointA[2] + pointB[2]) * 0.5;

//     // let pointAx = face[0][0];
//     // let pointAy = face[0][1];
//     // let pointAz = face[0][2];

//     let pointAp = pointToPerspective([pointAx, pointAy, pointAz]);
//     // calc secund mid point
//     let pointBx = (pointC[0] + pointD[0]) * 0.5;
//     let pointBy = (pointC[1] + pointD[1]) * 0.5;
//     let pointBz = (pointC[2] + pointD[2]) * 0.5;

//     // let pointBx = face[2][0];
//     // let pointBy = face[2][1];
//     // let pointBz = face[2][2];
//     let pointBp = pointToPerspective([pointBx, pointBy, pointBz]);

//     test.push([pointAp[0], pointAp[1], pointAp[2]], [pointBp[0], pointBp[1], pointBp[2]]);
//     // return mid vector
//     return getVectorOfPOints(pointAp, pointBp);
    
// }

// function getAngleOfVectors(v1, v2){
//     //v2.z = v1.z;
//     //v1.z = 0;
//     // v1.normalize();
//     // v2.normalize();
//     // console.log("mid:", v1, "mouse:", v2);
//     // Calculate the dot product of v1 and v2
//     const dotProduct = v1.dot(v2);
//     //Calculate the magnitudes of v1 and v2
//     const magnitudeV1 = v2.mag();
//     const magnitudeV2 = v1.mag();
//     // Calculate the cosine of the angle
//     const cosTheta = dotProduct / (magnitudeV1 * magnitudeV2);
    
//     // console.log('magnitude:', magnitudeV1 * magnitudeV2);

//     // Use Math.acos to get the angle in radians
//     const angleInRadians = Math.acos(cosTheta);


//     // Convert the angle from radians to degrees
//     //const angleInDegrees = angleInRadians * (180 / Math.PI);
//     return degrees(angleInRadians);
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
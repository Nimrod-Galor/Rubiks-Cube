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

    // push();
    // stroke('purple');
    // strokeWeight(10);

    // // Bottom-right.
    // point(0, 0, 250);
    // pop();
}

var mouseStartX = 0;
var mouseStartY = 0;
function mousePressed(){
    cube.cubeRotate = !cube.faceClicked(mouseX - (width * 0.5), mouseY - (width * 0.5));
    mouseStartX = mouseX;
    mouseStartY = mouseY;
}

function mouseReleased(){
    cube.cubeRotate = false;
    cube.selectedFaceId = -1;
    cube.planeCut = [];
}

function mouseDragged() {
    let y = (pmouseX - mouseX);
    let x = (pmouseY - mouseY);


    //console.log("moved:", pmouseX - mouseX, pmouseY - mouseY);


    if(cube.cubeRotate){
        cube.rotateCube(x * rotationSpeed, y * -rotationSpeed, 0);
    }else{
        if(cube.planeCut.length === 0){
           // console.log("x: ", Math.abs(mouseStartX - mouseX), " y: ", Math.abs(mouseStartY - mouseY));
            
            // create base vector
            let ver1 = cube.faces[cube.selectedFaceId].vertices[0];
            let ver2 = cube.faces[cube.selectedFaceId].vertices[1];
            let vectorX = createVector(ver1[0] - ver2[0], ver1[1] - ver2[1], ver1[2] - ver2[2]);
            //create mouse vector
            let mouseVector = createVector(x, y, 0);
            // Calculate the dot product of v1 and v2
            const dotProduct = vectorX.dot(mouseVector);
            // Calculate the magnitudes of v1 and v2
            const magnitudeV1 = vectorX.mag();
            const magnitudeV2 = mouseVector.mag();
            // Calculate the cosine of the angle
            const cosTheta = dotProduct / (magnitudeV1 * magnitudeV2);

            // Use Math.acos to get the angle in radians
            const angleInRadians = Math.acos(cosTheta);

            // Convert the angle from radians to degrees
            const angleInDegrees = angleInRadians * (180 / Math.PI);

console.log(angleInDegrees);


//             // we need to select plane and rotation direction
//            // console.log(cube.selectedFaceId, cube.faces[cube.selectedFaceId], x, y);

//             //  let fv = cube.faces[cube.selectedFaceId].vertices;
//             let vp1 = pointToPerspective(cube.faces[cube.selectedFaceId].normal);
//             //  let vp2 = pointToPerspective(fv[1]);

//             // // // get vector from vertice
//             // const v1 = createVector(vp1[0], vp1[1], vp1[2]);
//             // const v2 = createVector(vp2[0], vp2[1], vp2[2]);
//             // v1.sub(v2);
//             // // const v3 = createVector(fv[2][0], fv[2][1], fv[2][2]);

//             // // // Compute the vectors from the vertices
//             // const edge1 = v2.sub(v1);
//             // const edge2 = v3.sub(v1);

//             // // // Compute the cross product of the vectors to get the normal
//             // let normal = edge1.cross(edge2);

//             // // // Normalize the resulting normal vector
            
//             // let normal = cube.orientation[cube.orientation.findIndex(item => item.faceId === cube.faces[cube.selectedFaceId].type)].normal;
//             // normal = createVector(normal[0], normal[1], normal[2]);
            
            
//             let normal = createVector(vp1[0], vp1[1], vp1[2]);
//             // normal = normal.normalize();

//             //let normal = cube.faces[cube.selectedFaceId].normal;


//             let mouseVector = createVector(movedX, movedY, 0);

//             // const dot =  mouseVector.dot(normal);
//             // const projection = normal.mult(dot);

//             //const projectedMove = mouseVector.sub(projection);

            

//             const dotProd = mouseVector.dot(normal);
//             const magnitudeA = mouseVector.mag();
//             const magnitudeB = normal.mag();
//             const cosTheta = dotProd / (magnitudeA * magnitudeB);
//             const angleRadians = Math.acos(cosTheta);
//             // const angleRadians = Math.acos(dotProd);
//             const angleDegrees = angleRadians * (180 / Math.PI);
// console.log(angleDegrees);

            if(x > y){
                //rotate on Y axis
                cube.planeCut = cube.faces.filter(f => f.hierarchy.y === cube.faces[cube.selectedFaceId].hierarchy.y);
                
            }else if(x < y){
                //rotate on X axis
                cube.planeCut = cube.faces.filter(f => f.hierarchy.x === cube.faces[cube.selectedFaceId].hierarchy.x);
            }

            for(let i = 0; i < cube.planeCut.length; i++){
                cube.planeCut[i].colorIndex = 6;
            }
        }
    }
}
class Face{
    constructor(type, colorIndex, hierarchy){
        this.type = type;
        this.normal = createVector(0, 0, 1);
        this.colorIndex = colorIndex;
        this.hierarchy = hierarchy;
        // this.vertices = [
        //     [-cube.cubieSize * 0.5, -cube.cubieSize * 0.5, 0],
        //     [cube.cubieSize * 0.5, -cube.cubieSize * 0.5, 0],
        //     [cube.cubieSize * 0.5, cube.cubieSize * 0.5, 0],
        //     [-cube.cubieSize * 0.5, cube.cubieSize * 0.5, 0]
        // ];
        this.vertices = [
            createVector(-cube.cubieSize * 0.5, -cube.cubieSize * 0.5, 0),
            createVector(cube.cubieSize * 0.5, -cube.cubieSize * 0.5, 0),
            createVector(cube.cubieSize * 0.5, cube.cubieSize * 0.5, 0),
            createVector(-cube.cubieSize * 0.5, cube.cubieSize * 0.5, 0)
        ];
        this.isVisible = false;
    }

    rotateFace(xAngle, yAngle, zAngle){
        let rotationMatrix = getRotationMatrix(xAngle, yAngle, zAngle);
        // Rotate each vertex
        for(let i =0 ; i < this.vertices.length; i++){
            this.vertices[i].pointRotate(rotationMatrix);
        }
        // rotate normal
        this.normal.pointRotate(rotationMatrix);
        this.isVisible = this.isFacingCamers();
    }

    moveFace(x, y, z){
        for(let i = 0 ; i < this.vertices.length; i++){
            this.vertices[i].x += x;
            this.vertices[i].y += y;
            this.vertices[i].z += z;
        }
    }

    

    isFacingCamers() {
        // Calculate the dot product of the normal vector and the camera's forward vector
        let dot = this.normal.dot(cameraPosition);
    
        // If the dot product is positive, the triangle is facing the camera
        return dot < -0.19;
    }
    
    render(){
        push();
        //fill(cube.colors[this.colorIndex]);
        noFill();
        strokeWeight(4);
        beginShape();
        for(let i = 0 ; i < this.vertices.length; i++){
            // calculate point perspective
            let vp = this.vertices[i].vectorToPerspective();
            // Add vertices.
            vertex(vp.x, vp.y, vp.z);
        }

        // Stop drawing the shape.
        endShape(CLOSE);
        //plane(cube.cubieSize, cube.cubieSize);
        pop();
    }
}
// // create rotation matrix
// function getRotationMatrix(xAngle, yAngle, zAngle){
//     let thetaX = radians(xAngle);
//     let thetaY = radians(yAngle);
//     let thetaZ = radians(zAngle);

//     // Rotation matrices
//     let Rx = rotationMatrixX(thetaX);
//     let Ry = rotationMatrixY(thetaY);
//     let Rz = rotationMatrixZ(thetaZ);
//     // Combined rotation matrix Rz * Ry * Rx
//     let R = multiplyMatrices(multiplyMatrices(Rz, Ry), Rx);
//     return R;
// }

// // Function to create a rotation matrix for the x-axis
// function rotationMatrixX(theta) {
//     return [
//         [1, 0, 0],
//         [0, Math.cos(theta), -Math.sin(theta)],
//         [0, Math.sin(theta), Math.cos(theta)]
//     ];
// }

// // Function to create a rotation matrix for the y-axis
// function rotationMatrixY(theta) {
//     return [
//         [Math.cos(theta), 0, Math.sin(theta)],
//         [0, 1, 0],
//         [-Math.sin(theta), 0, Math.cos(theta)]
//     ];
// }

// // Function to create a rotation matrix for the z-axis
// function rotationMatrixZ(theta) {
//     return [
//         [Math.cos(theta), -Math.sin(theta), 0],
//         [Math.sin(theta), Math.cos(theta), 0],
//         [0, 0, 1]
//     ];
// }

// // Function to multiply two matrices
// function multiplyMatrices(a, b) {
//     let result = [];
//     for (let i = 0; i < a.length; i++) {
//         result[i] = [];
//         for (let j = 0; j < b[0].length; j++) {
//             result[i][j] = 0;
//             for (let k = 0; k < a[0].length; k++) {
//                 result[i][j] += a[i][k] * b[k][j];
//             }
//         }
//     }
//     return result;
// }

// // Function to rotate a point using a rotation matrix
// function pointRotate(point, rotationMatrix) {
//     let result = [];
//     for (let i = 0; i < rotationMatrix.length; i++) {
//         result[i] = 0;
//         for (let j = 0; j < point.length; j++) {
//             result[i] += rotationMatrix[i][j] * point[j];
//         }
//     }
//     return result;
// }







function pointToPerspective(point){
    const scale = camFov / (camFov - point.z);
    let px = point.x * scale;
    let py = point.y * scale;
    return [px, py, point.z];
}


// Function to check if a point is inside a polygon using ray-casting algorithm
function isPointInPolygon(x, y, vertices) {
    // let x = pointX, y = pointY;
    let inside = false;

    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        // calculate point perspective
        let vpi = pointToPerspective(vertices[i]);
        let vpj = pointToPerspective(vertices[j]);


        let xi = vpi[0], yi = vpi[1];
        let xj = vpj[0], yj = vpj[1];

        let intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}




// function isVectorFacingCamers(normal) {
//     // face normal vector
//     let v1 = pointToVector(normal);//createVector(normal[0], normal[1], normal[2]);
    
//     // Compute the dot product of the normal and the vector from the camera to the vertex
//     const dotProduct = v1.dot(cameraPosition);

//     // If the dot product is positive, the triangle is facing the camera
//     return dotProduct < 0;
// }
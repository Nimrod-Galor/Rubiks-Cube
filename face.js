class Face{
    constructor(type, colorIndex, hierarchy){
        this.type = type;
        this.colorIndex = colorIndex;
        this.hierarchy = hierarchy;
        this.vertices = [
            [-cube.cubieSize * 0.5, -cube.cubieSize * 0.5, 0],
            [cube.cubieSize * 0.5, -cube.cubieSize * 0.5, 0],
            [cube.cubieSize * 0.5, cube.cubieSize * 0.5, 0],
            [-cube.cubieSize * 0.5, cube.cubieSize * 0.5, 0]
        ];
        this.isVisible = false;
    }

    rotateFace(xAngle, yAngle, zAngle){
        let thetaX = radians(xAngle);
        let thetaY = radians(yAngle);
        let thetaZ = radians(zAngle);

        // Rotation matrices
        let Rx = rotationMatrixX(thetaX);
        let Ry = rotationMatrixY(thetaY);
        let Rz = rotationMatrixZ(thetaZ);
        // Combined rotation matrix Rz * Ry * Rx
        let R = multiplyMatrices(multiplyMatrices(Rz, Ry), Rx);

        // Rotate each vertex
        this.vertices = this.vertices.map(vertex => rotatePoint(vertex, R));

    }

    moveFace(x, y, z){
        for(let i = 0 ; i < this.vertices.length; i++){
            this.vertices[i][0] += x;
            this.vertices[i][1] += y;
            this.vertices[i][2] += z;
        }
    }
    
    render(){
        push();
        fill(cube.colors[this.colorIndex]);
        //noFill();
        strokeWeight(4);
        beginShape();
        for(let i = 0 ; i < this.vertices.length; i++){
            // calculate point perspective
            let vp = pointToPerspective(this.vertices[i]);
            // Add vertices.
            vertex(vp[0], vp[1], vp[2]);
        }

        // Stop drawing the shape.
        endShape(CLOSE);
        //plane(cube.cubieSize, cube.cubieSize);
        pop();
    }
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

// Function to rotate a point using a rotation matrix
function rotatePoint(point, rotationMatrix) {
    let result = [];
    for (let i = 0; i < rotationMatrix.length; i++) {
        result[i] = 0;
        for (let j = 0; j < point.length; j++) {
            result[i] += rotationMatrix[i][j] * point[j];
        }
    }
    return result;
}
const fov = 800;

function vectorToPerspective(vec){
    const scale = fov / (fov - vec.z);
    vec.x *= scale;
    vec.y *= scale;
    return vec;
}

function pointToPerspective(point){
    const scale = fov / (fov - point[2]);
    let px = point[0] * scale;
    let py = point[1] * scale;
    return [px, py, point[2]];
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

function isTriangleFacingCamera(normal) {
    let v1 = createVector(normal[0], normal[1], normal[2]);
    let cameraPosition = createVector(0, 0, -1);
    // Compute the dot product of the normal and the vector from the camera to the vertex
    const dotProduct = v1.dot(cameraPosition);

    // If the dot product is positive, the triangle is facing the camera
    return dotProduct < -0.20;
}
class Face{
    constructor(type, colorIndex, hierarchy){
        this.type = type;
        this.normal = createVector(0, 0, 1);
        this.colorIndex = colorIndex;
        this.hierarchy = hierarchy;
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
        this.isFacingCamers();
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
        this.isVisible = (dot < -0.19);
    }
    
    render(){
        push();
        fill(cube.colors[this.colorIndex]);
        // noFill();
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
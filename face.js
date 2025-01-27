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
        const rotationMatrix = getRotationMatrix(xAngle, yAngle, zAngle);
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
        const dot = this.normal.dot(cameraPosition);
        // If the dot product is positive, the triangle is facing the camera
        this.isVisible = (dot < -0.19);
    }

    // Function to check if a point is inside a polygon using ray-casting algorithm
    isPointInPolygon(x, y) {
        // let x = pointX, y = pointY;
        let inside = false;

        for (let i = 0, j = this.vertices.length - 1; i < this.vertices.length; j = i++) {
            // calculate point perspective
            const vpi = this.vertices[i].pointToPerspective();
            const vpj = this.vertices[j].pointToPerspective();

            const xi = vpi.x, yi = vpi.y;
            const xj = vpj.x, yj = vpj.y;

            const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) {inside = !inside};
        }

        return inside;
    }
    
    render(){
        push();
        fill(cube.colors[this.colorIndex]);
        // noFill();
        strokeWeight(4);
        beginShape();
        for(let i = 0 ; i < this.vertices.length; i++){
            // calculate point perspective
            let vp = this.vertices[i].pointToPerspective();
            // Add vertices.
            vertex(vp.x, vp.y, vp.z);
        }

        // Stop drawing the shape.
        endShape(CLOSE);
        //plane(cube.cubieSize, cube.cubieSize);
        pop();
    }
}



